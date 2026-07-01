/* popup/focusTab.js — the "Foco" tab: live ring or block launcher. */

import { el, el2, fmtTime, countUp } from "./shared.js";
import { remainingMs } from "../utils/pomodoro.js";
import { getLast7Days, localDate } from "../utils/streak.js";
import * as store from "../utils/storage.js";

const R = 88, C = 2 * Math.PI * R;
let liveIv = null, liveFb = null, unsub = null;

export function teardown() {
  if (liveIv) { clearInterval(liveIv); liveIv = null; }
  if (unsub) { unsub(); unsub = null; }
}

export function renderFocus(host, state, ctx) {
  teardown();
  host.innerHTML = "";
  liveFb = state.focusBlock;
  if (liveFb.state === "idle") return renderLauncher(host, state, ctx);
  renderLive(host, state, ctx);
}

/* ------------------------------------------------------------------ live */

function renderLive(host, state, ctx) {
  host.appendChild(liveCard(state, ctx));
  liveIv = setInterval(paint, 1000);
  unsub = store.onChange(["focusBlock"], () => ctx.rerender());
  paint();
}

function liveCard(state, ctx) {
  const card = el("div", "card card-hero");
  card.appendChild(ringMini(liveFb));
  const intent = liveFb.state === "break" ? "Levántate. Respira. Mira lejos." : (liveFb.intention || "Bloque de foco en curso");
  card.appendChild(el("p", "quote", `“${intent}”`));
  card.appendChild(controls(ctx));
  return card;
}

function ringMini(fb) {
  const wrap = el("div", "ring-mini" + (fb.state === "break" ? " brk" : ""));
  wrap.innerHTML = `<svg viewBox="0 0 200 200"><circle class="tk" cx="100" cy="100" r="${R}"/><circle class="fl" id="fl" cx="100" cy="100" r="${R}" stroke-dasharray="${C}"/></svg>`;
  const ctr = el("div", "ctr");
  ctr.appendChild(el("div", "p", fb.state === "break" ? "Descanso" : (fb.state === "paused" ? "Pausa" : "Foco")));
  ctr.appendChild(el("div", "t timer", "00:00"));
  wrap.appendChild(ctr);
  return wrap;
}

function controls(ctx) {
  const box = el("div", "row");
  const mk = (label, cls, type) => { const b = el("button", "btn " + cls, label); b.onclick = () => ctx.act(type).then(ctx.rerender); return b; };
  box.style.gap = "var(--s-2)"; box.style.marginTop = "var(--s-3)";
  if (liveFb.state === "running") { box.append(mk("Pausar", "btn-soft btn-block", "focusPause"), mk("Terminar", "btn-danger", "focusTerminate")); }
  else if (liveFb.state === "paused") { box.append(mk("Reanudar", "btn-warm btn-block", "focusResume"), mk("Terminar", "btn-danger", "focusTerminate")); }
  else if (liveFb.state === "break") { box.append(mk("Saltar descanso", "btn-soft btn-block", "focusEndBreak")); }
  return box;
}

function paint() {
  if (!liveFb) return;
  const fl = document.getElementById("fl");
  const t = document.querySelector(".ring-mini .t");
  if (!fl || !t) return;
  const total = liveFb.phaseTotalSec || 1;
  const rem = Math.round(remainingMs(liveFb) / 1000);
  const frac = Math.max(0, Math.min(1, rem / total));
  fl.style.strokeDashoffset = String(C * (1 - frac));
  t.textContent = fmtTime(rem);
}

/* -------------------------------------------------------------- launcher */

function renderLauncher(host, state, ctx) {
  let mins = state.settings.focusMin;
  const card = el("div", "card card-hero");
  card.appendChild(el("div", "eyebrow", "Nuevo bloque de foco"));
  const intent = el("textarea", "input"); intent.rows = 2;
  intent.placeholder = "¿Qué vas a avanzar en este bloque?";
  card.appendChild(intent);
  const seg = el("div", "seg"); seg.style.margin = "var(--s-3) 0";
  [25, 45, 90].forEach((m) => {
    const b = el("button", m === mins ? "on" : "", `${m} min`);
    b.onclick = () => { mins = m; [...seg.children].forEach((c) => c.classList.remove("on")); b.classList.add("on"); };
    seg.appendChild(b);
  });
  card.appendChild(seg);
  const go = el("button", "btn btn-warm btn-block", "Empezar bloque de foco");
  go.onclick = async () => { await ctx.act("startFocus", { minutes: mins, intention: intent.value.trim() }); ctx.toast("Bloque iniciado · presencia"); ctx.rerender(); };
  card.appendChild(go);
  host.appendChild(card);
  host.appendChild(statsCard(state));
}

function statsCard(state) {
  const card = el("div", "card");
  const row = el("div", "row");
  row.appendChild(miniMetric(state.focusStats.todayBlocks, "bloques hoy"));
  row.appendChild(miniMetric(state.focusStats.todayMinutes, "min enfocados"));
  card.appendChild(row);
  card.appendChild(el("div", "divider"));
  card.appendChild(el("div", "eyebrow", "Bloques · 7 días"));
  card.appendChild(focusMap(state));
  return card;
}

function miniMetric(v, label) {
  const s = el("div", "stack");
  const m = el("div", "metric"); const n = el("span", "n warm", "0"); m.appendChild(n); countUp(n, v);
  s.append(m, el("span", "label", label));
  return s;
}

function focusMap(state) {
  const days = getLast7Days(state);
  const max = Math.max(1, ...days.map((d) => d.focusBlocks));
  const today = localDate();
  const map = el("div", "map");
  days.forEach((d) => {
    const col = el("div", "col" + (d.date === today ? " today" : ""));
    const h = Math.round((d.focusBlocks / max) * 60);
    const bar = el("div", "bar f"); bar.style.height = (h || 2) + "px";
    if (!h) bar.style.background = "var(--border)";
    col.append(bar, el("div", "day", d.date.slice(8)));
    return map.appendChild(col);
  });
  return map;
}
