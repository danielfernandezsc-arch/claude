/* popup/ritualsTab.js — ritual library: create, edit, duplicate, delete,
   with a step editor that reorders by drag. */

import { el, openModal, closeModal, confirmModal, toast } from "./shared.js";
import { STEP_TYPES, defaultStepConfig, makeRitual } from "../utils/rituals.js";

const newId = () => "r-" + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36);
const clone = (o) => JSON.parse(JSON.stringify(o));

export function renderRituals(host, state, ctx) {
  host.innerHTML = "";
  const add = el("button", "btn btn-primary btn-block", "＋ Nuevo ritual");
  add.style.marginBottom = "var(--s-3)";
  add.onclick = () => openEditor(makeRitual(newId()), state, ctx, true);
  host.appendChild(add);
  state.rituals.forEach((r) => host.appendChild(ritualRow(r, state, ctx)));
}

function ritualRow(r, state, ctx) {
  const item = el("div", "list-item");
  item.appendChild(el("span", "emoji", r.emoji || "✦"));
  const g = el("div", "grow stack");
  g.appendChild(el("div", "name", r.name));
  g.appendChild(el("div", "sub", r.steps.map((s) => STEP_TYPES[s.type]?.label || s.type).join(" · ")));
  item.appendChild(g);
  item.appendChild(iconBtn("✎", "Editar", () => openEditor(clone(r), state, ctx, false)));
  item.appendChild(iconBtn("⧉", "Duplicar", () => duplicate(r, state, ctx)));
  item.appendChild(iconBtn("×", "Eliminar", () => askDelete(r, state, ctx)));
  return item;
}

function iconBtn(glyph, title, onClick) {
  const b = el("button", "btn-icon", glyph); b.title = title; b.onclick = onClick;
  return b;
}

async function duplicate(r, state, ctx) {
  const copy = { ...clone(r), id: newId(), name: r.name + " (copia)" };
  await ctx.save({ rituals: [...state.rituals, copy] });
  toast("Ritual duplicado"); ctx.rerender();
}

function askDelete(r, state, ctx) {
  if (state.rituals.length <= 1) return toast("Deja al menos un ritual");
  confirmModal(`¿Eliminar “${r.name}”?`, "Eliminar", async () => {
    await ctx.save({ rituals: state.rituals.filter((x) => x.id !== r.id) });
    toast("Ritual eliminado"); ctx.rerender();
  }, "danger");
}

/* --------------------------------------------------------------- editor */

function openEditor(draft, state, ctx, isNew) {
  const card = el("div", "modal-card");
  card.appendChild(el("p", "modal-title", isNew ? "Nuevo ritual" : "Editar ritual"));
  card.appendChild(headerFields(draft));
  const stepsBox = el("div"); stepsBox.style.marginTop = "var(--s-3)";
  renderSteps(stepsBox, draft);
  card.appendChild(stepsBox);
  card.appendChild(addStepControl(draft, stepsBox));
  card.appendChild(editorActions(draft, state, ctx, isNew));
  openModal(card);
}

function headerFields(draft) {
  const row = el("div", "field-row");
  const emoji = el("input", "input"); emoji.style.width = "48px"; emoji.value = draft.emoji || "✦"; emoji.maxLength = 2;
  emoji.oninput = () => { draft.emoji = emoji.value; };
  const name = el("input", "input"); name.value = draft.name; name.placeholder = "Nombre del ritual";
  name.oninput = () => { draft.name = name.value; };
  row.append(emoji, name);
  return row;
}

function renderSteps(box, draft) {
  box.innerHTML = "";
  draft.steps.forEach((step, i) => box.appendChild(stepChip(step, i, draft, box)));
}

function stepChip(step, i, draft, box) {
  const chip = el("div", "step-chip"); chip.draggable = true; chip.dataset.i = String(i);
  chip.appendChild(el("span", "drag", "⋮⋮"));
  const g = el("div", "grow stack");
  g.appendChild(el("div", "faint", STEP_TYPES[step.type]?.label || step.type));
  g.appendChild(configControl(step));
  chip.appendChild(g);
  chip.appendChild(iconBtn("×", "Quitar paso", () => {
    if (draft.steps.length <= 1) return toast("Un ritual necesita un paso");
    draft.steps.splice(i, 1); renderSteps(box, draft);
  }));
  wireDrag(chip, draft, box);
  return chip;
}

function configControl(step) {
  const cfg = step.config || (step.config = defaultStepConfig(step.type));
  if (step.type === "breath") return numberCfg(cfg, "cycles", 1, 10, "ciclos");
  if (step.type === "pause") return numberCfg(cfg, "seconds", 5, 300, "segundos");
  if (step.type === "intention") return textCfg(cfg, "prompt", "Pregunta…");
  if (step.type === "checklist") return listCfg(cfg);
  return el("div", "faint", "Frase de la biblioteca curada");
}

function numberCfg(cfg, key, min, max, unit) {
  const row = el("div", "field-row");
  const i = el("input", "input num"); i.type = "number"; i.min = min; i.max = max; i.value = cfg[key] ?? min;
  i.onchange = () => { cfg[key] = Math.max(min, Math.min(max, Number(i.value) || min)); i.value = cfg[key]; };
  row.append(i, el("span", "faint", unit));
  return row;
}

function textCfg(cfg, key, ph) {
  const i = el("input", "input"); i.value = cfg[key] || ""; i.placeholder = ph;
  i.oninput = () => { cfg[key] = i.value; };
  return i;
}

function listCfg(cfg) {
  const t = el("textarea", "input"); t.rows = 2;
  t.value = (cfg.items || []).join("\n"); t.placeholder = "Una acción por línea";
  t.oninput = () => { cfg.items = t.value.split("\n").map((x) => x.trim()).filter(Boolean).slice(0, 4); };
  return t;
}

function addStepControl(draft, box) {
  const row = el("div", "field-row"); row.style.marginTop = "var(--s-2)";
  const sel = el("select", "input");
  Object.entries(STEP_TYPES).forEach(([k, v]) => { const o = el("option", null, v.label); o.value = k; sel.appendChild(o); });
  const add = el("button", "btn btn-soft btn-mini", "＋ Paso");
  add.onclick = () => {
    if (draft.steps.length >= 5) return toast("Máximo 5 pasos");
    draft.steps.push({ type: sel.value, config: defaultStepConfig(sel.value) });
    renderSteps(box, draft);
  };
  row.append(sel, add);
  return row;
}

function editorActions(draft, state, ctx, isNew) {
  const box = el("div", "modal-actions");
  const cancel = el("button", "btn btn-soft", "Cancelar"); cancel.onclick = closeModal;
  const save = el("button", "btn btn-primary", "Guardar");
  save.onclick = async () => {
    draft.name = (draft.name || "").trim() || "Ritual sin nombre";
    const rituals = isNew ? [...state.rituals, draft] : state.rituals.map((r) => r.id === draft.id ? draft : r);
    await ctx.save({ rituals });
    closeModal(); toast("Ritual guardado"); ctx.rerender();
  };
  box.append(cancel, save);
  return box;
}

/* --------------------------------------------------------------- drag */

function wireDrag(chip, draft, box) {
  chip.addEventListener("dragstart", () => chip.classList.add("dragging"));
  chip.addEventListener("dragend", () => chip.classList.remove("dragging"));
  chip.addEventListener("dragover", (e) => { e.preventDefault(); chip.classList.add("over"); });
  chip.addEventListener("dragleave", () => chip.classList.remove("over"));
  chip.addEventListener("drop", (e) => {
    e.preventDefault(); chip.classList.remove("over");
    const from = Number(box.querySelector(".dragging")?.dataset.i);
    const to = Number(chip.dataset.i);
    if (Number.isNaN(from) || from === to) return;
    const [moved] = draft.steps.splice(from, 1);
    draft.steps.splice(to, 0, moved);
    renderSteps(box, draft);
  });
}
