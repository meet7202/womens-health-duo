/**
 * Old class photos and Learn thumbnails were published as JPEG and are now WebP.
 * A 301 keeps the indexed JPEG address pointed at the file Google should keep.
 */
const LEGACY_JPEG = /^\/images\/(classes|hub-thumbs)\/(.+)\.jpe?g$/i;

export function legacyJpegRedirectTarget(url: URL): string | null {
  const match = url.pathname.match(LEGACY_JPEG);
  if (!match) return null;
  const target = new URL(url.href);
  target.pathname = `/images/${match[1]}/${match[2]}.webp`;
  return target.href;
}

/**
 * Redirect only when the WebP is already on the origin. Until the site deploy,
 * the old JPEG must keep working.
 */
export async function legacyJpegRedirect(
  url: URL,
  probe: (target: string) => Promise<Response>,
): Promise<Response | null> {
  const location = legacyJpegRedirectTarget(url);
  if (!location) return null;
  const found = await probe(location);
  if (!found.ok) return null;
  return new Response(null, {
    status: 301,
    headers: {
      Location: location,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
