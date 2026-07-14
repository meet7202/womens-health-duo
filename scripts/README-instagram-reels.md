# Bulk Instagram reels for the Learn hub

Reels live in **`src/data/knowledgeHubInstagramReels.json`**; carousels and feed images in **`knowledgeHubInstagramPosts.json`**; YouTube Shorts and uploads in **`KNOWLEDGE_HUB_YOUTUBE_VIDEOS_RAW`** inside **`src/data/knowledgeHubVideos.ts`**. All merge in **`KNOWLEDGE_HUB_VIDEOS`**.

Optional per row: **`postedAt`** (ISO 8601) and **`approxViews`** (number). The hub sorts by **UTC calendar day of `postedAt` (newest day first)**, then by **`approxViews` descending** within the same day. Rows without `postedAt` sort after all dated rows.

Add **`instagramCaption`** for the **original caption** under each embed on `/learn` and for JSON-LD `VideoObject.description`.

## Primary: JSON scrape → hub JSON

Place exports in **`ig/reels_scrap.json`** and **`ig/posts_scrap.json`**, then:

```sh
npm run import:instagram
```

**SEO / indexed watch pages:** `import:instagram` **re-sorts and rewrites the entire** `knowledgeHubInstagramReels.json` (and posts JSON). Use that only for an intentional **bulk refresh** of scrape fields. When adding **one new clip**, do **not** run full import — use **`npm run import:learn-media -- <url>`** so existing rows stay unchanged.

This updates **`knowledgeHubInstagramReels.json`** (reels) and **`knowledgeHubInstagramPosts.json`** (carousels + feed images): captions, **`postedAt`**, **`approxViews`**, CDN **`instagramVideoUrl`**, local cover JPEGs in **`public/images/hub-thumbs/`** (`instagramPosterPath`), content-derived **`topics`**, and **`doctor`** (curated shortcode map + tagged-user + caption heuristics in `scripts/lib/instagram-hub-classify.mjs`).

If some cover downloads fail:

```sh
npm run retry:hub-thumbnails
```

Re-run **`npm run import:instagram`** periodically — Instagram CDN video URLs expire after a few weeks. For **CDN-only** refresh without touching captions/titles/order, use **`npm run refresh:instagram-cdn`** (or the daily **Refresh Instagram CDN** GitHub Action, which opens a PR when URLs change).

### Verify

```sh
npm run lint && npm run typecheck && npm run build
```

## URL list import (smaller batches)

1. One URL or shortcode per line in a `.txt` file.
2. `npm run import:instagram-reels -- path/to/reel-urls.txt` (adds stub rows only — prefer **`npm run import:learn-media -- <url>`** for a fully enriched single clip without touching existing rows).
3. Optionally refresh captions: **`node scripts/sync-instagram-captions-from-oembed.mjs`**

### Append one clip (recommended for SEO)

```sh
npm run import:learn-media -- https://www.instagram.com/reel/DasHzcwKK-U/
npm run import:learn-media -- https://www.youtube.com/shorts/fhr0O0EhPvk
npm run import:instagram-learn -- https://www.instagram.com/reel/DasHzcwKK-U/  # alias
node scripts/append-instagram-reel.mjs https://www.instagram.com/reel/DasHzcwKK-U/  # alias
```

Requires **`yt-dlp`** locally. Writes **`postedAt`**, captions, poster JPEG (Instagram), topics, and title for the **new row only** — existing hub rows are left byte-identical.

**Instagram:** reels → **`knowledgeHubInstagramReels.json`** (`ig-…` watch ids); carousels / feed posts → **`knowledgeHubInstagramPosts.json`** (`igp-…`).

**YouTube:** Shorts and long uploads append to **`KNOWLEDGE_HUB_YOUTUBE_VIDEOS_RAW`** in **`knowledgeHubVideos.ts`** plus **`knowledgeHubYoutubeCaptions.json`** (`yt-duo-…` hub ids; `youtubeOpenAs: "watch"` for uploads over 60s).

### GitHub Actions (one URL, end-to-end)

1. **Actions → Import Learn media → Run workflow**
2. Paste **one** Instagram or YouTube URL in **media_url**
3. Workflow imports, verifies, **pushes to `main`**, and triggers **Deploy to GitHub Pages**

No queue file or manual PR. (This repo blocks `GITHUB_TOKEN` from opening PRs, so workflows push directly after verify.)

## Original captions (YouTube)

- **YouTube Shorts / hub uploads:** **`node scripts/fetch-youtube-hub-captions.mjs`** → `knowledgeHubYoutubeCaptions.json`

## Doctor tags

Use `charmi`, `zalak`, or `both`. Learn hub doctor tabs match **exactly** (`both` rows appear under **All** only).

Doctor assignment runs automatically during **`npm run import:instagram`**. To override a reel, add its shortcode to **`DOCTOR_BY_SHORTCODE`** in `scripts/lib/instagram-hub-classify.mjs`, then re-import.

## Other sources

- **Download your information** (Instagram settings): export JSON → convert shortcodes/URLs into scrape JSON or a URL list.
- **Manual**: Share → Copy link → `import:instagram-reels`.
