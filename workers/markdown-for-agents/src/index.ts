import {
  estimateMarkdownTokens,
  htmlToMarkdown,
  shouldSkipMarkdownPath,
  wantsMarkdown,
} from "./convert";
import { isLongCachePath, withImmutableCache } from "./cacheHeaders";

export interface Env {
  ORIGIN_HOST: string;
  /**
   * Optional same-zone CNAME that points at GitHub Pages (e.g. `origin.womenshealthduo.com`).
   * Used only with `cf.resolveOverride` — ignored when empty or outside this zone.
   */
  ORIGIN_RESOLVE_OVERRIDE?: string;
}

function isA2aPath(pathname: string): boolean {
  return pathname === "/a2a" || pathname.startsWith("/a2a/");
}

/**
 * Forward to the zone origin without re-entering this Worker.
 * Always pass the *incoming* Request object to `fetch` (Cloudflare routes that to origin).
 * Optionally set `resolveOverride` when a same-zone CNAME is configured.
 */
function originFetchInit(env: Env): RequestInit {
  const cf: Record<string, unknown> = { rocketLoader: false };
  const override = env.ORIGIN_RESOLVE_OVERRIDE?.trim();
  if (override) {
    cf.resolveOverride = override;
  }
  return { cf };
}

/** Same-zone fetch with Rocket Loader disabled; long-cache hashed static assets. */
async function fetchPassthrough(
  request: Request,
  pathname: string,
  env: Env,
): Promise<Response> {
  const response = await fetch(request, originFetchInit(env));
  if (isLongCachePath(pathname) && response.ok) {
    return withImmutableCache(response);
  }
  return response;
}

function mergeVary(existing: string | null, value: string): string {
  if (!existing) return value;
  const parts = existing.split(",").map((p) => p.trim().toLowerCase());
  if (parts.includes(value.toLowerCase())) return existing;
  return `${existing}, ${value}`;
}

async function markdownEtag(body: string): Promise<string> {
  const data = new TextEncoder().encode(body);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const hex = [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 24);
  return `W/"md-${hex}"`;
}

function markdownHeaders(
  originHeaders: Headers,
  extras?: { tokens?: number; originalTokens?: number; etag?: string },
): Headers {
  const headers = new Headers(originHeaders);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Vary", mergeVary(headers.get("Vary"), "Accept"));
  headers.delete("Content-Encoding");
  headers.delete("Content-Length");
  // Origin HTML ETag does not match the markdown body.
  headers.delete("ETag");
  if (extras?.etag) headers.set("ETag", extras.etag);
  if (extras?.tokens != null) headers.set("x-markdown-tokens", String(extras.tokens));
  if (extras?.originalTokens != null) {
    headers.set("x-original-tokens", String(extras.originalTokens));
  }
  return headers;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Leave /a2a* to whd-a2a-agent (more specific route); still pass original Request to origin path.
    if (isA2aPath(url.pathname)) {
      return fetch(request, originFetchInit(env));
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return fetch(request, originFetchInit(env));
    }

    if (shouldSkipMarkdownPath(url.pathname)) {
      return fetchPassthrough(request, url.pathname, env);
    }

    if (!wantsMarkdown(request.headers.get("Accept"))) {
      return fetchPassthrough(request, url.pathname, env);
    }

    let originResponse: Response;
    try {
      // Critical: fetch the *incoming* Request so CF hits origin (no Worker loop).
      // Do not construct `new Request(url)` for same-host origin fetches.
      originResponse = await fetch(request, originFetchInit(env));
    } catch {
      return fetchPassthrough(request, url.pathname, env);
    }

    const contentType = originResponse.headers.get("Content-Type") ?? "";
    if (!contentType.includes("text/html")) {
      return originResponse;
    }

    // HEAD must advertise the same negotiated representation as GET (SEO-29).
    if (request.method === "HEAD") {
      const headers = markdownHeaders(originResponse.headers);
      return new Response(null, { status: originResponse.status, headers });
    }

    // Preserve a usable origin body if conversion fails after we consume the stream.
    const originFallback = originResponse.clone();
    const html = await originResponse.text();

    let markdown: string;
    try {
      markdown = htmlToMarkdown(html);
    } catch {
      return originFallback;
    }

    const etag = await markdownEtag(markdown);
    const headers = markdownHeaders(originResponse.headers, {
      etag,
      tokens: estimateMarkdownTokens(markdown),
      originalTokens: estimateMarkdownTokens(html),
    });

    return new Response(markdown, {
      status: originResponse.status,
      headers,
    });
  },
};
