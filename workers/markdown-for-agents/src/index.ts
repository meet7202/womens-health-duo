import {
  estimateMarkdownTokens,
  htmlToMarkdown,
  shouldSkipMarkdownPath,
  wantsMarkdown,
} from "./convert";

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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.headers.get(ORIGIN_FETCH_HEADER) === "1") {
      return fetch(stripOriginFetchHeader(request));
    }

    const url = new URL(request.url);

    if (request.method !== "GET" && request.method !== "HEAD") {
      return fetch(request);
    }

    if (shouldSkipMarkdownPath(url.pathname)) {
      return fetch(request);
    }

    if (!wantsMarkdown(request.headers.get("Accept"))) {
      return fetch(request);
    }

    let originResponse: Response;
    try {
      originResponse = await fetch(originFetchRequest(request));
    } catch {
      return fetch(request);
    }

    if (request.method === "HEAD") {
      const headers = new Headers(originResponse.headers);
      headers.set("Content-Type", "text/markdown; charset=utf-8");
      headers.set("Vary", mergeVary(headers.get("Vary"), "Accept"));
      headers.delete("Content-Length");
      return new Response(null, { status: originResponse.status, headers });
    }

    const contentType = originResponse.headers.get("Content-Type") ?? "";
    if (!contentType.includes("text/html")) {
      return originResponse;
    }

    const html = await originResponse.text();

    let markdown: string;
    try {
      markdown = htmlToMarkdown(html);
    } catch {
      return originResponse;
    }

    const headers = new Headers(originResponse.headers);
    headers.set("Content-Type", "text/markdown; charset=utf-8");
    headers.set("Vary", mergeVary(headers.get("Vary"), "Accept"));
    headers.set("x-markdown-tokens", String(estimateMarkdownTokens(markdown)));
    headers.set("x-original-tokens", String(estimateMarkdownTokens(html)));
    headers.delete("Content-Encoding");
    headers.delete("Content-Length");

    return new Response(markdown, {
      status: originResponse.status,
      headers,
    });
  },
};

function mergeVary(existing: string | null, value: string): string {
  if (!existing) return value;
  const parts = existing.split(",").map((p) => p.trim().toLowerCase());
  if (parts.includes(value.toLowerCase())) return existing;
  return `${existing}, ${value}`;
}
