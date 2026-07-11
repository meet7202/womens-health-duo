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
import {
  SITEMAP_PATHS,
  SITEMAP_PATHS_PRIMARY_URLSET,
  SITEMAP_SEGMENT_INTERNATIONAL_CONSULTATION,
  SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES,
  sitemapPriorityForPath,
  sitemapPriorityVirtualServiceCityLongtail,
  sitemapUrlsetKindForPath,
} from "./src/config/routes.ts";
import {
  applyShellPageMetaToHtml,
  assertShellPagePlaceholdersPresent,
  resolveShellPageMeta,
} from "./src/build/staticShellHead.ts";
import { githubPagesAbsoluteUrl } from "./src/lib/githubPagesPublicUrl.ts";
import { ensureHttpsSiteOrigin } from "./src/lib/ensureHttpsSiteOrigin.ts";
import { buildVideoSitemapXml, videoSitemapEntryCount } from "./src/build/videoSitemap.ts";

/** Every indexable pathname (primary + supplemental sitemaps); used for static SPA shells. */
function allSitemapPathnames(): string[] {
  return [...SITEMAP_PATHS];
}

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function resolveSiteUrl(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  return ensureHttpsSiteOrigin((env.VITE_SITE_URL || SITE_DEFAULT_URL).replace(/\/$/, ""));
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
    LLMS_TXT_URL: `${siteUrl}/llms.txt`,
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

type SitemapChildKind = "core" | "learn" | "guides" | "virtual";

function sitemapChangefreq(pathname: string, kind: SitemapChildKind): string {
  if (kind === "core") {
    if (pathname === "/medical-disclaimer" || pathname === "/editorial-policy") return "yearly";
    return "weekly";
  }
  if (kind === "learn") return "weekly";
  if (kind === "guides") return "monthly";
  const segs = pathname.split("/").filter(Boolean);
  if (segs.length >= 3 && segs[0] === "online-consultation" && segs[1] !== "country") {
    return "monthly";
  }
  return "weekly";
}

function buildUrlsetXml(
  paths: readonly string[],
  siteUrl: string,
  lastmod: string,
  comment: string,
  opts: {
    priority: (p: string) => string;
    changefreq: (p: string) => string;
  },
): string {
  const body = paths
    .map((p) => {
      const loc = githubPagesAbsoluteUrl(siteUrl, p);
      return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${opts.changefreq(p)}</changefreq>
    <priority>${opts.priority(p)}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- ${comment} -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
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

/** Every pathname we ship in sitemaps plus legacy `/global-online/*` shells. */
function staticSpaShellPathnames(): string[] {
  return [...new Set([...allSitemapPathnames(), ...legacyGlobalOnlineShellPathnames()])];
}

/** Copy the built root `index.html` under each route segment as `index.html` (SPA shell). */
function writeStaticSpaShells(siteUrl: string, outDirAbs: string) {
  const indexHtmlPath = path.join(outDirAbs, "index.html");
  if (!fs.existsSync(indexHtmlPath)) return;
  const raw = fs.readFileSync(indexHtmlPath, "utf8");
  assertShellPagePlaceholdersPresent(raw);

  fs.writeFileSync(
    indexHtmlPath,
    applyShellPageMetaToHtml(raw, resolveShellPageMeta(siteUrl, "/"), siteUrl),
  );

  for (const pathname of staticSpaShellPathnames()) {
    if (pathname === "/" || pathname === "") continue;
    const rel = pathname.replace(/^\/+/, "");
    if (!rel) continue;
    const dir = path.join(outDirAbs, ...rel.split("/"));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, "index.html"),
      applyShellPageMetaToHtml(raw, resolveShellPageMeta(siteUrl, pathname), siteUrl),
    );
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
Sitemap: ${siteUrl}/sitemap-virtual-service-cities.xml
Sitemap: ${siteUrl}/sitemap-videos.xml
`;

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "robots.txt"), robots, "utf8");

  fs.writeFileSync(
    path.join(outDir, "sitemap.xml"),
    buildUrlsetXml(
      SITEMAP_PATHS_PRIMARY_URLSET,
      siteUrl,
      lastmod,
      "Primary urlset: full site except service×city matrix (see sitemap-virtual-service-cities.xml).",
      {
        priority: sitemapPriorityForPath,
        changefreq: (p) => sitemapChangefreq(p, sitemapUrlsetKindForPath(p)),
      },
    ),
    "utf8",
  );

  fs.writeFileSync(
    path.join(outDir, "sitemap-virtual-service-cities.xml"),
    buildUrlsetXml(
      SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES,
      siteUrl,
      lastmod,
      "Supplemental: service×city URLs only (lower priority; not duplicated in sitemap.xml)",
      {
        priority: () => sitemapPriorityVirtualServiceCityLongtail(),
        changefreq: () => "monthly",
      },
    ),
    "utf8",
  );

  fs.writeFileSync(
    path.join(outDir, "sitemap-videos.xml"),
    buildVideoSitemapXml(siteUrl, lastmod),
    "utf8",
  );

  fs.writeFileSync(
    path.join(outDir, ".sitemap-build-meta.json"),
    JSON.stringify(
      {
        lastmod,
        siteUrl,
        primaryUrlCount: SITEMAP_PATHS_PRIMARY_URLSET.length,
        virtualServiceCityUrlCount: SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES.length,
        videoUrlCount: videoSitemapEntryCount(),
        internationalConsultationUrlCount: SITEMAP_SEGMENT_INTERNATIONAL_CONSULTATION.length,
        staticShellCount: staticSpaShellPathnames().length,
      },
      null,
      2,
    ),
    "utf8",
  );
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const siteUrl = resolveSiteUrl(mode);

  let outDirAbs = path.resolve(rootDir, "dist");
  let isBuildCommand = false;

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
          isBuildCommand = config.command === "build";
        },
        transformIndexHtml(html) {
          const withSeo = applyHtmlReplacements(html, siteUrl);
          // Dev: resolve placeholders so `@@PAGE_STATIC_FALLBACK@@` is not shown as raw text.
          // Production: keep `@@PAGE_*@@` in emitted `dist/index.html` for `writeStaticSpaShells`.
          if (isBuildCommand) return withSeo;
          return applyShellPageMetaToHtml(withSeo, resolveShellPageMeta(siteUrl, "/"), siteUrl);
        },
        closeBundle() {
          writeSeoFiles(siteUrl, outDirAbs);
          const indexHtml = path.join(outDirAbs, "index.html");
          const notFoundHtml = path.join(outDirAbs, "404.html");
          if (fs.existsSync(indexHtml)) {
            writeStaticSpaShells(siteUrl, outDirAbs);
            fs.copyFileSync(indexHtml, notFoundHtml);
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
