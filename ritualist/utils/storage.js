/* storage.js — chrome.storage.local wrapper + versioned migrations. */

export const SCHEMA_VERSION = 1;

/** Full v1 seed state. The migration to v1 writes exactly this. */
export function seedState() {
  return {
    schemaVersion: 1,
    anchors: [
      { id: "a-gmail", domain: "gmail.com", ritualIds: ["r-default"], policy: "una-vez-al-dia", cooldownHours: 0, behaviorDuringFocus: "silenciar", triggersFocus: false, enabled: true },
      { id: "a-linkedin", domain: "linkedin.com", ritualIds: ["r-default"], policy: "una-vez-al-dia", cooldownHours: 0, behaviorDuringFocus: "silenciar", triggersFocus: false, enabled: true },
      { id: "a-x", domain: "x.com", ritualIds: ["r-pausa"], policy: "cada-n-horas", cooldownHours: 3, behaviorDuringFocus: "silenciar", triggersFocus: false, enabled: true }
    ],
    rituals: [
      { id: "r-default", name: "Entrada consciente", emoji: "✦", steps: [
        { type: "breath", config: { cycles: 3 } },
        { type: "intention", config: { prompt: "¿Cuál es la única cosa que importa ahora?" } }
      ]},
      { id: "r-pausa", name: "Pausa breve", emoji: "❍", steps: [
        { type: "pause", config: { seconds: 20 } },
        { type: "affirmation", config: {} }
      ]},
      { id: "r-cierre", name: "Cierre de bloque", emoji: "◐", steps: [
        { type: "pause", config: { seconds: 20 } },
        { type: "checklist", config: { items: ["¿Avancé lo que dije?"] } }
      ]}
    ],
    streak: { current: 0, best: 0, lastUpdateDate: null, completedToday: false, skippedToday: false },
    presence: { todayCount: 0, todayDate: null, history: [] },
    intentions: [],
    stats: { totalCompleted: 0, totalSkipped: 0, totalTriggers: 0 },
    cooldowns: {},
    focusBlock: { state: "idle", phase: "focus", blockStartISO: null, phaseEndsISO: null, intention: "", completedCycles: 0, ritualEntryDone: false, ritualExitDone: false },
    focusStats: { todayBlocks: 0, todayMinutes: 0, todayDate: null, totalBlocks: 0, totalMinutes: 0 },
    settings: { soundEnabled: true, theme: "dark", breathInhale: 4, breathHold: 4, breathExhale: 6, focusMin: 25, shortBreakMin: 5, longBreakMin: 15, blocksUntilLongBreak: 4, ritualEntryId: "r-default", ritualExitId: "r-cierre" }
  };
}

/** Read one or more keys. Pass null for the full store. */
export async function get(keys) {
  try {
    return await chrome.storage.local.get(keys);
  } catch (e) {
    console.error("storage.get failed", e);
    return {};
  }
}

/** Merge-write a partial object into the store. */
export async function set(partial) {
  try {
    await chrome.storage.local.set(partial);
  } catch (e) {
    console.error("storage.set failed", e);
  }
}

/** Read a single key with a fallback if absent. */
export async function getKey(key, fallback = null) {
  const out = await get(key);
  return out[key] === undefined ? fallback : out[key];
}

/**
 * Ensure the store is migrated to the current schema.
 * Idempotent: safe to call on every service-worker start.
 */
export async function ensureMigrated() {
  const { schemaVersion } = await get("schemaVersion");
  if (schemaVersion === SCHEMA_VERSION) return false;
  if (schemaVersion === undefined) {
    await set(seedState());
    return true;
  }
  // Future migrations chain here (v1 -> v2 -> ...). None yet.
  await set({ schemaVersion: SCHEMA_VERSION });
  return true;
}

/** Subscribe to changes for a set of keys; returns an unsubscribe fn. */
export function onChange(keys, handler) {
  const listener = (changes, area) => {
    if (area !== "local") return;
    if (keys.some((k) => k in changes)) handler(changes);
  };
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}
