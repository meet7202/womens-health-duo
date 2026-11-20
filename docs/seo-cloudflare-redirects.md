# Cloudflare redirect mappings (SEO-04 / SEO-07)

GitHub Pages cannot emit true HTTP 301/308. Configure these in **Cloudflare → Rules → Redirect Rules** (or Transform Rules) after code ships alias shells + client `Navigate`.

Until edge rules are live, nested class alias shells include `meta refresh` + a visible link and point `rel=canonical` at the short URL (`needs-deploy-check`).

## Preferred host

| From                                | To                               | Status |
| ----------------------------------- | -------------------------------- | ------ |
| `http://womenshealthduo.com/*`      | `https://womenshealthduo.com/$1` | 301    |
| `http://www.womenshealthduo.com/*`  | `https://womenshealthduo.com/$1` | 301    |
| `https://www.womenshealthduo.com/*` | `https://womenshealthduo.com/$1` | 301    |

Preserve path and query string. Preferred final host: **HTTPS apex**.

## Class aliases (SEO-04)

| From                                | To            | Status     |
| ----------------------------------- | ------------- | ---------- |
| `/dr-zalak-shah/prenatal-classes`   | `/prenatal/`  | 301 or 308 |
| `/dr-zalak-shah/prenatal-classes/`  | `/prenatal/`  | 301 or 308 |
| `/dr-zalak-shah/postnatal-classes`  | `/postnatal/` | 301 or 308 |
| `/dr-zalak-shah/postnatal-classes/` | `/postnatal/` | 301 or 308 |
| `/dr-zalak-shah/pilates-classes`    | `/pilates/`   | 301 or 308 |
| `/dr-zalak-shah/pilates-classes/`   | `/pilates/`   | 301 or 308 |

## Learn watch platform-id aliases (GSC Coverage / Video)

Static shells already meta-refresh + canonical to the hub watch id. Prefer edge 301 when practical:

| From                                 | To                                            | Status     |
| ------------------------------------ | --------------------------------------------- | ---------- |
| `/learn/watch/<youtubeVideoId>/`     | `/learn/watch/<hub-id>/` (e.g. `yt-duo-…`)    | 301 or 308 |
| `/learn/watch/<instagramShortcode>/` | `/learn/watch/ig-…/` or `/learn/watch/igp-…/` | 301 or 308 |

Example: `/learn/watch/YE9qPLTptRw/` → `/learn/watch/yt-duo-fertility-tests/`.

## Guide consolidation (20 Nov 2026)

Static shells use `template: "guide-consolidation"` (noindex, meta refresh, canonical to the target). Add a **301** for each path **with and without** the trailing slash. Source list: `src/config/guideConsolidationRedirects.ts`.

| From                                                                                               | To                                                         |
| -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `/exercises-for-pregnancy` and `/exercises-for-pregnancy/`                                         | `/pregnancy-exercises-by-trimester/`                       |
| `/bladder-leakage-after-pregnancy` and `/bladder-leakage-after-pregnancy/`                         | `/why-am-i-leaking-urine-after-childbirth/`                |
| `/weak-pelvic-floor` and `/weak-pelvic-floor/`                                                     | `/how-do-i-know-if-my-pelvic-floor-is-weak/`               |
| `/pelvic-floor-exercises` and `/pelvic-floor-exercises/`                                           | `/are-kegels-right-for-everyone/`                          |
| `/how-to-strengthen-pelvic-floor` and `/how-to-strengthen-pelvic-floor/`                           | `/are-kegels-right-for-everyone/`                          |
| `/what-is-postpartum-recovery` and `/what-is-postpartum-recovery/`                                 | `/how-long-does-postpartum-recovery-take/`                 |
| `/can-physiotherapy-help-after-childbirth` and `/can-physiotherapy-help-after-childbirth/`         | `/how-long-does-postpartum-recovery-take/`                 |
| `/can-physiotherapy-help-with-bladder-leakage` and `/can-physiotherapy-help-with-bladder-leakage/` | `/can-pelvic-floor-therapy-help-with-bladder-leakage/`     |
| `/painful-intercourse` and `/painful-intercourse/`                                                 | `/can-pelvic-floor-therapy-help-with-painful-intercourse/` |
| `/pilates-for-pregnancy` and `/pilates-for-pregnancy/`                                             | `/is-pilates-safe-during-pregnancy/`                       |
| `/prenatal-pilates` and `/prenatal-pilates/`                                                       | `/is-pilates-safe-during-pregnancy/`                       |
| `/postnatal-pilates` and `/postnatal-pilates/`                                                     | `/pilates-after-pregnancy/`                                |
| `/what-is-pilates` and `/what-is-pilates/`                                                         | `/what-is-stott-pilates/`                                  |
| `/pilates-for-beginners` and `/pilates-for-beginners/`                                             | `/what-is-stott-pilates/`                                  |
| `/can-pcos-affect-fertility` and `/can-pcos-affect-fertility/`                                     | `/can-i-get-pregnant-with-pcos/`                           |
| `/back-pain-in-pregnancy` and `/back-pain-in-pregnancy/`                                           | `/how-to-relieve-back-pain-during-pregnancy/`              |
| `/pelvic-pain-in-pregnancy` and `/pelvic-pain-in-pregnancy/`                                       | `/how-to-relieve-pelvic-pain-during-pregnancy/`            |
| `/ivf` and `/ivf/`                                                                                 | `/what-is-ivf/`                                            |
| `/trying-to-conceive` and `/trying-to-conceive/`                                                   | `/pregnancy-planning/`                                     |
| `/who-needs-womens-health-physiotherapy` and `/who-needs-womens-health-physiotherapy/`             | `/what-is-womens-health-physiotherapy/`                    |
| `/can-physiotherapy-help-with-back-pain` and `/can-physiotherapy-help-with-back-pain/`             | `/womens-health-physiotherapy/`                            |
| `/can-physiotherapy-improve-posture` and `/can-physiotherapy-improve-posture/`                     | `/womens-health-physiotherapy/`                            |
| `/can-physiotherapy-improve-core-strength` and `/can-physiotherapy-improve-core-strength/`         | `/womens-health-physiotherapy/`                            |
| `/how-does-exercise-improve-womens-health` and `/how-does-exercise-improve-womens-health/`         | `/womens-health-physiotherapy/`                            |
| `/can-pilates-help-with-back-pain` and `/can-pilates-help-with-back-pain/`                         | `/pilates/`                                                |
| `/can-pilates-improve-posture` and `/can-pilates-improve-posture/`                                 | `/pilates/`                                                |
| `/can-pilates-strengthen-the-core` and `/can-pilates-strengthen-the-core/`                         | `/pilates/`                                                |
| `/how-often-should-i-do-pilates` and `/how-often-should-i-do-pilates/`                             | `/pilates/`                                                |
| `/can-physiotherapy-help-with-pelvic-pain` and `/can-physiotherapy-help-with-pelvic-pain/`         | `/pelvic-pain-in-women/`                                   |
| `/signs-of-hormonal-imbalance` and `/signs-of-hormonal-imbalance/`                                 | `/what-is-hormonal-imbalance/`                             |
| `/how-do-hormones-affect-womens-health` and `/how-do-hormones-affect-womens-health/`               | `/what-is-hormonal-imbalance/`                             |
| `/how-does-stress-affect-womens-health` and `/how-does-stress-affect-womens-health/`               | `/what-is-hormonal-imbalance/`                             |
| `/how-does-sleep-affect-hormones` and `/how-does-sleep-affect-hormones/`                           | `/what-is-hormonal-imbalance/`                             |

## Content-catalog Content-Type

`/.well-known/content-catalog.json` is an RFC 9264 linkset. GitHub Pages serves it as `application/json`. A Cloudflare **Response Header Transform Rule** can set `Content-Type: application/linkset+json` on that path. The file is valid JSON either way. It is not a full content API.

Checked 20 November 2026 from this workspace: `robots.txt`, `sitemap.xml`, `sitemap-virtual-service-cities.xml`, and `sitemap-videos.xml` returned **200** with `content-type: application/xml` (robots as text). The linkset URL is `/.well-known/content-catalog.json` (not under `agent-skills/`).

## Verification (post-deploy)

```sh
curl -sS -D - -o /dev/null 'https://womenshealthduo.com/dr-zalak-shah/prenatal-classes/'
curl -sS -D - -o /dev/null 'http://womenshealthduo.com/'
curl -sS -D - -o /dev/null 'https://www.womenshealthduo.com/'
```

Expect one-hop permanent redirects; no loops; final Location is HTTPS apex with trailing-slash directory paths.
