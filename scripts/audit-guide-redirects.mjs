#!/usr/bin/env node
/**
 * Fail if a consolidated guide URL is still linked from site source,
 * or if its redirect target is not an indexable page.
 *
 * Usage: node scripts/audit-guide-redirects.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mapFile = path.join(root, "src/config/guideConsolidationRedirects.ts");
const mapSrc = fs.readFileSync(mapFile, "utf8");
const pairs = [...mapSrc.matchAll(/\[\s*"([a-z0-9-]+)"\s*,\s*"([a-z0-9-]+)"\s*,?\s*\]/g)].map(
  (m) => [m[1], m[2]],
);
if (pairs.length < 10) {
  console.error("audit:seo-redirects: could not read consolidation map");
  process.exit(1);
}

const NON_GUIDE_TARGETS = new Set(["pilates", "prenatal", "postnatal"]);
const rowSrc = [
  fs.readFileSync(path.join(root, "src/data/topicGuides/topicGuideRows.ts"), "utf8"),
  fs.readFileSync(path.join(root, "src/data/topicGuides/articles/newGuideRows.ts"), "utf8"),
].join("\n");
const indexable = new Set([...rowSrc.matchAll(/\["([a-z0-9-]+)"/g)].map((m) => m[1]));
indexable.add("what-is-stott-pilates");

const skip = new Set([
  path.join(root, "src/config/guideConsolidationRedirects.ts"),
  path.join(root, "src/config/routeDisposition.ts"),
]);

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === "dist") continue;
    const abs = path.join(dir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) walk(abs, out);
    else if (/\.(ts|tsx|json)$/.test(name)) out.push(abs);
  }
  return out;
}

const files = [...walk(path.join(root, "src")), path.join(root, "public/llms.txt")].filter(
  (f) => fs.existsSync(f) && !skip.has(f),
);

const errors = [];
for (const [from, to] of pairs) {
  if (!indexable.has(to) && !NON_GUIDE_TARGETS.has(to)) {
    errors.push(`target /${to}/ is not an indexable guide or class landing`);
  }
  const boundary = new RegExp(`/${from}(?![a-z0-9-])`, "g");
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    for (const match of text.matchAll(boundary)) {
      const at = match.index ?? 0;
      let start = at;
      while (start > 0 && /[A-Za-z0-9:/._~?&=%+-]/.test(text[start - 1])) start -= 1;
      const token = text.slice(start, at);
      if (/^https?:\/\//i.test(token) && !/womenshealthduo\.com/i.test(token)) continue;
      // Guide slugs live at the root; `/mumbai/ivf/` is a different page.
      if (/^\/[a-z0-9-]/i.test(token.replace(/^https?:\/\/(www\.)?womenshealthduo\.com/i, "")))
        continue;
      errors.push(`${path.relative(root, file)} still links /${from}/`);
      break;
    }
  }
  const quoted = new RegExp(`"${from}"`);
  for (const rel of [
    "src/data/topicGuides/topicGuideRows.ts",
    "src/data/learnPillarClusters.ts",
    "src/lib/inlineGuideLinks.tsx",
  ]) {
    const text = fs.readFileSync(path.join(root, rel), "utf8");
    if (quoted.test(text)) errors.push(`${rel} still names "${from}"`);
  }
}

if (errors.length) {
  console.error(`audit:seo-redirects: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  ${line}`);
  process.exit(1);
}
console.log(`audit:seo-redirects: ${pairs.length} redirects, no stale internal links`);
