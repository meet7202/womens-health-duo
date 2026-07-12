#!/usr/bin/env node
/**
 * Submit built sitemap URLs to Google Indexing API (urlNotifications.publish).
 *
 * Prerequisites:
 * - `npm run build`
 * - GCP service account with Indexing API enabled
 * - Service account added as Owner in Google Search Console for the property
 *
 * Credentials (one of):
 * - GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON — inline JSON (CI / .env)
 * - GOOGLE_APPLICATION_CREDENTIALS — path to service account JSON file
 *
 * Usage:
 *   npm run submit:google-indexing
 *   npm run submit:google-indexing -- --feed=primary --limit=50 --dry-run
 *
 * Note: default quota is ~200 publish requests/day. Use --feed=primary for high-value
 * pages first; re-run daily with --offset to walk long-tail virtual URLs.
 */
import { readFileSync, existsSync } from "node:fs";
import { GoogleAuth } from "google-auth-library";
import { loadEnvFile } from "./lib/loadEnv.mjs";
import { loadIndexableUrls, readSitemapBuildMeta } from "./lib/sitemapUrls.mjs";

loadEnvFile();

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

function parseArgs(argv) {
  const opts = {
    feed: "primary",
    dryRun: false,
    limit: 200,
    offset: 0,
    delayMs: 500,
    type: "URL_UPDATED",
  };

  for (const arg of argv) {
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg.startsWith("--feed=")) opts.feed = arg.slice("--feed=".length);
    else if (arg.startsWith("--limit=")) {
      opts.limit = Number.parseInt(arg.slice("--limit=".length), 10);
    } else if (arg.startsWith("--offset=")) {
      opts.offset = Number.parseInt(arg.slice("--offset=".length), 10);
    } else if (arg.startsWith("--delay-ms=")) {
      opts.delayMs = Number.parseInt(arg.slice("--delay-ms=".length), 10);
    } else if (arg.startsWith("--type=")) {
      opts.type = arg.slice("--type=".length);
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      console.error(`submit-google-indexing: unknown argument ${arg}`);
      printHelp();
      process.exit(1);
    }
  }

  if (!Number.isFinite(opts.limit) || opts.limit < 1) {
    console.error("submit-google-indexing: --limit must be >= 1");
    process.exit(1);
  }
  if (!Number.isFinite(opts.offset) || opts.offset < 0) {
    console.error("submit-google-indexing: --offset must be >= 0");
    process.exit(1);
  }
  if (!["URL_UPDATED", "URL_DELETED"].includes(opts.type)) {
    console.error('submit-google-indexing: --type must be "URL_UPDATED" or "URL_DELETED"');
    process.exit(1);
  }

  return opts;
}

function printHelp() {
  console.log(`Usage: node scripts/submit-google-indexing.mjs [options]

Options:
  --feed=primary|virtual|video|all   Sitemap feed(s) (default: primary — core + learn + guides)
  --limit=N                          Max URLs to publish this run (default: 200, daily quota)
  --offset=N                         Skip first N URLs in the feed (for paging long-tail)
  --delay-ms=N                       Pause between requests (default: 500)
  --type=URL_UPDATED|URL_DELETED     Notification type (default: URL_UPDATED)
  --dry-run                          List URLs without calling the API
  -h, --help                         Show this help

Env:
  GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON   Inline service account JSON
  GOOGLE_APPLICATION_CREDENTIALS         Path to service account JSON file
`);
}

function loadServiceAccountCredentials() {
  const inline = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON?.trim();
  if (inline) {
    return JSON.parse(inline);
  }

  const path = process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim();
  if (path) {
    if (!existsSync(path)) {
      throw new Error(`GOOGLE_APPLICATION_CREDENTIALS file not found: ${path}`);
    }
    return JSON.parse(readFileSync(path, "utf8"));
  }

  throw new Error(
    "missing credentials — set GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON or GOOGLE_APPLICATION_CREDENTIALS",
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getAccessToken(credentials) {
  const auth = new GoogleAuth({
    credentials,
    scopes: [INDEXING_SCOPE],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  if (!token.token) {
    throw new Error("failed to obtain Google access token");
  }
  return token.token;
}

async function publishUrl(accessToken, url, type) {
  const response = await fetch(PUBLISH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url, type }),
  });

  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }

  return { ok: response.ok, status: response.status, json };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const meta = readSitemapBuildMeta();
  const allUrls = loadIndexableUrls(opts.feed);
  const slice = allUrls.slice(opts.offset, opts.offset + opts.limit);

  console.log(
    `submit-google-indexing: ${slice.length} URL(s) (feed="${opts.feed}", offset=${opts.offset}, limit=${opts.limit}) for ${meta.siteUrl}`,
  );

  if (slice.length === 0) {
    console.log("submit-google-indexing: nothing to submit");
    return;
  }

  if (opts.dryRun) {
    console.log("submit-google-indexing: dry-run — first URLs:");
    for (const url of slice.slice(0, 5)) console.log(`  ${url}`);
    if (slice.length > 5) console.log(`  … and ${slice.length - 5} more`);
    return;
  }

  const credentials = loadServiceAccountCredentials();
  const accessToken = await getAccessToken(credentials);

  let okCount = 0;
  let failCount = 0;

  for (let i = 0; i < slice.length; i += 1) {
    const url = slice[i];
    const result = await publishUrl(accessToken, url, opts.type);

    if (result.ok) {
      okCount += 1;
      console.log(`submit-google-indexing: [${i + 1}/${slice.length}] OK ${url}`);
    } else {
      failCount += 1;
      const errMsg =
        result.json?.error?.message ?? result.json?.error?.status ?? JSON.stringify(result.json);
      console.error(
        `submit-google-indexing: [${i + 1}/${slice.length}] FAIL HTTP ${result.status} ${url}`,
      );
      console.error(`  ${errMsg}`);

      if (result.status === 403) {
        console.error(
          "  Hint: enable Indexing API in GCP, and add the service account email as Owner in Search Console.",
        );
        break;
      }
      if (result.status === 429) {
        console.error("  Daily quota reached — re-run tomorrow or lower --limit.");
        break;
      }
    }

    if (i < slice.length - 1 && opts.delayMs > 0) {
      await sleep(opts.delayMs);
    }
  }

  const nextOffset = opts.offset + okCount + failCount;
  if (nextOffset < allUrls.length) {
    console.log(
      `submit-google-indexing: ${allUrls.length - nextOffset} URL(s) remaining — re-run with --offset=${nextOffset}`,
    );
  }

  console.log(`submit-google-indexing: finished (${okCount} ok, ${failCount} failed)`);

  if (failCount > 0 && okCount === 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`submit-google-indexing: ${err.message}`);
  process.exit(1);
});
