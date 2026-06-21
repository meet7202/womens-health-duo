import {
  KNOWLEDGE_HUB_VIDEOS,
  type HubDoctorTag,
  type KnowledgeHubVideo,
} from "../data/knowledgeHubVideos";

/**
 * Same shape as `Crumb` in `components/seo/schema/breadcrumbs`.
 * This module must not use `@/` imports: `vite.config.ts` pulls `routes.ts` → here at build time, and Node does not resolve TS path aliases.
 */
type BreadcrumbItem = { name: string; path: string };

/** Must stay aligned with `ROUTES.learn` in `src/config/routes.ts`. */
export const LEARN_HUB_BASE_PATH = "/learn" as const;

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
export function learnHubFilteredPath(opts: {
  doctor?: LearnHubDoctorFilter;
  topic?: string | "all";
}): string {
  const doctor = opts.doctor ?? "all";
  const topic = opts.topic ?? "all";
  const base = LEARN_HUB_BASE_PATH;
  if (doctor === "all" && topic === "all") return base;
  if (doctor === "all" && topic !== "all") {
    return `${base}/topic/${learnTopicSlug(topic)}`;
  }
  if (doctor !== "all" && topic === "all") {
    return `${base}/${LEARN_DOCTOR_SEGMENT[doctor]}`;
  }
  if (doctor !== "all" && topic !== "all") {
    return `${base}/${LEARN_DOCTOR_SEGMENT[doctor]}/topic/${learnTopicSlug(topic)}`;
  }
  return base;
}

function hasVideosForFilter(doctor: Exclude<LearnHubDoctorFilter, "all">, topic: string): boolean {
  return KNOWLEDGE_HUB_VIDEOS.some((v) => matchesDoctor(v, doctor) && matchesTopic(v, topic));
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

const LEARN_SEO_BASE =
  "Free educational women's health content on YouTube and Instagram for patients worldwide—pregnancy, pelvic floor, OB-GYN themes, Mat Pilates online, and STOTT Pilates (Mat & Reformer). Playable Shorts and Reels via official YouTube and Instagram.";

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

export function learnHubSeoTitle(parsed: LearnHubParsed): string {
  const root = "Learn with Women's Health Duo | Video hub";
  if (parsed.doctor === "all" && parsed.topic === "all") {
    return `${root} — YouTube Shorts & Instagram Reels`;
  }
  if (parsed.doctor !== "all" && parsed.topic === "all") {
    return `${root} — ${doctorFilterLabel(parsed.doctor)} clips`;
  }
  if (parsed.doctor === "all" && parsed.topic !== "all") {
    return `${root} — ${parsed.topic}`;
  }
  return `${root} — ${doctorFilterLabel(parsed.doctor)} · ${parsed.topic}`;
}

export function learnHubSeoDescription(parsed: LearnHubParsed): string {
  const tail =
    " Pairs with our online video consults from India for NRIs and international families. Not a substitute for individualized care.";
  if (parsed.doctor === "all" && parsed.topic === "all") {
    return `${LEARN_SEO_BASE}${tail}`.slice(0, 320);
  }
  const bits: string[] = [LEARN_SEO_BASE];
  if (parsed.doctor !== "all") {
    bits.push(
      parsed.doctor === "charmi"
        ? "This view highlights clips led by Dr. Charmi Shah (OB-GYN)."
        : "This view highlights clips led by Dr. Zalak Shah (women's health physio & STOTT Pilates).",
    );
  }
  if (parsed.topic !== "all") {
    bits.push(`Topic filter: ${parsed.topic}.`);
  }
  return (bits.join(" ") + tail).slice(0, 320);
}
