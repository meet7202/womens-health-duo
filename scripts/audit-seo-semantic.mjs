#!/usr/bin/env node
/**
 * SEO-30 — fail on known semantic regressions (post-build).
 *
 * Checks:
 * - Class landings must not fall back to the homepage DEFAULT_TITLE
 * - Learn root (when prerendered) must keep topical + written-guide sections
 * - No synthetic AggregateRating / ratingValue 5 in JSON-LD
 * - VideoObject contentUrl must not point at an HTML watch page
 * - Video thumbnails must not be the site favicon
 * - Video publication / uploadDate must not equal the build-day stamp
 */
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIST = "dist";
const CLASS_PATHS = ["prenatal", "postnatal", "pilates"];

function walkHtmlFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walkHtmlFiles(path, out);
    else if (name === "index.html" || name === "404.html") out.push(path);
  }
  return out;
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractTitle(html) {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? decodeEntities(m[1].trim()) : "";
}

function extractJsonLdBlocks(html) {
  const blocks = [];
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    const raw = match[1].trim();
    if (!raw) continue;
    try {
      blocks.push(JSON.parse(raw));
    } catch {
      blocks.push({ __parseError: true, raw: raw.slice(0, 120) });
    }
  }
  return blocks;
}

function walkNodes(node, visit) {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const item of node) walkNodes(item, visit);
    return;
  }
  visit(node);
  for (const value of Object.values(node)) walkNodes(value, visit);
}

function isHtmlContentUrl(url, siteUrl) {
  if (typeof url !== "string" || !url) return false;
  const origin = siteUrl.replace(/\/+$/, "");
  if (url === origin || url === `${origin}/`) return true;
  if (url.startsWith(origin)) {
    const path = url.slice(origin.length);
    if (!path || path === "/") return true;
    if (/\.html?(?:\?|$)/i.test(path)) return true;
    if (/\/learn\/watch\//i.test(path) && !/\.(mp4|webm|m4v)(?:\?|$)/i.test(path)) return true;
    // Trailing-slash HTML shells (no media extension)
    if (path.endsWith("/") && !/\.(mp4|webm|m4v|jpg|jpeg|png|webp)(?:\?|$)/i.test(path)) {
      return true;
    }
  }
  return false;
}

function isFaviconThumb(url) {
  if (typeof url !== "string") return false;
  return /favicon\.(ico|svg|png)|apple-touch-icon/i.test(url);
}

function main() {
  if (!existsSync(DIST)) {
    console.error("audit-seo-semantic: dist/ not found — run npm run build first");
    process.exit(1);
  }

  const errors = [];
  let meta = null;
  try {
    meta = JSON.parse(readFileSync(join(DIST, ".sitemap-build-meta.json"), "utf8"));
  } catch {
    errors.push("missing dist/.sitemap-build-meta.json");
  }
  const siteUrl = (meta?.siteUrl || "https://womenshealthduo.com").replace(/\/+$/, "");
  const buildDay = meta?.buildDate || null;

  // 1) Class pages must keep class-specific titles (not homepage title fallback).
  const homeTitle = existsSync(join(DIST, "index.html"))
    ? extractTitle(readFileSync(join(DIST, "index.html"), "utf8"))
    : "";
  for (const slug of CLASS_PATHS) {
    const file = join(DIST, slug, "index.html");
    if (!existsSync(file)) {
      errors.push(`class page missing: ${slug}/index.html`);
      continue;
    }
    const title = extractTitle(readFileSync(file, "utf8"));
    if (!title) {
      errors.push(`${slug}: missing <title>`);
      continue;
    }
    if (homeTitle && title === homeTitle) {
      errors.push(`${slug}: title fell back to homepage title (${JSON.stringify(homeTitle)})`);
    }
    if (!/Dr\.?\s*Zalak/i.test(title) && !/prenatal|postnatal|pilates/i.test(title)) {
      errors.push(`${slug}: class title looks generic / missing class identity (${title})`);
    }
  }

  // 2) Learn root guide sections — only when prerender markup is detectable.
  const learnFile = join(DIST, "learn", "index.html");
  if (existsSync(learnFile)) {
    const learnHtml = readFileSync(learnFile, "utf8");
    const prerendered = /data-seo-prerender=["']1["']/i.test(learnHtml);
    if (prerendered) {
      if (!/id=["']learn-pillars["']/i.test(learnHtml)) {
        errors.push("learn/: prerendered but missing #learn-pillars (topical authority)");
      }
      if (!/id=["']topic-guides["']/i.test(learnHtml)) {
        errors.push("learn/: prerendered but missing #topic-guides (written guides)");
      }
    }
  } else {
    errors.push("learn/index.html missing");
  }

  // 3–6) Scan shells for JSON-LD + video sitemap date stamps.
  const htmlFiles = walkHtmlFiles(DIST);
  for (const file of htmlFiles) {
    const rel = file.slice(DIST.length) || "/";
    const html = readFileSync(file, "utf8");
    for (const block of extractJsonLdBlocks(html)) {
      if (block.__parseError) {
        errors.push(`${rel}: unparsable JSON-LD`);
        continue;
      }
      walkNodes(block, (node) => {
        const type = node["@type"];
        const types = Array.isArray(type) ? type : type ? [type] : [];

        if (types.includes("AggregateRating") || types.includes("Review")) {
          errors.push(`${rel}: unexpected ${types.join("|")} in JSON-LD (SEO-08/18 regression)`);
        }

        if (node.ratingValue === 5 || node.ratingValue === "5" || node.ratingValue === "5.0") {
          // Text-only / synthetic 5-star signal without a verified aggregate block.
          errors.push(`${rel}: synthetic ratingValue 5 in JSON-LD`);
        }

        if (types.includes("VideoObject")) {
          if (node.contentUrl && isHtmlContentUrl(node.contentUrl, siteUrl)) {
            errors.push(`${rel}: VideoObject contentUrl points at HTML page (${node.contentUrl})`);
          }
          const thumbs = Array.isArray(node.thumbnailUrl)
            ? node.thumbnailUrl
            : node.thumbnailUrl
              ? [node.thumbnailUrl]
              : [];
          for (const thumb of thumbs) {
            if (isFaviconThumb(thumb)) {
              errors.push(`${rel}: VideoObject thumbnailUrl is favicon (${thumb})`);
            }
          }
          if (buildDay && typeof node.uploadDate === "string") {
            const day = node.uploadDate.slice(0, 10);
            if (day === buildDay) {
              errors.push(
                `${rel}: VideoObject uploadDate equals build day ${buildDay} (use postedAt)`,
              );
            }
          }
        }
      });
    }
  }

  if (existsSync(join(DIST, "sitemap-videos.xml")) && buildDay) {
    const videoXml = readFileSync(join(DIST, "sitemap-videos.xml"), "utf8");
    const pubs = [
      ...videoXml.matchAll(/<video:publication_date>([^<]+)<\/video:publication_date>/g),
    ].map((m) => m[1].slice(0, 10));
    const buildDayHits = pubs.filter((d) => d === buildDay);
    if (buildDayHits.length) {
      errors.push(
        `sitemap-videos.xml: ${buildDayHits.length} video:publication_date equal build day ${buildDay}`,
      );
    }
  }

  if (errors.length === 0) {
    console.log(
      `audit-seo-semantic: OK (${htmlFiles.length} HTML files; class titles, learn guides, ratings, VideoObject)`,
    );
    return;
  }

  console.error(`audit-seo-semantic: ${errors.length} regression(s):\n`);
  for (const err of errors.slice(0, 40)) {
    console.error(`  - ${err}`);
  }
  if (errors.length > 40) {
    console.error(`  … and ${errors.length - 40} more`);
  }
  process.exit(1);
}

main();
