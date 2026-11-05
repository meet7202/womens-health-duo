/** Fingerprinted Vite assets + static binaries — safe for 1y immutable browser cache. */
export function isLongCachePath(pathname: string): boolean {
  if (pathname.startsWith("/assets/")) return true;
  if (pathname.startsWith("/fonts/")) return true;
  if (pathname.startsWith("/images/hub-thumbs/")) return true;
  const lower = pathname.toLowerCase();
  return /\.(js|mjs|css|woff2?|ttf|otf|map)$/i.test(lower);
}

export const IMMUTABLE_CACHE_CONTROL = "public, max-age=31536000, immutable";

/** Browser Cache-Control for long-lived hashed / font assets (Lighthouse “efficient cache lifetimes”). */
export function withImmutableCache(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", IMMUTABLE_CACHE_CONTROL);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

/** cf option: disable Rocket Loader on Worker-handled responses (Lighthouse long tasks). */
export const FETCH_NO_ROCKET_LOADER = { cf: { rocketLoader: false } } as const;
