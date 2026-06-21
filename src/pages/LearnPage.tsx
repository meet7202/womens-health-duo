import { useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { CONTACT, HOME_ENTITY_DEFINITION } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { LEARN_PILLAR_CLUSTERS } from "@/data/learnPillarClusters";
import { KnowledgeHubVideoHub } from "@/components/learn/KnowledgeHubVideoHub";
import { LearnTopicalAuthoritySection } from "@/components/learn/LearnTopicalAuthoritySection";
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

/** On-page intro only; meta + JSON-LD use `learnHubSeoDescription(parsed)`. */
const LEARN_HUB_INTRO =
  "If you are sorting through hormones, pregnancy, pelvic symptoms, fertility decisions, or returning to movement after injury or birth, our free Shorts and Reels offer grounded, clinician-led explanations. Dr. Charmi Shah (OB-GYN and IVF) and Dr. Zalak Shah (women's health physio and STOTT Pilates) build each clip around real questions from patients. When you need a plan that fits your history and your life, message us on WhatsApp or email to book a consultation.";

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
  const description = learnHubSeoDescription(parsed);
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
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4 text-balance">
          {title}
        </h1>
        <p className="text-base sm:text-lg font-medium text-foreground/95 leading-relaxed border-l-2 border-primary/35 pl-4 mb-3 max-w-3xl">
          {HOME_ENTITY_DEFINITION}
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{LEARN_HUB_INTRO}</p>
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

        {canonicalPath === ROUTES.learn ? <LearnTopicalAuthoritySection /> : null}

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

        {canonicalPath === ROUTES.learn ? (
          <>
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
              Themes we cover (matches our services)
            </h2>
            <ul className="space-y-6 mb-12">
              {LEARN_PILLAR_CLUSTERS.map((pillar) => (
                <li
                  key={pillar.id}
                  className="rounded-xl border border-border/30 bg-secondary/20 p-5"
                >
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {pillar.educationBlurb}
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
          Medical disclaimer &amp; how we publish: see{" "}
          <Link to={ROUTES.medicalDisclaimer} className="text-primary underline underline-offset-4">
            Medical disclaimer
          </Link>{" "}
          and{" "}
          <Link to={ROUTES.editorialPolicy} className="text-primary underline underline-offset-4">
            Editorial policy
          </Link>
          . For how that shows on the homepage, see{" "}
          <Link
            to={ROUTES.homeServicesSection}
            className="text-primary underline underline-offset-4"
          >
            Services — quick topic map plus full list by doctor
          </Link>
          . Prefer structured answers first? See the{" "}
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
