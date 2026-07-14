# Bulk Instagram reels for the Learn hub

Reels live in **`src/data/knowledgeHubInstagramReels.json`**; carousels and feed images in **`knowledgeHubInstagramPosts.json`**. Both merge in **`src/data/knowledgeHubVideos.ts`**.

Optional per row: **`postedAt`** (ISO 8601) and **`approxViews`** (number). The hub sorts by **UTC calendar day of `postedAt` (newest day first)**, then by **`approxViews` descending** within the same day. Rows without `postedAt` sort after all dated rows.

Add **`instagramCaption`** for the **original caption** under each embed on `/learn` and for JSON-LD `VideoObject.description`.

## Primary: JSON scrape → hub JSON

Place exports in **`ig/reels_scrap.json`** and **`ig/posts_scrap.json`**, then:

```sh
npm run import:instagram
```

**SEO / indexed watch pages:** `import:instagram` **re-sorts and rewrites the entire** `knowledgeHubInstagramReels.json` (and posts JSON). Use that only for an intentional **bulk refresh** of scrape fields. When adding **one new reel**, do **not** run full import — use **`node scripts/append-instagram-reel.mjs <shortcode-or-url>`** so existing rows (titles, captions, CDN URLs, order) stay unchanged.

This updates **`knowledgeHubInstagramReels.json`** (reels) and **`knowledgeHubInstagramPosts.json`** (carousels + feed images): captions, **`postedAt`**, **`approxViews`**, CDN **`instagramVideoUrl`**, local cover JPEGs in **`public/images/hub-thumbs/`** (`instagramPosterPath`), content-derived **`topics`**, and **`doctor`** (curated shortcode map + tagged-user + caption heuristics in `scripts/lib/instagram-hub-classify.mjs`).

If some cover downloads fail:

```sh
npm run retry:hub-thumbnails
```

Re-run **`npm run import:instagram`** periodically — Instagram CDN video URLs expire after a few weeks.

### Verify

```sh
npm run lint && npm run typecheck && npm run build
```

## URL list import (smaller batches)

1. One URL or shortcode per line in a `.txt` file.
2. `npm run import:instagram-reels -- path/to/reel-urls.txt` (adds stub rows only — prefer **`node scripts/append-instagram-reel.mjs <url>`** for a fully enriched single reel without touching existing rows).
3. Optionally refresh captions: **`node scripts/sync-instagram-captions-from-oembed.mjs`**

### Append one reel (recommended for SEO)

```sh
node scripts/append-instagram-learn.mjs https://www.instagram.com/reel/DasHzcwKK-U/
node scripts/append-instagram-reel.mjs https://www.instagram.com/reel/DasHzcwKK-U/  # alias
```

Requires **`yt-dlp`** locally. Writes **`postedAt`**, **`instagramVideoUrl`** (reels), poster JPEG, caption, topics, and title for the **new row only** — existing hub JSON rows are left byte-identical.

**Carousels / feed posts** (`/p/…` with multiple slides or a still image) append to **`knowledgeHubInstagramPosts.json`** with `igp-…` watch ids.

### GitHub Actions (automatic PR)

1. Add a URL to **`instagram-queue.txt`** (one per line) and push, **or**
2. **Actions → Import Instagram to Learn → Run workflow** and paste the URL.

The workflow runs **`append-instagram-learn.mjs`**, Prettier, full verify, and opens a PR. Existing indexed Learn rows are not rewritten.

## Original captions (YouTube)

- **YouTube Shorts / hub uploads:** **`node scripts/fetch-youtube-hub-captions.mjs`** → `knowledgeHubYoutubeCaptions.json`

## Doctor tags

Use `charmi`, `zalak`, or `both`. Learn hub doctor tabs match **exactly** (`both` rows appear under **All** only).

Doctor assignment runs automatically during **`npm run import:instagram`**. To override a reel, add its shortcode to **`DOCTOR_BY_SHORTCODE`** in `scripts/lib/instagram-hub-classify.mjs`, then re-import.

## Other sources

- **Download your information** (Instagram settings): export JSON → convert shortcodes/URLs into scrape JSON or a URL list.
- **Manual**: Share → Copy link → `import:instagram-reels`.
