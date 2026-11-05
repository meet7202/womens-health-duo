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

## Verification (post-deploy)

```sh
curl -sS -D - -o /dev/null 'https://womenshealthduo.com/dr-zalak-shah/prenatal-classes/'
curl -sS -D - -o /dev/null 'http://womenshealthduo.com/'
curl -sS -D - -o /dev/null 'https://www.womenshealthduo.com/'
```

Expect one-hop permanent redirects; no loops; final Location is HTTPS apex with trailing-slash directory paths.
