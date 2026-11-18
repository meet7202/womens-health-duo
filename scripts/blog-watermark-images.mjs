#!/usr/bin/env node
/**
 * Brand article images with the dual-line watermark (@womenshealthduo + womenshealthduo.com).
 *
 * 1. Raster illustrations: reads `<id>-<key>.png` from the generated-assets folder
 *    (default ~/.cursor/projects/<project>/assets or BLOG_IMAGE_SOURCE_DIR), writes
 *    public/images/articles/<slug>/<slug>-<key>.webp (1600w) and -800.webp.
 * 2. SVG explainers: repairs any missing watermark text.
 */
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PLAN = path.join(ROOT, "blog/WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json");
const SPECS = path.join(ROOT, "blog/drafts/image-specs.json");
const ARTICLES = path.join(ROOT, "public/images/articles");
const SOURCE_DIR =
  process.env.BLOG_IMAGE_SOURCE_DIR ??
  path.join(
    os.homedir(),
    ".cursor/projects/Users-meetshah-Desktop-Personal-code-womens-health-duo/assets",
  );

const WIDTHS = [1600, 800];

function watermarkSvg(width, height) {
  const size = Math.max(14, Math.round(width * 0.016));
  const pad = Math.round(width * 0.02);
  const line2 = height - pad;
  const line1 = line2 - Math.round(size * 1.35);
  const x = width - pad;
  const style = `font-family="Helvetica, Arial, sans-serif" font-size="${size}" font-weight="600" text-anchor="end"`;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
  <g opacity="0.82">
    <text x="${x + 1}" y="${line1 + 1}" ${style} fill="#ffffff">@womenshealthduo</text>
    <text x="${x + 1}" y="${line2 + 1}" ${style} fill="#ffffff">womenshealthduo.com</text>
    <text x="${x}" y="${line1}" ${style} fill="#8a4b5c">@womenshealthduo</text>
    <text x="${x}" y="${line2}" ${style} fill="#8a4b5c">womenshealthduo.com</text>
  </g>
</svg>`);
}

async function brandRaster(srcPath, outBase) {
  const written = [];
  for (const w of WIDTHS) {
    const resized = await sharp(srcPath).resize({ width: w, withoutEnlargement: false }).toBuffer();
    const meta = await sharp(resized).metadata();
    const out = w === WIDTHS[0] ? `${outBase}.webp` : `${outBase}-${w}.webp`;
    await sharp(resized)
      .composite([{ input: watermarkSvg(meta.width, meta.height), top: 0, left: 0 }])
      .webp({ quality: 82 })
      .toFile(out);
    written.push({ out, width: meta.width, height: meta.height });
  }
  return written;
}

const SVG_MARK = `
  <text x="1160" y="630" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="#8a4b5c" opacity="0.75">@womenshealthduo</text>
  <text x="1160" y="655" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="16" fill="#8a4b5c" opacity="0.75">womenshealthduo.com</text>
`;

function repairSvgMarks() {
  let fixed = 0;
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p);
      else if (name.endsWith(".svg")) {
        let svg = fs.readFileSync(p, "utf8");
        if (svg.includes("@womenshealthduo") && svg.includes("womenshealthduo.com")) continue;
        svg = svg.replace("</svg>", `${SVG_MARK}\n</svg>`);
        fs.writeFileSync(p, svg);
        fixed += 1;
      }
    }
  };
  walk(ARTICLES);
  return fixed;
}

async function main() {
  const plan = JSON.parse(fs.readFileSync(PLAN, "utf8"));
  const specs = JSON.parse(fs.readFileSync(SPECS, "utf8"));
  const slugById = Object.fromEntries(
    plan.articles.map((a) => [a.id, a.path.replace(/^\/+|\/+$/g, "")]),
  );

  const manifest = {};
  let branded = 0;
  const missing = [];
  for (const [id, images] of Object.entries(specs.articles)) {
    const slug = slugById[id];
    if (!slug) continue;
    const dir = path.join(ARTICLES, slug);
    fs.mkdirSync(dir, { recursive: true });
    manifest[id] = [];
    for (const img of images) {
      const src = path.join(SOURCE_DIR, `${id}-${img.key}.png`);
      const outBase = path.join(dir, `${slug}-${img.key}`);
      if (fs.existsSync(src)) {
        const [primary] = await brandRaster(src, outBase);
        branded += 1;
        manifest[id].push({ key: img.key, width: primary.width, height: primary.height });
      } else if (fs.existsSync(`${outBase}.webp`)) {
        const meta = await sharp(`${outBase}.webp`).metadata();
        manifest[id].push({ key: img.key, width: meta.width, height: meta.height });
      } else {
        missing.push(`${id}-${img.key}`);
      }
    }
  }

  fs.writeFileSync(
    path.join(ROOT, "blog/drafts/image-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
  const svgFixed = repairSvgMarks();
  console.log(
    `blog-watermark: branded ${branded} raster image(s); SVG repaired ${svgFixed}; missing ${missing.length}`,
  );
  if (missing.length) console.log(`  missing: ${missing.join(", ")}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
