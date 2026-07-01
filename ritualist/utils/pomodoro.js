/* pomodoro.js — focus-block state machine (pure transitions).
   The service worker owns the clock via chrome.alarms + phaseEndsISO;
   these functions only mutate the focusBlock / focusStats objects. */

import { applyRollover, localDate } from "./streak.js";

const MIN = 60 * 1000;

function inFutureISO(now, minutes) {
  return new Date(now.getTime() + minutes * MIN).toISOString();
}

/** Start a focus phase. Entry ritual is assumed already done by the caller. */
export function startBlock(store, minutes, intention, now = new Date()) {
  const fb = store.focusBlock;
  fb.state = "running";
  fb.phase = "focus";
  fb.blockStartISO = now.toISOString();
  fb.phaseEndsISO = inFutureISO(now, minutes);
  fb.phaseTotalSec = minutes * 60;
  fb.plannedMin = minutes;
  fb.intention = intention || "";
  fb.ritualEntryDone = true;
  fb.ritualExitDone = false;
  delete fb.pausedRemainingMs;
  return fb.phaseEndsISO;
}

/** Credit a completed focus phase to stats (respecting midnight rollover).
    Minutes accumulate live via the 1-min tick; here we only count blocks. */
export function creditCompletion(store, now = new Date()) {
  applyRollover(store, localDate(now));
  const fb = store.focusBlock, fs = store.focusStats;
  fs.todayBlocks += 1;
  fs.totalBlocks += 1;
  fb.completedCycles += 1;
  return store;
}

/** Move from a finished focus phase into the appropriate break. */
export function toBreak(store, now = new Date()) {
  const fb = store.focusBlock, s = store.settings;
  const isLong = fb.completedCycles > 0 && fb.completedCycles % s.blocksUntilLongBreak === 0;
  fb.phase = isLong ? "longBreak" : "shortBreak";
  fb.state = "break";
  const mins = isLong ? s.longBreakMin : s.shortBreakMin;
  fb.phaseEndsISO = inFutureISO(now, mins);
  fb.phaseTotalSec = mins * 60;
  fb.ritualExitDone = true;
  delete fb.pausedRemainingMs;
  return { phaseEndsISO: fb.phaseEndsISO, isLong, minutes: mins };
}

/** End a break: return to idle and offer the next block. */
export function endBreak(store) {
  const fb = store.focusBlock;
  fb.state = "idle";
  fb.phase = "focus";
  fb.phaseEndsISO = null;
  return store;
}

/** Pause a running phase, stashing remaining time. */
export function pause(store, now = new Date()) {
  const fb = store.focusBlock;
  if (fb.state !== "running") return store;
  fb.pausedRemainingMs = Math.max(0, new Date(fb.phaseEndsISO) - now);
  fb.state = "paused";
  return store;
}

/** Resume a paused phase, recomputing the end time from remaining. */
export function resume(store, now = new Date()) {
  const fb = store.focusBlock;
  if (fb.state !== "paused") return store;
  const rem = fb.pausedRemainingMs || 0;
  fb.phaseEndsISO = new Date(now.getTime() + rem).toISOString();
  fb.state = "running";
  delete fb.pausedRemainingMs;
  return fb.phaseEndsISO;
}

/** Abandon the block with no penalty (presence is celebrated, not punished). */
export function terminate(store) {
  store.focusBlock = { state: "idle", phase: "focus", blockStartISO: null, phaseEndsISO: null, intention: "", completedCycles: store.focusBlock.completedCycles, ritualEntryDone: false, ritualExitDone: false };
  return store;
}

/** Remaining ms for the live phase (front polls this each second). */
export function remainingMs(focusBlock, now = new Date()) {
  if (focusBlock.state === "paused") return focusBlock.pausedRemainingMs || 0;
  if (!focusBlock.phaseEndsISO) return 0;
  return Math.max(0, new Date(focusBlock.phaseEndsISO) - now);
}
