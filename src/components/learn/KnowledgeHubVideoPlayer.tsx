import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  knowledgeHubVideoOriginalPlatformCaption,
  type KnowledgeHubVideo,
} from "@/data/knowledgeHubVideos";

type KnowledgeHubVideoPlayerProps = {
  video: KnowledgeHubVideo;
  /** When true, load the iframe immediately (watch pages). Carousel cards defer until in view. */
  eager?: boolean;
  className?: string;
  /** Larger layout for dedicated watch pages. */
  variant?: "carousel" | "watch";
};

export function KnowledgeHubVideoPlayer({
  video,
  eager = false,
  className,
  variant = "carousel",
}: KnowledgeHubVideoPlayerProps) {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const [embedVisible, setEmbedVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;
    const root = embedContainerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setEmbedVisible(true);
      },
      { root: null, rootMargin: "360px 0px", threshold: 0 },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [eager]);

  const embedSrc =
    video.kind === "youtube_short"
      ? `https://www.youtube.com/embed/${video.youtubeVideoId}`
      : `https://www.instagram.com/reel/${video.instagramReelId}/embed/`;

  const originalCaption = knowledgeHubVideoOriginalPlatformCaption(video);
  const originalCaptionHeading = video.kind === "youtube_short" ? "Transcript" : "Transcript";

  const frameClass =
    variant === "watch"
      ? "aspect-[9/16] w-full max-h-[min(85vh,720px)] min-h-[360px]"
      : "aspect-[9/16] w-full max-h-[min(70vh,520px)] min-h-[280px]";

  return (
    <div className={cn("flex flex-col", className)}>
      <div ref={embedContainerRef} className="relative bg-black/5">
        {embedVisible ? (
          video.kind === "youtube_short" ? (
            <iframe
              title={video.title}
              src={embedSrc}
              className={frameClass}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading={eager ? "eager" : "lazy"}
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <iframe
              title={video.title}
              src={embedSrc}
              className={cn(frameClass, variant === "carousel" && "min-h-[320px]")}
              allow="clipboard-write; autoplay; encrypted-media; picture-in-picture;"
              loading={eager ? "eager" : "lazy"}
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )
        ) : (
          <div
            className={cn(
              frameClass,
              variant === "carousel" && "min-h-[320px]",
              "flex flex-col items-center justify-center gap-2 bg-muted/40 px-4 text-center",
            )}
            aria-busy="true"
          >
            <span className="sr-only">Video player loads when this card is near the viewport.</span>
            <span className="text-xs text-muted-foreground" aria-hidden>
              Loading player when in view…
            </span>
          </div>
        )}
      </div>
      <div className="border-t border-border/40 bg-muted/15 px-1 sm:px-2 py-4 space-y-2">
        <h2 className="text-sm font-semibold text-foreground">{originalCaptionHeading}</h2>
        {originalCaption ? (
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap break-words">
            {originalCaption}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed italic">
            The original caption could not be synced for this post (it may have been removed or is
            private). Open on {video.kind === "youtube_short" ? "YouTube" : "Instagram"} to read the
            live post.
          </p>
        )}
        <p className="text-[10px] text-muted-foreground/80 leading-snug border-t border-border/30 pt-2">
          Text is copied from the public {video.kind === "youtube_short" ? "YouTube" : "Instagram"}{" "}
          post for transparency; formatting may differ slightly from the app.
        </p>
      </div>
    </div>
  );
}
