import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { htmlToMarkdown, wantsMarkdown } from "../src/convert.ts";

describe("wantsMarkdown", () => {
  it("returns false for null / empty / unrelated types", () => {
    assert.equal(wantsMarkdown(null), false);
    assert.equal(wantsMarkdown(""), false);
    assert.equal(wantsMarkdown("text/html"), false);
  });

  it("accepts text/markdown with default q=1", () => {
    assert.equal(wantsMarkdown("text/markdown"), true);
    assert.equal(wantsMarkdown("text/html, text/markdown"), true);
  });

  it("honors q=0 (not acceptable)", () => {
    assert.equal(wantsMarkdown("text/markdown;q=0"), false);
    assert.equal(wantsMarkdown("text/html, text/markdown;q=0"), false);
    assert.equal(wantsMarkdown("text/markdown; q=0.0"), false);
  });

  it("accepts positive q values", () => {
    assert.equal(wantsMarkdown("text/markdown;q=0.1"), true);
    assert.equal(wantsMarkdown("text/markdown;q=1"), true);
  });
});

describe("htmlToMarkdown", () => {
  it("parses a visible unclipped static SEO shell with extras and nav links", () => {
    const html = `<!doctype html><html><head>
<title>Prenatal Classes</title>
<meta name="description" content="Pregnancy-safe movement with Dr. Zalak Shah." />
<meta property="og:image" content="https://womenshealthduo.com/favicon.svg" />
</head><body>
<main id="static-seo-shell" style="max-width:42rem;margin:1.5rem auto;color:#111">
  <h1>Prenatal Classes with Dr. Zalak Shah</h1>
  <p>Meta lead about prenatal classes.</p>
  <p>Class intro: evidence-informed pregnancy movement.</p>
  <nav aria-label="Site links">
    <p><a href="https://womenshealthduo.com/">Home</a> · <a href="https://womenshealthduo.com/book-consultation/">Book consultation</a></p>
  </nav>
  <p style="font-size:0.9rem;color:#444">This summary is available without JavaScript.</p>
</main>
</body></html>`;

    const md = htmlToMarkdown(html);
    assert.match(md, /^---\n/);
    assert.match(md, /# Prenatal Classes with Dr\. Zalak Shah/);
    assert.match(md, /Class intro: evidence-informed pregnancy movement/);
    assert.match(md, /\[Home\]\(https:\/\/womenshealthduo\.com\/\)/);
    assert.match(
      md,
      /\[Book consultation\]\(https:\/\/womenshealthduo\.com\/book-consultation\/\)/,
    );
    assert.doesNotMatch(md, /clip:rect/);
  });
});
