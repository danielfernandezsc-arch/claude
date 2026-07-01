/* sound.js — all audio synthesized with Web Audio API. No files, no deps.
   Respects a module-level enabled flag; call configureSound(bool) first. */

let enabled = true;
let ctx = null;

/** Set from settings.soundEnabled before playing anything. */
export function configureSound(on) {
  enabled = !!on;
}

function ac() {
  if (!enabled) return null;
  try {
    if (!ctx || ctx.state === "closed") {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  } catch (e) {
    console.error("AudioContext unavailable", e);
    return null;
  }
}

/** Fade a gain node down and stop its sources, freeing nodes. */
function ramp(gain, from, peak, when, attack, release) {
  gain.gain.setValueAtTime(from, when);
  gain.gain.linearRampToValueAtTime(peak, when + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + attack + release);
}

/** Tibetan-bowl-like bell: two detuned partials with long decay. */
export function playBell() {
  const c = ac();
  if (!c) return;
  try {
    const now = c.currentTime;
    const partials = [
      { f: 432, g: 0.5, d: 3.6 },
      { f: 648, g: 0.28, d: 2.8 },
      { f: 864, g: 0.14, d: 2.0 }
    ];
    partials.forEach(({ f, g, d }) => {
      const osc = c.createOscillator();
      const env = c.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      env.connect(c.destination);
      osc.connect(env);
      ramp(env, 0.0001, g, now, 0.01, d);
      osc.start(now);
      osc.stop(now + d + 0.1);
      osc.onended = () => { osc.disconnect(); env.disconnect(); };
    });
  } catch (e) { console.error("playBell failed", e); }
}

/** Near-inaudible guide tone: rises on inhale, falls on exhale, still on hold. */
export function playBreath(phase, seconds) {
  const c = ac();
  if (!c) return;
  try {
    const now = c.currentTime;
    const dur = Math.max(0.4, seconds || 3);
    const osc = c.createOscillator();
    const env = c.createGain();
    osc.type = "sine";
    osc.connect(env);
    env.connect(c.destination);
    const base = 174;
    const top = 233;
    if (phase === "inhale") { osc.frequency.setValueAtTime(base, now); osc.frequency.linearRampToValueAtTime(top, now + dur); }
    else if (phase === "exhale") { osc.frequency.setValueAtTime(top, now); osc.frequency.linearRampToValueAtTime(base, now + dur); }
    else { osc.frequency.setValueAtTime(top, now); }
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.05, now + Math.min(0.6, dur / 2));
    env.gain.linearRampToValueAtTime(0.0001, now + dur);
    osc.start(now);
    osc.stop(now + dur + 0.05);
    osc.onended = () => { osc.disconnect(); env.disconnect(); };
  } catch (e) { console.error("playBreath failed", e); }
}

/** Subtle click when advancing a step. */
export function playTick() {
  const c = ac();
  if (!c) return;
  try {
    const now = c.currentTime;
    const osc = c.createOscillator();
    const env = c.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(660, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
    osc.connect(env);
    env.connect(c.destination);
    ramp(env, 0.0001, 0.12, now, 0.005, 0.09);
    osc.start(now);
    osc.stop(now + 0.12);
    osc.onended = () => { osc.disconnect(); env.disconnect(); };
  } catch (e) { console.error("playTick failed", e); }
}
