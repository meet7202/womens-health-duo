#!/usr/bin/env node
/**
 * SEO-40 — unit-style checks for change-aware IndexNow diffs (no network / no POST).
 */
import {
  diffManifests,
  formatDiffReport,
  urlsForChangedOnlySubmit,
} from "./lib/indexnow-change-manifest.mjs";

function entry(url, fingerprint, pathname = "/") {
  return {
    url,
    pathname,
    fingerprint,
    disposition: "page:indexable:/",
    title: "t",
    robots: "index, follow",
  };
}

function manifest(entries) {
  return {
    version: 1,
    siteUrl: "https://womenshealthduo.com",
    generatedAt: "2026-11-05T00:00:00.000Z",
    entryCount: Object.keys(entries).length,
    entries,
  };
}

let failed = 0;
function assert(cond, label) {
  if (!cond) {
    console.error(`FAIL ${label}`);
    failed += 1;
  } else {
    console.log(`OK ${label}`);
  }
}

const prev = manifest({
  "https://womenshealthduo.com/": entry("https://womenshealthduo.com/", "aaa"),
  "https://womenshealthduo.com/learn/": entry(
    "https://womenshealthduo.com/learn/",
    "bbb",
    "/learn",
  ),
  "https://womenshealthduo.com/old/": entry("https://womenshealthduo.com/old/", "ccc", "/old"),
});

const curr = manifest({
  "https://womenshealthduo.com/": entry("https://womenshealthduo.com/", "aaa"),
  "https://womenshealthduo.com/learn/": entry(
    "https://womenshealthduo.com/learn/",
    "BBB",
    "/learn",
  ),
  "https://womenshealthduo.com/faq/": entry("https://womenshealthduo.com/faq/", "ddd", "/faq"),
});

const diff = diffManifests(prev, curr);
assert(diff.added.length === 1 && diff.added[0].includes("/faq/"), "detects added");
assert(diff.updated.length === 1 && diff.updated[0].includes("/learn/"), "detects updated");
assert(diff.deleted.length === 1 && diff.deleted[0].includes("/old/"), "detects deleted");
assert(diff.unchanged.length === 1 && diff.unchanged[0].endsWith("/"), "detects unchanged");

const report = formatDiffReport(diff);
assert(report.includes("+1 added"), "report counts added");
assert(report.includes("~1 updated"), "report counts updated");
assert(report.includes("-1 deleted"), "report counts deleted");

const changed = urlsForChangedOnlySubmit(curr, prev);
assert(changed.length === 2, "changed-only = added+updated");
assert(
  urlsForChangedOnlySubmit(curr, null).length === 3,
  "no baseline → all current URLs (catch-up)",
);

if (failed) {
  console.error(`test-indexnow-change-manifest: ${failed} failed`);
  process.exit(1);
}
console.log("test-indexnow-change-manifest: all OK (no network)");
