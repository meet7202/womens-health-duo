/**
 * Fail verify when built static shells repeat the same heading text at any level (h1–h6).
 * The crawlable shell only ships h1 + lead; this guards regressions if richer fallbacks return.
 * Run after `npm run build`.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function normalizeHeading(text) {
  return decodeEntities(text).replace(/\s+/g, " ").trim().toLowerCase();
}

function walkHtmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkHtmlFiles(path, out);
    else if (name === "index.html") out.push(path);
  }
  return out;
}

function extractHeadings(html) {
  const re = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) {
    const level = Number(m[1]);
    const text = normalizeHeading(m[2].replace(/<[^>]+>/g, " "));
    if (text) out.push({ level, text });
  }
  return out;
}

function main() {
  let files;
  try {
    files = walkHtmlFiles(DIST);
  } catch {
    console.error("audit-seo-headings: dist/ not found — run npm run build first");
    process.exit(1);
  }

  const duplicates = [];

  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const rel = file.slice(DIST.length) || "/";
    const headings = extractHeadings(html);
    const seen = new Map();

    for (const h of headings) {
      const key = h.text;
      const prev = seen.get(key);
      if (prev) {
        duplicates.push({
          file: rel,
          text: h.text,
          first: prev,
          second: h,
        });
      } else {
        seen.set(key, h);
      }
    }
  }

  if (duplicates.length === 0) {
    console.log(`audit-seo-headings: OK (${files.length} shells, no duplicate heading text)`);
    return;
  }

  console.error(`audit-seo-headings: ${duplicates.length} duplicate heading text(s):\n`);
  for (const d of duplicates.slice(0, 25)) {
    console.error(`  ${d.file}\n    "${d.text}"\n    h${d.first.level} + h${d.second.level}\n`);
  }
  if (duplicates.length > 25) {
    console.error(`  … and ${duplicates.length - 25} more`);
  }
  process.exit(1);
}

main();
