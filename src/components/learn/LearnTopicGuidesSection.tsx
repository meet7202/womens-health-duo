import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { publicPathname } from "@/lib/githubPagesPublicUrl";
import {
  getTopicGuide,
  topicGuideHubSlugs,
  topicGuideTitleFromSlug,
} from "@/data/topicGuides/topicGuideRegistry";

/**
 * On `/learn` only: links to written guides (articles and common questions) plus the full index.
 */
export function LearnTopicGuidesSection() {
  const hubSlugs = topicGuideHubSlugs();
  return (
    <section
      id="topic-guides"
      className="mb-14 scroll-mt-28"
      aria-labelledby="topic-guides-heading"
    >
      <h2
        id="topic-guides-heading"
        className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-3"
      >
        Written guides from our doctors
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 max-w-3xl">
        These pages go a little deeper than a reel: plain language, a short FAQ, links back to Learn
        for videos, and how to book. Each page also suggests similar articles at the bottom.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {hubSlugs.map((slug) => {
          const g = getTopicGuide(slug);
          const title = g?.title ?? topicGuideTitleFromSlug(slug);
          const path = g?.path ?? publicPathname(`/${slug}`);
          return (
            <li key={slug} className="rounded-xl border border-border/40 bg-card p-4 shadow-soft">
              <Link
                to={path}
                className="font-heading text-base font-semibold text-primary hover:underline"
              >
                {title}
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-muted-foreground mt-6">
        <Link
          to={publicPathname(ROUTES.learnArticles)}
          className="text-primary font-medium underline underline-offset-4"
        >
          Browse all articles and common questions
        </Link>{" "}
        (every written page on this site, grouped by theme). If you would rather watch first, stay
        on{" "}
        <Link
          to={publicPathname(ROUTES.learn)}
          className="text-primary font-medium underline underline-offset-4"
        >
          Learn
        </Link>{" "}
        and scroll down to the content hub. The posts and the guides cover the same clinical themes.
      </p>
    </section>
  );
}
