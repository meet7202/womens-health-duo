/**
 * SEO-40 — compare IndexNow content fingerprints (added / updated / deleted).
 * Never POSTs. Used by submit-indexnow dry-run / --changed-only.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

export const DIST_MANIFEST = join("dist", ".indexnow-content-manifest.json");
/** Baseline from last successful submit (or manual seed). Gitignored via `.cache/`. */
export const BASELINE_MANIFEST = join(".cache", "indexnow-content-manifest.prev.json");

/**
 * @typedef {{ version: number, siteUrl: string, generatedAt: string, entryCount: number, entries: Record<string, { url: string, pathname: string, fingerprint: string, disposition: string, title: string, robots: string }> }} IndexNowManifest
 */

/**
 * @param {string} path
 * @returns {IndexNowManifest | null}
 */
export function readManifest(path) {
  if (!existsSync(path)) return null;
  return JSON.parse(readFileSync(path, "utf8"));
}

/**
 * @param {IndexNowManifest | null} previous
 * @param {IndexNowManifest} current
 */
export function diffManifests(previous, current) {
  const prevEntries = previous?.entries ?? {};
  const currEntries = current.entries ?? {};
  const prevUrls = new Set(Object.keys(prevEntries));
  const currUrls = new Set(Object.keys(currEntries));

  const added = [];
  const updated = [];
  const deleted = [];
  const unchanged = [];

  for (const url of currUrls) {
    if (!prevUrls.has(url)) {
      added.push(url);
      continue;
    }
    if (prevEntries[url].fingerprint !== currEntries[url].fingerprint) {
      updated.push(url);
    } else {
      unchanged.push(url);
    }
  }
  for (const url of prevUrls) {
    if (!currUrls.has(url)) deleted.push(url);
  }

  added.sort();
  updated.sort();
  deleted.sort();
  unchanged.sort();

  return { added, updated, deleted, unchanged };
}

/**
 * @param {{ added: string[], updated: string[], deleted: string[], unchanged: string[] }} diff
 * @param {{ sample?: number }} [opts]
 */
export function formatDiffReport(diff, opts = {}) {
  const sample = opts.sample ?? 8;
  const lines = [
    `IndexNow change manifest: +${diff.added.length} added, ~${diff.updated.length} updated, -${diff.deleted.length} deleted, =${diff.unchanged.length} unchanged`,
  ];
  const show = (label, urls) => {
    if (!urls.length) return;
    lines.push(`  ${label}:`);
    for (const u of urls.slice(0, sample)) lines.push(`    ${u}`);
    if (urls.length > sample) lines.push(`    … +${urls.length - sample} more`);
  };
  show("added", diff.added);
  show("updated", diff.updated);
  show("deleted", diff.deleted);
  return lines.join("\n");
}

/** Persist current dist manifest as the new baseline (call only after a real submit). */
export function writeBaselineFromDist() {
  const current = readManifest(DIST_MANIFEST);
  if (!current) {
    throw new Error(`missing ${DIST_MANIFEST} — run npm run build first`);
  }
  mkdirSync(dirname(BASELINE_MANIFEST), { recursive: true });
  writeFileSync(BASELINE_MANIFEST, `${JSON.stringify(current, null, 2)}\n`, "utf8");
  return BASELINE_MANIFEST;
}

/**
 * URLs that should be submitted when --changed-only is set.
 * First run (no baseline) → all current URLs (safe catch-up).
 */
export function urlsForChangedOnlySubmit(current, previous) {
  if (!previous) {
    return Object.keys(current.entries).sort();
  }
  const diff = diffManifests(previous, current);
  return [...diff.added, ...diff.updated].sort();
}
