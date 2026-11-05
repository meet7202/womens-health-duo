#!/usr/bin/env node
/**
 * Google Indexing API helper — FAIL-CLOSED for ordinary WHD pages.
 *
 * Google's Indexing API is restricted to JobPosting or livestream BroadcastEvent
 * (within VideoObject) URLs. Ordinary service, article, and on-demand Learn clips
 * on Women's Health Duo are NOT eligible.
 *
 * This script never loads sitemap feeds. It only posts when given an explicit
 * `--urls-file=` of pre-validated eligible URLs. An empty/missing file exits 1
 * without calling the network.
 *
 * Prefer Search Console sitemaps + URL Inspection for ordinary discovery.
 * Prefer IndexNow (`npm run submit:indexnow`) for Bing/Yandex partners.
 *
 * Credentials (only used when eligible URLs are supplied):
 * - GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON — inline JSON (CI / .env)
 * - GOOGLE_APPLICATION_CREDENTIALS — path to service account JSON file
 *
 * Usage:
 *   npm run submit:google-indexing -- --urls-file=./eligible-job-or-livestream-urls.txt --dry-run
 */
import { readFileSync, existsSync } from "node:fs";
import { GoogleAuth } from "google-auth-library";
import { loadEnvFile } from "./lib/loadEnv.mjs";

loadEnvFile();

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";
const PUBLISH_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

function parseArgs(argv) {
  const opts = {
    dryRun: false,
    delayMs: 500,
    type: "URL_UPDATED",
    urlsFile: "",
  };

  for (const arg of argv) {
    if (arg === "--dry-run") opts.dryRun = true;
    else if (arg.startsWith("--urls-file="))
      opts.urlsFile = arg.slice("--urls-file=".length).trim();
    else if (arg.startsWith("--delay-ms=")) {
      opts.delayMs = Number.parseInt(arg.slice("--delay-ms=".length), 10);
    } else if (arg.startsWith("--type=")) {
      opts.type = arg.slice("--type=".length);
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else if (
      arg.startsWith("--feed=") ||
      arg.startsWith("--limit=") ||
      arg.startsWith("--offset=")
    ) {
      console.error(
        "submit-google-indexing: sitemap feed submission was removed. Ordinary WHD pages are not Indexing API–eligible.",
      );
      console.error(
        "  Pass --urls-file= with JobPosting or livestream BroadcastEvent URLs only, or use Search Console / IndexNow.",
      );
      process.exit(1);
    } else {
      console.error(`submit-google-indexing: unknown argument ${arg}`);
      printHelp();
      process.exit(1);
    }
  }

  if (!["URL_UPDATED", "URL_DELETED"].includes(opts.type)) {
    console.error('submit-google-indexing: --type must be "URL_UPDATED" or "URL_DELETED"');
    process.exit(1);
  }

  return opts;
}

function printHelp() {
  console.log(`Usage: node scripts/submit-google-indexing.mjs --urls-file=PATH [options]

Google Indexing API is ONLY for JobPosting or livestream BroadcastEvent pages.
This repository's ordinary sitemap URLs must NOT be submitted.

Required:
  --urls-file=PATH   Text file, one absolute https URL per line (eligible routes only)

Options:
  --delay-ms=N                       Pause between requests (default: 500)
  --type=URL_UPDATED|URL_DELETED     Notification type (default: URL_UPDATED)
  --dry-run                          List URLs without calling the API
  -h, --help                         Show this help

Env:
  GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON   Inline service account JSON
  GOOGLE_APPLICATION_CREDENTIALS         Path to service account JSON file

Owner note: unused Indexing API credentials may be revoked in GCP / Search Console
when no longer needed. This script does not revoke secrets.
`);
}

function loadEligibleUrls(urlsFile) {
  if (!urlsFile) {
    throw new Error(
      "refusing to submit: pass --urls-file= with validated JobPosting or livestream URLs (empty sitemap submission is disabled)",
    );
  }
  if (!existsSync(urlsFile)) {
    throw new Error(`urls file not found: ${urlsFile}`);
  }
  const urls = readFileSync(urlsFile, "utf8")
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"));
  if (urls.length === 0) {
    throw new Error(`urls file is empty: ${urlsFile} (fail closed — no Indexing API calls)`);
  }
  for (const url of urls) {
    if (!/^https:\/\//i.test(url)) {
      throw new Error(`invalid URL (https required): ${url}`);
    }
  }
  return urls;
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
  const urls = loadEligibleUrls(opts.urlsFile);

  console.log(
    `submit-google-indexing: ${urls.length} explicit eligible URL(s) (NOT from sitemap feeds)`,
  );

  if (opts.dryRun) {
    console.log("submit-google-indexing: dry-run — URLs:");
    for (const url of urls) console.log(`  ${url}`);
    return;
  }

  const credentials = loadServiceAccountCredentials();
  const accessToken = await getAccessToken(credentials);

  let okCount = 0;
  let failCount = 0;

  for (let i = 0; i < urls.length; i += 1) {
    const url = urls[i];
    const result = await publishUrl(accessToken, url, opts.type);

    if (result.ok) {
      okCount += 1;
      console.log(`submit-google-indexing: [${i + 1}/${urls.length}] OK ${url}`);
    } else {
      failCount += 1;
      const errMsg =
        result.json?.error?.message ?? result.json?.error?.status ?? JSON.stringify(result.json);
      console.error(
        `submit-google-indexing: [${i + 1}/${urls.length}] FAIL HTTP ${result.status} ${url}`,
      );
      console.error(`  ${errMsg}`);
      if (result.status === 403 || result.status === 429) break;
    }

    if (i < urls.length - 1 && opts.delayMs > 0) {
      await sleep(opts.delayMs);
    }
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
