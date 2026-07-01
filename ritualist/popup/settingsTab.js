/* popup/settingsTab.js — the "Ajustes" tab. */

import { el, toggle, numInput, confirmModal, toast } from "./shared.js";
import { seedState } from "../utils/storage.js";
import * as store from "../utils/storage.js";

const VERSION = "1.0.0";

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === "light" ? "light" : "dark";
}

export function renderSettings(host, state, ctx) {
  host.innerHTML = "";
  host.appendChild(soundThemeGroup(state, ctx));
  host.appendChild(breathGroup(state, ctx));
  host.appendChild(pomodoroGroup(state, ctx));
  host.appendChild(focusRitualsGroup(state, ctx));
  host.appendChild(dataGroup(state, ctx));
  host.appendChild(dangerGroup(state, ctx));
  host.appendChild(footer());
}

function group(title) {
  const g = el("div", "settings-group card");
  g.appendChild(el("h3", null, title));
  return g;
}

function row(label, control) {
  const r = el("div", "set-row");
  r.appendChild(el("span", "field-lbl", label));
  r.appendChild(control);
  return r;
}

function soundThemeGroup(state, ctx) {
  const g = group("Sonido y tema");
  g.appendChild(row("Sonido", toggle(state.settings.soundEnabled, (v) => { state.settings.soundEnabled = v; ctx.saveQuiet(); })));
  g.appendChild(row("Tema claro", toggle(state.settings.theme === "light", (v) => {
    state.settings.theme = v ? "light" : "dark"; applyTheme(state.settings.theme); ctx.saveQuiet();
  })));
  return g;
}

function breathGroup(state, ctx) {
  const g = group("Respiración");
  const s = state.settings;
  g.appendChild(row("Inhalar (s)", numInput(s.breathInhale, 1, 12, (v) => { s.breathInhale = v; ctx.saveQuiet(); })));
  g.appendChild(row("Sostener (s)", numInput(s.breathHold, 0, 12, (v) => { s.breathHold = v; ctx.saveQuiet(); })));
  g.appendChild(row("Soltar (s)", numInput(s.breathExhale, 1, 12, (v) => { s.breathExhale = v; ctx.saveQuiet(); })));
  return g;
}

function pomodoroGroup(state, ctx) {
  const g = group("Bloques de foco");
  const s = state.settings;
  g.appendChild(row("Foco (min)", numInput(s.focusMin, 5, 180, (v) => { s.focusMin = v; ctx.saveQuiet(); })));
  g.appendChild(row("Descanso corto", numInput(s.shortBreakMin, 1, 60, (v) => { s.shortBreakMin = v; ctx.saveQuiet(); })));
  g.appendChild(row("Descanso largo", numInput(s.longBreakMin, 1, 60, (v) => { s.longBreakMin = v; ctx.saveQuiet(); })));
  g.appendChild(row("Bloques → largo", numInput(s.blocksUntilLongBreak, 2, 8, (v) => { s.blocksUntilLongBreak = v; ctx.saveQuiet(); })));
  return g;
}

function focusRitualsGroup(state, ctx) {
  const g = group("Rituales de foco");
  g.appendChild(row("Entrada", ritualSelect(state, "ritualEntryId", ctx)));
  g.appendChild(row("Cierre", ritualSelect(state, "ritualExitId", ctx)));
  return g;
}

function ritualSelect(state, key, ctx) {
  const sel = el("select", "input");
  state.rituals.forEach((r) => { const o = el("option", null, `${r.emoji} ${r.name}`); o.value = r.id; if (state.settings[key] === r.id) o.selected = true; sel.appendChild(o); });
  sel.onchange = () => { state.settings[key] = sel.value; ctx.saveQuiet(); };
  return sel;
}

function dataGroup(state, ctx) {
  const g = group("Tus datos");
  const rowBox = el("div", "row"); rowBox.style.gap = "var(--s-2)";
  const exp = el("button", "btn btn-soft btn-mini btn-block", "Exportar JSON");
  exp.onclick = () => exportJSON(state);
  const imp = el("button", "btn btn-soft btn-mini btn-block", "Importar JSON");
  imp.onclick = () => importJSON(ctx);
  rowBox.append(exp, imp);
  g.appendChild(rowBox);
  return g;
}

function exportJSON(state) {
  try {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const a = el("a"); a.href = URL.createObjectURL(blob);
    a.download = "ritualist-backup.json"; a.click();
    URL.revokeObjectURL(a.href); toast("Datos exportados");
  } catch (e) { console.error("export failed", e); toast("No se pudo exportar"); }
}

function importJSON(ctx) {
  const input = el("input"); input.type = "file"; input.accept = "application/json";
  input.onchange = async () => {
    try {
      const text = await input.files[0].text();
      const data = JSON.parse(text);
      if (!data || typeof data.schemaVersion !== "number") return toast("Archivo no válido");
      await ctx.save(data); toast("Datos importados"); ctx.rerender();
    } catch (e) { console.error("import failed", e); toast("No se pudo importar"); }
  };
  input.click();
}

function dangerGroup(state, ctx) {
  const g = group("Zona delicada");
  const resetStreak = el("button", "btn btn-soft btn-mini btn-block", "Resetear racha");
  resetStreak.style.marginBottom = "var(--s-2)";
  resetStreak.onclick = () => confirmModal("¿Resetear tu racha a cero?", "Resetear", async () => {
    await ctx.save({ streak: { current: 0, best: state.streak.best, lastUpdateDate: null, completedToday: false, skippedToday: false } });
    toast("Racha reiniciada"); ctx.rerender();
  }, "danger");
  const resetAll = el("button", "btn btn-danger btn-mini btn-block", "Restablecer todo");
  resetAll.onclick = () => confirmModal("Esto borra rituales, webs y progreso. ¿Seguro?", "Restablecer", async () => {
    await store.set(seedState()); await ctx.act("rulesChanged"); toast("Todo restablecido"); ctx.rerender();
  }, "danger");
  g.append(resetStreak, resetAll);
  return g;
}

function footer() {
  const f = el("div", "foot");
  f.appendChild(el("div", null, `Ritualist v${VERSION}`));
  const a = el("a"); a.href = "https://github.com/danielfernandezsc-arch/claude/issues"; a.target = "_blank"; a.textContent = "Enviar feedback";
  f.appendChild(a);
  return f;
}
