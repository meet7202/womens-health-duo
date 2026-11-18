import { Fragment, useEffect, useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContentAuthors, DoctorNameList } from "@/components/seo/ContentAuthors";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { articleSchema } from "@/components/seo/schema/article";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { AppLink as Link } from "@/components/router/AppLink";
import { DOCTOR_BY_SLUG } from "@/data/doctorProfiles";
import {
  getTopicGuide,
  topicGuideExampleConsultPaths,
  topicGuideLearnLinks,
} from "@/data/topicGuides/topicGuideRegistry";
import type { TopicGuideFigure } from "@/data/topicGuides/types";
import { INLINE_LINK_BUDGET, linkInlineTerms } from "@/lib/inlineGuideLinks";
import { topicGuideDocumentTitle } from "@/lib/pageSeoCopy";
import NotFound from "@/pages/NotFound";

/** Stable in-page target so a review link can open the exact section. */
function sectionAnchor(heading: string): string {
  const slug = heading
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "section";
}

function formatGuideDate(iso: string | undefined): string | null {
  if (!iso?.trim()) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso.trim();
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(t));
}

function GuideFigure({
  figure,
  priority = false,
  className,
}: {
  figure: TopicGuideFigure;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <img
        src={figure.src}
        srcSet={figure.srcSet}
        sizes={figure.srcSet ? "(min-width: 768px) 768px, 100vw" : undefined}
        alt={figure.alt}
        title={figure.alt}
        width={figure.width}
        height={figure.height}
        className="w-full h-auto rounded-2xl border border-border/40 bg-card"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
      {figure.caption ? (
        <figcaption className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Spread non-hero figures evenly after sections (never after the last one). */
function placeInlineFigures(
  figures: readonly TopicGuideFigure[],
  sectionCount: number,
): Map<number, TopicGuideFigure[]> {
  const placed = new Map<number, TopicGuideFigure[]>();
  if (figures.length === 0 || sectionCount === 0) return placed;
  const slots = Math.max(1, sectionCount - 1);
  figures.forEach((f, i) => {
    const at = Math.min(slots - 1, Math.floor(((i + 1) * slots) / (figures.length + 1)));
    placed.set(at, [...(placed.get(at) ?? []), f]);
  });
  return placed;
}

export function TopicGuidePage() {
  const { topicGuideSlug } = useParams<{ topicGuideSlug: string }>();
  const { hash } = useLocation();

  const guide = useMemo(() => getTopicGuide(topicGuideSlug), [topicGuideSlug]);

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id || !guide) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [hash, guide]);

  const crumbs = useMemo(() => {
    if (!guide) return [];
    return [
      { name: "Home", path: ROUTES.home },
      { name: "Learn", path: ROUTES.learn },
      { name: "Articles and common questions", path: ROUTES.learnArticles },
      { name: guide.title, path: guide.path },
    ];
  }, [guide]);

  const graph = useMemo(() => {
    if (!guide) return [];
    const nodes: Record<string, unknown>[] = [
      breadcrumbListSchema(crumbs),
      webPageSchema({
        path: guide.path,
        name: topicGuideDocumentTitle(guide.seoTitle ?? guide.title),
        description: guide.metaDescription,
      }),
    ];
    // Article schema only when a published calendar revision supplies truthful dates/attribution fields.
    if (guide.calendarArticleId && guide.publishedAt) {
      const imageUrls = (guide.figures ?? [])
        .filter((f) => !f.src.endsWith(".svg"))
        .map((f) => githubPagesAbsoluteUrl(SITE_URL, f.src));
      const approved = guide.reviewStatus === "approved";
      nodes.push(
        articleSchema({
          path: guide.path,
          headline: guide.title,
          description: guide.metaDescription,
          datePublished: guide.publishedAt,
          authorId: approved ? guide.authorId : undefined,
          reviewerIds: approved ? guide.reviewerIds : undefined,
          imageUrls,
        }),
      );
    }
    return nodes;
  }, [guide, crumbs]);

  const learnLinks = useMemo(
    () => (guide ? topicGuideLearnLinks(guide.learnTopicLabels) : []),
    [guide],
  );

  const consultExamples = useMemo(
    () => (guide ? topicGuideExampleConsultPaths(guide.serviceSlugs, guide.primaryConsult) : []),
    [guide],
  );

  const linkedCopy = useMemo(() => {
    if (!guide) return null;
    const usedSlugs = new Set<string>();
    const budget = { left: INLINE_LINK_BUDGET };
    return {
      intro: linkInlineTerms(guide.introParagraph, guide.slug, usedSlugs, budget),
      sections: guide.sections.map((sec) =>
        sec.paragraphs.map((paragraph) =>
          linkInlineTerms(paragraph, guide.slug, usedSlugs, budget),
        ),
      ),
    };
  }, [guide]);

  const relatedGuides = useMemo(() => {
    if (!guide) return [];
    return guide.relatedSlugs
      .map((slug) => getTopicGuide(slug))
      .filter((g): g is NonNullable<typeof g> => Boolean(g));
  }, [guide]);

  if (!guide) {
    return <NotFound />;
  }

  const [heroFigure, ...inlineFigures] = guide.figures ?? [];
  const inlineFigureBySection = placeInlineFigures(inlineFigures, guide.sections.length);
  const docTitle = topicGuideDocumentTitle(guide.seoTitle ?? guide.title);
  const faqHeadingBase = guide.title.endsWith("?") ? guide.title.slice(0, -1) : guide.title;
  // SEO-14: show byline/review only for approved guides with real attribution fields.
  const showEditorialByline =
    guide.reviewStatus === "approved" && Boolean(guide.authorId || guide.reviewerIds?.length);
  const authorName = guide.authorId ? DOCTOR_BY_SLUG[guide.authorId]?.name : undefined;
  const reviewers = showEditorialByline ? (guide.reviewerIds ?? []) : [];
  const publishedLabel = formatGuideDate(guide.publishedAt);

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={docTitle} metaDescription={guide.metaDescription} path={guide.path} />
      <JsonLdGraph graph={graph} />
      {guide.faqs.length > 0 ? (
        <JsonLdFaq items={guide.faqs} pageUrl={githubPagesAbsoluteUrl(SITE_URL, guide.path)} />
      ) : null}

      <article>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4 text-balance">
          {guide.title}
        </h1>
        {showEditorialByline ? (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {authorName ? (
              <>
                Written by{" "}
                <Link
                  to={DOCTOR_BY_SLUG[guide.authorId!].path}
                  className="text-primary underline underline-offset-4"
                >
                  {authorName}
                </Link>
              </>
            ) : null}
            {authorName && reviewers.length ? ". " : null}
            {reviewers.length ? (
              <>
                Medically reviewed by <DoctorNameList slugs={reviewers} />
              </>
            ) : null}
            {publishedLabel ? `. Published ${publishedLabel}` : null}
            .
          </p>
        ) : publishedLabel ? (
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Published {publishedLabel}.
          </p>
        ) : null}
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{linkedCopy?.intro}</p>

        {heroFigure ? <GuideFigure figure={heroFigure} priority className="mb-10" /> : null}

        <div className="space-y-10 mb-12">
          {guide.sections.map((sec, secIdx) => (
            <Fragment key={sec.heading}>
              <section
                id={sectionAnchor(sec.heading)}
                className="scroll-mt-28 rounded-2xl border border-border/50 bg-card p-6 shadow-soft"
              >
                <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {sec.heading}
                </h2>
                {(linkedCopy?.sections[secIdx] ?? sec.paragraphs).map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground leading-relaxed mb-3 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </section>
              {inlineFigureBySection.get(secIdx)?.map((f) => (
                <GuideFigure key={f.src} figure={f} />
              ))}
            </Fragment>
          ))}
        </div>

        {guide.references.length > 0 ? (
          <section className="mb-12" aria-labelledby="topic-guide-sources">
            <h2
              id="topic-guide-sources"
              className="font-heading text-xl font-semibold text-foreground mb-3"
            >
              Sources
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              These public patient-information pages support general orientation. They do not
              replace an individual clinical assessment.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {guide.references.map((ref) => (
                <li key={ref.url ?? ref.label}>
                  {ref.url ? (
                    <a
                      href={ref.url}
                      className="text-primary underline underline-offset-4"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {ref.label}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{ref.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {guide.internalLinks && guide.internalLinks.length > 0 ? (
          <section className="mb-10" aria-labelledby="topic-guide-related-reading">
            <h2
              id="topic-guide-related-reading"
              className="font-heading text-xl font-semibold text-foreground mb-3"
            >
              Related reading
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              {guide.internalLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-primary underline underline-offset-4">
                    {l.anchor}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {guide.conversionCopy && guide.conversionPath ? (
          <p className="text-base text-foreground leading-relaxed mb-10">
            <Link
              to={guide.conversionPath}
              className="text-primary font-medium underline underline-offset-4"
            >
              {guide.conversionCopy}
            </Link>
          </p>
        ) : null}

        {guide.faqs.length > 0 ? (
          <FaqSection
            items={guide.faqs}
            sectionId="topic-guide-faq"
            headingLabel="FAQ"
            headingTitle={`Questions about ${faqHeadingBase}`}
            headingIntro="These answers are for general orientation only. Your own care plan belongs in a visit with your doctor, especially if you are pregnant, bleeding heavily, or in severe pain."
          />
        ) : null}

        <section className="mt-14 mb-12 rounded-2xl border border-primary/25 bg-primary/5 p-6 sm:p-8">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
            Videos on Learn
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            Our Learn page collects the Shorts and Reels we publish as a family practice. Open the
            hub, then use the topic chips that match what you read here.
          </p>
          <p className="text-sm mb-3">
            <Link
              to={ROUTES.learn}
              className="text-primary font-medium underline underline-offset-4"
            >
              Open the Learn hub
            </Link>
            {" · "}
            <Link
              to={ROUTES.learnArticles}
              className="text-primary font-medium underline underline-offset-4"
            >
              All articles and questions
            </Link>
          </p>
          <ul className="flex flex-wrap gap-2">
            {learnLinks.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="inline-flex text-sm rounded-full border border-primary/30 bg-background px-3 py-1.5 text-primary font-medium hover:bg-primary/10 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-12 rounded-2xl border border-border/50 bg-card p-6 sm:p-8 shadow-soft">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Book a visit</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            For more about your own situation,{" "}
            <Link
              to={ROUTES.bookConsultation}
              className="text-primary font-medium underline underline-offset-4"
            >
              book a consultation
            </Link>{" "}
            with Dr. Zalak Shah (PT) for physiotherapy, pelvic health or movement, or with Dr.
            Charmi Shah for obstetrics, gynaecology, fertility or laparoscopy, when you need
            individual advice.
          </p>
          <ul className="space-y-2 text-sm mb-5">
            <li>
              <Link
                to={ROUTES.drCharmi}
                className="text-primary font-medium underline underline-offset-4"
              >
                Dr. Charmi Shah
              </Link>
              <span className="text-muted-foreground">. OB-GYN, IVF, laparoscopic gynecology.</span>
            </li>
            <li>
              <Link
                to={ROUTES.drZalak}
                className="text-primary font-medium underline underline-offset-4"
              >
                Dr. Zalak Shah
              </Link>
              <span className="text-muted-foreground">
                . Women&apos;s health physiotherapy, pelvic floor, STOTT Pilates, Mat Pilates
                online.
              </span>
            </li>
            <li>
              <Link
                to={ROUTES.onlineConsultation}
                className="text-primary font-medium underline underline-offset-4"
              >
                Virtual online consultations
              </Link>
              <span className="text-muted-foreground">
                . Hub pages for cities abroad, then each type of visit we offer online.
              </span>
            </li>
          </ul>
          {consultExamples.length > 0 ? (
            <>
              <p className="text-xs font-medium text-foreground mb-2">
                Book a consult for this topic
              </p>
              <ul className="text-sm space-y-1.5">
                {consultExamples.map((c) => (
                  <li key={c.path}>
                    <Link to={c.path} className="text-primary underline underline-offset-4">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </section>

        {relatedGuides.length > 0 ? (
          <section className="mb-12" aria-labelledby="related-topic-guides">
            <h2
              id="related-topic-guides"
              className="font-heading text-xl font-semibold text-foreground mb-3"
            >
              Similar articles and questions
            </h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Other written pages people often open next on the same subject. You can also return to
              the{" "}
              <Link
                to={ROUTES.learnArticles}
                className="text-primary font-medium underline underline-offset-4"
              >
                full list of articles on Learn
              </Link>
              .
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {relatedGuides.map((g) => (
                <li key={g.slug} className="rounded-xl border border-border/40 bg-secondary/15 p-4">
                  <Link
                    to={g.path}
                    className="font-medium text-primary hover:underline underline-offset-4"
                  >
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
          Medical disclaimer and how we publish:{" "}
          <Link to={ROUTES.medicalDisclaimer} className="text-primary underline underline-offset-4">
            Medical disclaimer
          </Link>
          ,{" "}
          <Link to={ROUTES.editorialPolicy} className="text-primary underline underline-offset-4">
            Editorial policy
          </Link>
          , and the full{" "}
          <Link to={ROUTES.faq} className="text-primary underline underline-offset-4">
            practice FAQ
          </Link>
          .
        </p>

        <ContentAuthors
          leadId={guide.primaryConsult === "both" ? undefined : guide.primaryConsult}
          reviewerIds={showEditorialByline ? guide.reviewerIds : undefined}
        />
        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
