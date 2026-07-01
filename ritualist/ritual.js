/* ritual.js — renders a ritual's steps; hosts JOYA 1 (guided breathing). */

import * as store from "./utils/storage.js";
import { getRitual, expressRitual, breathTimeline } from "./utils/rituals.js";
import { resolveRitualId } from "./utils/anchors.js";
import { configureSound, playBell, playBreath, playTick } from "./utils/sound.js";
import { AFFIRMATIONS, pickRandom } from "./utils/messages.js";

const $ = (s) => document.querySelector(s);
const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };

/* — Read query params. `from` is parsed manually (may contain & and =). — */
function readParams() {
  const p = new URLSearchParams(location.search);
  const idx = location.search.indexOf("&from=");
  let from = "";
  if (idx >= 0) { try { from = decodeURIComponent(location.search.slice(idx + 6)); } catch { from = location.search.slice(idx + 6); } }
  return { site: p.get("site") || "", anchor: p.get("anchor") || "", express: p.get("express") === "1", from };
}

const params = readParams();
const timers = [];
const clearTimers = () => { while (timers.length) clearInterval(timers.pop()); };
let state = { steps: [], index: 0, settings: null };

init();

async function init() {
  const s = await store.get(null);
  configureSound(s.settings.soundEnabled);
  state.settings = s.settings;
  let ritual = pickRitual(s);
  if (params.express && ritual) ritual = expressRitual(ritual);
  if (!ritual || !ritual.steps.length) return leave();
  state.steps = ritual.steps;
  renderStep();
  $("#continue").addEventListener("click", onContinue);
  $("#skip").addEventListener("click", () => toggleModal(true));
  $("#skipYes").addEventListener("click", onSkip);
  $("#skipNo").addEventListener("click", () => toggleModal(false));
}

function pickRitual(s) {
  const anchor = s.anchors.find((a) => a.id === params.anchor);
  const id = anchor ? resolveRitualId(anchor, s.rituals) : s.settings.ritualEntryId;
  return getRitual(s.rituals, id) || s.rituals[0] || null;
}

/* ----------------------------------------------------------------- render */

function renderStep() {
  clearTimers();
  buildProgress();
  const host = $("#step");
  host.className = "step enter";
  host.innerHTML = "";
  const step = state.steps[state.index];
  (RENDERERS[step.type] || renderAffirmation)(host, step.config || {});
}

function buildProgress() {
  const bar = $("#progress");
  bar.innerHTML = "";
  state.steps.forEach((_, i) => {
    const seg = el("div", "seg");
    if (i < state.index) seg.classList.add("done");
    if (i === state.index) seg.classList.add("active");
    bar.appendChild(seg);
  });
}

function showContinue(on, label) {
  const c = $("#continue");
  c.style.visibility = on ? "visible" : "hidden";
  if (label) c.textContent = label;
}

const RENDERERS = {
  breath: renderBreath,
  intention: renderIntention,
  affirmation: renderAffirmation,
  pause: renderPause,
  checklist: renderChecklist
};

function renderIntention(host, cfg) {
  host.appendChild(el("p", "eyebrow", "Intención"));
  host.appendChild(el("h1", "prompt", cfg.prompt || "¿Cuál es la única cosa que importa ahora?"));
  const field = el("textarea", "field");
  field.rows = 3; field.placeholder = "Escríbelo en una frase…";
  field.dataset.intention = "1";
  host.appendChild(field);
  showContinue(true, "Continuar →");
  setTimeout(() => field.focus(), 400);
}

function renderAffirmation(host) {
  host.appendChild(el("p", "eyebrow", "Lectura"));
  host.appendChild(el("p", "phrase", pickRandom(AFFIRMATIONS)));
  showContinue(true, "Continuar →");
}

function renderPause(host, cfg) {
  host.appendChild(el("p", "eyebrow", "Quietud"));
  const num = el("div", "count-big", String(cfg.seconds || 20));
  host.appendChild(num);
  host.appendChild(el("p", "phrase", "Sólo estar. Sin hacer nada más."));
  showContinue(false);
  let n = cfg.seconds || 20;
  const iv = setInterval(() => {
    n -= 1; num.textContent = String(n);
    if (n <= 0) { clearInterval(iv); showContinue(true, "Continuar →"); }
  }, 1000);
  timers.push(iv);
}

function renderChecklist(host, cfg) {
  host.appendChild(el("p", "eyebrow", "Checklist"));
  const wrap = el("div", "checks");
  (cfg.items || ["Micro-acción"]).forEach((label) => {
    const row = el("button", "check");
    row.appendChild(el("span", "box"));
    row.appendChild(el("span", null, label));
    row.addEventListener("click", () => { row.classList.toggle("on"); playTick(); });
    wrap.appendChild(row);
  });
  host.appendChild(wrap);
  showContinue(true, "Continuar →");
}

/* -------------------------------------------------------- JOYA 1: breath */

function renderBreath(host, cfg) {
  const wrap = el("div", "breath");
  const halo = el("div", "halo"), orb = el("div", "orb"), count = el("div", "breath-count");
  wrap.append(halo, orb, count);
  const guide = el("div", "breath-guide"), cyc = el("div", "breath-cycle");
  host.append(wrap, guide, cyc);
  showContinue(false);
  runBreath(breathTimeline(state.settings, cfg.cycles || 3), { orb, halo, count, guide, cyc, cycles: cfg.cycles || 3 });
}

function runBreath(timeline, ui) {
  let i = 0, lastScale = 0.55;
  const perCycle = timeline.length / ui.cycles;
  const step = () => {
    if (i >= timeline.length) return endBreath();
    const ph = timeline[i];
    applyPhase(ph, ui, lastScale);
    if (ph.phase !== "hold") lastScale = ph.phase === "inhale" ? 1 : 0.55;
    breathCountdown(ph.seconds, ui.count);
    ui.cyc.textContent = `ciclo ${Math.floor(i / perCycle) + 1} de ${ui.cycles}`;
    timers.push(setTimeout(() => { i++; step(); }, ph.seconds * 1000));
  };
  step();
}

function applyPhase(ph, ui, lastScale) {
  const scale = ph.phase === "inhale" ? 1 : ph.phase === "exhale" ? 0.55 : lastScale;
  const tr = `transform ${ph.seconds}s var(--ease-breath)`;
  ui.orb.style.transition = tr; ui.halo.style.transition = tr;
  ui.orb.style.transform = `scale(${scale})`;
  ui.halo.style.transform = `scale(${scale * 1.18})`;
  document.body.className = `is-${ph.phase}`;
  ui.guide.classList.remove("show"); void ui.guide.offsetWidth;
  ui.guide.textContent = ph.label; ui.guide.classList.add("show");
  playBreath(ph.phase, ph.seconds);
}

function breathCountdown(seconds, node) {
  let n = seconds;
  const paint = () => { node.textContent = String(n); node.classList.add("show"); };
  paint();
  const iv = setInterval(() => {
    n -= 1;
    if (n <= 0) { clearInterval(iv); node.classList.remove("show"); return; }
    node.classList.remove("show");
    setTimeout(() => { node.textContent = String(n); node.classList.add("show"); }, 140);
  }, 1000);
  timers.push(iv);
}

function endBreath() {
  document.body.className = "";
  showContinue(true, "Continuar →");
}

/* -------------------------------------------------------------- advance */

function onContinue() {
  playTick();
  captureIntention();
  if (state.index < state.steps.length - 1) {
    const host = $("#step");
    host.className = "step leave";
    setTimeout(() => { state.index += 1; renderStep(); }, 360);
  } else { finish(); }
}

async function captureIntention() {
  const field = document.querySelector('[data-intention="1"]');
  if (!field || !field.value.trim()) return;
  const s = await store.get(["intentions"]);
  const list = s.intentions || [];
  list.push({ date: new Date().toISOString().slice(0, 10), text: field.value.trim() });
  await store.set({ intentions: list.slice(-200) });
}

async function finish() {
  clearTimers();
  playBell();
  try { await chrome.runtime.sendMessage({ type: "ritualDone", anchorId: params.anchor }); }
  catch (e) { console.error("ritualDone failed", e); }
  renderComplete();
}

function renderComplete() {
  buildProgress();
  document.querySelectorAll(".seg").forEach((s) => s.classList.add("done"));
  const host = $("#step");
  host.className = "step enter"; host.innerHTML = "";
  host.appendChild(el("div", "orb"));
  host.appendChild(el("p", "eyebrow", "Listo"));
  host.appendChild(el("h1", "prompt", "Entras con presencia."));
  showContinue(false);
  const enter = el("button", "btn-primary", `Entrar a ${params.site || "la web"} →`);
  enter.addEventListener("click", leave);
  $("#controls").innerHTML = ""; $("#controls").appendChild(enter);
  setTimeout(leave, 12000);
}

/* ---------------------------------------------------------------- skip */

function toggleModal(on) {
  $("#skipModal").hidden = !on;
  document.body.classList.toggle("modal-open", on);
}

async function onSkip() {
  toggleModal(false);
  try { await chrome.runtime.sendMessage({ type: "ritualSkip", anchorId: params.anchor }); }
  catch (e) { console.error("ritualSkip failed", e); }
  leave();
}

function leave() {
  location.href = params.from || (params.site ? "https://" + params.site : "about:blank");
}
