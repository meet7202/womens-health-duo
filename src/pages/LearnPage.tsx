import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { CONTACT } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { EDUCATION_TOPICS } from "@/data/educationTopics";
import { KnowledgeHubVideoHub } from "@/components/learn/KnowledgeHubVideoHub";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { knowledgeHubVideoSchemaNodes } from "@/components/seo/schema/knowledgeHubVideos";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  learnHubBreadcrumbs,
  learnHubFilteredPath,
  learnHubSeoDescription,
  learnHubSeoTitle,
  learnHubVideosMatching,
  parseLearnHubPathname,
  stripTrailingIndexHtmlPath,
} from "@/lib/learnHubUrls";

const DESCRIPTION_DEFAULT =
  "Free educational women's health content on YouTube and Instagram for patients worldwide—pregnancy, pelvic floor, OB-GYN themes, Mat Pilates online, and STOTT Pilates (Mat & Reformer). The Learn page includes playable Shorts and Reels via official YouTube and Instagram. Pairs with our primary offering: online video consults and programs from India for NRIs and international families. Not a substitute for individualized care.";

function normalizePath(p: string) {
  return p.replace(/\/+$/, "") || "/";
}

export function LearnPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const parsed = useMemo(() => parseLearnHubPathname(location.pathname), [location.pathname]);
  const canonicalPath = learnHubFilteredPath(parsed);

  useEffect(() => {
    const locPath = stripTrailingIndexHtmlPath(location.pathname);
    if (normalizePath(locPath) !== normalizePath(canonicalPath)) {
      navigate(canonicalPath, { replace: true });
      return;
    }
    const vids = learnHubVideosMatching(parsed);
    if (parsed.topic !== "all" && vids.length === 0) {
      navigate(learnHubFilteredPath({ doctor: parsed.doctor, topic: "all" }), { replace: true });
    }
  }, [location.pathname, canonicalPath, parsed, navigate]);

  const crumbs = useMemo(() => learnHubBreadcrumbs(parsed), [parsed]);
  const title = learnHubSeoTitle(parsed);
  const description =
    parsed.doctor === "all" && parsed.topic === "all"
      ? DESCRIPTION_DEFAULT
      : learnHubSeoDescription(parsed);
  const filteredVideos = useMemo(() => learnHubVideosMatching(parsed), [parsed]);

  const graph = useMemo(
    () => [
      breadcrumbListSchema(crumbs),
      webPageSchema({
        path: canonicalPath,
        name: title,
        description,
      }),
      ...knowledgeHubVideoSchemaNodes(filteredVideos, canonicalPath),
    ],
    [crumbs, canonicalPath, title, description, filteredVideos],
  );

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={title} metaDescription={description} path={canonicalPath} />
      <JsonLdGraph graph={graph} />

      <article>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          Educational content hub
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">{DESCRIPTION_DEFAULT}</p>
        {canonicalPath !== ROUTES.learn ? (
          <p className="text-sm text-muted-foreground mt-3 mb-10">
            <Link to={ROUTES.learn} className="text-primary underline underline-offset-4">
              View all clips
            </Link>{" "}
            to clear filters.
          </p>
        ) : (
          <div className="mb-6" />
        )}

        <KnowledgeHubVideoHub />

        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <Youtube className="w-10 h-10 text-primary mb-3" aria-hidden />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
              YouTube Shorts
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Short-form clips on women&apos;s health—same themes as this hub—on our Shorts tab
              only.
            </p>
            <Button asChild>
              <a href={`${CONTACT.youtube}/shorts`} target="_blank" rel="noopener noreferrer">
                Open Shorts @WomensHealthDuo
              </a>
            </Button>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <Instagram className="w-10 h-10 text-primary mb-3" aria-hidden />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
              Instagram Reels
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Reels on pelvic health, pregnancy, postpartum, Pilates, and day-to-day women&apos;s
              wellness—quick, visual education.
            </p>
            <Button asChild variant="secondary">
              <a href={`${CONTACT.instagram}/reels/`} target="_blank" rel="noopener noreferrer">
                Open Reels @womenshealthduo
              </a>
            </Button>
          </div>
        </div>

        <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
          Themes we cover (matches our services)
        </h2>
        <ul className="space-y-6 mb-12">
          {EDUCATION_TOPICS.map((t) => (
            <li key={t.title} className="rounded-xl border border-border/30 bg-secondary/20 p-5">
              <h3 className="font-heading text-lg font-semibold text-foreground">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{t.blurb}</p>
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground mb-10">
          Prefer structured answers first? See the{" "}
          <Link to={ROUTES.faq} className="text-primary underline underline-offset-4">
            FAQ
          </Link>{" "}
          or return to{" "}
          <Link to={ROUTES.home} className="text-primary underline underline-offset-4">
            Home
          </Link>
          .
        </p>

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
