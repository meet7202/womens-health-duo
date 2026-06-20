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
  TWITTER_SITE,
  OG_IMAGE_PATH,
  SITE_NAME,
} from "./src/config/site.defaults.ts";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

function resolveSiteUrl(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  return (env.VITE_SITE_URL || SITE_DEFAULT_URL).replace(/\/$/, "");
}

function htmlSeoReplacements(siteUrl: string) {
  return {
    SITE_URL: siteUrl,
    SITE_NAME,
    DEFAULT_TITLE,
    DEFAULT_DESCRIPTION,
    KEYWORDS,
    TWITTER_SITE,
    OG_IMAGE_PATH,
  };
}

function applyHtmlReplacements(html: string, siteUrl: string) {
  const r = htmlSeoReplacements(siteUrl);
  return Object.entries(r).reduce(
    (acc, [key, value]) => acc.replaceAll(`@@SEO_${key}@@`, value),
    html,
  );
}

function writeSeoFiles(siteUrl: string, outDir: string) {
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

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
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
    server: {
      host: "::",
      port: 8080,
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
