# Bulk Instagram reels for the Learn hub

Reels live in **`src/data/knowledgeHubInstagramReels.json`**; carousels and feed images in **`knowledgeHubInstagramPosts.json`**. Both merge in **`src/data/knowledgeHubVideos.ts`**.

Optional per row: **`postedAt`** (ISO 8601) and **`approxViews`** (number). The hub sorts by **UTC calendar day of `postedAt` (newest day first)**, then by **`approxViews` descending** within the same day. Rows without `postedAt` sort after all dated rows.

Add **`instagramCaption`** for the **original caption** under each embed on `/learn` and for JSON-LD `VideoObject.description`.

## Primary: JSON scrape → hub JSON

Place exports in **`ig/reels_scrap.json`** and **`ig/posts_scrap.json`**, then:

```sh
npm run import:instagram
```

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
2. `npm run import:instagram-reels -- path/to/reel-urls.txt`
3. Optionally refresh captions: **`node scripts/sync-instagram-captions-from-oembed.mjs`**

## Original captions (YouTube)

- **YouTube Shorts / hub uploads:** **`node scripts/fetch-youtube-hub-captions.mjs`** → `knowledgeHubYoutubeCaptions.json`

## Doctor tags

Use `charmi`, `zalak`, or `both`. Learn hub doctor tabs match **exactly** (`both` rows appear under **All** only).

Doctor assignment runs automatically during **`npm run import:instagram`**. To override a reel, add its shortcode to **`DOCTOR_BY_SHORTCODE`** in `scripts/lib/instagram-hub-classify.mjs`, then re-import.

## Other sources

- **Download your information** (Instagram settings): export JSON → convert shortcodes/URLs into scrape JSON or a URL list.
- **Manual**: Share → Copy link → `import:instagram-reels`.
