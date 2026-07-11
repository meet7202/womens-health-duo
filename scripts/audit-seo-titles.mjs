/**
 * Fail CI/local verify when any built static shell `<title>` exceeds Bing's limit (< 70 chars).
 * Run after `npm run build` (scans dist shells).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const BING_MAX = 69; // Bing: "less than 70 characters"

function decodeTitleEntities(text) {
  return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function walkHtmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkHtmlFiles(path, out);
    else if (name === "index.html") out.push(path);
  }
  return out;
}

function main() {
  let files;
  try {
    files = walkHtmlFiles(DIST);
  } catch {
    console.error("audit-seo-titles: dist/ not found — run npm run build first");
    process.exit(1);
  }

  const violations = [];
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const match = html.match(/<title>([^<]*)<\/title>/i);
    if (!match) continue;
    const title = decodeTitleEntities(match[1]);
    if (title.length > BING_MAX) {
      violations.push({ file: file.slice(DIST.length) || "/", len: title.length, title });
    }
  }

  if (violations.length === 0) {
    console.log(`audit-seo-titles: OK (${files.length} shells, all titles <= ${BING_MAX} chars)`);
    return;
  }

  violations.sort((a, b) => b.len - a.len);
  console.error(`audit-seo-titles: ${violations.length} title(s) exceed ${BING_MAX} characters:\n`);
  for (const v of violations.slice(0, 20)) {
    console.error(`  ${v.len} chars  ${v.file}\n    ${v.title}\n`);
  }
  if (violations.length > 20) {
    console.error(`  … and ${violations.length - 20} more`);
  }
  process.exit(1);
}

main();
