/* anchors.js — decide what an anchor visit should do (SERVICE WORKER ONLY).
   The front never re-evaluates policy/cooldown; it renders this decision. */

import { hostMatches } from "./domains.js";
import { localDate } from "./streak.js";

/** Most specific enabled anchor matching a hostname, or null. */
export function matchAnchor(anchors, host) {
  const hits = anchors.filter((a) => a.enabled && hostMatches(host, a.domain));
  hits.sort((a, b) => b.domain.length - a.domain.length);
  return hits[0] || null;
}

/** Whether the anchor's frequency policy permits firing now. */
export function policyAllows(anchor, cooldowns, now = new Date()) {
  const last = cooldowns[anchor.id] ? new Date(cooldowns[anchor.id]) : null;
  switch (anchor.policy) {
    case "cada-visita":
      // Fire on every visit, but keep a 60s guard so returning to the site
      // right after a ritual doesn't cause a redirect loop.
      return !last || now.getTime() - last.getTime() >= 60 * 1000;
    case "cada-n-horas": {
      if (!last) return true;
      const hrs = (anchor.cooldownHours || 0) * 3600 * 1000;
      return now.getTime() - last.getTime() >= hrs;
    }
    case "una-vez-al-dia":
    case "solo-primera-del-dia":
    default:
      return !last || localDate(last) !== localDate(now);
  }
}

/** First existing ritual id for an anchor, falling back to any ritual. */
export function resolveRitualId(anchor, rituals) {
  const ids = new Set(rituals.map((r) => r.id));
  const found = (anchor.ritualIds || []).find((id) => ids.has(id));
  return found || (rituals[0] && rituals[0].id) || null;
}

/**
 * Full decision for a visit.
 * Returns { action, anchor, ritualId } where action is one of:
 *   'focus'        — start a focus block (triggersFocus, idle)
 *   'ritual'       — normal ritual page
 *   'ritual-corto' — express 1-step ritual (during active focus)
 *   'silence'      — transparent pass (policy/cooldown or muted in focus)
 *   'none'         — no matching anchor
 */
export function evaluateVisit(store, host, now = new Date()) {
  const anchor = matchAnchor(store.anchors, host);
  if (!anchor) return { action: "none" };
  if (!policyAllows(anchor, store.cooldowns, now)) return { action: "silence", anchor };

  const fb = store.focusBlock;
  const inFocus = fb.state === "running";
  const inBreak = fb.state === "break";
  const ritualId = resolveRitualId(anchor, store.rituals);

  if (inFocus) {
    const b = anchor.behaviorDuringFocus;
    if (b === "silenciar") return { action: "silence", anchor };
    if (b === "ritual-corto") return { action: "ritual-corto", anchor, ritualId };
    return { action: "ritual", anchor, ritualId };
  }
  if (!inBreak && anchor.triggersFocus) return { action: "focus", anchor, ritualId };
  return { action: "ritual", anchor, ritualId };
}
