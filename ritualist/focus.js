/* focus.js — JOYA 2. Renders the live focus/break ring. The clock lives in
   the service worker (phaseEndsISO); this page only reads and paints. */

import * as store from "./utils/storage.js";
import { remainingMs } from "./utils/pomodoro.js";
import { configureSound, playBell, playTick } from "./utils/sound.js";

const $ = (s) => document.querySelector(s);
const C = 2 * Math.PI * 130;

function readParams() {
  const p = new URLSearchParams(location.search);
  const idx = location.search.indexOf("&from=");
  let from = "";
  if (idx >= 0) { try { from = decodeURIComponent(location.search.slice(idx + 6)); } catch { from = location.search.slice(idx + 6); } }
  return { entry: p.get("entry") === "1", site: p.get("site") || "", anchor: p.get("anchor") || "", from };
}

const params = readParams();
let settings = null, fb = null, loopIv = null, exitDone = false;

$("#ringFill").style.strokeDasharray = String(C);
init();

async function init() {
  const s = await store.get(null);
  settings = s.settings; fb = s.focusBlock;
  configureSound(settings.soundEnabled);
  chrome.storage.onChanged.addListener((c, area) => {
    if (area === "local" && c.focusBlock) { fb = c.focusBlock.newValue; react(); }
  });
  if (params.entry && fb.state === "idle") return showEntry();
  react();
}

/* ------------------------------------------------------------------ entry */

function showEntry() {
  $("#entry").hidden = false; $("#live").hidden = true;
  $("#entryMin").textContent = String(settings.focusMin);
  const field = $("#entryIntention");
  setTimeout(() => field.focus(), 500);
  $("#entryStart").addEventListener("click", async () => {
    playTick();
    const r = await send({ type: "startFocus", minutes: settings.focusMin, intention: field.value.trim(), anchorId: params.anchor });
    if (r && r.focusBlock) fb = r.focusBlock;
    $("#entry").hidden = true;
    react();
  });
}

/* ---------------------------------------------------------------- routing */

function react() {
  if (!fb) return;
  if (fb.state === "break" && !exitDone) return showExit();
  if (fb.state === "idle") return showIdle();
  showLive();
}

function showLive() {
  $("#entry").hidden = true; $("#exit").hidden = true; $("#live").hidden = false;
  document.body.classList.toggle("is-break", fb.state === "break");
  $("#phaseLabel").textContent = fb.state === "break" ? "Descanso" : (fb.state === "paused" ? "En pausa" : "Foco");
  $("#liveIntention").textContent = fb.state === "break" ? "Levántate. Respira. Mira lejos." : fb.intention;
  renderControls();
  startLoop();
  paint();
}

function renderControls() {
  const c = $("#controls"); c.innerHTML = "";
  const add = (label, cls, handler) => { const b = document.createElement("button"); b.className = cls; b.textContent = label; b.onclick = handler; c.appendChild(b); };
  if (fb.state === "running") { add("Pausar", "btn-soft", () => mutate("focusPause")); add("Terminar", "btn-soft btn-danger", () => mutate("focusTerminate")); }
  else if (fb.state === "paused") { add("Reanudar", "btn-primary", () => mutate("focusResume")); add("Terminar", "btn-soft btn-danger", () => mutate("focusTerminate")); }
  else if (fb.state === "break") { add("Saltar descanso", "btn-soft", () => mutate("focusEndBreak")); }
}

async function mutate(type) {
  playTick();
  const r = await send({ type });
  if (r && r.focusBlock) { fb = r.focusBlock; if (type === "focusTerminate") return leave(); react(); }
}

/* ----------------------------------------------------------------- paint */

function startLoop() {
  if (loopIv) return;
  loopIv = setInterval(paint, 1000);
}
function stopLoop() { if (loopIv) { clearInterval(loopIv); loopIv = null; } }

function paint() {
  if (!fb || fb.state === "idle") return;
  const total = fb.phaseTotalSec || 1;
  const remSec = Math.round(remainingMs(fb) / 1000);
  const frac = Math.max(0, Math.min(1, remSec / total));
  $("#ringFill").style.strokeDashoffset = String(C * (1 - frac));
  $("#timer").textContent = fmt(remSec);
}

function fmt(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ------------------------------------------------------------ exit ritual */

function showExit() {
  stopLoop();
  $("#live").hidden = true; $("#entry").hidden = true; $("#exit").hidden = false;
  playBell();
  const count = $("#exitCount"), done = $("#exitDone"), check = $("#exitCheck");
  check.onclick = () => { check.classList.toggle("on"); playTick(); };
  let n = 20; count.textContent = "20";
  const iv = setInterval(() => {
    n -= 1; count.textContent = String(Math.max(0, n));
    if (n <= 0) { clearInterval(iv); done.style.visibility = "visible"; }
  }, 1000);
  done.onclick = () => { clearInterval(iv); exitDone = true; playTick(); react(); };
}

/* ------------------------------------------------------------------ idle */

function showIdle() {
  stopLoop();
  document.body.classList.remove("is-break");
  $("#exit").hidden = true; $("#entry").hidden = true; $("#live").hidden = false;
  $("#phaseLabel").textContent = "Listo";
  $("#timer").textContent = fmt(settings.focusMin * 60);
  $("#ringFill").style.strokeDashoffset = "0";
  $("#liveIntention").textContent = "El bloque se cerró. ¿Seguimos?";
  const c = $("#controls"); c.innerHTML = "";
  const next = document.createElement("button"); next.className = "btn-primary"; next.textContent = "Empezar otro bloque →";
  next.onclick = async () => { playTick(); exitDone = false; const r = await send({ type: "startFocus", minutes: settings.focusMin, intention: fb.intention }); if (r) { fb = r.focusBlock; react(); } };
  c.appendChild(next);
  if (params.from) { const go = document.createElement("button"); go.className = "btn-soft"; go.textContent = "Salir"; go.onclick = leave; c.appendChild(go); }
}

/* --------------------------------------------------------------- helpers */

async function send(msg) { try { return await chrome.runtime.sendMessage(msg); } catch (e) { console.error(msg.type + " failed", e); return null; } }
function leave() { location.href = params.from || (params.site ? "https://" + params.site : chrome.runtime.getURL("popup.html")); }
