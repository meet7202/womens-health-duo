import {
  KNOWLEDGE_HUB_VIDEOS,
  type HubDoctorTag,
  type KnowledgeHubVideo,
} from "../data/knowledgeHubVideos";
import { isIndexableKnowledgeHubWatchPage } from "./knowledgeHubVideoEligibility";
import { capMetaDescription } from "./seoDescription";
import { publicPathname } from "./githubPagesPublicUrl";

/**
 * Same shape as `Crumb` in `components/seo/schema/breadcrumbs`.
 * This module must not use `@/` imports: `vite.config.ts` pulls `routes.ts` → here at build time, and Node does not resolve TS path aliases.
 */
type BreadcrumbItem = { name: string; path: string };

/** Must stay aligned with `ROUTES.learn` in `src/config/routes.ts`. */
export const LEARN_HUB_BASE_PATH = "/learn" as const;

/** Prefix for per-clip watch pages (`/learn/watch/<videoId>/`). */
export const LEARN_WATCH_PATH_PREFIX = `${LEARN_HUB_BASE_PATH}/watch` as const;

/** Doctor tab on Learn: `all`, or a single clinician (`HubDoctorTag` minus duo-only `both`). */
export type LearnHubDoctorFilter = "all" | Exclude<HubDoctorTag, "both">;

/** Path segment after `/learn` for each doctor filter (indexable hub URLs). */
export const LEARN_DOCTOR_SEGMENT: Record<Exclude<HubDoctorTag, "both">, string> = {
  charmi: "dr-charmi",
  zalak: "dr-zalak",
};

const DOCTOR_SEGMENT_TO_TAG: Record<string, Exclude<LearnHubDoctorFilter, "all">> = {
  [LEARN_DOCTOR_SEGMENT.charmi]: "charmi",
  [LEARN_DOCTOR_SEGMENT.zalak]: "zalak",
};

function matchesDoctor(v: KnowledgeHubVideo, d: LearnHubDoctorFilter) {
  if (d === "all") return true;
  return v.doctor === d;
}

function matchesTopic(v: KnowledgeHubVideo, topic: string | "all") {
  if (topic === "all") return true;
  return v.topics.includes(topic);
}

/** Sorted unique topic labels across all hub clips. */
export function learnHubTopicLabels(): string[] {
  return Array.from(new Set(KNOWLEDGE_HUB_VIDEOS.flatMap((v) => v.topics))).sort((a, b) =>
    a.localeCompare(b),
  );
}

/** URL slug for a topic label (stable for sitemap + routing). */
export function learnTopicSlug(label: string): string {
  const s = label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.length > 0 ? s : "topic";
}

/** Resolve topic label from path slug, or `null` if unknown. */
export function learnTopicLabelFromSlug(slug: string): string | null {
  for (const label of learnHubTopicLabels()) {
    if (learnTopicSlug(label) === slug) return label;
  }
  return null;
}

export type LearnHubParsed = {
  doctor: LearnHubDoctorFilter;
  topic: string | "all";
};

/** Static hosts may serve the shell as `…/index.html`; app + sitemap URLs never include that suffix. */
export function stripTrailingIndexHtmlPath(pathname: string): string {
  const next = pathname.replace(/\/index\.html$/i, "");
  return next === "" ? "/" : next;
}

/**
 * Parse `/learn`, `/learn/dr-charmi`, `/learn/topic/fertility`,
 * `/learn/dr-zalak/topic/pregnancy` (pathname only; basename stripped by React Router).
 * Accepts optional trailing `/index.html` from static file resolution.
 */
export function parseLearnHubPathname(pathname: string): LearnHubParsed {
  pathname = stripTrailingIndexHtmlPath(pathname);
  const base = LEARN_HUB_BASE_PATH;
  if (!pathname.startsWith(base)) return { doctor: "all", topic: "all" };
  const rest = pathname.slice(base.length).replace(/^\/+|\/+$/g, "");
  if (!rest) return { doctor: "all", topic: "all" };

  const parts = rest.split("/").filter(Boolean);

  if (parts[0] === "topic" && parts[1]) {
    const label = learnTopicLabelFromSlug(parts[1]);
    return { doctor: "all", topic: label ?? "all" };
  }

  if (parts.length >= 3 && parts[1] === "topic" && parts[2]) {
    const doc = DOCTOR_SEGMENT_TO_TAG[parts[0]];
    const label = learnTopicLabelFromSlug(parts[2]);
    if (doc && label) return { doctor: doc, topic: label };
    if (doc) return { doctor: doc, topic: "all" };
    if (label) return { doctor: "all", topic: label };
    return { doctor: "all", topic: "all" };
  }

  if (parts.length === 1) {
    const doc = DOCTOR_SEGMENT_TO_TAG[parts[0]];
    if (doc) return { doctor: doc, topic: "all" };
  }

  return { doctor: "all", topic: "all" };
}

/** Canonical path for Learn hub filters (for links, canonical, sitemap). */
/** Canonical watch-page path for a hub clip (trailing slash for GitHub Pages). */
export function learnVideoWatchPath(videoId: string): string {
  return publicPathname(`${LEARN_WATCH_PATH_PREFIX}/${videoId}`);
}

/** Video id from `/learn/watch/<id>/`, or `null` when the path is not a watch URL. */
export function parseLearnVideoWatchId(pathname: string): string | null {
  pathname = stripTrailingIndexHtmlPath(pathname);
  const prefix = `${LEARN_WATCH_PATH_PREFIX}/`;
  if (!pathname.startsWith(prefix)) return null;
  const id = pathname.slice(prefix.length).replace(/\/+$/, "");
  return id.length > 0 ? id : null;
}

export function learnHubFilteredPath(opts: {
  doctor?: LearnHubDoctorFilter;
  topic?: string | "all";
}): string {
  const doctor = opts.doctor ?? "all";
  const topic = opts.topic ?? "all";
  const base = LEARN_HUB_BASE_PATH;
  let path: string = base;
  if (doctor === "all" && topic === "all") path = base;
  else if (doctor === "all" && topic !== "all") {
    path = `${base}/topic/${learnTopicSlug(topic)}`;
  } else if (doctor !== "all" && topic === "all") {
    path = `${base}/${LEARN_DOCTOR_SEGMENT[doctor]}`;
  } else if (doctor !== "all" && topic !== "all") {
    path = `${base}/${LEARN_DOCTOR_SEGMENT[doctor]}/topic/${learnTopicSlug(topic)}`;
  }
  return publicPathname(path);
}

function hasVideosForFilter(doctor: Exclude<LearnHubDoctorFilter, "all">, topic: string): boolean {
  return KNOWLEDGE_HUB_VIDEOS.some((v) => matchesDoctor(v, doctor) && matchesTopic(v, topic));
}

/**
 * Doctor-tab / filter link target (SEO-34).
 * When the requested doctor×topic has no qualifying clips, fall back to that doctor's all-topics hub
 * (or the all-doctors topic hub when doctor is `all`).
 */
export function learnHubDoctorFilterPath(opts: {
  doctor?: LearnHubDoctorFilter;
  topic?: string | "all";
}): string {
  const doctor = opts.doctor ?? "all";
  const topic = opts.topic ?? "all";
  if (doctor !== "all" && topic !== "all" && !hasVideosForFilter(doctor, topic)) {
    return learnHubFilteredPath({ doctor, topic: "all" });
  }
  return learnHubFilteredPath({ doctor, topic });
}

/**
 * All indexable Learn URLs: main hub, each doctor tab, each topic, and doctor×topic when at least one clip matches.
 */
export function learnHubSitemapPaths(): string[] {
  const paths = new Set<string>();
  paths.add(LEARN_HUB_BASE_PATH);
  const doctors: Exclude<LearnHubDoctorFilter, "all">[] = ["charmi", "zalak"];
  const topics = learnHubTopicLabels();

  for (const d of doctors) {
    paths.add(learnHubFilteredPath({ doctor: d, topic: "all" }));
  }
  for (const t of topics) {
    paths.add(learnHubFilteredPath({ doctor: "all", topic: t }));
    for (const d of doctors) {
      if (hasVideosForFilter(d, t)) {
        paths.add(learnHubFilteredPath({ doctor: d, topic: t }));
      }
    }
  }

  return [...paths].sort((a, b) => a.localeCompare(b));
}

/** All watch-page shells (including temporary noindex incomplete media). */
export function learnWatchShellPathnames(): string[] {
  return KNOWLEDGE_HUB_VIDEOS.map((v) => learnVideoWatchPath(v.id)).sort((a, b) =>
    a.localeCompare(b),
  );
}

/**
 * Indexable per-clip watch URLs for the primary sitemap.
 * Incomplete reels/Shorts (no date/poster) are omitted until media eligibility is complete.
 */
export function learnWatchSitemapPaths(): string[] {
  return KNOWLEDGE_HUB_VIDEOS.filter(isIndexableKnowledgeHubWatchPage)
    .map((v) => learnVideoWatchPath(v.id))
    .sort((a, b) => a.localeCompare(b));
}

function doctorFilterLabel(d: LearnHubDoctorFilter): string {
  if (d === "charmi") return "Dr. Charmi";
  if (d === "zalak") return "Dr. Zalak";
  return "All doctors";
}

/** Videos matching the current URL filter (for JSON-LD and carousels). */
export function learnHubVideosMatching(parsed: LearnHubParsed): readonly KnowledgeHubVideo[] {
  return KNOWLEDGE_HUB_VIDEOS.filter(
    (v) => matchesDoctor(v, parsed.doctor) && matchesTopic(v, parsed.topic),
  );
}

export function learnHubBreadcrumbs(parsed: LearnHubParsed): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: "Home", path: "/" },
    { name: "Learn", path: LEARN_HUB_BASE_PATH },
  ];
  if (parsed.doctor !== "all") {
    items.push({
      name: doctorFilterLabel(parsed.doctor),
      path: learnHubFilteredPath({ doctor: parsed.doctor, topic: "all" }),
    });
  }
  if (parsed.topic !== "all") {
    items.push({
      name: parsed.topic,
      path: learnHubFilteredPath(parsed),
    });
  }
  return items;
}

export {
  learnHubDocumentTitle as learnHubSeoTitle,
  learnHubH1 as learnHubSeoH1,
} from "./pageSeoCopy";

/**
 * Filter identity comes first so capping cannot erase doctor/topic (SEO-05).
 * Root vs filtered views get distinct authored descriptions — not one shared paragraph + late suffix.
 */
export function learnHubSeoDescription(parsed: LearnHubParsed): string {
  if (parsed.doctor === "all" && parsed.topic === "all") {
    // Keep both clinicians early so capping cannot drop Dr. Zalak (SEO-05).
    return capMetaDescription(
      "Learn hub videos with Dr. Charmi Shah and Dr. Zalak Shah: pregnancy, pelvic floor, fertility, and Pilates Shorts/Reels with dedicated watch pages.",
    );
  }
  if (parsed.doctor === "charmi" && parsed.topic === "all") {
    return capMetaDescription(
      "Dr. Charmi Shah Learn clips: OB-GYN, IVF, fertility, hormones, and pregnancy education from Women's Health Duo. Browse Shorts, Reels, and posts with watch pages.",
    );
  }
  if (parsed.doctor === "zalak" && parsed.topic === "all") {
    return capMetaDescription(
      "Dr. Zalak Shah Learn clips: women's health physiotherapy, pelvic floor, prenatal/postnatal movement, and STOTT Pilates from Women's Health Duo.",
    );
  }
  if (parsed.doctor === "all" && parsed.topic !== "all") {
    return capMetaDescription(
      `${parsed.topic} videos from Women's Health Duo: clinician-led Shorts, Reels, and posts with watch pages. Filter by Dr. Charmi or Dr. Zalak as needed.`,
    );
  }
  const doctor =
    parsed.doctor === "charmi"
      ? "Dr. Charmi Shah (OB-GYN)"
      : "Dr. Zalak Shah (women's health physio)";
  return capMetaDescription(
    `${parsed.topic} clips led by ${doctor} on the Women's Health Duo Learn hub — dedicated watch pages for each video.`,
  );
}
