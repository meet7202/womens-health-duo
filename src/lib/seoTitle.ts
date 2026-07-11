import { SITE_NAME } from "../config/site.defaults";

/** Bing Webmaster flags titles **greater than** 70 characters; stay strictly below. */
export const BING_TITLE_MAX_LEN = 69;

/** Comfortable SERP width target (see `site.defaults.ts`); well under `BING_TITLE_MAX_LEN`. */
export const DOCUMENT_TITLE_MAX_LEN = 60;

export const BRAND_TITLE_SUFFIX = ` | ${SITE_NAME}`;

/**
 * Build a document `<title>` from a primary segment plus brand suffix, capped at `maxLen`.
 * Must not use `@/` imports (used from Node build scripts).
 */
export function formatDocumentTitle(
  primary: string,
  maxLen: number = DOCUMENT_TITLE_MAX_LEN,
): string {
  const suffix = BRAND_TITLE_SUFFIX;
  const primaryTrimmed = primary.trim();
  const full = `${primaryTrimmed}${suffix}`;
  if (full.length <= maxLen) return full;

  const ellipsis = "…";
  const budget = maxLen - suffix.length - ellipsis.length;
  if (budget < 8) return `${primaryTrimmed.slice(0, maxLen - ellipsis.length)}${ellipsis}`;

  let truncated = primaryTrimmed.slice(0, budget).trimEnd();
  const lastSpace = truncated.lastIndexOf(" ");
  if (lastSpace > budget * 0.55) {
    truncated = truncated.slice(0, lastSpace);
  }
  return `${truncated}${ellipsis}${suffix}`;
}

/** Cap an already-formed title (re-applies brand suffix truncation when present). */
export function capDocumentTitle(
  fullTitle: string,
  maxLen: number = DOCUMENT_TITLE_MAX_LEN,
): string {
  if (fullTitle.length <= maxLen) return fullTitle;
  if (fullTitle.endsWith(BRAND_TITLE_SUFFIX)) {
    const primary = fullTitle.slice(0, -BRAND_TITLE_SUFFIX.length);
    return formatDocumentTitle(primary, maxLen);
  }
  return `${fullTitle.slice(0, maxLen - 1)}…`;
}
