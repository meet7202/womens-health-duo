import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { CONTACT } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { EDUCATION_TOPICS } from "@/data/educationTopics";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const TITLE = "Learn with Women's Health Duo | YouTube & Instagram (virtual online)";
const DESCRIPTION =
  "Free educational women's health content on YouTube and Instagram for patients worldwide—pregnancy, pelvic floor, OB-GYN themes, Mat Pilates online, and STOTT Pilates (Mat & Reformer). Pairs with our primary offering: online video consults and programs from India for NRIs and international families. Not a substitute for individualized care.";

export function LearnPage() {
  const path = ROUTES.learn;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Learn", path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path,
      name: TITLE,
      description: DESCRIPTION,
    }),
  ];
  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={DESCRIPTION} path={path} />
      <JsonLdGraph graph={graph} />

      <article>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          Educational content hub
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">{DESCRIPTION}</p>

        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <Youtube className="w-10 h-10 text-primary mb-3" aria-hidden />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">YouTube</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Longer explainers, exercise demos, and patient-friendly discussions aligned with our
              clinical and movement specialties.
            </p>
            <Button asChild>
              <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer">
                Open @WomensHealthDuo
              </a>
            </Button>
          </div>
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <Instagram className="w-10 h-10 text-primary mb-3" aria-hidden />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">Instagram</h2>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Reels and posts on pelvic health, pregnancy, postpartum, Pilates, and day-to-day
              women&apos;s wellness—quick, visual education.
            </p>
            <Button asChild variant="secondary">
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer">
                Open @womenshealthduo
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
