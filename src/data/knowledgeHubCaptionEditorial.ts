/**
 * Locked caption holds / clarifications for Learn hub SEO copy (SEO-15).
 * Platform originals stay in youtube/instagram source files; imports must not overwrite
 * `displayCaption` entries here (see `scripts/lib/caption-editorial-locks.mjs`).
 *
 * ASRM-oriented distinction (internal): ovarian-reserve testing (AMH, AFC, etc.) is used to
 * estimate oocyte *quantity* / ovarian response potential — not oocyte *quality* as a
 * standalone claim. The held platform line “Assesses the quantity and quality of eggs”
 * conflates those concepts; restore only after Dr. Charmi clinician review.
 * @see https://www.asrm.org/ (practice guidance on ovarian reserve testing)
 */
import knowledgeHubCaptionEditorialJson from "./knowledgeHubCaptionEditorial.json";

export type CaptionEditorialHold = {
  kind: "youtube" | "instagram";
  /** When true, import/sync scripts must preserve locked corrections. */
  lockImports: boolean;
  note: string;
  /** Snapshot of the platform caption at hold time (transparency). */
  platformCaptionOriginal: string;
  /** Caption served on WHD for SEO / watch-page display. */
  displayCaption: string;
};

const HOLDS = knowledgeHubCaptionEditorialJson as Record<string, CaptionEditorialHold>;

/** Extra hub-id / lowercase aliases → canonical JSON keys. */
const HOLD_ALIASES: Record<string, string> = {
  "yt-duo-fertility-tests": "YE9qPLTptRw",
  ye9qpltptrw: "YE9qPLTptRw",
  "ig-c9ppwbmplho": "C9ppwbmPlHO",
  c9ppwbmplho: "C9ppwbmPlHO",
};

function resolveHoldKey(key: string): string | undefined {
  if (HOLDS[key]) return key;
  const aliased = HOLD_ALIASES[key] ?? HOLD_ALIASES[key.toLowerCase()];
  if (aliased && HOLDS[aliased]) return aliased;
  const lower = key.toLowerCase();
  for (const k of Object.keys(HOLDS)) {
    if (k.toLowerCase() === lower) return k;
  }
  return undefined;
}

/** YouTube video ids, Instagram shortcodes, or hub watch ids with an editorial hold. */
export function captionEditorialHoldForKey(
  key: string | undefined,
): CaptionEditorialHold | undefined {
  if (!key) return undefined;
  const resolved = resolveHoldKey(key);
  return resolved ? HOLDS[resolved] : undefined;
}

export function lockedCaptionEditorialKeys(): readonly string[] {
  return Object.keys(HOLDS).filter((k) => HOLDS[k]?.lockImports);
}
