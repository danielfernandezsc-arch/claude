/* streak.js — local-date rollover, streak logic (presence, not punishment),
   and the 7-day presence map. Pure functions over the store object. */

/** Local (not UTC) YYYY-MM-DD so midnight matches the user's perception. */
export function localDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function shiftDate(dateStr, deltaDays) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d + deltaDays);
  return localDate(dt);
}

/**
 * Handle midnight rollover. Mutates and returns { store, changed }.
 * Closes the previous day into presence.history and resets daily flags.
 */
export function applyRollover(store, today = localDate()) {
  let changed = false;
  const p = store.presence, s = store.streak, f = store.focusStats;

  if (p.todayDate && p.todayDate !== today) {
    p.history.push({ date: p.todayDate, completed: p.todayCount, skipped: s.skippedToday ? 1 : 0, focusBlocks: f.todayDate === p.todayDate ? f.todayBlocks : 0 });
    p.history = p.history.slice(-30);
    p.todayCount = 0;
    s.completedToday = false;
    s.skippedToday = false;
    changed = true;
  }
  if (p.todayDate !== today) { p.todayDate = today; changed = true; }
  if (f.todayDate !== today) { f.todayDate = today; f.todayBlocks = 0; f.todayMinutes = 0; changed = true; }
  return { store, changed };
}

/** Recompute streak from today's flags. Advances once per clean day; skip freezes but never resets. */
export function reconcileStreak(store, today = localDate()) {
  const s = store.streak;
  const clean = s.completedToday && !s.skippedToday;
  const advancedToday = s.lastUpdateDate === today;
  if (clean && !advancedToday) {
    s.current += 1;
    s.lastUpdateDate = today;
    if (s.current > s.best) s.best = s.current;
  } else if (!clean && advancedToday) {
    s.current = Math.max(0, s.current - 1);
    s.lastUpdateDate = null;
  }
  return store;
}

/** Record a completed ritual for today. */
export function recordCompletion(store, today = localDate()) {
  applyRollover(store, today);
  store.presence.todayCount += 1;
  store.stats.totalCompleted += 1;
  store.streak.completedToday = true;
  reconcileStreak(store, today);
  return store;
}

/** Record a skip for today (informative friction, not punitive). */
export function recordSkip(store, today = localDate()) {
  applyRollover(store, today);
  store.stats.totalSkipped += 1;
  store.streak.skippedToday = true;
  reconcileStreak(store, today);
  return store;
}

/** Whether this day's streak just crossed a multiple of 7 (milestone toast). */
export function isMilestone(streakCurrent) {
  return streakCurrent > 0 && streakCurrent % 7 === 0;
}

/** Last 7 calendar days with live today overlaid. Newest last. */
export function getLast7Days(store, today = localDate()) {
  const byDate = {};
  for (const h of store.presence.history) byDate[h.date] = h;
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const date = shiftDate(today, -i);
    if (date === today) {
      out.push({ date, completed: store.presence.todayDate === today ? store.presence.todayCount : 0, skipped: store.streak.skippedToday ? 1 : 0, focusBlocks: store.focusStats.todayDate === today ? store.focusStats.todayBlocks : 0 });
    } else {
      const h = byDate[date];
      out.push({ date, completed: h ? h.completed : 0, skipped: h ? h.skipped : 0, focusBlocks: h ? h.focusBlocks : 0 });
    }
  }
  return out;
}
