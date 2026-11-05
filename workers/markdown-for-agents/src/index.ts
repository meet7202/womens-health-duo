import {
  estimateMarkdownTokens,
  htmlToMarkdown,
  shouldSkipMarkdownPath,
  wantsMarkdown,
} from "./convert";
import { FETCH_NO_ROCKET_LOADER, isLongCachePath, withImmutableCache } from "./cacheHeaders";

export interface Env {
  ORIGIN_HOST: string;
  ORIGIN_RESOLVE_OVERRIDE: string;
}

/** Internal header so origin subrequests skip markdown conversion (avoids worker loops). */
const ORIGIN_FETCH_HEADER = "x-whd-markdown-origin-fetch";

function originFetchRequest(request: Request): Request {
  const headers = new Headers(request.headers);
  headers.delete("Accept");
  headers.set("Accept", "text/html,application/xhtml+xml;q=0.9,*/*;q=0.8");
  headers.set(ORIGIN_FETCH_HEADER, "1");

  return new Request(request.url, {
    method: "GET",
    headers,
    redirect: "follow",
  });
}

function stripOriginFetchHeader(request: Request): Request {
  const headers = new Headers(request.headers);
  headers.delete(ORIGIN_FETCH_HEADER);
  return new Request(request.url, {
    method: request.method,
    headers,
    redirect: request.redirect,
  });
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

/** Same-zone fetch with Rocket Loader disabled; long-cache hashed static assets. */
async function fetchPassthrough(request: Request, pathname: string): Promise<Response> {
  const response = await fetch(request, FETCH_NO_ROCKET_LOADER);
  if (isLongCachePath(pathname) && response.ok) {
    return withImmutableCache(response);
  }
  return response;
}

export default {
  async fetch(request: Request, _env: Env): Promise<Response> {
    if (request.headers.get(ORIGIN_FETCH_HEADER) === "1") {
      return fetch(stripOriginFetchHeader(request), FETCH_NO_ROCKET_LOADER);
    }

    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return fetch(request, FETCH_NO_ROCKET_LOADER);
    }

    if (shouldSkipMarkdownPath(url.pathname)) {
      return fetchPassthrough(request, url.pathname);
    }

    if (!wantsMarkdown(request.headers.get("Accept"))) {
      return fetchPassthrough(request, url.pathname);
    }

    let originResponse: Response;
    try {
      originResponse = await fetch(originFetchRequest(request), FETCH_NO_ROCKET_LOADER);
    } catch {
      return fetchPassthrough(request, url.pathname);
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
