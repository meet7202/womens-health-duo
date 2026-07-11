import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { CONTACT, HOME_ENTITY_DEFINITION, SITE_URL } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { learnHubFaqsForTopic, learnHubFaqHeading } from "@/data/contextualFaqs";
import { KnowledgeHubVideoHub } from "@/components/learn/KnowledgeHubVideoHub";
import { LearnTopicalAuthoritySection } from "@/components/learn/LearnTopicalAuthoritySection";
import { LearnTopicGuidesSection } from "@/components/learn/LearnTopicGuidesSection";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { FaqSection } from "@/components/sections/FaqSection";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLink as Link } from "@/components/router/AppLink";
import {
  learnHubBreadcrumbs,
  learnHubFilteredPath,
  learnHubSeoDescription,
  learnHubSeoTitle,
  learnHubSeoH1,
  learnHubVideosMatching,
  parseLearnHubPathname,
  stripTrailingIndexHtmlPath,
} from "@/lib/learnHubUrls";

/** On-page intro only; meta + JSON-LD use `learnHubSeoDescription(parsed)`. */
const LEARN_HUB_INTRO =
  "If you are sorting through hormones, pregnancy, pelvic symptoms, fertility decisions, or returning to movement after injury or birth, our free Shorts, Reels, carousels, and posts offer grounded, clinician-led explanations. Dr. Charmi Shah (OB-GYN and IVF) and Dr. Zalak Shah (women's health physio and STOTT Pilates) build each piece around real questions from patients. When you need a plan that fits your history and your life, message us on WhatsApp or email to book a consultation.";

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
  const h1 = learnHubSeoH1(parsed);
  const description = learnHubSeoDescription(parsed);

  const learnFaqItems = useMemo(
    () => learnHubFaqsForTopic(parsed.topic === "all" ? "all" : parsed.topic),
    [parsed.topic],
  );
  const learnFaqHeading = useMemo(
    () => learnHubFaqHeading(parsed.topic === "all" ? "all" : parsed.topic),
    [parsed.topic],
  );

  const graph = useMemo(
    () => [
      breadcrumbListSchema(crumbs),
      webPageSchema({
        path: canonicalPath,
        name: title,
        description,
      }),
    ],
    [crumbs, canonicalPath, title, description],
  );

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={title} metaDescription={description} path={canonicalPath} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={learnFaqItems} pageUrl={githubPagesAbsoluteUrl(SITE_URL, canonicalPath)} />

      <article>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4 text-balance">
          {h1}
        </h1>
        <p className="text-base sm:text-lg font-medium text-foreground/95 leading-relaxed border-l-2 border-primary/35 pl-4 mb-3 max-w-3xl">
          {HOME_ENTITY_DEFINITION}
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{LEARN_HUB_INTRO}</p>
        {canonicalPath === ROUTES.learn ? (
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            For written answers you can follow link by link (not only reels and posts), see{" "}
            <Link
              to={ROUTES.learnArticles}
              className="text-primary font-medium underline underline-offset-4"
            >
              articles and common questions on Learn
            </Link>
            .
          </p>
        ) : null}
        {canonicalPath !== ROUTES.learn ? (
          <p className="text-sm text-muted-foreground mt-3 mb-10">
            <Link to={ROUTES.learn} className="text-primary underline underline-offset-4">
              View content hub
            </Link>{" "}
            to clear filters.
          </p>
        ) : (
          <div className="mb-6" />
        )}

        {canonicalPath === ROUTES.learn ? <LearnTopicalAuthoritySection /> : null}

        {canonicalPath === ROUTES.learn ? <LearnTopicGuidesSection /> : null}

        <KnowledgeHubVideoHub />

        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <Youtube className="w-10 h-10 text-primary mb-3" aria-hidden />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
              YouTube Shorts
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Short-form videos on women&apos;s health, in the same clinical areas as this page, on
              our Shorts tab only.
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
              Reels on pelvic health, pregnancy, postpartum, Pilates, and everyday women&apos;s
              wellness. Quick, visual teaching you can save and share.
            </p>
            <Button asChild variant="secondary">
              <a href={`${CONTACT.instagram}/reels/`} target="_blank" rel="noopener noreferrer">
                Open Reels @womenshealthduo
              </a>
            </Button>
          </div>
        </div>

        <FaqSection
          items={learnFaqItems}
          sectionId="learn-context-faq"
          headingLabel="FAQ"
          headingTitle={learnFaqHeading.title}
          headingIntro={learnFaqHeading.intro}
        />

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
            Services (quick topic map and full list by doctor)
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
