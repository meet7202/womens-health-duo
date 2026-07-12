#!/usr/bin/env node
/**
 * Submit built sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver, etc.).
 *
 * Prerequisites:
 * - `npm run build` (reads dist/sitemap*.xml)
 * - Key file deployed at https://<host>/{key}.txt (generated in dist/ at build from INDEXNOW_KEY)
 *
 * Usage:
 *   npm run submit:indexnow
 *   npm run submit:indexnow -- --feed=primary --dry-run
 *   npm run submit:indexnow -- --feed=all --batch-size=10000
 */
import { getIndexNowKey } from "./lib/indexnow-key.mjs";
import { hostFromSiteUrl, loadIndexableUrls, readSitemapBuildMeta } from "./lib/sitemapUrls.mjs";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";
const DEFAULT_BATCH_SIZE = 10_000;

function parseArgs(argv) {
  const opts = {
    feed: "all",
    dryRun: false,
    batchSize: DEFAULT_BATCH_SIZE,
  };

  for (const arg of argv) {
    if (arg === "--dry-run") opts.dryRun = true;
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
  --dry-run                        Print counts and sample URLs without POSTing
  -h, --help                       Show this help
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

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const meta = readSitemapBuildMeta();
  const urls = loadIndexableUrls(opts.feed);
  const host = hostFromSiteUrl(meta.siteUrl);
  const key = getIndexNowKey();
  const keyLocation = `${meta.siteUrl}/${key}.txt`;
  const batches = chunk(urls, opts.batchSize);

  console.log(
    `submit-indexnow: ${urls.length} URL(s) from feed="${opts.feed}" → ${host} (key ${key.slice(0, 8)}…)`,
  );

  if (opts.dryRun) {
    console.log(`submit-indexnow: dry-run — would send ${batches.length} batch(es)`);
    console.log(`  first: ${urls[0] ?? "(none)"}`);
    console.log(`  last:  ${urls[urls.length - 1] ?? "(none)"}`);
    return;
  }

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

  console.log("submit-indexnow: done");
}

main().catch((err) => {
  console.error(`submit-indexnow: ${err.message}`);
  process.exit(1);
});
