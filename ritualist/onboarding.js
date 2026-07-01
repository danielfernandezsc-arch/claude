/* onboarding.js — JOYA 3. A three-screen ceremony: breathe, choose, begin. */

import * as store from "./utils/storage.js";
import { configureSound, playBreath, playTick } from "./utils/sound.js";
import { faviconUrl } from "./utils/domains.js";
import { AFFIRMATIONS, pickRandom } from "./utils/messages.js";

const $ = (s) => document.querySelector(s);

const SUGGESTIONS = [
  { domain: "gmail.com", label: "Gmail" }, { domain: "linkedin.com", label: "LinkedIn" },
  { domain: "calendar.google.com", label: "Calendar" }, { domain: "x.com", label: "X" },
  { domain: "notion.so", label: "Notion" }, { domain: "github.com", label: "GitHub" },
  { domain: "youtube.com", label: "YouTube" }, { domain: "instagram.com", label: "Instagram" },
  { domain: "slack.com", label: "Slack" }
];

let settings = null;
const chosen = new Set(["gmail.com"]);

init();

async function init() {
  const s = await store.get(["settings"]);
  settings = s.settings || { soundEnabled: true, breathInhale: 4, breathHold: 4, breathExhale: 6 };
  configureSound(settings.soundEnabled);
  buildDots();
  buildGrid();
  $("#breatheBtn").addEventListener("click", runBreath);
  $("#skip1").addEventListener("click", () => goto(2));
  $("#toS3").addEventListener("click", () => { playTick(); goto(3); });
  $("#finish").addEventListener("click", finish);
  $("#welcome").textContent = pickRandom(AFFIRMATIONS);
}

function buildDots() {
  const d = $("#dots");
  for (let i = 0; i < 3; i++) { const s = document.createElement("div"); s.className = "dot" + (i === 0 ? " on" : ""); d.appendChild(s); }
}

function goto(n) {
  [1, 2, 3].forEach((i) => { $("#s" + i).hidden = i !== n; });
  document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("on", i === n - 1));
}

/* ----------------------------------------------------------- 1 · breath */

function runBreath() {
  $("#breatheBtn").hidden = true;
  const orb = $("#orb"), guide = $("#guide");
  const phases = [
    { p: "inhale", label: "Inhala", s: settings.breathInhale, scale: 1 },
    { p: "hold", label: "Sostén", s: settings.breathHold, scale: 1 },
    { p: "exhale", label: "Suelta", s: settings.breathExhale, scale: 0.55 }
  ].filter((x) => x.s > 0);
  let i = 0;
  const run = () => {
    if (i >= phases.length) return breathDone();
    const ph = phases[i];
    orb.style.transition = `transform ${ph.s}s var(--ease-breath)`;
    orb.style.transform = `scale(${ph.scale})`;
    guide.classList.remove("show"); void guide.offsetWidth;
    guide.textContent = ph.label; guide.classList.add("show");
    playBreath(ph.p, ph.s);
    setTimeout(() => { i++; run(); }, ph.s * 1000);
  };
  run();
}

function breathDone() {
  $("#guide").textContent = "Eso es todo. Así de simple.";
  $("#guide").classList.add("show");
  $("#skip1").hidden = false;
}

/* ---------------------------------------------------------- 2 · choose */

function buildGrid() {
  const grid = $("#anchorGrid");
  SUGGESTIONS.forEach(({ domain, label }) => {
    const t = document.createElement("button");
    t.className = "tile" + (chosen.has(domain) ? " on" : "");
    const img = document.createElement("img"); img.src = faviconUrl(domain, 64); img.alt = "";
    const span = document.createElement("span"); span.textContent = label;
    t.append(img, span);
    t.addEventListener("click", () => toggleTile(t, domain));
    grid.appendChild(t);
  });
  refreshS2();
}

function toggleTile(tile, domain) {
  if (chosen.has(domain)) chosen.delete(domain);
  else { if (chosen.size >= 3) return; chosen.add(domain); }
  tile.classList.toggle("on", chosen.has(domain));
  playTick();
  refreshS2();
}

function refreshS2() { $("#toS3").disabled = chosen.size < 1; }

/* ----------------------------------------------------------- 3 · begin */

async function finish() {
  playTick();
  const anchors = [...chosen].map((domain, i) => ({
    id: "a-" + domain.replace(/\W+/g, "-") + "-" + i, domain, ritualIds: ["r-default"],
    policy: "una-vez-al-dia", cooldownHours: 0, behaviorDuringFocus: "silenciar", triggersFocus: false, enabled: true
  }));
  await store.set({ anchors });
  try { await chrome.runtime.sendMessage({ type: "rulesChanged" }); } catch (e) { console.error("rulesChanged failed", e); }
  try { const tab = await chrome.tabs.getCurrent(); if (tab) chrome.tabs.remove(tab.id); } catch (e) { console.error("close tab failed", e); }
}
