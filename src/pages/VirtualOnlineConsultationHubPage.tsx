import { useMemo } from "react";
import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { ROUTES } from "@/config/routes";
import { CONTACT, SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import {
  ANCHOR_REGION_ORDER,
  ANCHOR_VIRTUAL_CONSULTATION_CITIES,
  type AnchorVirtualConsultationCity,
} from "@/data/anchorVirtualConsultationCities";
import {
  VIRTUAL_CONSULTATION_COUNTRIES,
  VIRTUAL_CONSULTATION_HUB_PATH,
  getVirtualConsultationCityBySlug,
  virtualConsultationCityPath,
  virtualConsultationCountryPath,
} from "@/lib/virtualConsultation";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { InclusiveSeoListFootnote } from "@/components/seo/InclusiveSeoListFootnote";
import { Button } from "@/components/ui/button";
import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "@/config/practiceLocations";
import { virtualHubFaqs } from "@/data/contextualFaqs";
import { virtualHubDocumentTitle, virtualHubH1 } from "@/lib/pageSeoCopy";

const TITLE = virtualHubDocumentTitle();
const H1 = virtualHubH1();
const DESCRIPTION = `Video visits from India with Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates on Mat and Reformer). We serve families in India and abroad, pick your city below, then choose the type of care. ${PRACTICE_BOTH_DOCTORS_IN_PERSON} See each doctor's profile for hours and how to book.`;

export function VirtualOnlineConsultationHubPage() {
  const path = VIRTUAL_CONSULTATION_HUB_PATH;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Virtual online consultations", path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path,
      name: TITLE,
      description: DESCRIPTION,
    }),
  ];

  const anchorsByRegion = useMemo(() => {
    const m = new Map<string, AnchorVirtualConsultationCity[]>();
    for (const r of ANCHOR_REGION_ORDER) m.set(r, []);
    for (const c of ANCHOR_VIRTUAL_CONSULTATION_CITIES) {
      m.get(c.region)?.push(c);
    }
    return ANCHOR_REGION_ORDER.map((region) => {
      const cities = (m.get(region) ?? []).slice().sort((a, b) => a.city.localeCompare(b.city));
      return { region, cities };
    });
  }, []);
  const hubFaqItems = useMemo(() => virtualHubFaqs(), []);

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={DESCRIPTION} path={path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={hubFaqItems} pageUrl={githubPagesAbsoluteUrl(SITE_URL, path)} />

      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
          Virtual care worldwide · online from India
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {H1}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{DESCRIPTION}</p>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Start from your city or region below. Each city page explains what we offer by video and
          links to specific topics, pregnancy and OB-GYN, gynecology and fertility, physio, STOTT
          Pilates, and more. Further down you can also browse{" "}
          <strong className="text-foreground">by country</strong>.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-8">
          <strong className="text-foreground">In person:</strong> {PRACTICE_BOTH_DOCTORS_IN_PERSON}{" "}
          Visits are booked through the same reception channels. Open{" "}
          <Link to={ROUTES.drCharmi} className="text-primary underline underline-offset-4">
            Dr. Charmi Shah
          </Link>{" "}
          and{" "}
          <Link to={ROUTES.drZalak} className="text-primary underline underline-offset-4">
            Dr. Zalak Shah
          </Link>{" "}
          or message on WhatsApp.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <Button asChild>
            <Link to={ROUTES.drCharmi}>Dr. Charmi Shah</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to={ROUTES.drZalak}>Dr. Zalak Shah</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={ROUTES.faq}>FAQ</Link>
          </Button>
        </div>

        <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
          Priority metros , virtual consultation from India
        </h2>
        <p className="text-sm text-muted-foreground mb-8">
          {ANCHOR_VIRTUAL_CONSULTATION_CITIES.length} highlighted cities below. Open your city for a
          short overview and links to each kind of online visit we offer there.
        </p>

        <div className="space-y-10 mb-12">
          {anchorsByRegion.map(({ region, cities }) => (
            <section key={region} aria-labelledby={`region-${slugifyId(region)}`}>
              <h3
                id={`region-${slugifyId(region)}`}
                className="font-heading text-lg font-semibold text-foreground mb-3"
              >
                {region}
              </h3>
              <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                {cities.map((c) => {
                  const cityRow = getVirtualConsultationCityBySlug(c.slug);
                  if (!cityRow) return null;
                  return (
                    <li key={c.slug}>
                      <Link
                        to={virtualConsultationCityPath(cityRow)}
                        className="text-primary underline underline-offset-2 hover:text-primary/90"
                      >
                        {c.city}, {c.country}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <InclusiveSeoListFootnote variant="cities" />
            </section>
          ))}
        </div>

        <section
          className="border-t border-border/60 pt-10 mb-10"
          aria-labelledby="country-index-heading"
        >
          <h2
            id="country-index-heading"
            className="font-heading text-xl font-semibold text-foreground mb-2"
          >
            Browse by country
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Each page lists the cities we cover in that country, with links to local overview pages.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            {VIRTUAL_CONSULTATION_COUNTRIES.map((c) => (
              <li key={c.countryCode}>
                <Link
                  to={virtualConsultationCountryPath(c)}
                  className="text-primary underline underline-offset-2 hover:text-primary/90"
                >
                  {c.country} ({c.cities.length} {c.cities.length === 1 ? "city" : "cities"})
                </Link>
              </li>
            ))}
          </ul>
          <InclusiveSeoListFootnote variant="countries" />
        </section>

        <p className="text-sm text-muted-foreground mb-8">
          Educational content:{" "}
          <a
            href={CONTACT.youtube}
            className="text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            YouTube
          </a>{" "}
          ·{" "}
          <a
            href={CONTACT.instagram}
            className="text-primary underline underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>{" "}
          ·{" "}
          <Link to={ROUTES.learn} className="text-primary underline underline-offset-4">
            Learn
          </Link>
        </p>

        <FaqSection
          items={hubFaqItems}
          sectionId="virtual-hub-faq"
          headingLabel="FAQ"
          headingTitle="Virtual online consultations"
          headingIntro="How the hub works, booking, which doctor covers which questions, and when to use local emergency care."
        />

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}

function slugifyId(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
