# Bulk Instagram reels for the Learn hub

The site cannot reliably **scrape** every reel from [instagram.com/womenshealthduo/reels](https://www.instagram.com/womenshealthduo/reels/) (the listing is not a stable public API, and automated scraping conflicts with Instagram’s terms).

Reels are stored in **`src/data/knowledgeHubInstagramReels.json`** and merged in **`src/data/knowledgeHubVideos.ts`**.

Optional per row: **`postedAt`** (ISO 8601) and **`approxViews`** (number). The hub sorts by **UTC calendar day of `postedAt` (newest day first)**, then by **`approxViews` descending** within the same day. Rows without `postedAt` sort after all dated rows (then by views).

Add **`instagramCaption`** for the **original caption** under each embed on `/learn` and for JSON-LD `VideoObject.description`. Prefer syncing from Instagram with **`node scripts/sync-instagram-captions-from-oembed.mjs`** (see below). YouTube hub descriptions live in **`knowledgeHubYoutubeCaptions.json`**, merged in **`knowledgeHubVideos.ts`** as **`youtubeCaption`** — refresh with **`node scripts/fetch-youtube-hub-captions.mjs`**.

## Add many reel URLs at once

1. Create a text file with one URL (or bare shortcode) per line, for example:

   ```text
   https://www.instagram.com/reel/AbCdEfGhIjK/
   https://www.instagram.com/womenshealthduo/reel/AbCdEfGhIjK/
   https://www.instagram.com/p/XyZaBcDeFgH/
   ```

2. From the repo root:

   ```sh
   npm run import:instagram-reels -- path/to/reel-urls.txt
   ```

   Or pipe stdin:

   ```sh
   cat reel-urls.txt | node scripts/import-instagram-reel-urls.mjs
   ```

3. The script **merges** into the JSON (skips duplicates), adds default `title` / `summary` / `doctor` / `topics` for new rows, and preserves hand-edited fields on existing shortcodes.

4. Refine titles, `doctor`, `topics`, and optional hand-edited `instagramCaption` in the JSON as needed, then run `npm run lint && npm run typecheck && npm run build`.

## Original captions (Instagram + YouTube)

The Learn hub shows **public caption / description text** under each embed for authenticity.

- **Instagram reels:** run **`node scripts/sync-instagram-captions-from-oembed.mjs`** — fills **`instagramCaption`** from Instagram’s oEmbed `title` field (full caption) on each row in `knowledgeHubInstagramReels.json`. Rate-limited; re-run after adding reels.
- **YouTube Shorts / uploads in the hub:** run **`node scripts/fetch-youtube-hub-captions.mjs`** — writes **`src/data/knowledgeHubYoutubeCaptions.json`** (video id → description from `ytInitialPlayerResponse` on the watch page). `knowledgeHubVideos.ts` merges this into each hub row as **`youtubeCaption`**.

**`doctor` field:** Use `charmi`, `zalak`, or `both`. The Learn hub doctor tabs match **exactly** (single-doctor tabs do not include `both`). To bulk-refresh tags from public captions, fetch oEmbed with `node scripts/fetch-instagram-reel-oembed.mjs`, then update the map in `scripts/apply-reel-doctor-tags.mjs` and run `node scripts/apply-reel-doctor-tags.mjs`.

## Where to get a full list of reel links

- **Instagram Graph API** (Meta app + Business/Creator Instagram linked to a Facebook Page): list media for the IG user.
- **Download your information** (Instagram settings): your export can include content metadata with permalinks.
- **Manual / clipboard**: Share → Copy link per reel (works for smaller sets).
