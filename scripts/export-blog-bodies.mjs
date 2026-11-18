#!/usr/bin/env node
/**
 * Export clinician body packs to JSON for generate-blog-drafts.mjs merge.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BODIES = path.join(ROOT, "src/data/topicGuides/articles/bodies");
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
  fs.writeFileSync(OUT, `${JSON.stringify(packs, null, 2)}\n`);
  console.log(`export-blog-bodies: ${Object.keys(packs).length} ids → ${path.relative(ROOT, OUT)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
