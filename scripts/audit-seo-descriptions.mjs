/**
 * Fail CI/local verify when any built static shell `<meta name="description">` is outside
 * Bing's 25–160 character range. Run after `npm run build` (scans dist shells).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const MIN_LEN = 25;
const MAX_LEN = 160;

function decodeDescriptionEntities(text) {
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
    console.error("audit-seo-descriptions: dist/ not found — run npm run build first");
    process.exit(1);
  }

  const violations = [];
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const match = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
    if (!match) {
      violations.push({
        file: file.slice(DIST.length) || "/",
        len: 0,
        description: "(missing meta description)",
        kind: "missing",
      });
      continue;
    }
    const description = decodeDescriptionEntities(match[1]);
    if (description.length < MIN_LEN) {
      violations.push({
        file: file.slice(DIST.length) || "/",
        len: description.length,
        description,
        kind: "short",
      });
    } else if (description.length > MAX_LEN) {
      violations.push({
        file: file.slice(DIST.length) || "/",
        len: description.length,
        description,
        kind: "long",
      });
    }
  }

  if (violations.length === 0) {
    console.log(
      `audit-seo-descriptions: OK (${files.length} shells, all descriptions ${MIN_LEN}–${MAX_LEN} chars)`,
    );
    return;
  }

  violations.sort((a, b) => {
    if (a.kind === "long" && b.kind !== "long") return -1;
    if (b.kind === "long" && a.kind !== "long") return 1;
    return b.len - a.len;
  });

  const long = violations.filter((v) => v.kind === "long").length;
  const short = violations.filter((v) => v.kind === "short" || v.kind === "missing").length;
  console.error(
    `audit-seo-descriptions: ${violations.length} violation(s) (${long} too long, ${short} too short or missing):\n`,
  );
  for (const v of violations.slice(0, 20)) {
    console.error(`  ${v.len} chars [${v.kind}]  ${v.file}\n    ${v.description}\n`);
  }
  if (violations.length > 20) {
    console.error(`  … and ${violations.length - 20} more`);
  }
  process.exit(1);
}

main();
