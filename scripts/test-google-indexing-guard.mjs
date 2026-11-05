#!/usr/bin/env node
/**
 * SEO-06 guard: default Google Indexing entrypoints must not POST ordinary sitemap URLs.
 */
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { writeFileSync, unlinkSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const script = join(root, "scripts/submit-google-indexing.mjs");

function run(args) {
  return spawnSync(process.execPath, [script, ...args], {
    encoding: "utf8",
    cwd: root,
    env: { ...process.env, GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON: "" },
  });
}

let failed = 0;

function expectFail(label, args, mustInclude) {
  const r = run(args);
  if (r.status === 0) {
    console.error(`FAIL ${label}: expected non-zero exit`);
    failed += 1;
    return;
  }
  const out = `${r.stdout}\n${r.stderr}`;
  if (mustInclude && !out.includes(mustInclude)) {
    console.error(`FAIL ${label}: stderr/stdout missing ${JSON.stringify(mustInclude)}`);
    console.error(out);
    failed += 1;
    return;
  }
  console.log(`OK ${label}`);
}

expectFail("no args", [], "refusing to submit");
expectFail(
  "legacy --feed=",
  ["--feed=primary", "--dry-run"],
  "sitemap feed submission was removed",
);
expectFail(
  "empty urls file",
  (() => {
    const dir = mkdtempSync(join(tmpdir(), "whd-gindex-"));
    const f = join(dir, "empty.txt");
    writeFileSync(f, "# none\n");
    return ["--urls-file=" + f, "--dry-run"];
  })(),
  "urls file is empty",
);

{
  const dir = mkdtempSync(join(tmpdir(), "whd-gindex-"));
  const f = join(dir, "one.txt");
  writeFileSync(f, "https://example.com/job-posting-example\n");
  const r = run(["--urls-file=" + f, "--dry-run"]);
  if (r.status !== 0) {
    console.error("FAIL dry-run eligible file should succeed");
    console.error(r.stderr);
    failed += 1;
  } else if (!r.stdout.includes("example.com/job-posting-example")) {
    console.error("FAIL dry-run did not list URL");
    failed += 1;
  } else {
    console.log("OK dry-run eligible urls-file (no network)");
  }
  try {
    unlinkSync(f);
  } catch {
    /* ignore */
  }
}

if (failed) {
  console.error(`test-google-indexing-guard: ${failed} failure(s)`);
  process.exit(1);
}
console.log("test-google-indexing-guard: all checks passed");
