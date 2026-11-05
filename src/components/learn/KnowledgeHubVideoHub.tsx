import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/config/site";
import { AppLink as Link } from "@/components/router/AppLink";
import { KNOWLEDGE_HUB_VIDEOS, type KnowledgeHubVideo } from "@/data/knowledgeHubVideos";
import { KnowledgeHubVideoCard } from "@/components/learn/KnowledgeHubVideoCard";
import {
  learnHubDoctorFilterPath,
  learnHubFilteredPath,
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

/**
 * Learn hub listing (SEO-26): lightweight poster cards only.
 * Full players live on `/learn/watch/:id` — keeps listing DOM/JS bounded while watch URLs stay discoverable.
 */
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
        <strong className="text-foreground">watch page</strong> with the original caption or
        description for search and sharing.
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
                <Link replace to={learnHubDoctorFilterPath({ doctor: value, topic })}>
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
              <KnowledgeHubVideoCard key={video.id} video={video} />
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
