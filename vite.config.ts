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
  GTM_CONTAINER_ID,
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
import { redirectAliasShellPathnames } from "./src/config/routeDisposition.ts";
import { learnWatchShellPathnames } from "./src/lib/learnHubUrls.ts";
import {
  applyShellPageMetaToHtml,
  assertShellPagePlaceholdersPresent,
  notFoundShellMeta,
  resolveShellPageMeta,
} from "./src/build/staticShellHead.ts";
import { prerenderPriorityPagesIntoShells } from "./src/build/prerenderPriorityPages.ts";
import { ensureHomepageHeroLcpHint } from "./src/build/homepageHeroPreload.ts";
import { writeIndexNowContentManifest } from "./src/build/indexnowContentManifest.ts";
import { githubPagesAbsoluteUrl } from "./src/lib/githubPagesPublicUrl.ts";
import { ensureHttpsSiteOrigin } from "./src/lib/ensureHttpsSiteOrigin.ts";
import { buildVideoSitemapXml, videoSitemapEntryCount } from "./src/build/videoSitemap.ts";
import { writeAgentDiscoveryFiles } from "./src/build/agentDiscovery.ts";

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

/** Public GTM container ids look like `GTM-XXXXXXX` (alphanumeric). */
const GTM_CONTAINER_ID_RE = /^GTM-[A-Z0-9]+$/i;

function isValidGtmContainerId(id: string): boolean {
  return GTM_CONTAINER_ID_RE.test(id.trim());
}

function resolveGtmContainerId(mode: string): string {
  const env = loadEnv(mode, process.cwd(), "");
  const fromEnv = (env.VITE_GTM_ID || "").trim();
  const candidate = fromEnv || GTM_CONTAINER_ID;
  if (!isValidGtmContainerId(candidate)) {
    console.warn(
      `[seo] Invalid GTM container id ${JSON.stringify(candidate)}; omitting GTM loader snippets.`,
    );
    return "";
  }
  return candidate;
}

function htmlSeoReplacements(siteUrl: string, gtmId: string = GTM_CONTAINER_ID) {
  return {
    SITE_URL: siteUrl,
    SITE_NAME,
    DEFAULT_TITLE,
    DEFAULT_DESCRIPTION,
    KEYWORDS,
    OG_IMAGE_PATH,
    SITEMAP_URL: `${siteUrl}/sitemap.xml`,
    LLMS_TXT_URL: `${siteUrl}/llms.txt`,
    AGENT_SKILLS_INDEX_URL: `${siteUrl}/.well-known/agent-skills/index.json`,
    CONTENT_CATALOG_URL: `${siteUrl}/.well-known/content-catalog.json`,
    GTM_CONTAINER_ID: gtmId,
  };
}

/**
 * Remove GTM loader + noscript iframe when the container id is missing/invalid so a literal
 * `@@SEO_GTM_CONTAINER_ID@@` placeholder never ships as a request URL.
 * Keeps the dataLayer / gtag shim (whatsapp_click) intact.
 */
function stripGtmLoaderSnippets(html: string): string {
  return html
    .replace(
      /\n?\s*<script>\s*\(function \(w, d, s, l, i\) \{[\s\S]*?\}\)\(window, document, "script", "dataLayer", "@@SEO_GTM_CONTAINER_ID@@"\);\s*<\/script>/i,
      "",
    )
    .replace(/\n?\s*<!-- Google Tag Manager \(noscript\) -->\s*<noscript[\s\S]*?<\/noscript>/i, "")
    .replaceAll("@@SEO_GTM_CONTAINER_ID@@", "");
}

function applyHtmlReplacements(html: string, siteUrl: string, gtmId: string = GTM_CONTAINER_ID) {
  const safeGtmId = isValidGtmContainerId(gtmId) ? gtmId.trim() : "";
  if (!safeGtmId) {
    const stripped = stripGtmLoaderSnippets(html);
    const r = htmlSeoReplacements(siteUrl, "");
    const withoutGtmKey = Object.fromEntries(
      Object.entries(r).filter(([key]) => key !== "GTM_CONTAINER_ID"),
    );
    return Object.entries(withoutGtmKey).reduce(
      (acc, [key, value]) => acc.replaceAll(`@@SEO_${key}@@`, value),
      stripped,
    );
  }

  const r = htmlSeoReplacements(siteUrl, safeGtmId);
  const replaced = Object.entries(r).reduce(
    (acc, [key, value]) => acc.replaceAll(`@@SEO_${key}@@`, value),
    html,
  );
  if (replaced.includes("@@SEO_GTM_CONTAINER_ID@@")) {
    throw new Error(
      "[seo] @@SEO_GTM_CONTAINER_ID@@ was not replaced — refusing to emit HTML with a literal GTM placeholder.",
    );
  }
  return replaced;
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

/**
 * Sitemap urlset builder (SEO-09).
 * Omit `<lastmod>` until a verified per-URL content revision exists — build-day stamps
 * are not meaningful content modification dates. Google treats lastmod as optional.
 */
function buildUrlsetXml(
  paths: readonly string[],
  siteUrl: string,
  _lastmod: string,
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

/**
 * Every pathname that gets a static HTML shell (SEO-02):
 * indexable sitemap pages + explicit redirect aliases + legacy global-online aliases.
 * Sitemap membership stays separate (`SITEMAP_PATHS*` only).
 */
function staticSpaShellPathnames(): string[] {
  return [
    ...new Set([
      ...allSitemapPathnames(),
      ...learnWatchShellPathnames(),
      ...legacyGlobalOnlineShellPathnames(),
      ...redirectAliasShellPathnames(),
    ]),
  ];
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

  // Distinct 404 from the same placeholder template (not the already-substituted homepage).
  fs.writeFileSync(
    path.join(outDirAbs, "404.html"),
    applyShellPageMetaToHtml(raw, notFoundShellMeta(siteUrl, "/404"), siteUrl),
  );
}

function writeIndexNowKeyFile(outDir: string, key: string) {
  const trimmed = key.trim();
  if (!trimmed) return;
  fs.writeFileSync(path.join(outDir, `${trimmed}.txt`), `${trimmed}\n`, "utf8");
}

function writeSeoFiles(siteUrl: string, outDir: string, indexNowKey = "") {
  const lastmod = new Date().toISOString().slice(0, 10);

  const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Content-Signal: search=yes, ai-input=yes, ai-train=no
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Agent fetch / search crawlers (aligns with Cloudflare managed block: training bots Disallow there)
User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: anthropic-ai
Allow: /

# Anthropic search / user retrieval (training ClaudeBot stays under Cloudflare managed Disallow)
User-agent: Claude-SearchBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: PerplexityBot
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
        // Build clock for tooling only — not emitted as sitemap lastmod (SEO-09).
        buildDate: lastmod,
        lastmodStrategy: "omit-until-verified-content-revision",
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

  writeAgentDiscoveryFiles(siteUrl, rootDir, outDir);
  writeIndexNowKeyFile(outDir, indexNowKey);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = resolveSiteUrl(mode);
  const gtmContainerId = resolveGtmContainerId(mode);
  const indexNowKey = env.INDEXNOW_KEY?.trim() ?? "";

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
        name: "cf-async-module-scripts",
        transformIndexHtml: {
          order: "post",
          handler(html) {
            // Tell Cloudflare Rocket Loader to leave Vite module graphs alone if RL is on.
            return html.replace(
              /<script(?![^>]*\bdata-cfasync=)([^>]*\btype=(["'])module\2)/gi,
              '<script data-cfasync="false"$1',
            );
          },
        },
      },
      {
        name: "seo-html-and-files",
        configResolved(config) {
          outDirAbs = path.resolve(config.root, config.build.outDir);
        },
        transformIndexHtml(html, ctx) {
          const withSeo = applyHtmlReplacements(html, siteUrl, gtmContainerId);
          // Dev server only: resolve PAGE_* so raw placeholders never flash.
          // Production `vite build` must keep `@@PAGE_*@@` for writeStaticSpaShells (closeBundle).
          // Prefer argv over ctx.server — some Vite paths expose a server-like ctx during build.
          const isCliBuild = process.argv.some((a) => a === "build" || a.endsWith("/build"));
          if (!isCliBuild && ctx.server) {
            return applyShellPageMetaToHtml(withSeo, resolveShellPageMeta(siteUrl, "/"), siteUrl);
          }
          return withSeo;
        },
        async closeBundle() {
          writeSeoFiles(siteUrl, outDirAbs, indexNowKey);
          const indexHtml = path.join(outDirAbs, "index.html");
          if (fs.existsSync(indexHtml)) {
            writeStaticSpaShells(siteUrl, outDirAbs);
            // SEO-10 foundation: React 18 renderToString into priority shells (soft-fail).
            // Skip with WHD_PRERENDER=0 when debugging shell-only builds.
            if (process.env.WHD_PRERENDER !== "0") {
              const prerender = await prerenderPriorityPagesIntoShells(outDirAbs, rootDir);
              console.info(
                `[seo-10] prerender priority pages: ${prerender.succeeded}/${prerender.attempted} ok` +
                  (prerender.failed ? `, ${prerender.failed} failed` : ""),
              );
              if (prerender.errors.length) {
                for (const line of prerender.errors.slice(0, 8)) {
                  console.warn(`[seo-10] ${line}`);
                }
                if (prerender.errors.length > 8) {
                  console.warn(`[seo-10] … ${prerender.errors.length - 8} more`);
                }
              }
            }
            // SEO-25: prefer prerendered hero picture; otherwise homepage-only responsive preload.
            const heroHint = ensureHomepageHeroLcpHint(outDirAbs);
            console.info(`[seo-25] homepage hero LCP: ${heroHint.mode}`);
            // SEO-40: fingerprint manifest for change-aware IndexNow dry-runs.
            const manifestPath = writeIndexNowContentManifest(siteUrl, outDirAbs);
            console.info(`[seo-40] IndexNow content manifest → ${path.basename(manifestPath)}`);
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
