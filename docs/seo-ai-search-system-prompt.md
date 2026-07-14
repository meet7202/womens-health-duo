# SEO & AI search optimization — system prompt (Women's Health Duo)

Use this document when auditing or extending **womenshealthduo.com**. It adapts general SEO/AI guidance to **this static Vite + React repo**. Always read [`AGENTS.md`](../AGENTS.md), [`.cursor/rules/medical-eeat.mdc`](../.cursor/rules/medical-eeat.mdc), and [`.cursor/rules/seo-ai-search.mdc`](../.cursor/rules/seo-ai-search.mdc) first.

**Goal:** Highest-quality helpful content — not engine gaming. Satisfy Google, Bing, ChatGPT, Gemini, Claude, Perplexity, AI Overviews, and LLM crawlers through clarity, structure, and trust.

---

## Primary goal

Every page answers **one primary search intent** with:

- One topic, one meaningful H1, related terms used naturally
- Clear heading hierarchy, original copy, fast static delivery
- Structured data, internal links, named clinician expertise where medical
- Strong CTA (book consult, WhatsApp, Learn, FAQ) — see `CONTACT` in [`site.defaults.ts`](../src/config/site.defaults.ts)

Never create copy only for keywords.

---

## WHD entity truth (do not genericize)

| Entity                  | Role                                                                  |
| ----------------------- | --------------------------------------------------------------------- |
| **Women's Health Duo**  | Organization / clinic brand                                           |
| **Dr. Charmi Shah**     | OB-GYN, IVF, laparoscopy — Mumbai, Ahmedabad, Valsad + virtual        |
| **Dr. Zalak Shah (PT)** | Women's health physio, STOTT Pilates — Bangalore, Ahmedabad + virtual |

Source: [`doctorProfiles.ts`](../src/data/doctorProfiles.ts), [`practiceLocations.ts`](../src/config/practiceLocations.ts).

**Example titles (use `formatDocumentTitle()` — brand suffix ` \| Women's Health Duo`, ≤60 chars):**

- `IVF & fertility consults \| Women's Health Duo` (Dr. Charmi lane — not “best IVF doctor”)
- `STOTT Pilates women's health \| Women's Health Duo` (Dr. Zalak lane)

**Avoid:** stacking “Best IVF Doctor Ahmedabad…” in titles; attributing IVF surgery to Dr. Zalak.

---

## Title tags

| Target               | This repo                                                           |
| -------------------- | ------------------------------------------------------------------- |
| 50–60 characters     | `DOCUMENT_TITLE_MAX_LEN` in [`seoTitle.ts`](../src/lib/seoTitle.ts) |
| Hard cap < 70 (Bing) | `capDocumentTitle()`, `audit:seo-titles`                            |
| Unique per route     | `pageSeoCopy.ts`, `staticShellHead.ts`, per-page `SeoHead`          |
| Pattern              | `Primary topic \| Women's Health Duo`                               |

Homepage default: [`DEFAULT_TITLE`](../src/config/site.defaults.ts) (doctor-forward).

---

## Meta descriptions

| Target                          | This repo                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------- |
| 140–160 characters (CTR)        | Aim inside band; Bing allows 25–160                                           |
| Primary keyword + benefit + CTA | Default includes **book consult + WhatsApp**                                  |
| Unique per shell                | `capMetaDescription()` in [`seoDescription.ts`](../src/lib/seoDescription.ts) |
| CI                              | `npm run audit:seo-descriptions`                                              |

**Do not** drop WhatsApp or doctor names when shortening descriptions unless the user explicitly asks.

Example shape (IVF / Ahmedabad intent, ≤160 chars):

> Book IVF and fertility consults with Dr. Charmi Shah in Ahmedabad and online. WhatsApp +917990550754. Evidence-based OB-GYN care.

---

## URLs

- Lowercase, hyphenated, descriptive paths in [`routes.ts`](../src/config/routes.ts) + `App.tsx`
- Trailing-slash public URLs via [`AppLink`](../src/components/router/AppLink.tsx) / `publicPathname()`
- Virtual matrix: `/online-consultation/...`; topic guides: flat slugs; Learn: `/learn/...`, `/learn/watch/:id/`
- No `?id=` routes for indexable content

---

## Headings

- **Exactly one H1** per route — page-owned or `HeroSection` / static shell (`audit:seo-h1`)
- **H2/H3** in order — no skips (`audit:seo-headings`)
- H1 often aligns with topic; `<title>` may include brand suffix via `formatDocumentTitle()`
- Intro: first ~100 words answer what / who / where / why — hero lede, topic guide intros, city landings

---

## Content length (realistic for this site)

| Template                         | WHD today        | Stretch goal                                                                             |
| -------------------------------- | ---------------- | ---------------------------------------------------------------------------------------- |
| Homepage, profiles, India cities | Medium           | Keep entity-clear                                                                        |
| Topic guides                     | Variable         | 800+ words where clinical                                                                |
| Virtual service×city             | Templated + FAQs | Unique FAQ pools, contextual links                                                       |
| Learn watch                      | Video + caption  | One intent per clip                                                                      |
| Long-form blog                   | Not shipped yet  | Use [`seo-blog-article-ai-rewrite-template.md`](seo-blog-article-ai-rewrite-template.md) |

Never add filler to hit word counts.

---

## Keywords & semantics

- Primary term in title, H1, URL, first paragraph, one H2 when natural
- Use semantic variants (fertility treatment, IUI, pelvic floor, STOTT Mat/Reformer) — no density targets
- Connect entities: doctors, treatments, cities (Ahmedabad, Gujarat, Mumbai, Bangalore) naturally

---

## Images

- Descriptive `alt` + `title` via [`mediaSeo.ts`](../src/lib/mediaSeo.ts)
- Hero/doctor assets in `src/assets/`; hub thumbs in `public/images/hub-thumbs/`
- JSON-LD `ImageObject` where implemented; compress on replace

---

## Internal linking

Every important page should reach: parent hub, related services, Learn, FAQ, book consult, doctor profiles.

Builders: Header/Footer, [`contextualFaqs.ts`](../src/data/contextualFaqs.ts), topic guide “related” blocks, pillar clusters on Learn.

**Good anchor:** `Learn more about IVF and fertility consults` — **Bad:** `Click here`

Audit notes: [`seo-internal-linking-audit.md`](seo-internal-linking-audit.md).

---

## External links

Trusted medical sources only when citing facts (WHO, ACOG, NHS, CDC, journals). Dr. Charmi PharmEasy profile is in `externalProfiles` — not generic spam directories.

---

## E-E-A-T (YMYL)

See [`.cursor/rules/medical-eeat.mdc`](../.cursor/rules/medical-eeat.mdc) and [`seo-trust-eeat-audit.md`](seo-trust-eeat-audit.md).

- Named physicians, registrations on booking/telemedicine surfaces
- Medical disclaimer, editorial policy, telemedicine policy
- Future: “Medically reviewed by” + `dateModified` on long-form guides

---

## FAQ + schema

- On-page FAQ + matching `FAQPage` JSON-LD (`JsonLdFaq`) — max **10** pairs
- Pools: homepage, Learn, virtual, India city, topic guides ([`contextualFaqs.ts`](../src/data/contextualFaqs.ts), [`clusterContent.ts`](../src/data/topicGuides/clusterContent.ts))

---

## Schema inventory (implemented / partial)

| Type                               | Where                                                      |
| ---------------------------------- | ---------------------------------------------------------- |
| Organization / MedicalOrganization | [`JsonLd.tsx`](../src/components/seo/JsonLd.tsx)           |
| Physician                          | Profiles, org graph                                        |
| WebPage + BreadcrumbList           | [`JsonLdGraph.tsx`](../src/components/seo/JsonLdGraph.tsx) |
| FAQPage                            | Matching on-page FAQs                                      |
| VideoObject                        | Learn watch pages                                          |
| ImageObject                        | Media SEO helpers                                          |

Add new types in `src/components/seo/schema/` — validate; do not invent `Review` or fake ratings.

---

## Technical SEO (static site)

| Item                   | Implementation                                                                   |
| ---------------------- | -------------------------------------------------------------------------------- |
| Canonical, OG, Twitter | `SeoHead`, static shells [`staticShellHead.ts`](../src/build/staticShellHead.ts) |
| Sitemaps               | `vite.config.ts` — primary + virtual-service-cities + videos                     |
| robots.txt             | Build output; agent bots allowed per AGENTS.md                                   |
| HTTPS apex             | `womenshealthduo.com`, `CNAME`, `VITE_SITE_URL`                                  |
| IndexNow               | Key file + Cloudflare Crawler Hints + submit scripts                             |
| Duplicate meta         | Title + description audits post-build                                            |
| Orphan URLs            | Must be in `SITEMAP_PATHS` + `App.tsx`                                           |

---

## AI search & LLM crawlers

- [`public/llms.txt`](../public/llms.txt) — patterns, services, topics
- [`.well-known/agent-skills/`](../public/.well-known/agent-skills/) + build `index.json`
- Cloudflare Worker: Markdown for `Accept: text/markdown`
- Write **quotable**, plain-English definitions; bullets/tables where useful; avoid hype

Citation checklist: [`seo-ai-citation-optimization.md`](seo-ai-citation-optimization.md).

---

## Local SEO

India city pages: [`cityPages.ts`](../src/data/cityPages.ts), [`CityLandingPage.tsx`](../src/pages/CityLandingPage.tsx). Virtual/global: city + country + service matrix. Use verified in-person cities only; Google Business links for Zalak (Ahmedabad + Bengaluru) on profiles/city pages — not invented NAP.

---

## Performance & mobile

- Lazy sections where already used; `manualChunks` in Vite — avoid catch-all vendor bucket (TDZ risk)
- Large LCP images: hero/doctor JPEGs — compress when replacing
- Responsive layout + skip link + semantic HTML

---

## CTAs

- WhatsApp: `CONTACT.whatsappUrl` / `phoneE164` — sticky button, Contact, book flow
- `/book-consultation` — telemedicine consent
- Contextual per page (virtual → book that service; Learn → watch + consult)

---

## Final checklist (every new/updated route)

- [ ] One search intent; unique title (50–60); unique description (140–160, WhatsApp/book when appropriate)
- [ ] One H1; logical H2/H3; keyword in title, H1, URL, intro
- [ ] Original helpful copy; correct doctor attribution
- [ ] Internal links; FAQ if template expects it
- [ ] Images: alt text; schema if applicable
- [ ] Registered in `routes.ts` + `App.tsx` + correct sitemap segment
- [ ] `npm run build` + all `audit:seo-*` scripts pass

**Success metric:** Users get a complete answer; crawlers and AI systems can extract entities (Women's Health Duo, Dr. Charmi Shah, Dr. Zalak Shah, services, cities) without keyword stuffing or trust violations.

---

## Related docs

- [`seo-cursor-playbook.md`](seo-cursor-playbook.md) — master audit prompt
- [`seo-cursor-prompts-index.md`](seo-cursor-prompts-index.md) — execution order
- [`seo-architecture-audit.md`](seo-architecture-audit.md) — route/schema snapshot
