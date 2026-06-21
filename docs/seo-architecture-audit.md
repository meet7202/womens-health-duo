# SEO architecture audit — Women’s Health Duo (repository snapshot)

_Grounded in this codebase. For reusable Cursor prompts, see [`seo-cursor-playbook.md`](./seo-cursor-playbook.md). Operational invariants: [`AGENTS.md`](../AGENTS.md)._

## 1. Site architecture (routes)

| Tier         | Pattern                                                                                                                           | Purpose                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Core         | `/`                                                                                                                               | Homepage: hero, about, services, testimonials, contact, FAQ preview → full FAQ |
| People       | `/dr-charmi-shah`, `/dr-zalak-shah`                                                                                               | Doctor profiles + `SeoHead`                                                    |
| India cities | `/ahmedabad`, `/mumbai`, `/bangalore`                                                                                             | Local landing + schema                                                         |
| Education    | `/learn`, `/learn/:doctor`, `/learn/topic/:slug`, combinations                                                                    | Video hub; indexable filter URLs in sitemap                                    |
| FAQ          | `/faq`                                                                                                                            | Full FAQ + `FAQPage` JSON-LD when wired                                        |
| Virtual SEO  | `/online-consultation`, `/online-consultation/country/:slug`, `/online-consultation/:city`, `/online-consultation/:city/:service` | Long-tail discovery; large cardinality                                         |
| Legacy       | `/global-online` → redirects                                                                                                      | Bookmark preservation                                                          |

Router definitions: [`src/App.tsx`](../src/App.tsx). Sitemap membership: [`src/config/routes.ts`](../src/config/routes.ts) — **`SITEMAP_PATHS_PRIMARY_URLSET`** for **`sitemap.xml`**, **`SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES`** for **`sitemap-virtual-service-cities.xml`**, full union **`SITEMAP_PATHS`** for static shells; see `vite.config.ts` `writeSeoFiles`.

## 2. Crawling & indexing

| Mechanism                                            | Status                                                                             | Where                                                                                                                               |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `robots.txt`                                         | Generated at build                                                                 | [`vite.config.ts`](../vite.config.ts)                                                                                               |
| `sitemap.xml` + `sitemap-virtual-service-cities.xml` | Generated at build; primary without service×city matrix; long-tail in supplemental | `closeBundle` + `SITEMAP_PATHS_PRIMARY_URLSET` / `SITEMAP_SEGMENT_VIRTUAL_SERVICE_CITIES` in [`routes.ts`](../src/config/routes.ts) |
| Canonical + OG + Twitter card meta                   | Yes                                                                                | [`index.html`](../index.html) tokens + [`SeoHead.tsx`](../src/components/seo/SeoHead.tsx)                                           |
| `llms.txt`                                           | Static; strong AI/crawler summary                                                  | [`public/llms.txt`](../public/llms.txt)                                                                                             |
| IndexNow                                             | **Not implemented**                                                                | Optional future build artifact or hosting hook                                                                                      |

## 3. Structured data (JSON-LD)

| Area                  | Types / notes                                                                                    | Entry                                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sitewide (homepage)   | `MedicalOrganization`, `Physician` (×2), `WebSite`, `MedicalClinic` / `LocalBusiness` for cities | [`JsonLd.tsx`](../src/components/seo/JsonLd.tsx)                                                                                                                                           |
| Per-page graph        | `WebPage` + `BreadcrumbList` (+ `FAQPage` where used)                                            | [`schema/breadcrumbs.ts`](../src/components/seo/schema/breadcrumbs.ts), [`JsonLdGraph.tsx`](../src/components/seo/JsonLdGraph.tsx), [`JsonLdFaq.tsx`](../src/components/seo/JsonLdFaq.tsx) |
| Learn / video         | `VideoObject` (+ `WebPage` fragment ids in graph)                                                | [`schema/knowledgeHubVideos.ts`](../src/components/seo/schema/knowledgeHubVideos.ts)                                                                                                       |
| Article / BlogPosting | **Not used**                                                                                     | No blog template in repo                                                                                                                                                                   |
| `MedicalWebPage`      | **Not used** explicitly                                                                          | `WebPage` is used via breadcrumbs / video graph                                                                                                                                            |

**Risk:** Any `FAQPage` markup must mirror **verbatim** FAQ content visible on the page (YMYL + Google/Bing quality).

## 4. Default HTML title / description

Canonical defaults live in [`src/config/site.defaults.ts`](../src/config/site.defaults.ts) (build-time `index.html` replacement + `SeoHead` fallbacks). Targets documented in `AGENTS.md`: title **≤ ~60** characters, meta description **~150–160** characters for typical audit tools.

## 5. Internal linking (current)

- **Header:** hash links into homepage sections; Learn; contact hash; WhatsApp/phone CTAs.
- **Footer:** home + hashes; virtual hub; both doctors; India city links; Learn + topic examples; FAQ; social (Instagram, YouTube) + WhatsApp + email.
- **Homepage:** FAQ preview + CTA to `/faq`.

**Gaps (incremental opportunities, not blockers):**

- Deeper links from **Services** copy into **Learn topics** and **virtual service** URLs where clinically appropriate.
- Cross-links from **Learn** hub body to **FAQ** (disclaimers, booking) and **doctor profiles** for authority.
- Optional “Explore” strip on homepage pointing to `/learn` and `/online-consultation` beyond the header/footer.

## 6. Content & topical authority

| Strength             | Notes                                                       |
| -------------------- | ----------------------------------------------------------- |
| Service × city scale | Large long-tail surface via `seoOnlineServices` + city JSON |
| Learn hub            | Video + captions feed `VideoObject` descriptions            |
| FAQ                  | Supports plain-language Q&A for AI extraction               |
| Entity clarity       | Named physicians, `llms.txt`, JSON-LD `Physician`           |

| Weakness / caution      | Notes                                                                                    |
| ----------------------- | ---------------------------------------------------------------------------------------- |
| Templated virtual pages | Thin differentiation if boilerplate repeats — audit copy per template in page components |
| No traditional blog     | “Article” SEO prompts must map to Learn/FAQ/service pages                                |
| YMYL                    | Avoid turning marketing pages into unsourced clinical encyclopedias                      |

## 7. Entity ambiguity

Low if you keep **`SITE_NAME`**, **`BRAND_ENTITY_LINE`**, doctor names, and **`practiceLocations`** strings aligned across About, Footer, profiles, virtual blurbs, `llms.txt`, and JSON-LD. Mismatches here hurt both Bing and AI citation more than extra keywords.

## 8. Recommended roadmap (WHD-realistic)

1. **Truth & consistency pass** — one source per fact (cities, services, disclaimers); FAQ ↔ schema alignment.
2. **Template uniqueness** — short definition + city/service-specific paragraph on high-traffic virtual URLs.
3. **Internal links** — Learn ↔ FAQ ↔ profiles ↔ virtual hub with descriptive anchors.
4. **Optional** — IndexOnly key + host ping strategy **only** if you commit to maintaining it in deploy.
5. **Measure** — Bing Webmaster Tools + Search Console; watch indexed vs submitted for long-tail virtual paths.

---

_Last updated from repository structure; refresh when routes or schema components change._
