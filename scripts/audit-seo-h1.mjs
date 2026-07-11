/**
 * Fail verify when any built static shell is missing a crawlable <h1> outside <noscript>,
 * has more than one <h1>, or exceeds length limits.
 * Run after `npm run build`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const BING_H1_MAX = 150;

function decodeEntities(text) {
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

function crawlableH1(html) {
  const shellMatch = html.match(/id="static-seo-shell"[\s\S]*?<h1[^>]*>([^<]*)<\/h1>/i);
  return shellMatch ? decodeEntities(shellMatch[1]) : null;
}

function countH1Tags(html) {
  return (html.match(/<h1[\s>]/gi) ?? []).length;
}

function main() {
  let files;
  try {
    files = walkHtmlFiles(DIST);
  } catch {
    console.error("audit-seo-h1: dist/ not found — run npm run build first");
    process.exit(1);
  }

  const missing = [];
  const tooMany = [];
  const tooLong = [];

  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const h1 = crawlableH1(html);
    const rel = file.slice(DIST.length) || "/";
    const h1Count = countH1Tags(html);

    if (h1Count !== 1) {
      tooMany.push({ file: rel, count: h1Count });
    }

    if (!h1?.trim()) {
      missing.push(rel);
      continue;
    }
    if (h1.length > BING_H1_MAX) {
      tooLong.push({ file: rel, len: h1.length, h1 });
    }
  }

  if (missing.length === 0 && tooLong.length === 0 && tooMany.length === 0) {
    console.log(
      `audit-seo-h1: OK (${files.length} shells, exactly one crawlable <h1> each, <= ${BING_H1_MAX} chars)`,
    );
    return;
  }

  if (tooMany.length > 0) {
    console.error(`audit-seo-h1: ${tooMany.length} shell(s) with != 1 <h1> tag:\n`);
    for (const v of tooMany.slice(0, 20)) {
      console.error(`  ${v.count} h1  ${v.file}`);
    }
    if (tooMany.length > 20) console.error(`  … and ${tooMany.length - 20} more`);
  }

  if (missing.length > 0) {
    console.error(`\naudit-seo-h1: ${missing.length} shell(s) missing crawlable <h1>:\n`);
    for (const f of missing.slice(0, 20)) console.error(`  ${f}`);
    if (missing.length > 20) console.error(`  … and ${missing.length - 20} more`);
  }

  if (tooLong.length > 0) {
    console.error(`\naudit-seo-h1: ${tooLong.length} <h1> over ${BING_H1_MAX} characters:\n`);
    for (const v of tooLong.slice(0, 10)) {
      console.error(`  ${v.len} chars  ${v.file}\n    ${v.h1}\n`);
    }
  }

  process.exit(1);
}

main();
