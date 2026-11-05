#!/usr/bin/env node
/**
 * Submit built sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver, etc.).
 *
 * Prerequisites:
 * - `npm run build` (reads dist/sitemap*.xml + dist/.indexnow-content-manifest.json)
 * - Key file deployed at https://<host>/{key}.txt (generated in dist/ at build from INDEXNOW_KEY)
 *
 * Usage:
 *   npm run submit:indexnow
 *   npm run submit:indexnow -- --feed=primary --dry-run
 *   npm run submit:indexnow -- --changed-only --dry-run
 *   npm run submit:indexnow -- --feed=all --batch-size=10000
 *
 * SEO-40: build writes a content fingerprint manifest. `--changed-only` submits
 * added/updated URLs vs `.cache/indexnow-content-manifest.prev.json` (created after
 * a successful non-dry-run submit, or seed manually). Dry-run never POSTs.
 */
import { getIndexNowKey } from "./lib/indexnow-key.mjs";
import { hostFromSiteUrl, loadIndexableUrls, readSitemapBuildMeta } from "./lib/sitemapUrls.mjs";
import {
  BASELINE_MANIFEST,
  DIST_MANIFEST,
  diffManifests,
  formatDiffReport,
  readManifest,
  urlsForChangedOnlySubmit,
  writeBaselineFromDist,
} from "./lib/indexnow-change-manifest.mjs";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const DEFAULT_BATCH_SIZE = 10_000;

function parseArgs(argv) {
  const opts = {
    feed: "all",
    dryRun: false,
    changedOnly: false,
    batchSize: DEFAULT_BATCH_SIZE,
  };

  for (const arg of argv) {
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg === "--changed-only") opts.changedOnly = true;
    else if (arg.startsWith("--feed=")) opts.feed = arg.slice("--feed=".length);
    else if (arg.startsWith("--batch-size=")) {
      opts.batchSize = Number.parseInt(arg.slice("--batch-size=".length), 10);
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      console.error(`submit-indexnow: unknown argument ${arg}`);
      printHelp();
      process.exit(1);
    }
  }

  if (!Number.isFinite(opts.batchSize) || opts.batchSize < 1 || opts.batchSize > 10_000) {
    console.error("submit-indexnow: --batch-size must be between 1 and 10000");
    process.exit(1);
  }

  return opts;
}

function printHelp() {
  console.log(`Usage: node scripts/submit-indexnow.mjs [options]

Options:
  --feed=primary|virtual|video|all   Sitemap feed(s) to submit (default: all)
  --batch-size=N                   URLs per IndexNow request (max 10000, default 10000)
  --changed-only                   Submit only added/updated URLs vs baseline manifest (SEO-40)
  --dry-run                        Print change report / counts without POSTing
  -h, --help                       Show this help

Change-aware flow (SEO-40):
  1. npm run build   → writes dist/.indexnow-content-manifest.json
  2. npm run submit:indexnow -- --changed-only --dry-run
  3. npm run submit:indexnow -- --changed-only
     (on success, updates ${BASELINE_MANIFEST})
`);
}

function chunk(array, size) {
  const batches = [];
  for (let i = 0; i < array.length; i += size) {
    batches.push(array.slice(i, i + size));
  }
  return batches;
}

async function submitBatch({ host, key, keyLocation, urlList, dryRun }) {
  const body = { host, key, keyLocation, urlList };

  if (dryRun) {
    return { ok: true, status: 0, dryRun: true };
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  return {
    ok: response.ok || response.status === 202,
    status: response.status,
    body: text.trim(),
  };
}

function resolveUrlList(opts) {
  const feedUrls = loadIndexableUrls(opts.feed);
  const feedSet = new Set(feedUrls);

  if (!opts.changedOnly) {
    return { urls: feedUrls, diff: null, baselineMissing: false };
  }

  const current = readManifest(DIST_MANIFEST);
  if (!current) {
    throw new Error(`missing ${DIST_MANIFEST} — run npm run build first`);
  }
  const previous = readManifest(BASELINE_MANIFEST);
  const diff = diffManifests(previous, current);
  const changed = urlsForChangedOnlySubmit(current, previous).filter((u) => feedSet.has(u));
  return { urls: changed, diff, baselineMissing: !previous };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const meta = readSitemapBuildMeta();
  const { urls, diff, baselineMissing } = resolveUrlList(opts);
  const host = hostFromSiteUrl(meta.siteUrl);
  const batches = chunk(urls, opts.batchSize);

  console.log(
    `submit-indexnow: ${urls.length} URL(s) from feed="${opts.feed}"${
      opts.changedOnly ? " (changed-only)" : ""
    } → ${host}`,
  );

  if (opts.changedOnly && diff) {
    if (baselineMissing) {
      console.log(
        `submit-indexnow: no baseline at ${BASELINE_MANIFEST} — treating all current fingerprint URLs as catch-up`,
      );
    }
    console.log(formatDiffReport(diff));
  }

  if (opts.dryRun) {
    console.log(`submit-indexnow: dry-run — would send ${batches.length} batch(es) (no POST)`);
    console.log(`  first: ${urls[0] ?? "(none)"}`);
    console.log(`  last:  ${urls[urls.length - 1] ?? "(none)"}`);
    return;
  }

  const key = getIndexNowKey();
  const keyLocation = `${meta.siteUrl}/${key}.txt`;
  console.log(`submit-indexnow: key ${key.slice(0, 8)}…`);

  let failures = 0;

  for (let i = 0; i < batches.length; i += 1) {
    const urlList = batches[i];
    const result = await submitBatch({
      host,
      key,
      keyLocation,
      urlList,
      dryRun: false,
    });

    if (result.ok) {
      console.log(
        `submit-indexnow: batch ${i + 1}/${batches.length} OK (${urlList.length} URLs, HTTP ${result.status || 202})`,
      );
    } else {
      failures += 1;
      console.error(
        `submit-indexnow: batch ${i + 1}/${batches.length} failed (HTTP ${result.status})`,
      );
      if (result.body) console.error(`  ${result.body}`);
    }
  }

  if (failures > 0) {
    console.error(`submit-indexnow: ${failures} batch(es) failed`);
    process.exit(1);
  }

  if (readManifest(DIST_MANIFEST)) {
    try {
      const baseline = writeBaselineFromDist();
      console.log(`submit-indexnow: updated baseline → ${baseline}`);
    } catch (err) {
      console.warn(`submit-indexnow: could not write baseline (${err.message})`);
    }
  }

  console.log("submit-indexnow: done");
}

main().catch((err) => {
  console.error(`submit-indexnow: ${err.message}`);
  process.exit(1);
});
