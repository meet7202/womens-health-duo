#!/usr/bin/env node
/**
 * Write `public/images/articles/<slug>/<slug>-explainer.svg` for every hub article in
 * `src/data/topicGuides/articles/hubBodies.ts`, using the calendar-article explainer template.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "esbuild";
import { svgExplainer } from "./generate-blog-drafts.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ENTRY = path.join(ROOT, "src/data/topicGuides/articles/hubBodies.ts");
const OUT_DIR = path.join(ROOT, "node_modules/.cache/hub-explainers");

async function loadHubs() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outfile = path.join(OUT_DIR, "hubBodies.mjs");
  await build({ entryPoints: [ENTRY], bundle: true, format: "esm", platform: "node", outfile });
  const mod = await import(`${pathToFileURL(outfile).href}?t=${Date.now()}`);
  return mod.HUB_CALENDAR_ARTICLES;
}

const hubs = await loadHubs();
for (const hub of hubs) {
  const svg = svgExplainer(hub, { id: hub.id, doctor_id: hub.proposedLeadId });
  const dir = path.join(ROOT, "public/images/articles", hub.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${hub.slug}-explainer.svg`), svg);
}
console.log(`generate-hub-explainers: wrote ${hubs.length} explainer SVGs`);
