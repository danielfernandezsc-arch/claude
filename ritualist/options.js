/* options.js — full-page preferences; reuses the settings renderer. */

import * as store from "./utils/storage.js";
import { toast } from "./popup/shared.js";
import { renderSettings, applyTheme } from "./popup/settingsTab.js";

let currentState = null;

const ctx = {
  get state() { return currentState; },
  save: async (partial) => { await store.set(partial); await ctx.act("rulesChanged"); },
  saveQuiet: async () => { await store.set({ anchors: currentState.anchors, rituals: currentState.rituals, settings: currentState.settings }); await ctx.act("rulesChanged"); },
  act: async (type) => { try { return await chrome.runtime.sendMessage({ type }); } catch (e) { console.error(type + " failed", e); return null; } },
  toast,
  rerender: async () => { await load(); renderSettings(document.getElementById("settings"), currentState, ctx); }
};

init();

async function init() {
  await load();
  applyTheme(currentState.settings.theme);
  renderSettings(document.getElementById("settings"), currentState, ctx);
}

async function load() {
  const res = await ctx.act("getState");
  currentState = res && res.state ? res.state : await store.get(null);
}
