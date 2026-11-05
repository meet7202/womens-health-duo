/**
 * SEO-40 — reviewable IndexNow change manifest from shell fingerprints + disposition.
 * Written at build into `dist/.indexnow-content-manifest.json`.
 */
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { SITEMAP_PATHS } from "../config/routes";
import { resolveRouteDisposition } from "../config/routeDisposition";
import { githubPagesAbsoluteUrl } from "../lib/githubPagesPublicUrl";
import { resolveShellPageMeta } from "./staticShellHead";

export type IndexNowContentEntry = {
  url: string;
  pathname: string;
  fingerprint: string;
  disposition: string;
  title: string;
  robots: string;
};

export type IndexNowContentManifest = {
  version: 1;
  siteUrl: string;
  generatedAt: string;
  entryCount: number;
  entries: Record<string, IndexNowContentEntry>;
};

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

function shellHtmlPath(outDirAbs: string, pathname: string): string {
  const norm = normalizePathname(pathname);
  if (norm === "/") return path.join(outDirAbs, "index.html");
  const rel = norm.replace(/^\/+/, "");
  return path.join(outDirAbs, ...rel.split("/"), "index.html");
}

function extractTitle(html: string): string {
  const m = html.match(/<title>([^<]*)<\/title>/i);
  return m ? m[1].trim() : "";
}

function extractMeta(html: string, name: string): string {
  const re = new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`, "i");
  const m = html.match(re);
  return m ? m[1].trim() : "";
}

function extractCanonical(html: string): string {
  const m = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  return m ? m[1].trim() : "";
}

function extractH1(html: string): string {
  const shell = html.match(/id=["']static-seo-shell["'][\s\S]*?<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (shell) return shell[1].replace(/<[^>]+>/g, "").trim();
  const root = html
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, "")
    .match(/id=["']root["'][^>]*>[\s\S]*?<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (root) return root[1].replace(/<[^>]+>/g, "").trim();
  return "";
}

function dispositionLabel(pathname: string): string {
  const d = resolveRouteDisposition(pathname);
  if (d.kind === "page") return `page:${d.indexable ? "indexable" : "noindex"}:${d.canonicalPath}`;
  if (d.kind === "redirect") return `redirect:${d.status}:${d.targetPath}`;
  return `gone:${d.status}`;
}

function fingerprintPayload(parts: Record<string, string>): string {
  const stable = Object.keys(parts)
    .sort()
    .map((k) => `${k}=${parts[k]}`)
    .join("\n");
  return createHash("sha256").update(stable).digest("hex");
}

/**
 * Build fingerprints for every sitemap path that has a static shell.
 * Uses shell HTML + disposition so content/meta/robots changes surface as updates.
 */
export function buildIndexNowContentManifest(
  siteUrl: string,
  outDirAbs: string,
): IndexNowContentManifest {
  const entries: Record<string, IndexNowContentEntry> = {};

  for (const pathname of SITEMAP_PATHS) {
    const norm = normalizePathname(pathname);
    const shellPath = shellHtmlPath(outDirAbs, norm);
    if (!fs.existsSync(shellPath)) continue;

    const html = fs.readFileSync(shellPath, "utf8");
    const meta = resolveShellPageMeta(siteUrl, norm);
    const title = extractTitle(html) || meta.title;
    const description = extractMeta(html, "description") || meta.metaDescription;
    const robots = extractMeta(html, "robots") || meta.robots || "";
    const canonical = extractCanonical(html) || meta.canonicalHref;
    const h1 = extractH1(html) || meta.h1;
    const disposition = dispositionLabel(norm);
    const fp = fingerprintPayload({
      title,
      description,
      robots,
      canonical,
      h1,
      disposition,
      ogType: meta.ogType ?? "website",
      ogImage: meta.ogImage ?? "",
    });
    const url = githubPagesAbsoluteUrl(siteUrl, norm);
    entries[url] = {
      url,
      pathname: norm,
      fingerprint: fp,
      disposition,
      title,
      robots,
    };
  }

  return {
    version: 1,
    siteUrl,
    generatedAt: new Date().toISOString(),
    entryCount: Object.keys(entries).length,
    entries,
  };
}

export function writeIndexNowContentManifest(siteUrl: string, outDirAbs: string): string {
  const manifest = buildIndexNowContentManifest(siteUrl, outDirAbs);
  const outPath = path.join(outDirAbs, ".indexnow-content-manifest.json");
  fs.writeFileSync(outPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return outPath;
}
