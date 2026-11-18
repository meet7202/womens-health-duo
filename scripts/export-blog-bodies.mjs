#!/usr/bin/env node
/**
 * Export clinician body packs to JSON for generate-blog-drafts.mjs merge.
 *
 * Sources, in order (later wins):
 *   1. WEEK_BODIES_* exports from bodies/*.ts
 *   2. Whole-article revisions in bodies/rewrites/<ID>.json
 *
 * Revisions replace the TypeScript pack for that id entirely. Run
 * `node scripts/blog-check-rewrite.mjs --all` before exporting.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BODIES = path.join(ROOT, "src/data/topicGuides/articles/bodies");
const REWRITES = path.join(BODIES, "rewrites");
const OUT = path.join(BODIES, "all-bodies.json");

async function main() {
  const packs = {};
  for (const name of fs.readdirSync(BODIES).sort()) {
    if (!name.endsWith(".ts")) continue;
    if (name === "all-bodies.ts") continue;
    const modPath = path.join(BODIES, name);
    const mod = await import(pathToFileURL(modPath).href);
    for (const [key, value] of Object.entries(mod)) {
      if (key.startsWith("WEEK_BODIES_") && value && typeof value === "object") {
        Object.assign(packs, value);
      }
    }
  }

  const revised = [];
  if (fs.existsSync(REWRITES)) {
    for (const name of fs.readdirSync(REWRITES).sort()) {
      if (!name.endsWith(".json")) continue;
      const body = JSON.parse(fs.readFileSync(path.join(REWRITES, name), "utf8"));
      const id = name.replace(/\.json$/, "");
      if (body.id !== id) throw new Error(`${name}: "id" must be "${id}"`);
      packs[id] = body;
      revised.push(id);
    }
  }

  fs.writeFileSync(OUT, `${JSON.stringify(packs, null, 2)}\n`);
  console.log(
    `export-blog-bodies: ${Object.keys(packs).length} ids (${revised.length} from rewrites/) → ${path.relative(ROOT, OUT)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
