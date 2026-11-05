import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  IMMUTABLE_CACHE_CONTROL,
  isLongCachePath,
  withImmutableCache,
} from "../src/cacheHeaders.ts";

describe("isLongCachePath", () => {
  it("matches Vite hashed assets and fonts", () => {
    assert.equal(isLongCachePath("/assets/index-abc123.js"), true);
    assert.equal(isLongCachePath("/fonts/fonts.css"), true);
    assert.equal(isLongCachePath("/fonts/dm-sans-latin-400-normal.woff2"), true);
    assert.equal(isLongCachePath("/images/hub-thumbs/foo.jpg"), true);
  });

  it("does not match HTML routes", () => {
    assert.equal(isLongCachePath("/"), false);
    assert.equal(isLongCachePath("/learn/"), false);
    assert.equal(isLongCachePath("/book-consultation/"), false);
  });
});

describe("withImmutableCache", () => {
  it("sets Cache-Control immutable on a cloned response", async () => {
    const origin = new Response("ok", {
      status: 200,
      headers: { "Content-Type": "application/javascript", "Cache-Control": "max-age=43200" },
    });
    const next = withImmutableCache(origin);
    assert.equal(next.headers.get("Cache-Control"), IMMUTABLE_CACHE_CONTROL);
    assert.equal(next.headers.get("Content-Type"), "application/javascript");
    assert.equal(await next.text(), "ok");
  });
});
