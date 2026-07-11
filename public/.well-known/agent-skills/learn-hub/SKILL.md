# Learn hub navigation — Women's Health Duo

Use this skill when you need to find **educational video and article content** on womenshealthduo.com (not booking or clinical advice).

## Hub entry

**`/learn`** — carousel of YouTube Shorts, Instagram reels, and Instagram posts/carousels from Dr. Charmi and Dr. Zalak.

## Filter URL patterns

| Pattern                        | Example                                                 |
| ------------------------------ | ------------------------------------------------------- |
| `/learn`                       | All clips (both doctors)                                |
| `/learn/dr-charmi`             | Dr. Charmi only                                         |
| `/learn/dr-zalak`              | Dr. Zalak only                                          |
| `/learn/topic/<slug>`          | By topic (e.g. `/learn/topic/fertility`)                |
| `/learn/<doctor>/topic/<slug>` | Doctor + topic (e.g. `/learn/dr-zalak/topic/pregnancy`) |

Topic slugs derive from labels: `fertility`, `labor-and-delivery`, `pilates`, `carousel`, `posts`, etc.

## Per-clip watch pages (one video per URL)

**`/learn/watch/<videoId>/`**

| `videoId` prefix | Source                     |
| ---------------- | -------------------------- |
| `ig-…`           | Instagram reel             |
| `igp-…`          | Instagram post or carousel |
| YouTube id       | YouTube Short              |

Each watch page has unique title/H1, poster image, and `VideoObject` (or `SocialMediaPosting` for static posts) JSON-LD. ~195 watch URLs are in the primary sitemap; reels + Shorts also in `/sitemap-videos.xml`.

## Written articles

**`/learn/articles`** — index of topic guides.

Flat clinical URLs at site root, e.g. `/pcos`, `/endometriosis` (see sitemap topic-guide segment).

## Topical clusters (homepage of Learn)

**`/learn#learn-pillars`** — six Bing-oriented pillars linking into topic filters and example virtual-care URLs.

## Playback notes for agents

- YouTube: official embed on watch pages.
- Instagram reels: native `<video>` when CDN URL available from import; else official `/reel/{id}/embed/` iframe.
- Instagram posts: official `/p/{id}/embed/` iframe.
- Canonical playback remains on YouTube/Instagram; WHD pages aid discovery and indexing.

## Refreshing clip data (maintainers)

Clip metadata lives in `src/data/knowledgeHubInstagramReels.json`, `knowledgeHubInstagramPosts.json`, and `knowledgeHubVideos.ts`. Run `npm run import:instagram` to refresh CDN URLs and hub thumbnails.
