#!/usr/bin/env node
/**
 * Submit sitemap URLs to IndexNow and Google Indexing API.
 *
 * Usage:
 *   npm run submit:indexing
 *   npm run submit:indexing -- --dry-run
 *   npm run submit:indexing -- --indexnow-only --feed=all
 *   npm run submit:indexing -- --google-only --feed=primary --limit=100
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const opts = {
    indexnow: true,
    google: true,
    forward: [],
  };

  for (const arg of argv) {
    if (arg === "--indexnow-only") {
      opts.google = false;
    } else if (arg === "--google-only") {
      opts.indexnow = false;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      opts.forward.push(arg);
    }
  }

  if (!opts.indexnow && !opts.google) {
    console.error("submit-indexing: enable at least one of IndexNow or Google");
    process.exit(1);
  }

  return opts;
}

function printHelp() {
  console.log(`Usage: npm run submit:indexing -- [options] [shared flags]

Orchestrates submit-indexnow.mjs and submit-google-indexing.mjs after build.

Options:
  --indexnow-only     Skip Google Indexing API
  --google-only       Skip IndexNow
  -h, --help          Show this help

Shared flags (passed to both when enabled):
  --feed=primary|virtual|video|all
  --dry-run

Google-only flags (also forwarded):
  --limit=N --offset=N --delay-ms=N --type=URL_UPDATED|URL_DELETED
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

  if (opts.indexnow) {
    console.log("\n=== IndexNow ===\n");
    await runNode("submit-indexnow.mjs", opts.forward);
  }

  if (opts.google) {
    console.log("\n=== Google Indexing API ===\n");
    await runNode("submit-google-indexing.mjs", opts.forward);
  }
}

main().catch((err) => {
  console.error(`submit-indexing: ${err.message}`);
  process.exit(1);
});
