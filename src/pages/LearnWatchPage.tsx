import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { TrackedWhatsAppLink } from "@/components/cta/TrackedWhatsAppLink";
import { KnowledgeHubVideoPlayer } from "@/components/learn/KnowledgeHubVideoPlayer";
import { whatsappMessageLearn, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { knowledgeHubWatchPageVideoSchema } from "@/components/seo/schema/knowledgeHubVideos";
import { AppLink as Link } from "@/components/router/AppLink";
import { AppNavigate as Navigate } from "@/components/router/AppNavigate";
import {
  getKnowledgeHubVideoById,
  knowledgeHubInstagramPermalink,
  knowledgeHubVideoDisplayTitle,
  type KnowledgeHubVideo,
} from "@/data/knowledgeHubVideos";
import { learnVideoWatchPath } from "@/lib/learnHubUrls";
import {
  learnWatchDocumentTitle,
  learnWatchH1,
  learnWatchMetaDescription,
} from "@/lib/pageSeoCopy";
import { knowledgeHubPosterImageObject } from "@/components/seo/schema/mediaImages";
import { knowledgeHubPosterAlt, knowledgeHubVideoThumbnailAbsolute } from "@/lib/mediaSeo";
import {
  isEligibleKnowledgeHubVideoObject,
  isIndexableKnowledgeHubWatchPage,
} from "@/lib/knowledgeHubVideoEligibility";
import { ROBOTS_INDEX_FOLLOW, ROBOTS_NOINDEX_FOLLOW } from "@/config/routeDisposition";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube } from "lucide-react";
import NotFound from "@/pages/NotFound";

function doctorLabel(video: KnowledgeHubVideo): string {
  if (video.doctor === "charmi") return "Dr. Charmi Shah";
  if (video.doctor === "zalak") return "Dr. Zalak Shah";
  return "Dr. Charmi & Dr. Zalak Shah";
}

function openOnPlatformHref(video: KnowledgeHubVideo): string {
  if (video.kind === "youtube_short") {
    return video.youtubeOpenAs === "watch"
      ? `https://www.youtube.com/watch?v=${video.youtubeVideoId}`
      : `https://www.youtube.com/shorts/${video.youtubeVideoId}`;
  }
  return knowledgeHubInstagramPermalink(video);
}

export function LearnWatchPage() {
  const { videoId } = useParams<{ videoId: string }>();
  const video = useMemo(() => (videoId ? getKnowledgeHubVideoById(videoId) : undefined), [videoId]);

  const watchPath = video ? learnVideoWatchPath(video.id) : "/learn/";
  const title = video ? learnWatchDocumentTitle(video) : "";
  const h1 = video ? learnWatchH1(video) : "";
  const description = video ? learnWatchMetaDescription(video) : "";

  const crumbs = useMemo(() => {
    if (!video) return [];
    return [
      { name: "Home", path: ROUTES.home },
      { name: "Learn", path: ROUTES.learn },
      { name: knowledgeHubVideoDisplayTitle(video), path: watchPath },
    ];
  }, [video, watchPath]);

  const graph = useMemo(() => {
    if (!video) return [];
    const nodes: Record<string, unknown>[] = [
      breadcrumbListSchema(crumbs),
      webPageSchema({
        path: watchPath,
        name: title,
        description,
      }),
    ];
    const mediaSchema = knowledgeHubWatchPageVideoSchema(video, watchPath);
    if (mediaSchema) nodes.push(mediaSchema);
    const poster = knowledgeHubPosterImageObject(video, watchPath);
    if (poster) nodes.push(poster);
    return nodes;
  }, [video, crumbs, watchPath, title, description]);

  if (!video) {
    return <NotFound />;
  }

  // Platform id aliases (raw YouTube id / IG shortcode) → canonical hub watch id.
  if (videoId && videoId !== video.id) {
    return <Navigate to={learnVideoWatchPath(video.id)} replace />;
  }

  const platformLabel = video.kind === "youtube_short" ? "YouTube" : "Instagram";
  const PlatformIcon = video.kind === "youtube_short" ? Youtube : Instagram;
  const posterAlt = knowledgeHubPosterAlt(video);
  const videoEligible = isEligibleKnowledgeHubVideoObject(video);
  const ogType = video.kind === "instagram_post" || !videoEligible ? "website" : "video.other";
  const ogImage = knowledgeHubVideoThumbnailAbsolute(SITE_URL, video) ?? undefined;
  const robots = isIndexableKnowledgeHubWatchPage(video)
    ? ROBOTS_INDEX_FOLLOW
    : ROBOTS_NOINDEX_FOLLOW;

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead
        title={title}
        metaDescription={description}
        path={watchPath}
        ogImage={ogImage}
        ogImageAlt={posterAlt}
        ogType={ogType}
        robots={robots}
      />
      <JsonLdGraph graph={graph} />

      <article className="max-w-2xl mx-auto">
        <h1 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-3 text-balance">
          {h1}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mb-4">
          <span className="rounded-full bg-primary/15 px-2 py-0.5 font-medium text-primary">
            {doctorLabel(video)}
          </span>
          {video.topics.map((t) => (
            <span key={t} className="rounded-full bg-secondary px-2 py-0.5">
              {t}
            </span>
          ))}
          {video.postedAt ? (
            <time dateTime={video.postedAt} className="text-muted-foreground">
              {new Date(video.postedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
          ) : null}
        </div>

        <KnowledgeHubVideoPlayer video={video} eager variant="watch" className="mb-6" />

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <Button asChild variant="secondary" size="sm">
            <a href={openOnPlatformHref(video)} target="_blank" rel="noopener noreferrer">
              <PlatformIcon className="h-4 w-4 mr-2" aria-hidden />
              Open on {platformLabel}
            </a>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to={ROUTES.learn}>Back to content hub</Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          This page focuses on one clinician-led post from Women&apos;s Health Duo. For more reels,
          carousels, and written guides, visit{" "}
          <Link to={ROUTES.learn} className="text-primary underline underline-offset-4">
            Learn
          </Link>{" "}
          or message us on{" "}
          <TrackedWhatsAppLink
            href={whatsappUrlWithMessage(whatsappMessageLearn(watchPath))}
            ctaPlacement="learn_watch"
            doctor={doctorLabel(video)}
            service="learn"
            pagePath={watchPath}
            className="text-primary underline underline-offset-4"
          >
            WhatsApp
          </TrackedWhatsAppLink>{" "}
          to book a consultation.
        </p>
      </article>
    </PageShell>
  );
}
