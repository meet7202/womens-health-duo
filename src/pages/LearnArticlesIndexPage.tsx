import { useMemo } from "react";
import { AppLink as Link } from "@/components/router/AppLink";

import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { ROUTES } from "@/config/routes";
import { topicGuidesGroupedForIndex } from "@/data/topicGuides/topicGuideRegistry";
import { LEARN_ARTICLES_DOCUMENT_TITLE, LEARN_ARTICLES_H1 } from "@/lib/pageSeoCopy";

const PAGE_PATH = ROUTES.learnArticles;

export function LearnArticlesIndexPage() {
  const groups = useMemo(() => topicGuidesGroupedForIndex(), []);

  const crumbs = useMemo(
    () => [
      { name: "Home", path: ROUTES.home },
      { name: "Learn", path: ROUTES.learn },
      { name: "Articles and common questions", path: PAGE_PATH },
    ],
    [],
  );

  const graph = useMemo(
    () => [
      breadcrumbListSchema(crumbs),
      webPageSchema({
        path: PAGE_PATH,
        name: LEARN_ARTICLES_DOCUMENT_TITLE,
        description:
          "Written guides from our doctors: plain-language articles and question-style pages on PCOS, periods, fertility, pregnancy movement, pelvic health, Pilates, and gynecology. Each page links to related reading and back to Learn video clips.",
      }),
    ],
    [crumbs],
  );

  const title = LEARN_ARTICLES_DOCUMENT_TITLE;
  const h1 = LEARN_ARTICLES_H1;
  const description =
    "Browse every written guide on this site: short articles and common questions, grouped by theme, with links to related pages and the Learn video hub.";

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={title} metaDescription={description} path={PAGE_PATH} />
      <JsonLdGraph graph={graph} />
      <article>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4 text-balance">
          {h1}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-4 max-w-3xl">
          These pages are written by our clinicians in the same voice as our Shorts and Reels. They
          are meant as orientation, not a substitute for a visit. Each article ends with links to
          similar topics, the Learn content hub, and how to book.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-10 max-w-3xl">
          You can move through every page from here: each title is a normal site link. For reels,
          carousels, and posts first, open{" "}
          <Link to={ROUTES.learn} className="text-primary font-medium underline underline-offset-4">
            Learn
          </Link>
          .
        </p>

        <div className="space-y-12 mb-14">
          {groups.map((group) => (
            <section
              key={group.clusterId}
              id={`guides-${group.clusterId}`}
              className="scroll-mt-28"
              aria-labelledby={`cluster-${group.clusterId}`}
            >
              <h2
                id={`cluster-${group.clusterId}`}
                className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-4"
              >
                {group.clusterLabel}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {group.guides.map((g) => (
                  <li
                    key={g.slug}
                    className="rounded-xl border border-border/40 bg-card p-4 shadow-soft"
                  >
                    <Link
                      to={g.path}
                      className="font-heading text-base font-semibold text-primary hover:underline"
                    >
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
          Medical disclaimer and how we publish:{" "}
          <Link to={ROUTES.medicalDisclaimer} className="text-primary underline underline-offset-4">
            Medical disclaimer
          </Link>
          ,{" "}
          <Link to={ROUTES.editorialPolicy} className="text-primary underline underline-offset-4">
            Editorial policy
          </Link>
          . Full site questions:{" "}
          <Link to={ROUTES.faq} className="text-primary underline underline-offset-4">
            FAQ
          </Link>
          .
        </p>

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
