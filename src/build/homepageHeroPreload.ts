/**
 * SEO-25 — homepage LCP hero hint.
 * Prefer the prerendered responsive `<picture>`; only emit a matching
 * `imagesrcset` / `imagesizes` preload in homepage HTML when that picture is absent.
 * Never inject hero preload into non-home shells.
 */
import fs from "node:fs";
import path from "node:path";

/** Must stay aligned with `HERO_IMAGE_SIZES` in HeroSection. */
export const HOMEPAGE_HERO_IMAGE_SIZES = "(min-width: 768px) min(45vw, 560px), min(100vw, 448px)";

const HERO_WIDTHS = [640, 800, 960, 1280, 1536] as const;
const PRELOAD_MARKER = 'data-seo-hero-preload="1"';

function findHashedHeroAsset(assetsDir: string, width: number, ext: "webp" | "jpg"): string | null {
  if (!fs.existsSync(assetsDir)) return null;
  const prefix = `hero-doctors-${width}w-`;
  const match = fs
    .readdirSync(assetsDir)
    .find((name) => name.startsWith(prefix) && name.endsWith(`.${ext}`));
  return match ? `/assets/${match}` : null;
}

function buildWebpSrcSet(assetsDir: string): { href: string; srcSet: string } | null {
  const parts: string[] = [];
  let href: string | null = null;
  for (const width of HERO_WIDTHS) {
    const file = findHashedHeroAsset(assetsDir, width, "webp");
    if (!file) return null;
    if (width === 640) href = file;
    parts.push(`${file} ${width}w`);
  }
  if (!href) return null;
  return { href, srcSet: parts.join(", ") };
}

function stripHeroPreload(html: string): string {
  return html.replace(/<link\b[^>]*\bdata-seo-hero-preload=["']1["'][^>]*>\s*/gi, "");
}

function hasPrerenderedHeroPicture(html: string): boolean {
  return (
    /<picture\b[\s\S]{0,1200}?hero-doctors-\d+w-/i.test(html) ||
    (/data-seo-prerender=["']1["']/i.test(html) && /hero-doctors-\d+w-/i.test(html))
  );
}

/**
 * After static shells + optional prerender: ensure homepage either relies on the
 * prerendered picture or gets a single matching responsive preload in `<head>`.
 */
export function ensureHomepageHeroLcpHint(outDirAbs: string): {
  mode: "picture" | "preload" | "skip";
} {
  const indexPath = path.join(outDirAbs, "index.html");
  if (!fs.existsSync(indexPath)) return { mode: "skip" };

  let html = fs.readFileSync(indexPath, "utf8");
  html = stripHeroPreload(html);

  if (hasPrerenderedHeroPicture(html)) {
    fs.writeFileSync(indexPath, html, "utf8");
    return { mode: "picture" };
  }

  const assetsDir = path.join(outDirAbs, "assets");
  const webp = buildWebpSrcSet(assetsDir);
  if (!webp) {
    fs.writeFileSync(indexPath, html, "utf8");
    return { mode: "skip" };
  }

  const link = `<link rel="preload" as="image" type="image/webp" href="${webp.href}" imagesrcset="${webp.srcSet}" imagesizes="${HOMEPAGE_HERO_IMAGE_SIZES}" ${PRELOAD_MARKER}>`;
  if (html.includes("</head>")) {
    html = html.replace("</head>", `${link}\n</head>`);
  }
  fs.writeFileSync(indexPath, html, "utf8");
  return { mode: "preload" };
}
