/**
 * Forces `https:` for real deploy hostnames so SEO artifacts (sitemap, shells, `SITE_URL`)
 * never emit `http://` if `VITE_SITE_URL` was misconfigured. Leaves localhost / 127.0.0.1
 * unchanged. Preserves pathname (needed for GitHub project Pages bases like `/repo`).
 */
export function ensureHttpsSiteOrigin(siteUrl: string): string {
  const s = siteUrl.trim().replace(/\/$/, "");
  if (!s) return s;
  try {
    const u = new URL(s.startsWith("http") ? s : `https://${s}`);
    if (u.hostname === "localhost" || u.hostname === "127.0.0.1") {
      return s;
    }
    if (u.protocol === "http:") {
      u.protocol = "https:";
    }
    const path = u.pathname === "/" ? "" : u.pathname.replace(/\/$/, "");
    return `${u.protocol}//${u.host}${path}`;
  } catch {
    return s;
  }
}
