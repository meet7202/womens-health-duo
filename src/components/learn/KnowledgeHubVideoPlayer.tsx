import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  knowledgeHubInstagramEmbedUrl,
  knowledgeHubInstagramPoster,
  knowledgeHubInstagramReelNativeVideo,
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

function youtubeThumbnail(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function HubPoster({
  src,
  alt,
  frameClass,
  onActivate,
}: {
  src: string;
  alt: string;
  frameClass: string;
  onActivate?: () => void;
}) {
  const [broken, setBroken] = useState(false);

  if (broken) {
    return (
      <div
        className={cn(
          frameClass,
          "flex items-center justify-center bg-muted/60 text-xs text-muted-foreground px-4 text-center",
        )}
      >
        Cover preview unavailable
      </div>
    );
  }

  const image = (
    <img
      src={src}
      alt={alt}
      className="absolute inset-0 h-full w-full object-contain bg-muted/30"
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );

  if (!onActivate) {
    return (
      <div className={cn("relative overflow-hidden bg-muted/20", frameClass)} aria-hidden>
        {image}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onActivate}
      className={cn(
        "relative block w-full overflow-hidden bg-muted/20 text-left",
        frameClass,
        "group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
      )}
      aria-label={`Play ${alt}`}
    >
      {image}
      <span
        className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/30"
        aria-hidden
      >
        <span className="rounded-full bg-black/60 p-3.5 text-white shadow-lg">
          <Play className="h-7 w-7 fill-current" />
        </span>
      </span>
    </button>
  );
}

function NativeInstagramReelPlayer({
  title,
  src,
  poster,
  frameClass,
}: {
  title: string;
  src: string;
  poster?: string;
  frameClass: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const el = videoRef.current;
    if (!el) return;
    setStarted(true);
    void el
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        /* user gesture required on some browsers */
      });
  };

  const pause = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    setPlaying(false);
  };

  const togglePlay = () => {
    if (!started) {
      play();
      return;
    }
    if (playing) pause();
    else play();
  };

  return (
    <div className={cn("relative overflow-hidden bg-muted/20 select-none", frameClass)}>
      {!started && poster ? (
        <HubPoster
          src={poster}
          alt={title}
          frameClass="absolute inset-0 h-full w-full"
          onActivate={play}
        />
      ) : null}
      <video
        ref={videoRef}
        title={title}
        src={src}
        className={cn(
          "h-full w-full object-contain bg-black cursor-pointer",
          !started && poster ? "absolute inset-0 opacity-0 pointer-events-none" : "relative block",
        )}
        playsInline
        preload="metadata"
        controls={false}
        controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={(event) => event.preventDefault()}
        onPlay={() => {
          setStarted(true);
          setPlaying(true);
        }}
        onPause={() => setPlaying(false)}
        onClick={togglePlay}
      />
      {started && !playing ? (
        <button
          type="button"
          onClick={play}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`Play ${title}`}
        >
          <span className="rounded-full bg-black/60 p-3.5 text-white shadow-lg" aria-hidden>
            <Play className="h-7 w-7 fill-current" />
          </span>
        </button>
      ) : null}
    </div>
  );
}

function DeferredEmbed({
  title,
  embedSrc,
  poster,
  frameClass,
  allow,
  eager,
}: {
  title: string;
  embedSrc: string;
  poster?: string;
  frameClass: string;
  allow: string;
  eager: boolean;
}) {
  const [ready, setReady] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted/20", frameClass)}>
      {poster && !ready ? (
        <HubPoster src={poster} alt={title} frameClass="absolute inset-0 h-full w-full" />
      ) : null}
      <iframe
        title={title}
        src={embedSrc}
        className={cn("relative z-10 h-full w-full", frameClass, !ready && poster && "opacity-0")}
        allow={allow}
        loading={eager ? "eager" : "lazy"}
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={() => setReady(true)}
      />
    </div>
  );
}

export function KnowledgeHubVideoPlayer({
  video,
  eager = false,
  className,
  variant = "carousel",
}: KnowledgeHubVideoPlayerProps) {
  const embedContainerRef = useRef<HTMLDivElement>(null);
  const [embedVisible, setEmbedVisible] = useState(eager);
  const [youtubeReady, setYoutubeReady] = useState(false);

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
      : knowledgeHubInstagramEmbedUrl(video);
  const instagramNativeVideo =
    video.kind === "instagram_reel" ? knowledgeHubInstagramReelNativeVideo(video) : null;
  const instagramPoster =
    video.kind === "instagram_reel" || video.kind === "instagram_post"
      ? knowledgeHubInstagramPoster(video)
      : undefined;

  const originalCaption = knowledgeHubVideoOriginalPlatformCaption(video);
  const originalCaptionHeading =
    video.kind === "youtube_short" ? "Original YouTube description" : "Original Instagram caption";

  const isInstagramPost = video.kind === "instagram_post";
  const frameClass =
    variant === "watch"
      ? isInstagramPost
        ? "aspect-square w-full max-h-[min(85vh,720px)] min-h-[360px]"
        : "aspect-[9/16] w-full max-h-[min(85vh,720px)] min-h-[360px]"
      : isInstagramPost
        ? "aspect-square w-full max-h-[min(70vh,520px)] min-h-[280px]"
        : "aspect-[9/16] w-full max-h-[min(70vh,520px)] min-h-[280px]";

  const minFrameClass = cn(frameClass, variant === "carousel" && "min-h-[320px]");

  return (
    <div className={cn("flex flex-col", className)}>
      <div ref={embedContainerRef} className="relative bg-black/5">
        {embedVisible ? (
          video.kind === "youtube_short" ? (
            <div className={cn("relative overflow-hidden bg-muted/20", minFrameClass)}>
              {!youtubeReady ? (
                <HubPoster
                  src={youtubeThumbnail(video.youtubeVideoId)}
                  alt={video.title}
                  frameClass="absolute inset-0 h-full w-full"
                />
              ) : null}
              <iframe
                title={video.title}
                src={embedSrc}
                className={cn(
                  "relative z-10 h-full w-full",
                  minFrameClass,
                  !youtubeReady && "opacity-0",
                )}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading={eager ? "eager" : "lazy"}
                referrerPolicy="strict-origin-when-cross-origin"
                onLoad={() => setYoutubeReady(true)}
              />
            </div>
          ) : instagramNativeVideo ? (
            <NativeInstagramReelPlayer
              title={video.title}
              src={instagramNativeVideo.src}
              poster={instagramNativeVideo.poster}
              frameClass={minFrameClass}
            />
          ) : (
            <DeferredEmbed
              title={video.title}
              embedSrc={embedSrc}
              poster={instagramPoster}
              frameClass={minFrameClass}
              allow="clipboard-write; autoplay; encrypted-media; picture-in-picture;"
              eager={eager}
            />
          )
        ) : (
          <div
            className={cn(
              "relative",
              minFrameClass,
              "flex flex-col items-center justify-center gap-2 bg-muted/40 px-4 text-center overflow-hidden",
            )}
            aria-busy="true"
          >
            {(
              video.kind === "youtube_short"
                ? youtubeThumbnail(video.youtubeVideoId)
                : instagramPoster
            ) ? (
              <HubPoster
                src={
                  video.kind === "youtube_short"
                    ? youtubeThumbnail(video.youtubeVideoId)
                    : (instagramPoster as string)
                }
                alt={video.title}
                frameClass="absolute inset-0 h-full w-full"
              />
            ) : null}
            <span className="sr-only">Video player loads when this card is near the viewport.</span>
            <span
              className="relative z-10 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded"
              aria-hidden
            >
              Loading player when in view…
            </span>
          </div>
        )}
      </div>
      <div
        className={cn(
          "border-t border-border/40 bg-muted/15 px-1 sm:px-2 py-4 space-y-2",
          variant === "carousel" && "min-h-[8.5rem]",
        )}
      >
        <h2 className="text-sm font-semibold text-foreground">{originalCaptionHeading}</h2>
        {originalCaption ? (
          <p
            className={cn(
              "text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap break-words",
              variant === "carousel" && "line-clamp-3",
            )}
          >
            {originalCaption}
          </p>
        ) : (
          <p
            className={cn(
              "text-sm text-muted-foreground leading-relaxed italic",
              variant === "carousel" && "line-clamp-3",
            )}
          >
            The original caption could not be synced for this post (it may have been removed or is
            private). Open on {video.kind === "youtube_short" ? "YouTube" : "Instagram"} to read the
            live post.
          </p>
        )}
        {variant === "carousel" ? (
          <p className="text-[10px] text-muted-foreground/80 leading-snug border-t border-border/30 pt-2">
            Full caption on the watch page.
          </p>
        ) : (
          <p className="text-[10px] text-muted-foreground/80 leading-snug border-t border-border/30 pt-2">
            Text is copied from the public{" "}
            {video.kind === "youtube_short" ? "YouTube" : "Instagram"} post for transparency;
            formatting may differ slightly from the app.
          </p>
        )}
      </div>
    </div>
  );
}
