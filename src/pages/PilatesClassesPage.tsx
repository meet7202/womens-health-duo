import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { Button } from "@/components/ui/button";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { ROUTES } from "@/config/routes";
import { CONTACT, SITE_URL } from "@/config/site";
import { AppLink as Link } from "@/components/router/AppLink";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import {
  breadcrumbListSchema,
  webPageSchema,
  reviewSchema,
} from "@/components/seo/schema/breadcrumbs";
import { ZALAK_GROUP_CLASS_CONTENT } from "@/data/zalakGroupClasses";
import { whatsappUrlWithMessage } from "@/lib/whatsappCta";

const content = ZALAK_GROUP_CLASS_CONTENT.pilates;

export function PilatesClassesPage() {
  const pageUrl = githubPagesAbsoluteUrl(SITE_URL, content.path);
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Dr. Zalak Shah", path: ROUTES.drZalak },
    { name: content.title, path: content.path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path: content.path,
      name: content.title,
      description: content.metaDescription,
    }),
    reviewSchema({
      reviews: content.testimonials,
      itemReviewed: content.title,
      pageUrl,
    }),
  ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead
        title={content.title}
        metaDescription={content.metaDescription}
        path={content.path}
      />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={content.faqs} pageUrl={pageUrl} />

      <article className="max-w-5xl">
        <div className="rounded-[2rem] border border-border/60 bg-gradient-to-br from-primary/10 via-background to-secondary/20 p-6 sm:p-10 shadow-card">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-3">
            {content.eyebrow}
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-6">
            {content.intro}
          </p>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/80 px-4 py-2 text-sm text-foreground shadow-soft">
            <Sparkles className="h-4 w-4 text-primary" /> {content.heroHighlight}
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                Why these classes matter
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {content.whyItMatters.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                What we offer
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {content.offerings.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-border/40 bg-background/70 p-3 text-sm text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                Who these classes are for
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {content.whoItsFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
                Why join us
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                {content.whyJoin.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <section className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Class formats</h2>
          <div className="space-y-4">
            {content.classFormats.map((item, index) => (
              <div key={index} className="rounded-xl border border-border/40 bg-background/70 p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            Online & offline options
          </h2>
          <ul className="space-y-2 text-muted-foreground">
            {content.onlineOfflineDetails.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">
                Class highlights
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                A closer look at the way these programmes are structured and taught.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to={ROUTES.bookConsultation}>Book your slot</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a
                  href={whatsappUrlWithMessage(
                    `Hi, I would like to know more about ${content.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" /> WhatsApp us
                  </span>
                </a>
              </Button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {content.galleryImages.map((src) => (
              <img
                key={src}
                src={src}
                alt={`${content.title} class activity`}
                className="h-56 w-full rounded-2xl object-cover shadow-soft"
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">
            Real experiences
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-border/40 bg-background/80 p-5"
              >
                <p className="text-foreground leading-relaxed">"{item.quote}"</p>
                <p className="mt-4 font-medium text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.context}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
          <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Related pages</h2>
          <ul className="flex flex-wrap gap-3">
            {content.relatedLinks.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 text-sm text-foreground hover:border-primary/40 hover:text-primary"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection
          items={content.faqs}
          sectionId={`${content.slug}-faq`}
          headingLabel="FAQ"
          headingTitle={`Questions about ${content.title.toLowerCase()}`}
          headingIntro="Helpful answers for women comparing prenatal, postnatal and Pilates class options."
          tightTop={true}
        />

        <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <Link to={ROUTES.learn} className="text-primary underline underline-offset-4">
            Explore the Learn hub
          </Link>
          <Link to={ROUTES.drZalak} className="text-primary underline underline-offset-4">
            Visit Dr. Zalak Shah's profile
          </Link>
          <a
            href={CONTACT.instagram}
            className="text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram updates
          </a>
        </div>

        <div className="mt-10">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
