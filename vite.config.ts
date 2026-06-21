import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import {
  SITE_DEFAULT_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  KEYWORDS,
  OG_IMAGE_PATH,
  SITE_NAME,
} from "./src/config/site.defaults.ts";
import { SITEMAP_PATHS } from "./src/config/routes.ts";

/** Fallback if `sitemap.xml` is missing or has no `<loc>` rows (should not happen after `writeSeoFiles`). */
function sitemapPathnamesFallback(): string[] {
  return [...SITEMAP_PATHS];
}

/**
 * Pathnames listed in `dist/sitemap.xml` (must match `<loc>` after `writeSeoFiles`).
 * Keeps static `…/index.html` shells in sync with the shipped sitemap without duplicating logic.
 */
function pathnamesFromWrittenSitemap(siteUrl: string, outDirAbs: string): string[] {
  const sitemapFile = path.join(outDirAbs, "sitemap.xml");
  if (!fs.existsSync(sitemapFile)) return sitemapPathnamesFallback();

  const xml = fs.readFileSync(sitemapFile, "utf8");
  const paths = new Set<string>();

  for (const m of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)) {
    const loc = m[1]
      .replace(/&amp;/g, "&")
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    let pathname: string;
    try {
      pathname = new URL(loc).pathname || "/";
    } catch {
      continue;
    }
    if (pathname !== "/" && pathname.endsWith("/")) pathname = pathname.replace(/\/+$/, "") || "/";
    paths.add(pathname || "/");
  }

  return paths.size > 0 ? [...paths] : sitemapPathnamesFallback();
}

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function resolveSiteUrl(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  return (env.VITE_SITE_URL || SITE_DEFAULT_URL).replace(/\/$/, "");
}

/**
 * Vite `import.meta.env.BASE_URL` and emitted asset paths in `index.html`.
 * Must be root-relative (`/`) for the custom apex domain so deep links
 * (e.g. `/online-consultation/.../service`) still load `/assets/...`.
 * For GitHub project Pages, set `VITE_SITE_URL` to the full Pages origin including
 * the repo path (e.g. `https://meet7202.github.io/womens-health-duo`) so this becomes `/womens-health-duo/`.
 */
function vitePublicBase(siteUrl: string): string {
  try {
    const { pathname } = new URL(siteUrl);
    const normalized = pathname.replace(/\/$/, "");
    if (!normalized) return "/";
    return `${normalized}/`;
  } catch {
    return "/";
  }
}

function htmlSeoReplacements(siteUrl: string) {
  return {
    SITE_URL: siteUrl,
    SITE_NAME,
    DEFAULT_TITLE,
    DEFAULT_DESCRIPTION,
    KEYWORDS,
    OG_IMAGE_PATH,
    SITEMAP_URL: `${siteUrl}/sitemap.xml`,
  };
}

function applyHtmlReplacements(html: string, siteUrl: string) {
  const r = htmlSeoReplacements(siteUrl);
  return Object.entries(r).reduce(
    (acc, [key, value]) => acc.replaceAll(`@@SEO_${key}@@`, value),
    html,
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

/** Rough priority by path depth / template (static hub pages rank above long-tail service×city). */
function sitemapPriority(pathname: string): string {
  const segs = pathname.split("/").filter(Boolean);
  if (segs.length === 0) return "1.0";
  if (segs[0] === "learn") {
    if (segs.length === 1) return "0.92";
    if (segs.length === 2) return "0.88";
    return "0.86";
  }
  if (segs[0] === "online-consultation") {
    if (segs.length === 1) return "0.95";
    if (segs[1] === "country") return "0.88";
    if (segs.length === 2) return "0.82";
    return "0.72";
  }
  return "0.9";
}

const LEGACY_GLOBAL_ONLINE_SLUG_MAP_PATH = path.join(
  rootDir,
  "src/data/legacyGlobalOnlineSlugMap.json",
);

/** Legacy redirects not listed in `sitemap.xml` — still emit shells so bookmarks return 200 + SPA redirect. */
function legacyGlobalOnlineShellPathnames(): string[] {
  const legacyRaw = fs.existsSync(LEGACY_GLOBAL_ONLINE_SLUG_MAP_PATH)
    ? (JSON.parse(fs.readFileSync(LEGACY_GLOBAL_ONLINE_SLUG_MAP_PATH, "utf8")) as Record<
        string,
        string
      >)
    : {};
  return ["/global-online", ...Object.keys(legacyRaw).map((s) => `/global-online/${s}`)];
}

/** Every pathname in the written sitemap plus legacy `/global-online/*` shells. */
function staticSpaShellPathnames(siteUrl: string, outDirAbs: string): string[] {
  return [
    ...new Set([
      ...pathnamesFromWrittenSitemap(siteUrl, outDirAbs),
      ...legacyGlobalOnlineShellPathnames(),
    ]),
  ];
}

/** Copy the built root `index.html` under each route segment as `index.html` (SPA shell). */
function writeStaticSpaShells(siteUrl: string, outDirAbs: string) {
  const indexHtml = path.join(outDirAbs, "index.html");
  if (!fs.existsSync(indexHtml)) return;
  const html = fs.readFileSync(indexHtml);
  for (const pathname of staticSpaShellPathnames(siteUrl, outDirAbs)) {
    if (pathname === "/" || pathname === "") continue;
    const rel = pathname.replace(/^\/+/, "");
    if (!rel) continue;
    const dir = path.join(outDirAbs, ...rel.split("/"));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);
  }
}

function writeSeoFiles(siteUrl: string, outDir: string) {
  const lastmod = new Date().toISOString().slice(0, 10);

  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI / research crawlers (allow listing for discoverability; adjust if you prefer to opt out)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: CCBot
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

  const sitemapUrls = SITEMAP_PATHS.map((p) => {
    const loc = p === "/" ? `${siteUrl}/` : `${siteUrl}${p}`;
    const priority = sitemapPriority(p);
    return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated at build; edit SITEMAP_PATHS in src/config/routes.ts -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>
`;

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "robots.txt"), robots, "utf8");
  fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap, "utf8");
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl(mode);

  let outDirAbs = path.resolve(rootDir, "dist");

  return {
    base: vitePublicBase(siteUrl),
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      target: "es2022",
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules")) return;
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("lucide-react")) return "vendor-icons";
            if (id.includes("react-router")) return "vendor-router";
            if (id.includes("react-dom") || id.includes("/react/")) return "vendor-react";
            if (id.includes("@radix-ui")) return "vendor-radix";
            if (id.includes("sonner")) return "vendor-sonner";
            if (id.includes("zod")) return "vendor-zod";
            if (id.includes("@hookform")) return "vendor-hookform";
            if (id.includes("embla-carousel")) return "vendor-embla";
            if (id.includes("cmdk")) return "vendor-cmdk";
            if (id.includes("vaul")) return "vendor-vaul";
            // Remaining deps: let Rollup split automatically. A single catch-all `vendor` chunk
            // caused TDZ errors in production ("Cannot access 'A' before initialization").
          },
        },
      },
    },
    plugins: [
      react(),
      {
        name: "seo-html-and-files",
        configResolved(config) {
          outDirAbs = path.resolve(config.root, config.build.outDir);
        },
        transformIndexHtml(html) {
          return applyHtmlReplacements(html, siteUrl);
        },
        closeBundle() {
          writeSeoFiles(siteUrl, outDirAbs);
          const indexHtml = path.join(outDirAbs, "index.html");
          const notFoundHtml = path.join(outDirAbs, "404.html");
          if (fs.existsSync(indexHtml)) {
            fs.copyFileSync(indexHtml, notFoundHtml);
            writeStaticSpaShells(siteUrl, outDirAbs);
          }
        },
      },
    ],
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "./src"),
      },
    },
  };
});
