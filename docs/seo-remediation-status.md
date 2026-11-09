# SEO remediation status

Branch: `seo/remediation-2026-11`  
Started: 5 November 2026  
Closeout checkpoint: 9 November 2026  
Canonical origin: `https://womenshealthduo.com`

Progress ledger for the evidence-led remediation prompt. Status values: `not-started` | `in-progress` | `verified-local` | `needs-owner-data` | `needs-deploy-check` | `complete`.

**Do not treat local code passes as production verification.** Separate “implemented locally” from “deployed and verified.”

## Artifacts

| Artifact                          | Path                                                                                                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Protected GSC clicked URLs (79)   | [`docs/seo-url-migration.csv`](seo-url-migration.csv)                                                                                  |
| Full route inventory              | [`docs/seo-route-inventory.csv`](seo-route-inventory.csv) (generated)                                                                  |
| Guide disposition (SEO-12/36)     | [`docs/seo-guide-disposition.csv`](seo-guide-disposition.csv) (`npm run generate:seo-guide-disposition`)                               |
| Virtual service families (SEO-11) | [`docs/seo-virtual-service-disposition.csv`](seo-virtual-service-disposition.csv) (`npm run generate:seo-virtual-service-disposition`) |
| Page status ledger (SEO-32)       | [`docs/seo-page-status.csv`](seo-page-status.csv) (`npm run generate:seo-page-status` / `test:seo-page-status`)                        |
| Media disposition (SEO-36)        | [`docs/seo-media-disposition.csv`](seo-media-disposition.csv) (`npm run generate:seo-media-disposition`)                               |
| Launch checklist (L01–W10)        | [`docs/seo-launch-checklist.md`](seo-launch-checklist.md)                                                                              |
| Owner / clinician actions         | [`docs/seo-owner-actions.md`](seo-owner-actions.md)                                                                                    |
| Production crawl (SEO-38)         | [`docs/seo-production-crawl.csv`](seo-production-crawl.csv) — **pending after deploy**                                                 |
| Browser coverage (SEO-38)         | [`docs/seo-browser-coverage.csv`](seo-browser-coverage.csv) — **pending after deploy**                                                 |
| Cloudflare redirect prep          | [`docs/seo-cloudflare-redirects.md`](seo-cloudflare-redirects.md)                                                                      |
| Route disposition model           | [`src/config/routeDisposition.ts`](../src/config/routeDisposition.ts)                                                                  |
| Guide uniqueness overrides        | [`src/data/topicGuides/guideUniquenessOverrides.ts`](../src/data/topicGuides/guideUniquenessOverrides.ts)                              |

## GSC export wave (5 Nov 2026)

Exports under `~/Downloads/womenshealthduo.com-*-2026-11-05.zip` (Coverage, Videos, Video indexing, Review snippets, Discussion forum, Unparsable structured data, Performance).

| Report           | GSC signal                                                     | Code response (this branch)                                                                 |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Review snippets  | Invalid parent / itemReviewed; reviews without aggregateRating | Removed synthetic `AggregateRating`/`Review` from class pages (SEO-08)                      |
| Discussion forum | Missing `author` (1)                                           | Removed publisher `SocialMediaPosting` (use `ImageObject` on posts)                         |
| Videos           | Missing `uploadDate`                                           | `VideoObject` only when `postedAt` + eligibility                                            |
| Video indexing   | Not on watch page; no thumbnail                                | Hub carousel = poster→watch (no embeds); incomplete reels omitted from video sitemap/schema |
| Coverage         | Redirects / 404s                                               | Class + YouTube-id watch aliases: noindex + meta-refresh + canonical; distinct `404.html`   |
| Unparsable       | Truncated Unicode (0 pages)                                    | Already clear — no action                                                                   |
| Performance      | HTTP/www variants; thin long-tail CTR                          | Host redirects documented; city×service consolidation still SEO-11 (post-deploy content)    |

**GSC code wave status: complete for single deploy.** Remaining ledger rows below are separate workstreams (full React prerender, matrix consolidation, owner data), not blockers for clearing these GSC structured-data / video / coverage markup issues after release.

## Task ledger

| ID     | Status             | Notes                                                                                                                                                                                                                                                                                                                                            |
| ------ | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| SEO-00 | verified-local     | 79-row migration CSV; inventory script; HTTP statuses still `unknown` (production VERIFY).                                                                                                                                                                                                                                                       |
| SEO-01 | verified-local     | Learn hub root sections use `isRootLearnHub` semantic check (not slash path equality).                                                                                                                                                                                                                                                           |
| SEO-02 | verified-local     | `routeDisposition.ts`: page/redirect/gone + robots; shells ≠ sitemap; `@@PAGE_ROBOTS@@` + `SeoHead.robots`; unknown paths no longer inherit homepage meta; aliases noindex.                                                                                                                                                                      |
| SEO-03 | verified-local     | Shared shell metadata via `resolveShellPageMeta` / `ShellPageMeta`: robots + `ogType`/`ogImage`/`ogImageAlt` (`@@PAGE_OG_*@@`); aligned with SeoHead (SEO-21).                                                                                                                                                                                   |
| SEO-04 | verified-local     | Class metadata in `resolveShellPageMeta`; nested aliases redirect disposition; edge 301 `needs-deploy-check`.                                                                                                                                                                                                                                    |
| SEO-05 | verified-local     | Learn descriptions distinct; Bangalore physio-first title; virtual “Online advice”; guide metas shortened; no Zalak-drop / “Read.” orphans. Remaining matrix dupes → SEO-11.                                                                                                                                                                     |
| SEO-06 | verified-local     | Default submit path is IndexNow only; Google script fail-closed without `--urls-file=`.                                                                                                                                                                                                                                                          |
| SEO-07 | needs-deploy-check | Distinct `404.html` noindex shell; `appRouterTo` search/hash-safe; legacy `/global-online` shells; Cloudflare host/301 VERIFY still pending.                                                                                                                                                                                                     |
| SEO-08 | verified-local     | Removed synthetic AggregateRating/5-star emission from class pages (GSC Review snippets: invalid parent/itemReviewed + reviews without aggregateRating).                                                                                                                                                                                         |
| SEO-09 | verified-local     | Sitemap `<lastmod>` omitted until verified content revisions; audit no longer requires build-day equality; video dates remain `postedAt` only.                                                                                                                                                                                                   |
| SEO-10 | verified-local     | React 18 `renderToString` + `StaticRouter` covers every indexable **template** (43 priority paths: home/section, doctors, cities, classes, Learn filters/watch, policies, intl, virtual hub/country/city/service×city, topic care hubs). Soft-fail per path; `WHD_PRERENDER=0` skips. Long-tail matrix/watch/guides remain shell-only by design. |
| SEO-11 | verified-local     | Freeze + service-family disposition CSV (`generate:seo-virtual-service-disposition`); city×service pages keep/improve (protect GSC clicks); template now hub-first with eligibility note + book CTA (no invented local clinics; no mass-noindex).                                                                                                |
| SEO-12 | verified-local     | All 100 guides get title-led uniqueness scaffold; disposition CSV updated. Clinical `reviewStatus` stays per-guide (default `pending`; no blanket approval stamps).                                                                                                                                                                              |
| SEO-13 | verified-local     | `faqIds` on hub + regression guides; pool ids; slug/title match preference; registry wires `row.faqIds`.                                                                                                                                                                                                                                         |
| SEO-14 | verified-local     | Author/reviewer/dates + `reviewStatus`; default `pending` (no invented approval); byline only when row is `approved` with verified fields; Editorial Policy updated.                                                                                                                                                                             |
| SEO-15 | needs-owner-data   | Hold kept (9 Nov): YouTube + IG links still HTTP 200 — do not remove. Display override + ASRM note remain until clinician lifts hold.                                                                                                                                                                                                            |
| SEO-16 | verified-local     | `ig-cr1otdannn4` / `ig-dbtawiyp_m_`: no VideoObject; noindex watch pages; empty/error captions rejected at display title; hub poster→watch.                                                                                                                                                                                                      |
| SEO-17 | verified-local     | Hours + online-first booking note in `practiceLocations` / Contact (Mon–Sat 9–6 India). Street addresses still omitted (owner did not supply).                                                                                                                                                                                                   |
| SEO-18 | verified-local     | Owner: restore prior badges (Charmi 4.9/41, Zalak 5.0/27, asOf 2026-11-09); Charmi has no GBP URL; Zalak keeps share URL. UI badges on; no AggregateRating JSON-LD without URL.                                                                                                                                                                  |
| SEO-19 | verified-local     | No HTML `contentUrl`; eligibility helper; incomplete IDs omitted; SocialMediaPosting removed (GSC Discussion forum missing author).                                                                                                                                                                                                              |
| SEO-20 | verified-local     | Physician/clinic `medicalSpecialty` uses Schema.org enum (`Obstetric`/`Gynecologic`/`Physiotherapy`); Zalak is `Person`; IVF in `knowsAbout`.                                                                                                                                                                                                    |
| SEO-21 | verified-local     | Shell `ogType`/`ogImage`/`ogImageAlt` + `@@PAGE_OG_*@@`; watch pages poster + `video.other` (posts `website`).                                                                                                                                                                                                                                   |
| SEO-22 | verified-local     | Portrait `seoWidth`/`seoHeight` on Zalak SEO image + `ImageObject` width/height.                                                                                                                                                                                                                                                                 |
| SEO-23 | verified-local     | Topic guides → `/book-consultation/?doctor=&service=` (allowlisted); form seeds from query. No Mumbai sample matrix CTAs.                                                                                                                                                                                                                        |
| SEO-24 | verified-local     | Route-level `React.lazy` for non-home pages in `App.tsx`.                                                                                                                                                                                                                                                                                        |
| SEO-25 | verified-local     | Prefer prerendered hero `<picture>`; homepage-only matching `imagesrcset`/`imagesizes` preload when picture absent; no late client 640w-only preload.                                                                                                                                                                                            |
| SEO-26 | verified-local     | Learn hub uses lightweight `KnowledgeHubVideoCard` (poster→watch); players only on watch pages. Image derivatives TBD.                                                                                                                                                                                                                           |
| SEO-27 | verified-local     | Native reel persistent Play/Pause control; WhatsApp CTAs use `bg-whatsapp` (≥4.5:1 with white).                                                                                                                                                                                                                                                  |
| SEO-28 | verified-local     | Hero/primary content visible first frame; Framer `initial={false}` + `MotionConfig reducedMotion="user"`; scroll helpers honor `prefers-reduced-motion`; PageShell skip link before header.                                                                                                                                                      |
| SEO-29 | verified-local     | `wantsMarkdown` honors `text/markdown;q=0`; clone on convert fail; HEAD matches GET; strip/recompute ETag; full unclipped shell parse. Redeploy worker separately.                                                                                                                                                                               |
| SEO-30 | verified-local     | `npm run audit:seo-semantic` gates class-title fallback, Learn guide sections (when prerendered), synthetic ratingValue 5, HTML VideoObject contentUrl, favicon thumbs, build-day video dates.                                                                                                                                                   |
| SEO-31 | needs-deploy-check | Owner post-release only.                                                                                                                                                                                                                                                                                                                         |
| SEO-32 | verified-local     | [`docs/seo-page-status.csv`](seo-page-status.csv) seeded from inventory (7561) ≈ route collection (7558); `source_check`/`built_html`/`http` = `unknown`; `npm run test:seo-page-status` membership gate. Production crawl still SEO-38.                                                                                                         |
| SEO-33 | verified-local     | Profile copy, visible telemedicine FAQ, unique intl IDs, true NotFound for bad class/service slugs.                                                                                                                                                                                                                                              |
| SEO-34 | verified-local     | `learnHubDoctorFilterPath` fallback; stem regexes fixed; no `.slice(0,5)` topic drop; YouTube poster alt uses `youtubeOpenAs`.                                                                                                                                                                                                                   |
| SEO-35 | verified-local     | Persist city slugs from existing JSON; removed Metro Region pad / nontermination loop.                                                                                                                                                                                                                                                           |
| SEO-36 | verified-local     | Guide disposition CSV (SEO-12); media disposition for all 203 clips — default `reviewed-keep`; `ig-cr1otdannn4`/`ig-dbtawiyp_m_` → `nonindex-archive`; ovarian-reserve hold IDs → `owner-needed`. Clinical approvals still pending.                                                                                                              |
| SEO-37 | verified-local     | `TrackedWhatsAppLink` + stable `whatsapp_click`; GTM `GTM-57NMVQVN` in `index.html` / `site.defaults` (9 Nov).                                                                                                                                                                                                                                   |
| SEO-38 | needs-deploy-check | Production crawl after release.                                                                                                                                                                                                                                                                                                                  |
| SEO-39 | verified-local     | Claude-SearchBot / Claude-User Allow in generated robots; ClaudeBot stays closed; noted in AGENTS.md.                                                                                                                                                                                                                                            |
| SEO-40 | verified-local     | Build writes `dist/.indexnow-content-manifest.json`; `audit:indexnow-manifest` + `submit:indexnow --changed-only [--dry-run]`; `test:indexnow-change-manifest` (no POST).                                                                                                                                                                        |
| SEO-41 | verified-local     | [`docs/seo-intent-map.csv`](seo-intent-map.csv)                                                                                                                                                                                                                                                                                                  |
| SEO-42 | needs-owner-data   | Clinical/local authority queue.                                                                                                                                                                                                                                                                                                                  |
| SEO-43 | verified-local     | [`docs/seo-measurement-plan.md`](seo-measurement-plan.md)                                                                                                                                                                                                                                                                                        |

## Checks run (closeout 9 Nov 2026)

| Command                                       | Result                                                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run lint` / `format:check` / `typecheck` | OK                                                                                                 |
| `npm run build`                               | OK — shells + prerender 43/43 templates; hero picture; IndexNow manifest                           |
| `npm run audit:seo-titles` … `seo-sitemap`    | OK — 7764 shells; titles ≤69; descriptions 25–160; one H1; lastmod omitted; primary 967; video 106 |
| `npm run audit:seo-semantic`                  | OK                                                                                                 |
| `npm run test:seo-page-status`                | OK (7561 ≈ 7558)                                                                                   |
| `npm run test:indexnow-change-manifest`       | OK                                                                                                 |
| `npm run test:google-indexing-guard`          | OK                                                                                                 |

### Spot-checks (`dist/`)

- Class + nested alias: class identity; alias `noindex, follow` + canonical short URL.
- `/learn/` vs `/learn/dr-zalak/`: distinct descriptions; both doctors on root.
- `/bangalore/`: “Bangalore physio & STOTT Pilates”.
- `dist/404.html`: “Page not found”, `noindex, nofollow`, not homepage.
- Primary sitemap: zero `<lastmod>` (truthful omission until content revisions).
- Priority prerender pages: one H1, no `#static-seo-shell` (shell dropped after SSR inject).
- Non-prerender shells: visible (unclipped) `#static-seo-shell` with brand + nav.

## Owner / clinician input still blocking later tasks

- Street addresses for Mumbai, Ahmedabad, Valsad, Bangalore (hours + online-first note done — SEO-17)
- Optional Charmi GBP share URL (badges restored without URL — SEO-18)
- Ovarian-reserve clinical sign-off to lift SEO-15 hold (platform links still live; hold kept)
- Media dates/posters if `ig-cr1otdannn4` / `ig-dbtawiyp_m_` should become indexable later (currently noindex / no VideoObject)
- Production Cloudflare access for redirects + cache (SEO-07/04)
- Query×page GSC segments for Appendix B (SEO-31)
- Redeploy markdown worker after Accept q-value change (SEO-29)
- Confirm GTM → GA4 tag fires in Realtime after deploy (container wired)

## Pre-existing failures

None recorded yet from this environment’s first full verify sequence.

## Next after single deploy

Cloudflare 301 VERIFY (SEO-07/04), GSC validation requests (“Done fixing”), then SEO-11 city×service consolidation for “discovered not indexed” / weak long-tail CTR. Markdown worker redeploy is independent of Pages.
