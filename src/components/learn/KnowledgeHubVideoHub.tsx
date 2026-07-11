import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/site";
import { AppLink as Link } from "@/components/router/AppLink";
import {
  KNOWLEDGE_HUB_VIDEOS,
  knowledgeHubInstagramPermalink,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "@/data/knowledgeHubVideos";
import { KnowledgeHubVideoPlayer } from "@/components/learn/KnowledgeHubVideoPlayer";
import {
  learnHubFilteredPath,
  learnVideoWatchPath,
  parseLearnHubPathname,
  type LearnHubDoctorFilter,
} from "@/lib/learnHubUrls";
import { Instagram, Youtube } from "lucide-react";

const DOCTOR_FILTERS: { value: LearnHubDoctorFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "charmi", label: "Dr. Charmi" },
  { value: "zalak", label: "Dr. Zalak" },
];

function matchesDoctor(v: KnowledgeHubVideo, d: LearnHubDoctorFilter) {
  if (d === "all") return true;
  return v.doctor === d;
}

function matchesTopic(v: KnowledgeHubVideo, topic: string | "all") {
  if (topic === "all") return true;
  return v.topics.includes(topic);
}

/** Topic labels that appear on at least one video in the given list (sorted). */
function topicLabelsForVideos(videos: readonly KnowledgeHubVideo[]): string[] {
  return Array.from(new Set(videos.flatMap((v) => v.topics))).sort((a, b) => a.localeCompare(b));
}

function VideoSlide({ video }: { video: KnowledgeHubVideo }) {
  const openLabel = video.kind === "youtube_short" ? "Open on YouTube" : "Open on Instagram";
  const openHref =
    video.kind === "youtube_short"
      ? video.youtubeOpenAs === "watch"
        ? `https://www.youtube.com/watch?v=${video.youtubeVideoId}`
        : `https://www.youtube.com/shorts/${video.youtubeVideoId}`
      : knowledgeHubInstagramPermalink(video);
  const watchPath = learnVideoWatchPath(video.id);
  const displayTitle = knowledgeHubVideoDisplayTitle(video);

  return (
    <div className="flex h-full flex-col rounded-2xl border border-border/50 bg-card shadow-soft overflow-hidden">
      <div className="border-b border-border/40 bg-muted/30 px-4 py-3 space-y-1 min-h-[7.25rem]">
        <div className="flex flex-wrap items-center gap-2 text-xs min-h-[1.75rem]">
          <span className="rounded-full bg-primary/15 px-2 py-0.5 font-medium text-primary">
            {video.doctor === "charmi"
              ? "Dr. Charmi"
              : video.doctor === "zalak"
                ? "Dr. Zalak"
                : "Duo"}
          </span>
          {video.topics.map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-0.5 text-muted-foreground">
              {t}
            </span>
          ))}
        </div>
        <p className="text-sm font-medium text-foreground leading-snug line-clamp-2 min-h-[2.5rem]">
          <Link to={watchPath} className="hover:text-primary transition-colors">
            {displayTitle}
          </Link>
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {video.summary}
        </p>
      </div>
      <KnowledgeHubVideoPlayer video={video} variant="carousel" className="flex-1 min-h-0" />
      <div className="flex items-center justify-between gap-2 border-t border-border/40 px-3 py-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {video.kind === "youtube_short" ? (
            <Youtube className="h-4 w-4 shrink-0" aria-hidden />
          ) : (
            <Instagram className="h-4 w-4 shrink-0" aria-hidden />
          )}
          <span>Plays on {video.kind === "youtube_short" ? "YouTube" : "Instagram"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="shrink-0 text-primary" asChild>
            <Link to={watchPath}>Watch page</Link>
          </Button>
          <Button variant="ghost" size="sm" className="shrink-0 text-primary" asChild>
            <a href={openHref} target="_blank" rel="noopener noreferrer">
              {openLabel}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function KnowledgeHubVideoHub() {
  const location = useLocation();
  const parsed = useMemo(() => parseLearnHubPathname(location.pathname), [location.pathname]);
  const { doctor, topic } = parsed;

  const videosForDoctor = useMemo(
    () => KNOWLEDGE_HUB_VIDEOS.filter((v) => matchesDoctor(v, doctor)),
    [doctor],
  );

  const topicOptions = useMemo(() => topicLabelsForVideos(videosForDoctor), [videosForDoctor]);

  const filtered = useMemo(
    () => videosForDoctor.filter((v) => matchesTopic(v, topic)),
    [videosForDoctor, topic],
  );

  return (
    <section className="mb-14" aria-labelledby="content-hub-heading">
      <h2
        id="content-hub-heading"
        className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-2"
      >
        Content hub
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
        Reels, carousels, and posts on women&apos;s health, pregnancy, movement, pelvic wellness,
        and more, from Dr. Charmi and Dr. Zalak. Pick a doctor or a topic to see what matches you;
        browse the grid below. Each item also has a dedicated{" "}
        <strong className="text-foreground">watch page</strong> with the full transcript for search
        and sharing.
      </p>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Doctor
          </p>
          <div className="flex flex-wrap gap-2">
            {DOCTOR_FILTERS.map(({ value, label }) => (
              <Button
                key={value}
                type="button"
                size="sm"
                variant={doctor === value ? "default" : "outline"}
                className={cn(doctor === value && "shadow-soft")}
                asChild
              >
                <Link replace to={learnHubFilteredPath({ doctor: value, topic })}>
                  {label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Topic
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              size="sm"
              variant={topic === "all" ? "default" : "outline"}
              asChild
            >
              <Link replace to={learnHubFilteredPath({ doctor, topic: "all" })}>
                All topics
              </Link>
            </Button>
            {topicOptions.map((t) => (
              <Button
                key={t}
                type="button"
                size="sm"
                variant={topic === t ? "default" : "outline"}
                asChild
              >
                <Link replace to={learnHubFilteredPath({ doctor, topic: t })}>
                  {t}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border/40 bg-muted/10 p-4 sm:p-6">
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8 text-center">
            No posts match these filters. Try &quot;All&quot; or another topic.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {filtered.map((video) => (
              <VideoSlide key={video.id} video={video} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={`${CONTACT.youtube}/shorts`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-border/50 bg-card p-4 text-sm text-foreground hover:border-primary/40 transition-colors"
        >
          <Youtube className="h-6 w-6 text-primary mb-2" aria-hidden />
          <span className="font-semibold block">@WomensHealthDuo , Shorts</span>
          <span className="text-muted-foreground text-xs mt-1 block">
            Shorts-only tab on YouTube.
          </span>
        </a>
        <a
          href={`${CONTACT.instagram}/reels/`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-border/50 bg-card p-4 text-sm text-foreground hover:border-primary/40 transition-colors"
        >
          <Instagram className="h-6 w-6 text-primary mb-2" aria-hidden />
          <span className="font-semibold block">@womenshealthduo , Reels</span>
          <span className="text-muted-foreground text-xs mt-1 block">Instagram Reels tab.</span>
        </a>
      </div>
    </section>
  );
}
