#!/usr/bin/env node
/**
 * Submit sitemap URLs to IndexNow (Bing / participating engines).
 *
 * Google Indexing API is NOT part of the default workflow — ordinary WHD pages
 * are outside that API's JobPosting / livestream scope. Use Search Console
 * sitemaps for Google discovery.
 *
 * Usage:
 *   npm run submit:indexing
 *   npm run submit:indexing -- --dry-run
 *   npm run submit:indexing -- --feed=primary
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const opts = {
    forward: [],
  };

  for (const arg of argv) {
    if (arg === "--google-only") {
      console.error(
        "submit-indexing: --google-only removed. Ordinary pages must not use the Google Indexing API.",
      );
      console.error(
        "  Use npm run submit:indexnow, or submit-google-indexing.mjs with --urls-file= for eligible JobPosting/livestream URLs only.",
      );
      process.exit(1);
    } else if (arg === "--indexnow-only") {
      // Kept for backward compatibility; IndexNow is already the only default path.
      continue;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      opts.forward.push(arg);
    }
  }

  return opts;
}

function printHelp() {
  console.log(`Usage: npm run submit:indexing -- [options] [IndexNow flags]

Submits built sitemap URLs to IndexNow only.

Options:
  -h, --help          Show this help

IndexNow flags (forwarded):
  --feed=primary|virtual|video|all
  --dry-run

Google Indexing API is not invoked. See scripts/submit-google-indexing.mjs
(--urls-file=) for the fail-closed eligible-route utility.
`);
}

function runNode(script, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [join(__dirname, script), ...args], {
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${script} exited with code ${code}`));
    });
  });
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));

  console.log("\n=== IndexNow ===\n");
  await runNode("submit-indexnow.mjs", opts.forward);
}

main().catch((err) => {
  console.error(`submit-indexing: ${err.message}`);
  process.exit(1);
});
