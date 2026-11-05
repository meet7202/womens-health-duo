/**
 * Lightweight Learn hub card (SEO-26): poster + link to the watch page only.
 * Does not import `KnowledgeHubVideoPlayer` — players stay on watch pages.
 */
import { Instagram, Youtube } from "lucide-react";
import { AppLink as Link } from "@/components/router/AppLink";
import { Button } from "@/components/ui/button";
import {
  knowledgeHubInstagramPoster,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "@/data/knowledgeHubVideos";
import { learnVideoWatchPath } from "@/lib/learnHubUrls";
import { knowledgeHubPosterAlt } from "@/lib/mediaSeo";

function youtubeThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function posterSrc(video: KnowledgeHubVideo): string | undefined {
  if (video.kind === "youtube_short") return youtubeThumbnail(video.youtubeVideoId);
  if (video.kind === "instagram_reel" || video.kind === "instagram_post") {
    return knowledgeHubInstagramPoster(video);
  }
  return undefined;
}

export function KnowledgeHubVideoCard({ video }: { video: KnowledgeHubVideo }) {
  const watchPath = learnVideoWatchPath(video.id);
  const displayTitle = knowledgeHubVideoDisplayTitle(video);
  const poster = posterSrc(video);
  const posterAlt = knowledgeHubPosterAlt(video);
  const isPost = video.kind === "instagram_post";
  const frameClass = isPost
    ? "aspect-square w-full max-h-[min(70vh,520px)] min-h-[280px]"
    : "aspect-[9/16] w-full max-h-[min(70vh,520px)] min-h-[320px]";

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

      <div className="relative bg-black/5 flex-1 min-h-0">
        {poster ? (
          <Link
            to={watchPath}
            className={`relative block w-full overflow-hidden bg-muted/20 ${frameClass} group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
            aria-label={`Open watch page: ${posterAlt}`}
          >
            <img
              src={poster}
              alt={posterAlt}
              title={posterAlt}
              className="absolute inset-0 h-full w-full object-contain bg-muted/30"
              loading="lazy"
              decoding="async"
            />
            <span
              className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/30"
              aria-hidden
            >
              <span className="rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white shadow-lg">
                Open watch page
              </span>
            </span>
          </Link>
        ) : (
          <Link
            to={watchPath}
            className={`${frameClass} flex items-center justify-center bg-muted/40 px-4 text-center text-sm text-primary underline-offset-4 hover:underline`}
          >
            Open watch page
          </Link>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-border/40 px-3 py-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {video.kind === "youtube_short" ? (
            <Youtube className="h-4 w-4 shrink-0" aria-hidden />
          ) : (
            <Instagram className="h-4 w-4 shrink-0" aria-hidden />
          )}
          <span>
            Watch page · source {video.kind === "youtube_short" ? "YouTube" : "Instagram"}
          </span>
        </div>
        <Button variant="ghost" size="sm" className="shrink-0 text-primary" asChild>
          <Link to={watchPath}>Watch page</Link>
        </Button>
      </div>
    </div>
  );
}
