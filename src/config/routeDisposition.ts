/**
 * Authoritative route disposition (SEO-02): routability ≠ indexability ≠ aliases.
 * Must not use `@/` imports (loaded from `vite.config.ts` / Node).
 *
 * - Sitemap entries: canonical indexable `page` routes only.
 * - Static HTML shells: all `page` routes + explicit `redirect` aliases (interim meta-refresh
 *   until Cloudflare 301/308 is verified).
 * - `gone`: true not-found; do not emit sitemap or alias shells.
 */
import { KNOWLEDGE_HUB_VIDEOS, knowledgeHubWatchIdAliases } from "../data/knowledgeHubVideos";
import { learnVideoWatchPath } from "../lib/learnHubUrls";
import { ROUTES } from "./routes";

export type RouteDisposition =
  | { kind: "page"; indexable: boolean; canonicalPath: string }
  | { kind: "redirect"; targetPath: string; status: 301 | 308 }
  | { kind: "gone"; status: 404 | 410 };

export type PublicRouteRecord = {
  /** Slashless path matching `ROUTES` / sitemap entries. */
  path: string;
  template: string;
  disposition: RouteDisposition;
  contentKey?: string;
};

/** Default robots for indexable marketing pages. */
export const ROBOTS_INDEX_FOLLOW =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

/** Crawlable but excluded from search results (errors, intentional noindex). */
export const ROBOTS_NOINDEX_FOLLOW = "noindex, follow";

/** Soft 404 / true errors — do not follow internal dead ends into the index. */
export const ROBOTS_NOINDEX_NOFOLLOW = "noindex, nofollow";

function normalizeDispositionPath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const withSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

/**
 * Explicit permanent aliases. Shells are generated; sitemap membership is denied.
 * Edge 301/308 is preferred (`docs/seo-cloudflare-redirects.md`).
 */
export const EXPLICIT_REDIRECT_ALIASES: readonly PublicRouteRecord[] = [
  {
    path: ROUTES.zalakPrenatalClasses,
    template: "zalak-class-alias",
    disposition: { kind: "redirect", targetPath: ROUTES.prenatal, status: 301 },
    contentKey: "class:prenatal",
  },
  {
    path: ROUTES.zalakPostnatalClasses,
    template: "zalak-class-alias",
    disposition: { kind: "redirect", targetPath: ROUTES.postnatal, status: 301 },
    contentKey: "class:postnatal",
  },
  {
    path: ROUTES.zalakPilatesClasses,
    template: "zalak-class-alias",
    disposition: { kind: "redirect", targetPath: ROUTES.pilates, status: 301 },
    contentKey: "class:pilates",
  },
] as const;

const REDIRECT_BY_PATH = new Map(
  EXPLICIT_REDIRECT_ALIASES.map((r) => [normalizeDispositionPath(r.path), r] as const),
);

/** YouTube / Instagram platform-id watch aliases → canonical hub watch ids. */
export function learnWatchPlatformAliasShellPathnames(): string[] {
  const paths: string[] = [];
  for (const video of KNOWLEDGE_HUB_VIDEOS) {
    for (const alias of knowledgeHubWatchIdAliases(video)) {
      paths.push(learnVideoWatchPath(alias));
    }
  }
  return [...new Set(paths)];
}

/** Paths that need static HTML shells for redirects (not in sitemaps). */
export function redirectAliasShellPathnames(): string[] {
  return [
    ...EXPLICIT_REDIRECT_ALIASES.map((r) => r.path),
    ...learnWatchPlatformAliasShellPathnames(),
  ];
}

/**
 * Resolve disposition for a known or unknown path.
 * Indexable sitemap paths default to `{ kind: "page", indexable: true }`.
 * Unknown dynamic slugs are `gone` (true not-found) — callers still render NotFound.
 */
export function resolveRouteDisposition(
  pathname: string,
  options: { knownIndexablePaths?: ReadonlySet<string> } = {},
): RouteDisposition {
  const path = normalizeDispositionPath(pathname);
  const alias = REDIRECT_BY_PATH.get(path);
  if (alias && alias.disposition.kind === "redirect") {
    return alias.disposition;
  }

  if (options.knownIndexablePaths) {
    if (options.knownIndexablePaths.has(path)) {
      return { kind: "page", indexable: true, canonicalPath: path };
    }
    // Known non-indexable page shells (future): extend with an explicit registry.
    return { kind: "gone", status: 404 };
  }

  // Without an indexable set (client), treat explicit aliases only; pages stay indexable
  // unless SeoHead is told otherwise (NotFound sets noindex).
  return { kind: "page", indexable: true, canonicalPath: path };
}

export function robotsContentForDisposition(disposition: RouteDisposition): string {
  if (disposition.kind === "redirect") {
    // Alias shells should not be indexed; canonical points at the target.
    return ROBOTS_NOINDEX_FOLLOW;
  }
  if (disposition.kind === "gone") {
    return ROBOTS_NOINDEX_NOFOLLOW;
  }
  return disposition.indexable ? ROBOTS_INDEX_FOLLOW : ROBOTS_NOINDEX_FOLLOW;
}

/** True when this path must never appear in sitemaps. */
export function isSitemapExcludedPath(pathname: string): boolean {
  const d = resolveRouteDisposition(pathname);
  return d.kind !== "page" || !d.indexable;
}
