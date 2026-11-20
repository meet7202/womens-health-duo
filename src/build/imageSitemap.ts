/**
 * Google image sitemap for content photos on indexable, prerendered pages.
 * Loaded from `vite.config.ts` after prerender — no `@/` imports.
 *
 * Lists the largest file of each content photo (hero, doctor portraits, class
 * photos, guide figures, Learn watch posters). Byline avatars, hub card repeats,
 * and noindex pages are left out.
 */
import fs from "node:fs";
import path from "node:path";

function isCriticalImage(src: string): boolean {
  return (
    /\/images\/(?:articles|classes|hub-thumbs)\//i.test(src) ||
    /\/images\/(?:og-womens-health-duo|dr-zalak-shah)\.(?:jpe?g|webp)$/i.test(src) ||
    /\/assets\/(?:hero-doctors|dr-charmi|dr-zalak)-/i.test(src)
  );
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function walkHtml(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walkHtml(full, out);
    else if (name.endsWith(".html")) out.push(full);
  }
  return out;
}

function absoluteImage(siteUrl: string, raw: string): string | null {
  const src = raw.trim();
  if (!src || src.startsWith("data:")) return null;
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (src.startsWith("//")) return `https:${src}`;
  if (src.startsWith("/")) return `${siteUrl}${src}`;
  return null;
}

/** Larger responsive variant wins: `1536w` in the descriptor, else `-1536w` / `-800` in the filename. */
function widthHint(url: string, descriptor: string): number {
  const desc = /(\d+)w/.exec(descriptor);
  if (desc) return Number(desc[1]);
  const file = url.split("/").pop() ?? "";
  const named = /-(\d{3,4})w[.-]/.exec(file) ?? /-(\d{3,4})\.webp$/.exec(file);
  // Unsuffixed originals (article `*-scene.webp`) beat the `-800` derivative.
  return named ? Number(named[1]) : 10000;
}

/**
 * Doctor portraits are content on the homepage, About, the two profiles, and booking.
 * The same files also appear as small bylines on guides; those repeats are not listed.
 */
function isPortraitPage(pagePath: string): boolean {
  return (
    pagePath === "/" ||
    pagePath === "/about/" ||
    pagePath === "/dr-charmi-shah/" ||
    pagePath === "/dr-zalak-shah/" ||
    pagePath === "/book-consultation/"
  );
}

function keepImage(pagePath: string, loc: string): boolean {
  if (
    /\/assets\/(?:dr-charmi|dr-zalak)-/i.test(loc) ||
    /\/images\/dr-zalak-shah\.(?:jpe?g|webp)$/i.test(loc)
  ) {
    return isPortraitPage(pagePath);
  }
  if (/\/images\/hub-thumbs\//i.test(loc)) return pagePath.startsWith("/learn/watch/");
  return true;
}

/** Group size and hash variants of one photo so the sitemap lists a single file. */
function imageKey(url: string): string {
  const file = (url.split("?")[0].split("/").pop() ?? url).toLowerCase();
  const asset = /^(hero-doctors|dr-charmi|dr-zalak)-\d{3,4}w-/.exec(file);
  if (asset) return `asset:${asset[1]}`;
  return file.replace(/-\d{3,4}(?=\.webp$)/, "");
}

type ImageEntry = { loc: string; caption?: string; width: number };

function imagesInHtml(siteUrl: string, pagePath: string, html: string): Map<string, ImageEntry> {
  const found = new Map<string, ImageEntry>();
  const add = (raw: string, descriptor: string, caption?: string) => {
    const loc = absoluteImage(siteUrl, raw);
    if (!loc || !isCriticalImage(loc) || !keepImage(pagePath, loc)) return;
    const key = imageKey(loc);
    const width = widthHint(loc, descriptor);
    const prev = found.get(key);
    const preferWebp =
      prev &&
      width === prev.width &&
      /\.webp(?:$|\?)/i.test(loc) &&
      !/\.webp(?:$|\?)/i.test(prev.loc);
    if (!prev || width > prev.width || preferWebp) {
      found.set(key, { loc, caption: caption?.trim() || prev?.caption, width });
    } else if (!prev.caption && caption?.trim()) {
      prev.caption = caption.trim();
    }
  };

  if (pagePath === "/") {
    const og = /<meta\s+property="og:image"\s+content="([^"]+)"/i.exec(html)?.[1];
    const ogAlt = /<meta\s+property="og:image:alt"\s+content="([^"]*)"/i.exec(html)?.[1];
    if (og) add(og, "", ogAlt);
  }

  for (const tag of html.match(/<img\b[^>]*>/gi) ?? []) {
    const src = /src="([^"]+)"/i.exec(tag)?.[1];
    const alt = /alt="([^"]*)"/i.exec(tag)?.[1];
    if (src) add(src, "", alt);
    const srcset = /srcset="([^"]+)"/i.exec(tag)?.[1];
    if (srcset) {
      for (const part of srcset.split(",")) {
        const [url, desc] = part.trim().split(/\s+/);
        if (url) add(url, desc ?? "", alt);
      }
    }
  }
  for (const tag of html.match(/<source\b[^>]*>/gi) ?? []) {
    const srcset = /srcset="([^"]+)"/i.exec(tag)?.[1];
    if (!srcset) continue;
    for (const part of srcset.split(",")) {
      const [url, desc] = part.trim().split(/\s+/);
      if (url) add(url, desc ?? "");
    }
  }
  return found;
}

export function writeImageSitemap(
  siteUrl: string,
  outDir: string,
): { pages: number; images: number } {
  const origin = siteUrl.replace(/\/+$/, "");
  const byPage = new Map<string, Map<string, ImageEntry>>();

  for (const file of walkHtml(outDir)) {
    const html = fs.readFileSync(file, "utf8");
    if (!html.includes("data-seo-prerender")) continue;
    if (/<meta\s+name="robots"\s+content="[^"]*noindex/i.test(html)) continue;
    const canonical = /<link\s+rel="canonical"\s+href="([^"]+)"/i.exec(html)?.[1];
    if (!canonical || !canonical.startsWith(origin)) continue;
    const pagePath = `${canonical.slice(origin.length) || "/"}`.replace(/\/?$/, "/");
    const images = imagesInHtml(origin, pagePath, html);
    if (images.size === 0) continue;
    const page = byPage.get(canonical) ?? new Map<string, ImageEntry>();
    for (const [key, image] of images) {
      const prev = page.get(key);
      if (!prev || image.width > prev.width) page.set(key, image);
    }
    byPage.set(canonical, page);
  }

  const urls = [...byPage.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  const body = urls
    .map(([page, images]) => {
      const tags = [...images.values()]
        .sort((a, b) => a.loc.localeCompare(b.loc))
        .map((image) => {
          const caption = image.caption
            ? `\n      <image:caption>${escapeXml(image.caption.slice(0, 200))}</image:caption>`
            : "";
          return `    <image:image>\n      <image:loc>${escapeXml(image.loc)}</image:loc>${caption}\n    </image:image>`;
        })
        .join("\n");
      return `  <url>\n    <loc>${escapeXml(page)}</loc>\n${tags}\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Content photos on indexable pages: hero, doctors, classes, guides, Learn posters -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`;
  fs.writeFileSync(path.join(outDir, "sitemap-images.xml"), xml, "utf8");
  const images = urls.reduce((n, [, set]) => n + set.size, 0);
  return { pages: urls.length, images };
}
