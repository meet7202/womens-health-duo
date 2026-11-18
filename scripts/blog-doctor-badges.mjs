#!/usr/bin/env node
/**
 * Crop small square headshots from the site portraits and store them as data URIs
 * in blog/drafts/doctor-badges.json. The SVG explainers embed these, because an SVG
 * loaded through <img> cannot fetch external images.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "blog/drafts/doctor-badges.json");
const SIZE = 180;

const SOURCES = {
  // Same head-and-shoulders frame as Dr. Charmi, with Zalak's face on the circle centre.
  // Measured on the 1182×1331 portrait: face centre x=650, head starts near y=201.
  zalak: {
    file: "src/assets/dr-zalak.jpeg",
    extract: { left: 272, top: 88, width: 756, height: 756 },
  },
  charmi: { file: "src/assets/dr-charmi-320w.jpg" },
};

const out = {};
for (const [slug, spec] of Object.entries(SOURCES)) {
  const src = path.join(ROOT, spec.file);
  let pipeline = sharp(src);
  if (spec.extract) {
    pipeline = pipeline.extract(spec.extract);
  } else {
    const meta = await sharp(src).metadata();
    const side = Math.round(Math.min(meta.width, meta.height) * 0.64);
    pipeline = pipeline.extract({
      left: Math.floor((meta.width - side) / 2),
      top: 0,
      width: side,
      height: side,
    });
  }
  const buf = await pipeline.resize(SIZE, SIZE).jpeg({ quality: 86, mozjpeg: true }).toBuffer();
  out[slug] = `data:image/jpeg;base64,${buf.toString("base64")}`;
  console.log(`${slug}: ${buf.length} bytes`);
}
fs.writeFileSync(OUT, `${JSON.stringify(out, null, 2)}\n`);
console.log(`wrote ${path.relative(ROOT, OUT)}`);
