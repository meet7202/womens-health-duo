#!/usr/bin/env node
/**
 * After deploy: IndexNow-submit one promoted calendar article URL.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAN = path.join(ROOT, "blog/WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json");
const STATUS = path.join(ROOT, "blog/drafts/STATUS.json");

function parseArgs(argv) {
  let id = null;
  let dryRun = false;
  for (const arg of argv) {
    if (arg.startsWith("--id=")) id = arg.slice("--id=".length);
    else if (arg === "--dry-run") dryRun = true;
  }
  if (!id) {
    console.error("blog:submit-index: missing --id=");
    process.exit(1);
  }
  return { id, dryRun };
}

function main() {
  const { id, dryRun } = parseArgs(process.argv.slice(2));
  const plan = JSON.parse(fs.readFileSync(PLAN, "utf8"));
  const status = JSON.parse(fs.readFileSync(STATUS, "utf8"));
  const article = plan.articles.find((a) => a.id === id);
  const row = status.articles.find((a) => a.id === id);
  if (!article || !row) {
    console.error(`blog:submit-index: unknown id ${id}`);
    process.exit(1);
  }
  if (row.publicationStatus !== "published") {
    console.error(
      `blog:submit-index: ${id} is "${row.publicationStatus}" — promote and deploy before indexing.`,
    );
    process.exit(1);
  }

  const url = article.url || `https://womenshealthduo.com${article.path}`;
  const args = ["scripts/submit-indexnow.mjs", `--urls=${url}`];
  if (dryRun) args.push("--dry-run");

  console.log(`blog:submit-index: ${id} → ${url}`);
  const result = spawnSync(process.execPath, args, { cwd: ROOT, stdio: "inherit" });
  process.exit(result.status ?? 1);
}

main();
