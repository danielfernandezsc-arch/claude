/* popup/shared.js — small DOM + UX helpers shared across popup tabs. */

import { faviconUrl } from "../utils/domains.js";

export const $ = (s, root = document) => root.querySelector(s);

export function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

/** Build a node tree from a small spec: el2('div','card',[child, child]). */
export function el2(tag, cls, children) {
  const n = el(tag, cls);
  (children || []).forEach((c) => c && n.appendChild(c));
  return n;
}

export function faviconImg(domain, size = 20) {
  const img = el("img");
  img.src = faviconUrl(domain, size * 2);
  img.width = size; img.height = size; img.alt = "";
  img.loading = "lazy";
  return img;
}

export function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = Math.max(0, sec % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** Animate a number counting up to its target (never a hard jump). */
export function countUp(node, to, ms = 700) {
  const from = 0, start = performance.now();
  const tick = (now) => {
    const t = Math.min(1, (now - start) / ms);
    const eased = 1 - Math.pow(1 - t, 3);
    node.textContent = String(Math.round(from + (to - from) * eased));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

let toastTimer = null;
export function toast(msg) {
  const t = $("#toast");
  t.textContent = msg; t.hidden = false;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => { t.hidden = true; }, 260);
  }, 1800);
}

export function openModal(cardNode) {
  const m = $("#modal");
  m.innerHTML = ""; m.appendChild(cardNode);
  m.classList.add("show");
  document.body.classList.add("modal-open");
}

export function closeModal() {
  const m = $("#modal");
  m.classList.remove("show"); m.innerHTML = "";
  document.body.classList.remove("modal-open");
}

/** A serene confirm modal: title + two actions. onYes runs on confirm. */
export function confirmModal(title, yesLabel, onYes, tone = "primary") {
  const card = el("div", "modal-card");
  card.appendChild(el("p", "modal-title", title));
  const actions = el("div", "modal-actions");
  const no = el("button", "btn btn-soft", "Cancelar");
  const yes = el("button", "btn btn-" + tone, yesLabel);
  no.onclick = closeModal;
  yes.onclick = () => { closeModal(); onYes(); };
  actions.append(no, yes);
  card.appendChild(actions);
  openModal(card);
}

/** Labelled toggle switch bound to a boolean; calls onChange(bool). */
export function toggle(checked, onChange) {
  const wrap = el("label", "toggle");
  const input = el("input"); input.type = "checkbox"; input.checked = !!checked;
  input.addEventListener("change", () => onChange(input.checked));
  wrap.append(input, el("span", "track"), el("span", "knob"));
  return wrap;
}

/** Number input clamped to [min,max]; calls onChange(n). */
export function numInput(value, min, max, onChange) {
  const i = el("input", "input num"); i.type = "number";
  i.min = String(min); i.max = String(max); i.value = String(value);
  i.addEventListener("change", () => {
    let v = Math.max(min, Math.min(max, Number(i.value) || min));
    i.value = String(v); onChange(v);
  });
  return i;
}
