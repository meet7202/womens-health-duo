/**
 * Curated playable embeds for the Learn / content hub.
 * YouTube: Shorts and uploads from **@WomensHealthDuo** (titles from public oEmbed where applicable).
 * Instagram reels: `knowledgeHubInstagramReels.json`; carousels / feed posts: `knowledgeHubInstagramPosts.json`.
 * Bulk merge from `ig/*.json`: `npm run import:instagram`.
 * URL list: `npm run import:instagram-reels -- path/to/reel-urls.txt`.
 *
 * **Sort order:** `KNOWLEDGE_HUB_VIDEOS` is ordered by **UTC calendar `postedAt` day, newest day first**,
 * then by **`approxViews` descending** within the same day (relevance). Items without `postedAt` sort
 * after all dated items, then by views, then by full timestamp if present, then `id`.
 *
 * **`youtubeCaption`** / **`instagramCaption`**: original public text from each platform for the Learn hub
 * **Caption** block and **`VideoObject.description`**. YouTube descriptions are merged from
 * `knowledgeHubYoutubeCaptions.json` (regenerate with `node scripts/fetch-youtube-hub-captions.mjs`). Instagram
 * captions live on each row in `knowledgeHubInstagramReels.json` (sync with
 * `node scripts/sync-instagram-captions-from-oembed.mjs`).
 */
import knowledgeHubInstagramPostsJson from "./knowledgeHubInstagramPosts.json";
import knowledgeHubInstagramReelsJson from "./knowledgeHubInstagramReels.json";
import knowledgeHubYoutubeCaptionsJson from "./knowledgeHubYoutubeCaptions.json";

export type HubDoctorTag = "charmi" | "zalak" | "both";

export type KnowledgeHubVideo =
  | {
      id: string;
      kind: "youtube_short";
      doctor: HubDoctorTag;
      topics: string[];
      title: string;
      summary: string;
      youtubeVideoId: string;
      /**
       * `shorts` (default): open link targets `/shorts/{id}`.
       * `watch`: standard upload from @WomensHealthDuo ,  use `/watch?v={id}` for “Open on YouTube”.
       */
      youtubeOpenAs?: "shorts" | "watch";
      /** ISO 8601 (e.g. from YouTube “Published”); hub list sorts newest first. */
      postedAt?: string;
      /** Approximate public view count; secondary sort (higher = more relevant). */
      approxViews?: number;
      /** Full description from YouTube (paste from app / Studio) ,  under embed for SEO. */
      youtubeCaption?: string;
    }
  | {
      id: string;
      kind: "instagram_reel";
      doctor: HubDoctorTag;
      topics: string[];
      title: string;
      summary: string;
      instagramReelId: string;
      /**
       * Direct MP4 from Instagram CDN (from scrape import). Used for inline playback when the
       * official embed shows “Watch on Instagram” (licensed music). Refresh with
       * `npm run import:instagram` — URLs expire after a few weeks.
       */
      instagramVideoUrl?: string;
      /** Remote cover frame from scrape (may expire). */
      instagramPosterUrl?: string;
      /** Local cover in `public/images/hub-thumbs/` — used for player posters. */
      instagramPosterPath?: string;
      /** Full caption from Instagram (paste from app) ,  shown under embed for SEO. */
      instagramCaption?: string;
      postedAt?: string;
      approxViews?: number;
    }
  | {
      id: string;
      kind: "instagram_post";
      doctor: HubDoctorTag;
      topics: string[];
      title: string;
      summary: string;
      instagramPostId: string;
      /** Carousel multi-slide post vs single feed image. */
      instagramPostType: "carousel" | "image";
      instagramCaption?: string;
      instagramPosterUrl?: string;
      instagramPosterPath?: string;
      postedAt?: string;
      approxViews?: number;
    };

export type KnowledgeHubInstagramMedia = Extract<
  KnowledgeHubVideo,
  { kind: "instagram_reel" } | { kind: "instagram_post" }
>;

const GENERIC_INSTAGRAM_REEL_TITLE = /^Women's Health Duo\s*[—–,]\s*Instagram Reel$/i;
const GENERIC_INSTAGRAM_POST_TITLE = /^Women's Health Duo\s*[—–,]\s*Instagram (Carousel|Post)$/i;

export function knowledgeHubInstagramShortcode(v: KnowledgeHubInstagramMedia): string {
  return v.kind === "instagram_reel" ? v.instagramReelId : v.instagramPostId;
}

export function knowledgeHubInstagramPermalink(v: KnowledgeHubInstagramMedia): string {
  const code = knowledgeHubInstagramShortcode(v);
  return v.kind === "instagram_reel"
    ? `https://www.instagram.com/reel/${code}/`
    : `https://www.instagram.com/p/${code}/`;
}

export function knowledgeHubInstagramEmbedUrl(v: KnowledgeHubInstagramMedia): string {
  return `${knowledgeHubInstagramPermalink(v)}embed/`;
}

export function knowledgeHubInstagramPoster(v: KnowledgeHubInstagramMedia): string | undefined {
  const local = v.instagramPosterPath?.trim();
  if (local) return local;
  return v.instagramPosterUrl?.trim() || undefined;
}

export function knowledgeHubInstagramReelNativeVideo(
  v: Extract<KnowledgeHubVideo, { kind: "instagram_reel" }>,
): { src: string; poster?: string } | null {
  const src = v.instagramVideoUrl?.trim();
  if (!src) return null;
  const poster = knowledgeHubInstagramPoster(v);
  return poster ? { src, poster } : { src };
}

/** On-page H1 and `<title>` for watch pages; prefers a caption lead over generic reel titles. */
export function knowledgeHubVideoDisplayTitle(v: KnowledgeHubVideo): string {
  const title = v.title.trim();
  const isGenericInstagram =
    (v.kind === "instagram_reel" && GENERIC_INSTAGRAM_REEL_TITLE.test(title)) ||
    (v.kind === "instagram_post" && GENERIC_INSTAGRAM_POST_TITLE.test(title));
  if (!isGenericInstagram) return v.title;
  const cap = knowledgeHubVideoOriginalPlatformCaption(v);
  if (cap) {
    const line = cap
      .split("\n")
      .map((l) => l.trim())
      .find((l) => l.length >= 24);
    if (line) return line.length > 120 ? `${line.slice(0, 117)}…` : line;
  }
  return v.title;
}

/** Text under the embed and in `VideoObject.description` ,  use platform captions when set. */
export function knowledgeHubVideoCaptionForSeo(v: KnowledgeHubVideo): string {
  if (v.kind === "youtube_short") {
    return v.youtubeCaption ?? `${v.title}\n\n${v.summary}`;
  }
  return v.instagramCaption ?? `${v.title}\n\n${v.summary}`;
}

/** Original public caption / description only (no site fallback). */
export function knowledgeHubVideoOriginalPlatformCaption(v: KnowledgeHubVideo): string | null {
  if (v.kind === "youtube_short") {
    const t = v.youtubeCaption?.trim();
    return t && t.length > 0 ? t : null;
  }
  const t = v.instagramCaption?.trim();
  return t && t.length > 0 ? t : null;
}

type KnowledgeHubInstagramReelJson = Omit<
  Extract<KnowledgeHubVideo, { kind: "instagram_reel" }>,
  "kind"
>;

type KnowledgeHubInstagramPostJson = Omit<
  Extract<KnowledgeHubVideo, { kind: "instagram_post" }>,
  "kind"
>;

const KNOWLEDGE_HUB_YOUTUBE_CAPTIONS = knowledgeHubYoutubeCaptionsJson as Record<string, string>;

const KNOWLEDGE_HUB_INSTAGRAM_REELS: readonly KnowledgeHubVideo[] = (
  knowledgeHubInstagramReelsJson as KnowledgeHubInstagramReelJson[]
).map((row) => ({
  kind: "instagram_reel" as const,
  ...row,
}));

const KNOWLEDGE_HUB_INSTAGRAM_POSTS: readonly KnowledgeHubVideo[] = (
  knowledgeHubInstagramPostsJson as KnowledgeHubInstagramPostJson[]
).map((row) => ({
  kind: "instagram_post" as const,
  ...row,
}));

/** Public-page snapshot; refresh from YouTube Studio when marketing numbers matter. */
const KNOWLEDGE_HUB_YOUTUBE_VIDEOS_RAW: readonly KnowledgeHubVideo[] = [
  {
    id: "yt-duo-pilates-day",
    kind: "youtube_short",
    youtubeVideoId: "fhr0O0EhPvk",
    doctor: "zalak",
    topics: ["Pilates", "STOTT Pilates"],
    title: "Happy International Pilates Day",
    summary: "Women's Health Duo on YouTube Shorts ,  Pilates day highlight.",
    postedAt: "2026-05-02T04:47:39-07:00",
    approxViews: 1162,
  },
  {
    id: "yt-duo-labor-prep",
    kind: "youtube_short",
    youtubeVideoId: "br8F8KkUyMQ",
    doctor: "charmi",
    topics: ["Pregnancy", "Labor & delivery"],
    title: "What every pregnant woman SHOULD know before they go into LABOR!",
    summary: "Women's Health Duo on YouTube Shorts ,  labor preparation.",
    postedAt: "2026-04-23T05:30:13-07:00",
    approxViews: 1120,
  },
  {
    id: "yt-duo-pregnancy-brain",
    kind: "youtube_short",
    youtubeVideoId: "th_SrXDdXoY",
    doctor: "charmi",
    topics: ["Pregnancy", "Patient education"],
    title: "Pregnant? Do this for your baby’s brain and your health 🧠",
    summary: "Women's Health Duo (@WomensHealthDuo) ,  long-form upload on YouTube.",
    youtubeOpenAs: "watch",
    postedAt: "2026-04-02T10:18:25-07:00",
    approxViews: 420,
  },
  {
    id: "yt-duo-exercise-pregnancy-p3",
    kind: "youtube_short",
    youtubeVideoId: "afIPvyMykAk",
    doctor: "zalak",
    topics: ["Pregnancy", "Exercise"],
    title: "Can you exercise during pregnancy if you have not exercised before? 👀 PART 3!",
    summary: "Women's Health Duo on YouTube Shorts ,  exercise when new to training.",
    postedAt: "2026-02-10T05:54:31-08:00",
    approxViews: 1776,
  },
  {
    id: "yt-duo-walking-pregnancy",
    kind: "youtube_short",
    youtubeVideoId: "Hg4HvbwdWXY",
    doctor: "zalak",
    topics: ["Pregnancy", "Exercise"],
    title: "Is walking enough in Pregnancy? Check description to know more!",
    summary: "Women's Health Duo on YouTube Shorts ,  activity in pregnancy.",
    postedAt: "2026-02-06T06:03:06-08:00",
    approxViews: 46,
  },
  {
    id: "yt-duo-pregnancy-workshop",
    kind: "youtube_short",
    youtubeVideoId: "5bHOCmxzgKg",
    doctor: "zalak",
    topics: ["Pregnancy", "Workshop"],
    title: "Exercise in Pregnancy Workshop - Ahmedabad",
    summary: "Women's Health Duo on YouTube Shorts ,  pregnancy exercise workshop.",
    postedAt: "2026-02-04T06:00:28-08:00",
    approxViews: 687,
  },
  {
    id: "yt-duo-fertility-tests",
    kind: "youtube_short",
    youtubeVideoId: "YE9qPLTptRw",
    doctor: "charmi",
    topics: ["Fertility", "Patient education"],
    title: "Trying to conceive?🤰🏻Get these fertility tests done! 🔬",
    summary: "Women's Health Duo on YouTube Shorts ,  fertility testing overview.",
    postedAt: "2026-01-30T09:28:27-08:00",
    approxViews: 630,
  },
  {
    id: "yt-duo-kegels-myth",
    kind: "youtube_short",
    youtubeVideoId: "l9NBdXUrnRg",
    doctor: "both",
    topics: ["Labor & delivery", "Pelvic floor", "Patient education"],
    title: "The biggest childbirth myth - Kegels prepare you for delivery",
    summary: "Women's Health Duo (@WomensHealthDuo) ,  long-form upload on YouTube.",
    youtubeOpenAs: "watch",
    postedAt: "2026-01-29T09:38:30-08:00",
    approxViews: 14776,
  },
  {
    id: "yt-duo-pregnancy-mistakes",
    kind: "youtube_short",
    youtubeVideoId: "6ZuwMigvS04",
    doctor: "charmi",
    topics: ["Pregnancy", "Patient education"],
    title: "Avoid these 3 common Pregnancy Mistakes!",
    summary: "Women's Health Duo on YouTube Shorts ,  common pregnancy mistakes.",
    postedAt: "2026-01-28T07:58:58-08:00",
    approxViews: 1204,
  },
];

const KNOWLEDGE_HUB_YOUTUBE_VIDEOS: readonly KnowledgeHubVideo[] =
  KNOWLEDGE_HUB_YOUTUBE_VIDEOS_RAW.map((v) => {
    if (v.kind !== "youtube_short") return v;
    const text = KNOWLEDGE_HUB_YOUTUBE_CAPTIONS[v.youtubeVideoId];
    if (typeof text === "string" && text.trim().length > 0) {
      return { ...v, youtubeCaption: text.trim() };
    }
    return v;
  });

function hubPostedDayUtcMs(v: KnowledgeHubVideo): number {
  if (!v.postedAt) return 0;
  const t = Date.parse(v.postedAt);
  if (Number.isNaN(t)) return 0;
  const d = new Date(t);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

function hubApproxViews(v: KnowledgeHubVideo): number {
  return typeof v.approxViews === "number" && Number.isFinite(v.approxViews) ? v.approxViews : 0;
}

function compareKnowledgeHubVideos(a: KnowledgeHubVideo, b: KnowledgeHubVideo): number {
  const dayB = hubPostedDayUtcMs(b);
  const dayA = hubPostedDayUtcMs(a);
  if (dayB !== dayA) return dayB - dayA;
  const viewsB = hubApproxViews(b);
  const viewsA = hubApproxViews(a);
  if (viewsB !== viewsA) return viewsB - viewsA;
  const tieB = hubPostedInstantMs(b);
  const tieA = hubPostedInstantMs(a);
  if (tieB !== tieA) return tieB - tieA;
  return a.id.localeCompare(b.id);
}

/** Full instant for tie-break when two items share the same UTC calendar day and view count. */
function hubPostedInstantMs(v: KnowledgeHubVideo): number {
  if (!v.postedAt) return 0;
  const t = Date.parse(v.postedAt);
  return Number.isNaN(t) ? 0 : t;
}

const _hubMerged: KnowledgeHubVideo[] = [
  ...KNOWLEDGE_HUB_INSTAGRAM_REELS,
  ...KNOWLEDGE_HUB_INSTAGRAM_POSTS,
  ...KNOWLEDGE_HUB_YOUTUBE_VIDEOS,
];
_hubMerged.sort(compareKnowledgeHubVideos);

export const KNOWLEDGE_HUB_VIDEOS: readonly KnowledgeHubVideo[] = _hubMerged;

export function getKnowledgeHubVideoById(id: string): KnowledgeHubVideo | undefined {
  return KNOWLEDGE_HUB_VIDEOS.find((v) => v.id === id);
}
