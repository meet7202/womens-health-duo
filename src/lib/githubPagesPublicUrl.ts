/** Paths that are static files on the host (not `…/index.html` directories). */
const TRAILING_SLASH_EXCLUDE =
  /\.(txt|xml|html|svg|png|jpe?g|webp|ico|pdf|json|css|js|webmanifest|map)$/i;

/**
 * Absolute URL in the form GitHub Pages prefers for static `…/index.html` routes:
 * `/path` redirects to `/path/`, so canonicals, `<loc>` in sitemaps, OG/Twitter URLs, and
 * JSON-LD that references the page URL should use a trailing slash for directory pages.
 * Root stays `…/`. Real files (e.g. `llms.txt`, `sitemap.xml`) must not get a trailing slash.
 */
export function githubPagesAbsoluteUrl(siteUrl: string, pathname: string): string {
  const base = siteUrl.replace(/\/$/, "");
  const raw =
    pathname === "" || pathname === "/"
      ? "/"
      : pathname.startsWith("/")
        ? pathname
        : `/${pathname}`;
  const core = raw.replace(/\/+$/, "") || "/";
  if (core === "/") return `${base}/`;
  if (TRAILING_SLASH_EXCLUDE.test(core)) return `${base}${core}`;
  return `${base}${core}/`;
}
