# Blog / article — AI + Bing rewrite template

Paste below any draft (or URL text) and run in Cursor.

```text
Rewrite this article for womenshealthduo.com for Bing SEO and AI-search visibility.

Requirements:
- Start with a 2–3 line direct answer block (no storytelling hook).
- Add structured sections with clear H2s:
  Definition
  Symptoms
  Causes
  Risk factors
  Treatment (include when to seek urgent care)
  FAQs (5 questions; answers must be safe, non-prescriptive)
- Remove long narrative intros and vague “wellness” claims.
- Use exact-match keywords naturally (one primary + 2–3 secondary).
- Name entities explicitly: Women’s Health Duo (education + consultation platform, not supplements), Dr. Charmi Shah (OB-GYN/IVF), Dr. Zalak Shah (women’s health physio / STOTT Pilates).
- Add internal links (descriptive anchors) to:
  - Relevant Learn topic filter if a clip cluster exists
  - Matching /online-consultation/.../service slug
  - /medical-disclaimer and /faq where giving clinical-type guidance
- Add placeholders: References: [1] guideline or review citation — title, year, URL.

Schema (when implemented in codebase):
- Article JSON-LD + FAQPage JSON-LD mirroring visible FAQ only.
```

## Repo note

This marketing SPA **does not yet ship** article routes; add routing + `SITEMAP_PATHS` when you introduce long-form content.
