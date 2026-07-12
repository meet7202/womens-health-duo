# SEO + AI discoverability — Cursor playbook (Women’s Health Duo)

This repo is a **static marketing site** for two named clinicians plus a **Learn** video hub and **virtual consultation** SEO pages — not a full medical publisher or blog network. Use these prompts **after** reading [`AGENTS.md`](../AGENTS.md) so you do not drift positioning (YMYL, entity truth, social links).

For a **snapshot of the current sitemap, schema, and gaps**, see [`seo-architecture-audit.md`](./seo-architecture-audit.md).

---

## How to run this in Cursor

1. Run the **master audit** (below) on the **repo**, not only marketing copy.
2. Pick **one** implementation slice per PR (e.g. internal links on Learn, or IndexNow, or FAQ copy alignment).
3. Re-run `npm run lint && npm run format:check && npm run typecheck && npm run build` before finishing.

---

## Master audit (adapt for this codebase)

```text
You are a senior SEO engineer + technical content architect.

Audit THIS REPOSITORY (Women’s Health Duo — womenshealthduo.com) as a static Vite + React site.

Respect product intent in AGENTS.md: two-doctor practice marketing, Instagram/YouTube/WhatsApp only in CONTACT/sameAs, no Twitter/X profile URLs, canonical host womenshealthduo.com.

Output:
1. Route / template map (homepage, profiles, India cities, Learn hub patterns, FAQ, virtual hub + country + city + service×city).
2. What JSON-LD runs sitewide vs per-route (JsonLd, JsonLdGraph, JsonLdFaq, knowledge hub VideoObject).
3. Sitemap + robots generation (vite closeBundle, SITEMAP_PATHS in src/config/routes.ts).
4. Internal linking inventory (Header, Footer, homepage, Learn, FAQ).
5. Content / schema alignment risks (FAQ visible text vs FAQPage schema, thin templated pages).
6. Bing + AI crawler basics already present (canonical, OG, llms.txt); IndexNow via Cloudflare Crawler Hints + submit scripts.
7. A WHD-realistic roadmap: practice clarity first, then Learn topical depth, then virtual long-tail — not “generic women’s health encyclopedia” unless product asks.
```

---

## Homepage / key landing copy (use with caution)

**Do not** rewrite the homepage into a generic “women’s health education platform” unless the business explicitly wants that positioning.

Safer module:

```text
Improve homepage clarity for entity + services + trust + CTAs (WHD: Dr. Charmi OB-GYN/IVF/laparoscopy; Dr. Zalak women’s health physio / STOTT Pilates; online-first + India cities).

Constraints: follow AGENTS.md and brandLine.ts; keep YMYL tone accurate; no new social networks; optional short “who we are” definition block in first screen — not long symptom encyclopedia.

Output: proposed H1/subcopy, internal links to /learn, /faq, /online-consultation, doctor profiles; suggested DEFAULT_TITLE/DEFAULT_DESCRIPTION bounds (≤60 / ~150–160 chars) if changing defaults.
```

---

## “Blog article” module → use for **Learn** and **FAQ**, not blogs

There is **no** markdown blog in this repo. Adapt:

```text
For this URL type (Learn filtered hub OR FAQ page), suggest definition-first intro lines, section headings, and FAQ additions that match visible on-page content.

If proposing FAQPage JSON-LD, every question must appear in full on the page (see JsonLdFaq + siteFaq).

Output: copy draft + internal link suggestions to related Learn topics, services, and virtual hub — no Article schema unless we add real article pages.
```

---

## Topical clusters (WHD-shaped)

```text
Propose hub-and-spoke internal linking using EXISTING routes only: Learn topics ([`learnPillarClusters.ts`](../src/data/learnPillarClusters.ts) + `/learn/topic/...` URLs), `seoOnlineServices` slugs, virtual hub, doctor profiles, India city pages.

Prioritize clusters that match services actually offered (OB-GYN, IVF, laparoscopy, PCOS, pelvic floor, prenatal/postnatal, STOTT/Mat Pilates online).

Output: pillar URL → 5–10 spoke URLs with suggested anchor text; avoid anchors that imply conditions we do not treat or emergency care.
```

---

## Internal linking optimizer

```text
Scan src/components/layout/Header.tsx, Footer.tsx, and the main content sections for Link usage.

List missing cross-links (e.g. Learn → FAQ for disclaimers, virtual hub → doctor profiles). Suggest descriptive anchors (not “click here”). Respect SPA routes in src/config/routes.ts.

Output: file-level diff plan, not a vague site map.
```

---

## Schema + structured data

```text
Inventory current JSON-LD in src/components/seo/ (JsonLd.tsx, JsonLdGraph.tsx, JsonLdFaq.tsx, schema/*).

Recommend only valid schema.org types; flag mismatches between page copy and structured data.

If suggesting MedicalWebPage or Article, justify per template and cite where script tags are injected (LearnPage, FaqPage, PageShell, etc.).

Do not add Twitter/X sameAs or third-party runtime scripts.
```

---

## Bing / IndexNow / crawl hygiene

```text
Check vite.config.ts robots.txt + sitemap.xml emission, index.html tokens, and public/llms.txt.

IndexNow: (1) enable Cloudflare Crawler Hints (Caching → Configuration) for automatic IndexNow on cache changes; (2) INDEXNOW_KEY in .env + build dist/{key}.txt + npm run submit:indexnow for bulk post-deploy. Google: submit:google-indexing with service account.

List duplicate or near-duplicate risks (many virtual service×city pages) and mitigations (canonical, unique copy blocks, sitemap priority — already partially modeled).
```

---

## AI search (ChatGPT / Copilot / Perplexity)

```text
Assume crawlers read llms.txt, visible HTML, and JSON-LD.

Propose small, factual “answer blocks” and Q&A that match the site’s scope; avoid encyclopedic treatment advice unless clinically reviewed.

Align suggestions with public/llms.txt and on-page disclaimers (not emergency care; booking via WhatsApp/email).
```

---

## Important truth (WHD-specific)

- **Entity clarity** and **consistent practice copy** beat keyword stuffing for this site.
- **Learn + FAQ + virtual pages** are your scalable text surfaces; the homepage should stay **conversion-oriented**.
- **Schema must match visible content** — especially FAQPage.
- Ship changes via **feature branch + PR to `main`** per repository rules.
