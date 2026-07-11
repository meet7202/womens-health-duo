/** Paths that are static files on the host (not `…/index.html` directories). */
const TRAILING_SLASH_EXCLUDE =
  /\.(txt|xml|html|svg|png|jpe?g|webp|ico|pdf|json|css|js|webmanifest|map)$/i;

function pathCore(pathname: string): string {
  const raw =
    pathname === "" || pathname === "/"
      ? "/"
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  return raw.replace(/\/+$/, "") || "/";
}

export function isStaticAssetPath(core: string): boolean {
  return core !== "/" && TRAILING_SLASH_EXCLUDE.test(core);
}

/**
 * Canonical pathname for in-app links and GitHub Pages directory URLs.
 * Root is `/`; directory pages end with `/`; static files (`.xml`, `.txt`, …) do not.
 * Aligns with sitemap `<loc>` and `githubPagesAbsoluteUrl()`.
 */
export function publicPathname(pathname: string): string {
  const core = pathCore(pathname);
  if (core === "/") return "/";
  if (isStaticAssetPath(core)) return core;
  return `${core}/`;
}

/**
 * Absolute URL in the form GitHub Pages prefers for static `…/index.html` routes:
 * `/path` redirects to `/path/`, so canonicals, `<loc>` in sitemaps, OG/Twitter URLs, and
 * JSON-LD that references the page URL should use a trailing slash for directory pages.
 * Root stays `…/`. Real files (e.g. `llms.txt`, `sitemap.xml`) must not get a trailing slash.
 */
export function githubPagesAbsoluteUrl(siteUrl: string, pathname: string): string {
  const base = siteUrl.replace(/\/$/, "");
  const pub = publicPathname(pathname);
  if (pub === "/") return `${base}/`;
  return `${base}${pub}`;
}

/** React Router `path` for a public directory URL (always ends with `/` except `/` and `*`). */
export function publicRoutePath(pattern: string): string {
  if (pattern === "/" || pattern === "*") return pattern;
  if (pattern.endsWith("/")) return pattern;
  return `${pattern.replace(/\/+$/, "")}/`;
}

/** True when the browser should redirect to `publicPathname(pathname)`. */
export function needsPublicTrailingSlash(pathname: string): boolean {
  const core = pathCore(pathname);
  if (core === "/") return false;
  if (isStaticAssetPath(core)) return false;
  return !pathname.endsWith("/");
}
