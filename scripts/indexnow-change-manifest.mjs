#!/usr/bin/env node
/**
 * SEO-40 — IndexNow change-aware manifest (dry-run by default; no live POST in tests).
 *
 * Prefers `dist/.indexnow-content-manifest.json` from `npm run build` (content + disposition
 * fingerprints). Falls back to a Vite SSR scan of sitemap paths when dist manifest is missing.
 *
 * Usage:
 *   npm run build
 *   npm run audit:indexnow-manifest
 *   npm run audit:indexnow-manifest -- --write
 *   npm run submit:indexnow -- --changed-only --dry-run
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  BASELINE_MANIFEST,
  DIST_MANIFEST,
  diffManifests,
  formatDiffReport,
  readManifest,
} from "./lib/indexnow-change-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
/** Legacy short fingerprint cache (still written with --write for compatibility). */
const legacyCachePath = path.join(root, ".cache/indexnow-manifest.json");

function parseArgs(argv) {
  const opts = { write: false, submit: false };
  for (const arg of argv) {
    if (arg === "--write") opts.write = true;
    else if (arg === "--submit") opts.submit = true;
    else if (arg === "--dry-run") {
      /* default */
    } else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/indexnow-change-manifest.mjs [--write] [--dry-run]
  --write    Persist baseline to ${BASELINE_MANIFEST} (and legacy .cache/indexnow-manifest.json)
  --dry-run  Default: print added/updated/deleted only (never POSTs)
  --submit   Refused here — use: npm run submit:indexnow -- --changed-only
`);
      process.exit(0);
    } else {
      console.error(`unknown argument ${arg}`);
      process.exit(1);
    }
  }
  return opts;
}

function main() {
  const opts = parseArgs(process.argv.slice(2));
  const current = readManifest(path.join(root, DIST_MANIFEST));
  if (!current) {
    console.error(
      `audit:indexnow-manifest: missing ${DIST_MANIFEST} — run npm run build first (SEO-40 fingerprints are written in closeBundle).`,
    );
    process.exit(1);
  }

  const previous = readManifest(path.join(root, BASELINE_MANIFEST));
  const diff = diffManifests(previous, current);

  console.log("IndexNow change manifest (SEO-40)");
  console.log(`  current: ${current.entryCount} URL(s) @ ${current.generatedAt}`);
  console.log(
    previous
      ? `  baseline: ${previous.entryCount} URL(s) @ ${previous.generatedAt}`
      : `  baseline: (none — ${BASELINE_MANIFEST})`,
  );
  console.log(formatDiffReport(diff));

  if (opts.write) {
    fs.mkdirSync(path.dirname(path.join(root, BASELINE_MANIFEST)), { recursive: true });
    fs.writeFileSync(
      path.join(root, BASELINE_MANIFEST),
      `${JSON.stringify(current, null, 2)}\n`,
      "utf8",
    );
    const legacy = {
      generatedAt: current.generatedAt,
      fingerprints: Object.fromEntries(
        Object.values(current.entries).map((e) => [e.pathname, e.fingerprint]),
      ),
    };
    fs.writeFileSync(legacyCachePath, `${JSON.stringify(legacy, null, 2)}\n`, "utf8");
    console.log(`  wrote ${BASELINE_MANIFEST}`);
    console.log(`  wrote ${path.relative(root, legacyCachePath)} (legacy path map)`);
  } else {
    console.log("  (pass --write to persist baseline fingerprints)");
  }

  if (opts.submit) {
    console.log("  --submit refused in audit script (no live IndexNow POST here).");
    console.log("  Review the dry-run, then:");
    console.log("    npm run submit:indexnow -- --changed-only --dry-run");
    console.log("    npm run submit:indexnow -- --changed-only");
  } else {
    console.log("  dry-run only (no IndexNow POST)");
  }
}

main();
