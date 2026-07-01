/* domains.js — normalization + validation for anchor domains. */

const DOMAIN_RE = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;

/**
 * Normalize free-form user input into a bare registrable-ish domain:
 * strips protocol, path, query, leading www., lowercases, trims.
 * Returns "" if nothing usable remains.
 */
export function normalizeDomain(raw) {
  if (!raw) return "";
  let d = String(raw).trim().toLowerCase();
  d = d.replace(/^[a-z]+:\/\//, "");   // protocol
  d = d.replace(/^www\./, "");          // leading www.
  d = d.split(/[/?#]/)[0];              // path / query / hash
  d = d.split(":")[0];                  // port
  return d;
}

/** True when the string is a syntactically valid domain. */
export function isValidDomain(d) {
  return DOMAIN_RE.test(d) && d.length <= 253;
}

/** Escape a domain for safe inclusion inside a RegExp source string. */
export function escapeForRegex(d) {
  return d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * declarativeNetRequest regexFilter matching root + any subdomain of
 * `domain` over http/https only (never chrome-extension://), capturing
 * the full URL so \0 in the substitution keeps the original path.
 */
export function anchorRegexFilter(domain) {
  return `^https?://(?:[^/]*\\.)?${escapeForRegex(domain)}(?:[/?#:].*)?$`;
}

/** URL to Google's favicon service for a domain (real favicon in UI). */
export function faviconUrl(domain, size = 64) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`;
}

/** True if a hostname belongs to (is or is a subdomain of) domain. */
export function hostMatches(host, domain) {
  const h = normalizeDomain(host);
  return h === domain || h.endsWith("." + domain);
}
