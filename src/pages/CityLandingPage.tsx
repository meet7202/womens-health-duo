import { useMemo } from "react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { ROUTES } from "@/config/routes";
import { EXTERNAL } from "@/config/externalProfiles";
import { CITY_PAGES, type CityKey, type CityPageData } from "@/data/cityPages";
import { indiaCityFaqs } from "@/data/contextualFaqs";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { medicalClinicForCity } from "@/components/seo/schema/cityClinic";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";

type CityLandingPageProps = {
  cityKey: CityKey;
};

export function CityLandingPage({ cityKey }: CityLandingPageProps) {
  const city = CITY_PAGES[cityKey];
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: city.h1, path: city.path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path: city.path,
      name: city.title,
      description: city.metaDescription,
    }),
    medicalClinicForCity(city),
  ];
  const faqItems = useMemo(() => indiaCityFaqs(cityKey, city.h1), [cityKey, city.h1]);

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={city.title} metaDescription={city.metaDescription} path={city.path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={faqItems} pageUrl={githubPagesAbsoluteUrl(SITE_URL, city.path)} />

      <article>
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">City</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {city.h1}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{city.intro}</p>

        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground mb-8">
          <strong>Outside India?</strong> Start on{" "}
          <Link
            to={ROUTES.onlineConsultation}
            className="text-primary underline underline-offset-4"
          >
            Virtual online consultations
          </Link>{" "}
          for diaspora hubs (Dubai, London, Singapore, Toronto, Sydney, and more), same online
          OB-GYN and physio booking process worldwide.
        </p>

        <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Who to book</h2>
        <ul className="space-y-4 mb-10">
          {city.doctors.map((doc) => (
            <li key={doc.profilePath} className="rounded-xl border border-border/50 bg-card p-4">
              <Link
                to={doc.profilePath}
                className="font-heading text-lg font-semibold text-foreground hover:text-primary"
              >
                {doc.name}
              </Link>
              <p className="text-sm text-muted-foreground mt-1">{doc.role}</p>
            </li>
          ))}
        </ul>

        <DrZalakGoogleBusinessBlock presentation={city.drZalakGoogleBusinessPresentation} />

        <h2 className="font-heading text-xl font-semibold text-foreground mb-3">Highlights</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-10">
          {city.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link to={ROUTES.drCharmi} className="text-sm text-primary underline underline-offset-4">
            Dr. Charmi Shah , full profile
          </Link>
          <span className="text-muted-foreground" aria-hidden>
            ·
          </span>
          <Link to={ROUTES.drZalak} className="text-sm text-primary underline underline-offset-4">
            Dr. Zalak Shah , full profile
          </Link>
          <span className="text-muted-foreground" aria-hidden>
            ·
          </span>
          <Link to={ROUTES.learn} className="text-sm text-primary underline underline-offset-4">
            Educational content hub
          </Link>
          <span className="text-muted-foreground" aria-hidden>
            ·
          </span>
          <Link to={ROUTES.faq} className="text-sm text-primary underline underline-offset-4">
            FAQ
          </Link>
        </div>

        <FaqSection
          items={faqItems}
          sectionId={`city-faq-${cityKey}`}
          headingLabel="FAQ"
          headingTitle={`Common questions: ${city.h1}`}
          headingIntro="Booking, in-person and video options, and how we coordinate care in this city."
        />

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}

function GbpLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline underline-offset-4"
    >
      {children}
    </a>
  );
}

function DrZalakGoogleBusinessBlock({
  presentation,
}: {
  presentation: CityPageData["drZalakGoogleBusinessPresentation"];
}) {
  const ahm = EXTERNAL.drZalak.googleBusinessAhmedabad;
  const blr = EXTERNAL.drZalak.googleBusinessBangalore;

  if (presentation === "both") {
    return (
      <p className="text-sm text-muted-foreground mb-10">
        <strong className="text-foreground">Dr. Zalak Shah , Google Business:</strong>{" "}
        <GbpLink href={ahm}>Ahmedabad</GbpLink>
        <span className="text-muted-foreground" aria-hidden>
          {" "}
          ·{" "}
        </span>
        <GbpLink href={blr}>Bengaluru (Bangalore)</GbpLink>
      </p>
    );
  }

  if (presentation === "ahmedabad-primary") {
    return (
      <p className="text-sm text-muted-foreground mb-10">
        <strong className="text-foreground">Dr. Zalak Shah , Google Business (this city):</strong>{" "}
        <GbpLink href={ahm}>Ahmedabad listing</GbpLink>
        <span className="text-muted-foreground"> , also on Google: </span>
        <GbpLink href={blr}>Bengaluru (Bangalore)</GbpLink>
      </p>
    );
  }

  return (
    <p className="text-sm text-muted-foreground mb-10">
      <strong className="text-foreground">Dr. Zalak Shah , Google Business (this city):</strong>{" "}
      <GbpLink href={blr}>Bengaluru (Bangalore) listing</GbpLink>
      <span className="text-muted-foreground"> , also on Google: </span>
      <GbpLink href={ahm}>Ahmedabad</GbpLink>
    </p>
  );
}
