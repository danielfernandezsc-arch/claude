/* popup/today.js — the "Hoy" tab: streak, day phrase, pending anchors, map. */

import { el, el2, faviconImg, countUp } from "./shared.js";
import { getLast7Days, localDate } from "../utils/streak.js";
import { policyAllows } from "../utils/anchors.js";
import { EMPTY_STATES, AFFIRMATIONS, pickRandom } from "../utils/messages.js";

export function renderToday(host, state) {
  host.innerHTML = "";
  host.appendChild(heroCard(state));
  host.appendChild(phraseCard(state));
  host.appendChild(pendingCard(state));
  host.appendChild(presenceCard(state));
}

function heroCard(state) {
  const card = el("div", "card card-hero");
  const grid = el("div", "row");
  grid.appendChild(metric("🔥", state.streak.current, "racha de días", "accent", `mejor: ${state.streak.best}`));
  grid.appendChild(metric("✦", state.presence.todayCount, "rituales hoy", "accent"));
  card.appendChild(grid);
  return card;
}

function metric(glyph, value, label, tone, hint) {
  const block = el("div", "stack");
  const top = el("div", "metric");
  top.appendChild(el("span", null, glyph));
  const n = el("span", `n ${tone}`, "0");
  top.appendChild(n);
  countUp(n, value);
  block.appendChild(top);
  block.appendChild(el("span", "label", label));
  if (hint) block.appendChild(el("span", "faint", hint));
  return block;
}

function phraseCard(state) {
  const today = localDate();
  const mine = state.intentions.filter((i) => i.date === today).slice(-1)[0];
  const card = el("div", "card");
  card.appendChild(el("div", "eyebrow", mine ? "Tu intención de hoy" : "Frase del día"));
  card.appendChild(el("p", "quote", mine ? `“${mine.text}”` : pickRandom(AFFIRMATIONS, today)));
  return card;
}

function pendingCard(state) {
  const card = el("div", "card");
  card.appendChild(el("div", "eyebrow", "Webs pendientes hoy"));
  const enabled = state.anchors.filter((a) => a.enabled);
  if (!enabled.length) {
    card.appendChild(el("p", "faint", pickRandom(EMPTY_STATES, "pend")));
    return card;
  }
  enabled.forEach((a) => {
    const pending = policyAllows(a, state.cooldowns);
    const row = el("div", "pend");
    row.appendChild(faviconImg(a.domain));
    row.appendChild(el("span", "grow", a.domain));
    const dot = el("span", "dot" + (pending ? "" : " done"));
    dot.title = pending ? "Te espera un ritual" : "Ya vivido hoy";
    row.appendChild(dot);
    card.appendChild(row);
  });
  return card;
}

function presenceCard(state) {
  const days = getLast7Days(state);
  const max = Math.max(1, ...days.map((d) => d.completed + d.focusBlocks));
  const card = el("div", "card");
  card.appendChild(el("div", "eyebrow", "Mapa de presencia · 7 días"));
  const map = el("div", "map");
  const today = localDate();
  days.forEach((d) => map.appendChild(dayCol(d, max, today)));
  card.appendChild(map);
  card.appendChild(legend());
  return card;
}

function dayCol(d, max, today) {
  const col = el("div", "col" + (d.date === today ? " today" : ""));
  const cap = 60;
  const rH = Math.round((d.completed / max) * cap);
  const fH = Math.round((d.focusBlocks / max) * cap);
  if (fH) { const b = el("div", "bar f"); b.style.height = fH + "px"; col.appendChild(b); }
  if (rH) { const b = el("div", "bar r"); b.style.height = rH + "px"; col.appendChild(b); }
  if (!fH && !rH) { const b = el("div", "bar"); b.style.height = "2px"; b.style.background = "var(--border)"; col.appendChild(b); }
  col.appendChild(el("div", "day", d.date.slice(8)));
  return col;
}

function legend() {
  return el2("div", "legend", [
    el2("span", null, [el("i", "r"), el("span", null, "rituales")]),
    el2("span", null, [el("i", "f"), el("span", null, "bloques")])
  ]);
}
