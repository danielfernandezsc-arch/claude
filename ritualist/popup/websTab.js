/* popup/websTab.js — the "Webs" tab: anchor management. */

import { el, el2, faviconImg, toggle, toast } from "./shared.js";
import { normalizeDomain, isValidDomain } from "../utils/domains.js";

const newId = (d) => "a-" + d.replace(/\W+/g, "-") + "-" + Date.now().toString(36);

const PRESETS = {
  Trabajo: ["gmail.com", "calendar.google.com", "notion.so", "slack.com"],
  Redes: ["x.com", "instagram.com", "linkedin.com", "youtube.com"],
  Comunicación: ["gmail.com", "slack.com", "web.whatsapp.com"]
};

export function renderWebs(host, state, ctx) {
  host.innerHTML = "";
  host.appendChild(adder(state, ctx));
  host.appendChild(presetChips(state, ctx));
  if (!state.anchors.length) { host.appendChild(emptyState()); return; }
  state.anchors.forEach((a) => host.appendChild(anchorCard(a, state, ctx)));
}

function adder(state, ctx) {
  const card = el("div", "card");
  const row = el("div", "field-row");
  const input = el("input", "input"); input.placeholder = "añadir dominio (ej. gmail.com)";
  const btn = el("button", "btn btn-primary btn-mini", "Añadir");
  const commit = () => addDomain(input.value, state, ctx, input);
  btn.onclick = commit;
  input.addEventListener("keydown", (e) => { if (e.key === "Enter") commit(); });
  row.append(input, btn);
  card.appendChild(row);
  return card;
}

async function addDomain(raw, state, ctx, input) {
  const d = normalizeDomain(raw);
  if (!isValidDomain(d)) return toast("Dominio no válido");
  if (state.anchors.some((a) => a.domain === d)) return toast("Ya está en tu lista");
  const anchor = { id: newId(d), domain: d, ritualIds: [state.rituals[0]?.id], policy: "una-vez-al-dia", cooldownHours: 3, behaviorDuringFocus: "silenciar", triggersFocus: false, enabled: true };
  await ctx.save({ anchors: [...state.anchors, anchor] });
  if (input) input.value = "";
  toast("Web ancla añadida"); ctx.rerender();
}

function presetChips(state, ctx) {
  const wrap = el("div", "chips"); wrap.style.marginBottom = "var(--s-3)";
  Object.keys(PRESETS).forEach((name) => {
    const chip = el("button", "chip", name);
    chip.onclick = () => applyPreset(name, state, ctx);
    wrap.appendChild(chip);
  });
  return wrap;
}

async function applyPreset(name, state, ctx) {
  const existing = new Set(state.anchors.map((a) => a.domain));
  const added = PRESETS[name].filter((d) => !existing.has(d)).map((d) => ({
    id: newId(d), domain: d, ritualIds: [state.rituals[0]?.id], policy: "una-vez-al-dia",
    cooldownHours: 3, behaviorDuringFocus: "silenciar", triggersFocus: false, enabled: true
  }));
  if (!added.length) return toast("Ya tenías esas webs");
  await ctx.save({ anchors: [...state.anchors, ...added] });
  toast(`${added.length} webs añadidas`); ctx.rerender();
}

/* ------------------------------------------------------------- anchor card */

function anchorCard(a, state, ctx) {
  const card = el("div", "card");
  card.appendChild(anchorHeader(a, state, ctx));
  card.appendChild(el("div", "divider"));
  card.appendChild(selectRow("Ritual", ritualSelect(a, state, ctx)));
  card.appendChild(selectRow("Frecuencia", policySelect(a, state, ctx)));
  if (a.policy === "cada-n-horas") card.appendChild(selectRow("Cada (horas)", cooldownInput(a, ctx)));
  card.appendChild(selectRow("Durante foco", behaviorSelect(a, ctx)));
  card.appendChild(triggersRow(a, ctx));
  return card;
}

function anchorHeader(a, state, ctx) {
  const row = el("div", "row");
  const left = el2("div", "pend", [faviconImg(a.domain, 22), el("span", "grow", a.domain)]);
  left.style.gap = "var(--s-2)";
  row.appendChild(left);
  row.appendChild(toggle(a.enabled, (v) => { a.enabled = v; ctx.saveQuiet(); }));
  const del = el("button", "btn-icon", "×"); del.title = "Eliminar"; del.style.marginLeft = "var(--s-2)";
  del.onclick = async () => { await ctx.save({ anchors: state.anchors.filter((x) => x.id !== a.id) }); toast("Eliminada"); ctx.rerender(); };
  row.appendChild(del);
  return row;
}

function selectRow(label, control) {
  const row = el("div", "set-row");
  row.appendChild(el("span", "field-lbl", label));
  row.appendChild(control);
  return row;
}

function ritualSelect(a, state, ctx) {
  const sel = el("select", "input");
  state.rituals.forEach((r) => { const o = el("option", null, `${r.emoji} ${r.name}`); o.value = r.id; if (a.ritualIds?.[0] === r.id) o.selected = true; sel.appendChild(o); });
  sel.onchange = () => { a.ritualIds = [sel.value]; ctx.saveQuiet(); };
  return sel;
}

function policySelect(a, state, ctx) {
  const opts = [["una-vez-al-dia", "Una vez al día"], ["cada-visita", "Cada visita"], ["cada-n-horas", "Cada N horas"], ["solo-primera-del-dia", "Solo la primera"]];
  const sel = buildSelect(opts, a.policy);
  sel.onchange = () => { a.policy = sel.value; ctx.saveQuiet(); ctx.rerender(); };
  return sel;
}

function behaviorSelect(a, ctx) {
  const opts = [["silenciar", "Silenciar"], ["ritual-corto", "Ritual exprés"], ["ritual-normal", "Ritual normal"]];
  const sel = buildSelect(opts, a.behaviorDuringFocus);
  sel.onchange = () => { a.behaviorDuringFocus = sel.value; ctx.saveQuiet(); };
  return sel;
}

function buildSelect(opts, current) {
  const sel = el("select", "input");
  opts.forEach(([v, label]) => { const o = el("option", null, label); o.value = v; if (v === current) o.selected = true; sel.appendChild(o); });
  return sel;
}

function cooldownInput(a, ctx) {
  const i = el("input", "input num"); i.type = "number"; i.min = 1; i.max = 48; i.value = a.cooldownHours || 3;
  i.onchange = () => { a.cooldownHours = Math.max(1, Math.min(48, Number(i.value) || 3)); i.value = a.cooldownHours; ctx.saveQuiet(); };
  return i;
}

function triggersRow(a, ctx) {
  const row = el("div", "set-row");
  const lbl = el("div", "stack");
  lbl.appendChild(el("span", "field-lbl", "Inicia un bloque de foco"));
  if (a.triggersFocus) lbl.appendChild(el("span", "faint", "Esta web inicia un bloque de foco"));
  row.appendChild(lbl);
  row.appendChild(toggle(a.triggersFocus, (v) => { a.triggersFocus = v; ctx.saveQuiet(); ctx.rerender(); }));
  return row;
}

function emptyState() {
  const e = el("div", "empty");
  e.appendChild(el("span", "glyph", "❍"));
  e.appendChild(el("div", null, "Aún no hay altares. Añade una web de arriba y empieza a entrar con presencia."));
  return e;
}
