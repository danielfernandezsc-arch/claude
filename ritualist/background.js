/* background.js — service worker. Single source of truth for the clock,
   DNR rules, and firing policy. Front-ends only read/render its decisions. */

import * as store from "./utils/storage.js";
import { policyAllows, resolveRitualId } from "./utils/anchors.js";
import { anchorRegexFilter } from "./utils/domains.js";
import { applyRollover, localDate, recordCompletion, recordSkip } from "./utils/streak.js";
import * as pomo from "./utils/pomodoro.js";

const TICK = "tick";
const PHASE_END = "focus-phase-end";

/* ---------------------------------------------------------------- lifecycle */

chrome.runtime.onInstalled.addListener(async (details) => {
  const seeded = await store.ensureMigrated();
  await rebuildRules();
  ensureTick();
  if (details.reason === "install" || seeded) {
    try { await chrome.tabs.create({ url: chrome.runtime.getURL("onboarding.html") }); }
    catch (e) { console.error("open onboarding failed", e); }
  }
});

chrome.runtime.onStartup.addListener(async () => {
  await store.ensureMigrated();
  await rollAndRebuild();
  ensureTick();
});

function ensureTick() {
  try { chrome.alarms.create(TICK, { periodInMinutes: 1 }); }
  catch (e) { console.error("ensureTick failed", e); }
}

/* ------------------------------------------------------------- DNR rebuild */

/** Decide the redirect URL for one anchor given live focus state, or null. */
function ruleTargetFor(anchor, s) {
  if (!anchor.enabled) return null;
  if (!policyAllows(anchor, s.cooldowns)) return null;
  const fb = s.focusBlock;
  const domain = anchor.domain;
  if (fb.state === "running") {
    if (anchor.behaviorDuringFocus === "silenciar") return null;
    const express = anchor.behaviorDuringFocus === "ritual-corto" ? 1 : 0;
    return ritualUrl(domain, anchor.id, express);
  }
  if (fb.state !== "break" && anchor.triggersFocus) return focusUrl(domain, anchor.id);
  return ritualUrl(domain, anchor.id, 0);
}

function ritualUrl(domain, id, express) {
  return chrome.runtime.getURL("ritual.html") + `?site=${domain}&anchor=${id}&express=${express}&from=\\0`;
}
function focusUrl(domain, id) {
  return chrome.runtime.getURL("focus.html") + `?site=${domain}&anchor=${id}&entry=1&from=\\0`;
}

/** Recompute all dynamic DNR rules from current state. */
async function rebuildRules() {
  try {
    const s = await store.get(null);
    const existing = await chrome.declarativeNetRequest.getDynamicRules();
    const removeRuleIds = existing.map((r) => r.id);
    const addRules = [];
    (s.anchors || []).forEach((anchor, i) => {
      const target = ruleTargetFor(anchor, s);
      if (!target) return;
      addRules.push({
        id: i + 1,
        priority: 1,
        action: { type: "redirect", redirect: { regexSubstitution: target } },
        condition: {
          regexFilter: anchorRegexFilter(anchor.domain),
          resourceTypes: ["main_frame"]
        }
      });
    });
    await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds, addRules });
  } catch (e) { console.error("rebuildRules failed", e); }
}

async function rollAndRebuild() {
  const s = await store.get(null);
  const { changed } = applyRollover(s);
  if (changed) await store.set({ presence: s.presence, streak: s.streak, focusStats: s.focusStats });
  await rebuildRules();
}

/* ------------------------------------------------------------------ alarms */

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === TICK) return onTick();
  if (alarm.name === PHASE_END) return onPhaseEnd();
});

async function onTick() {
  const s = await store.get(null);
  const { changed } = applyRollover(s);
  const patch = {};
  if (s.focusBlock.state === "running" && s.focusBlock.phase === "focus") {
    s.focusStats.todayMinutes += 1;
    s.focusStats.totalMinutes += 1;
    patch.focusStats = s.focusStats;
  }
  if (changed) { patch.presence = s.presence; patch.streak = s.streak; patch.focusStats = s.focusStats; }
  if (Object.keys(patch).length) await store.set(patch);
  await rebuildRules();
}

async function onPhaseEnd() {
  const s = await store.get(null);
  const fb = s.focusBlock;
  if (fb.state === "running" && fb.phase === "focus") {
    pomo.creditCompletion(s);
    pomo.toBreak(s);
    await store.set({ focusBlock: s.focusBlock, focusStats: s.focusStats });
    schedulePhaseEnd(s.focusBlock.phaseEndsISO);
    notify("Bloque completado", "Respira. El descanso empieza ahora.");
  } else if (fb.state === "break") {
    pomo.endBreak(s);
    await store.set({ focusBlock: s.focusBlock });
    notify("Descanso terminado", "¿Arrancamos el siguiente bloque?");
  }
  await rebuildRules();
}

function schedulePhaseEnd(iso) {
  try {
    chrome.alarms.clear(PHASE_END);
    if (iso) chrome.alarms.create(PHASE_END, { when: new Date(iso).getTime() });
  } catch (e) { console.error("schedulePhaseEnd failed", e); }
}

function notify(title, message) {
  try {
    chrome.notifications.create("ritualist-" + localDate() + Math.floor(performance.now()), {
      type: "basic", iconUrl: chrome.runtime.getURL("icons/icon128.png"),
      title, message, silent: false
    });
  } catch (e) { console.error("notify failed", e); }
}

/* --------------------------------------------------------------- messaging */

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  handleMessage(msg).then(sendResponse).catch((e) => { console.error("msg failed", e); sendResponse({ ok: false }); });
  return true;
});

async function handleMessage(msg) {
  switch (msg.type) {
    case "getState": { const s = await store.get(null); applyRollover(s); return { ok: true, state: s }; }
    case "rulesChanged": await rebuildRules(); return { ok: true };
    case "ritualDone": return onRitualOutcome(msg, true);
    case "ritualSkip": return onRitualOutcome(msg, false);
    case "startFocus": return onStartFocus(msg);
    case "focusPause": return onFocusMutate((s) => pomo.pause(s), true);
    case "focusResume": return onFocusMutate((s) => pomo.resume(s), true);
    case "focusTerminate": return onFocusMutate((s) => pomo.terminate(s), true);
    case "focusEndBreak": return onFocusMutate((s) => pomo.endBreak(s), false);
    default: return { ok: false };
  }
}

async function onRitualOutcome(msg, completed) {
  const s = await store.get(null);
  if (completed) recordCompletion(s); else recordSkip(s);
  if (msg.anchorId) s.cooldowns[msg.anchorId] = new Date().toISOString();
  s.stats.totalTriggers += 1;
  await store.set({ streak: s.streak, presence: s.presence, stats: s.stats, cooldowns: s.cooldowns });
  await rebuildRules();
  return { ok: true, streak: s.streak, presence: s.presence };
}

async function onStartFocus(msg) {
  const s = await store.get(null);
  const mins = Math.max(1, msg.minutes || s.settings.focusMin);
  pomo.startBlock(s, mins, msg.intention || "");
  if (msg.anchorId) s.cooldowns[msg.anchorId] = new Date().toISOString();
  await store.set({ focusBlock: s.focusBlock, cooldowns: s.cooldowns });
  schedulePhaseEnd(s.focusBlock.phaseEndsISO);
  await rebuildRules();
  return { ok: true, focusBlock: s.focusBlock };
}

async function onFocusMutate(fn, reschedule) {
  const s = await store.get(null);
  fn(s);
  await store.set({ focusBlock: s.focusBlock });
  if (reschedule) schedulePhaseEnd(s.focusBlock.state === "running" || s.focusBlock.state === "break" ? s.focusBlock.phaseEndsISO : null);
  await rebuildRules();
  return { ok: true, focusBlock: s.focusBlock };
}
