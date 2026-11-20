#!/usr/bin/env node
/**
 * Builds the default 1200×630 social share image (`public/images/og-womens-health-duo.jpg`)
 * from the approved doctor portraits in `src/assets/`. WhatsApp, Facebook and Instagram
 * previews need a raster image; they ignore SVG.
 *
 * Usage: node scripts/generate-og-image.mjs
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "public/images/og-womens-health-duo.jpg");

const W = 1200;
const H = 630;
const PHOTO_W = 320;
const TEXT_W = W - PHOTO_W * 2;

async function portrait(file) {
  return sharp(path.join(root, "src/assets", file))
    .resize({ width: PHOTO_W, height: H, fit: "cover", position: "top" })
    .toBuffer();
}

const escape = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/'/g, "&#39;");

const lines = [
  { y: 150, size: 26, weight: 600, fill: "#a2513a", text: "WOMEN'S HEALTH DUO" },
  { y: 232, size: 44, weight: 700, fill: "#2a1d17", text: "Dr. Charmi Shah" },
  { y: 274, size: 24, weight: 400, fill: "#5b4a42", text: "OB-GYN, IVF & laparoscopy" },
  { y: 352, size: 44, weight: 700, fill: "#2a1d17", text: "Dr. Zalak Shah (PT)" },
  { y: 394, size: 24, weight: 400, fill: "#5b4a42", text: "Women's health physio & STOTT Pilates" },
  { y: 500, size: 22, weight: 500, fill: "#a2513a", text: "In-person in India · Online worldwide" },
];

const textSvg = Buffer.from(
  `<svg width="${TEXT_W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#fbf8f5"/>
  <rect x="56" y="440" width="96" height="4" fill="#a2513a"/>
  ${lines
    .map(
      (l) =>
        `<text x="56" y="${l.y}" font-family="Helvetica, Arial, sans-serif" font-size="${l.size}" font-weight="${l.weight}" fill="${l.fill}">${escape(l.text)}</text>`,
    )
    .join("\n  ")}
</svg>`,
);

const [charmi, zalak] = await Promise.all([portrait("dr-charmi.jpeg"), portrait("dr-zalak.jpeg")]);

await sharp({ create: { width: W, height: H, channels: 3, background: "#fbf8f5" } })
  .composite([
    { input: textSvg, left: 0, top: 0 },
    { input: charmi, left: TEXT_W, top: 0 },
    { input: zalak, left: TEXT_W + PHOTO_W, top: 0 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(out);

console.log(`Wrote ${path.relative(root, out)}`);
