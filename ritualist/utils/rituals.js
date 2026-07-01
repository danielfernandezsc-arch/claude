/* rituals.js — ritual model helpers & the breathing phase engine.
   Shared by ritual.js (render) and background (validation). */

export const STEP_TYPES = {
  breath: { label: "Respiración guiada", emoji: "◉" },
  intention: { label: "Intención", emoji: "✎" },
  affirmation: { label: "Afirmación", emoji: "❝" },
  pause: { label: "Pausa cronometrada", emoji: "⏾" },
  checklist: { label: "Checklist", emoji: "☑" }
};

/** Find a ritual by id. */
export function getRitual(rituals, id) {
  return rituals.find((r) => r.id === id) || null;
}

/** A 1-step express version (first step) for 'ritual-corto' during focus. */
export function expressRitual(ritual) {
  if (!ritual) return null;
  return { ...ritual, name: ritual.name + " · exprés", steps: ritual.steps.slice(0, 1) };
}

/** New empty ritual with a fresh id (caller persists). */
export function makeRitual(id) {
  return { id, name: "Nuevo ritual", emoji: "✦", steps: [{ type: "breath", config: { cycles: 3 } }] };
}

/** New default config for a step type. */
export function defaultStepConfig(type) {
  switch (type) {
    case "breath": return { cycles: 3 };
    case "intention": return { prompt: "¿Cuál es la única cosa que importa ahora?" };
    case "affirmation": return {};
    case "pause": return { seconds: 20 };
    case "checklist": return { items: ["Micro-acción"] };
    default: return {};
  }
}

/**
 * Expand N breathing cycles into a flat phase timeline.
 * Each cycle = inhale, (hold?), exhale. Hold omitted when 0s.
 */
export function breathTimeline(settings, cycles) {
  const inhale = Math.max(1, settings.breathInhale || 4);
  const hold = Math.max(0, settings.breathHold || 0);
  const exhale = Math.max(1, settings.breathExhale || 6);
  const timeline = [];
  for (let c = 0; c < Math.max(1, cycles || 1); c++) {
    timeline.push({ phase: "inhale", label: "Inhala", seconds: inhale });
    if (hold > 0) timeline.push({ phase: "hold", label: "Sostén", seconds: hold });
    timeline.push({ phase: "exhale", label: "Suelta", seconds: exhale });
  }
  return timeline;
}

/** Total seconds a breath step will take. */
export function breathDuration(settings, cycles) {
  return breathTimeline(settings, cycles).reduce((s, p) => s + p.seconds, 0);
}

/** True when a ritual has at least one usable step. */
export function isPlayable(ritual) {
  return !!(ritual && Array.isArray(ritual.steps) && ritual.steps.length);
}
