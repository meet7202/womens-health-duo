import fs from "node:fs";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const UA = "Mozilla/5.0 (compatible; WHD-hub-import/1.0; +https://womenshealthduo.com)";
const REFERER = "https://www.instagram.com/";

/**
 * Save a hub cover image under `public/images/hub-thumbs/` for reliable on-site posters.
 * @param {{ imageUrl: string; fileBase: string; outDir?: string }} opts
 * @returns {Promise<string | null>} Public path e.g. `/images/hub-thumbs/ig-abc.jpg`
 */
export async function downloadHubThumbnail({ imageUrl, fileBase, outDir }) {
  const url = String(imageUrl ?? "").trim();
  const base = String(fileBase ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-");
  if (!url || !base) return null;

  const dir = outDir ?? path.join(process.cwd(), "public/images/hub-thumbs");
  fs.mkdirSync(dir, { recursive: true });
  const fileName = `${base}.jpg`;
  const absPath = path.join(dir, fileName);
  const publicPath = `/images/hub-thumbs/${fileName}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA, Referer: REFERER },
      redirect: "follow",
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 400) return null;
    fs.writeFileSync(absPath, buf);
    return publicPath;
  } catch {
    return null;
  }
}

/** @param {Array<Record<string, unknown>>} rows @param {(row: Record<string, unknown>) => string | undefined} imageUrlFor */
export async function attachHubThumbnailPaths(rows, imageUrlFor) {
  let saved = 0;
  let failed = 0;
  for (const row of rows) {
    const imageUrl = imageUrlFor(row);
    const id = String(row.id ?? "").trim();
    if (!imageUrl || !id) continue;
    const local = await downloadHubThumbnail({ imageUrl, fileBase: id });
    if (local) {
      row.instagramPosterPath = local;
      saved += 1;
    } else {
      failed += 1;
    }
    await delay(120);
  }
  return { saved, failed };
}
