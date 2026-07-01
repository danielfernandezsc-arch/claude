/* popup.js — shell: loads state, wires tabs, builds the shared ctx. */

import * as store from "./utils/storage.js";
import { toast } from "./popup/shared.js";
import { configureSound, playBell } from "./utils/sound.js";
import { isMilestone } from "./utils/streak.js";
import { pickRandom, AFFIRMATIONS } from "./utils/messages.js";
import { renderToday } from "./popup/today.js";
import { renderFocus, teardown as teardownFocus } from "./popup/focusTab.js";
import { renderRituals } from "./popup/ritualsTab.js";
import { renderWebs } from "./popup/websTab.js";
import { renderSettings, applyTheme } from "./popup/settingsTab.js";

const RENDER = { today: renderToday, focus: renderFocus, rituals: renderRituals, webs: renderWebs, settings: renderSettings };

let currentState = null;
let activeTab = "today";

const ctx = {
  get state() { return currentState; },
  save: async (partial) => { await store.set(partial); await ctx.act("rulesChanged"); },
  saveQuiet: async () => { await store.set({ anchors: currentState.anchors, rituals: currentState.rituals, settings: currentState.settings }); await ctx.act("rulesChanged"); },
  act: (type, extra) => sendMessage({ type, ...(extra || {}) }),
  toast,
  rerender: async () => { await loadState(); renderActive(); }
};

init();

async function init() {
  await loadState();
  configureSound(currentState.settings.soundEnabled);
  applyTheme(currentState.settings.theme);
  wireTabs();
  wireEasterEgg();
  renderActive();
  updateStreakChip();
  maybeCelebrate();
}

async function loadState() {
  const res = await sendMessage({ type: "getState" });
  currentState = res && res.state ? res.state : await store.get(null);
}

function wireTabs() {
  document.querySelectorAll(".tab").forEach((t) => {
    t.addEventListener("click", () => switchTab(t.dataset.tab, t));
  });
}

function switchTab(tab, btn) {
  if (tab === activeTab) return;
  teardownFocus();
  activeTab = tab;
  document.querySelectorAll(".tab").forEach((t) => t.classList.toggle("on", t === btn));
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("on"));
  renderActive();
}

function renderActive() {
  const panel = document.getElementById("panel-" + activeTab);
  document.querySelectorAll(".panel").forEach((p) => p.classList.remove("on"));
  panel.classList.add("on");
  RENDER[activeTab](panel, currentState, ctx);
  updateStreakChip();
}

function updateStreakChip() {
  document.getElementById("streakChipN").textContent = String(currentState.streak.current);
}

/* — Milestone celebration: efímera, la próxima vez que se abre el popup. — */
async function maybeCelebrate() {
  const cur = currentState.streak.current;
  const { celebratedStreak } = await store.get("celebratedStreak");
  if (!isMilestone(cur) || celebratedStreak === cur) return;
  await store.set({ celebratedStreak: cur });
  celebrate(cur);
}

function celebrate(days) {
  const layer = document.createElement("div");
  layer.className = "celebrate";
  layer.innerHTML = `<div class="badge"><div class="big">${days} días</div><div class="label">de presencia sostenida</div></div>`;
  document.body.appendChild(layer);
  if (currentState.settings.soundEnabled) playBell();
  setTimeout(() => layer.remove(), 1800);
}

/* — Easter egg: tap the mark for a single bell + a whispered phrase. — */
function wireEasterEgg() {
  const mark = document.querySelector(".mark");
  mark.style.cursor = "pointer";
  mark.title = "…";
  mark.addEventListener("click", () => {
    mark.animate([{ transform: "scale(1)" }, { transform: "scale(1.4)" }, { transform: "scale(1)" }], { duration: 900, easing: "cubic-bezier(.45,0,.55,1)" });
    if (currentState.settings.soundEnabled) playBell();
    toast(pickRandom(AFFIRMATIONS));
  });
}

async function sendMessage(msg) {
  try { return await chrome.runtime.sendMessage(msg); }
  catch (e) { console.error(msg.type + " failed", e); return null; }
}
