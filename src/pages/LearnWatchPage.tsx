import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { CONTACT } from "@/config/site";
import { KnowledgeHubVideoPlayer } from "@/components/learn/KnowledgeHubVideoPlayer";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { knowledgeHubWatchPageVideoSchema } from "@/components/seo/schema/knowledgeHubVideos";
import { AppLink as Link } from "@/components/router/AppLink";
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
    return [
      breadcrumbListSchema(crumbs),
      webPageSchema({
        path: watchPath,
        name: title,
        description,
      }),
      knowledgeHubWatchPageVideoSchema(video, watchPath),
    ];
  }, [video, crumbs, watchPath, title, description]);

  if (!video) {
    return <NotFound />;
  }

  const platformLabel = video.kind === "youtube_short" ? "YouTube" : "Instagram";
  const PlatformIcon = video.kind === "youtube_short" ? Youtube : Instagram;

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={title} metaDescription={description} path={watchPath} />
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
              {new Date(video.postedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
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
          <a
            href={CONTACT.whatsappUrl}
            className="text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>{" "}
          to book a consultation.
        </p>
      </article>
    </PageShell>
  );
}
