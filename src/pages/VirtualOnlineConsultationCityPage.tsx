import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { SEO_ONLINE_SERVICES } from "@/data/seoOnlineServices";
import {
  getVirtualConsultationCityBySlug,
  getVirtualConsultationCountryForCity,
  virtualCityPathSegment,
  virtualConsultationCityPath,
  virtualConsultationCountryPath,
  virtualServiceCityPath,
} from "@/lib/virtualConsultation";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { virtualConsultationOfferSchema } from "@/components/seo/schema/virtualConsultationCity";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { InclusiveSeoListFootnote } from "@/components/seo/InclusiveSeoListFootnote";
import { Button } from "@/components/ui/button";
import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "@/config/practiceLocations";
import { virtualCityOverviewFaqs } from "@/data/contextualFaqs";

function buildTitle(city: string, country: string) {
  return `Virtual online OB-GYN & women's health physio ,  ${city}, ${country} | Women's Health Duo`;
}

function buildDescription(city: string, country: string) {
  return `Virtual online consultations for patients in ${city}, ${country}: Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates Mat & Reformer). ${PRACTICE_BOTH_DOCTORS_IN_PERSON} Book via WhatsApp or email.`;
}

export function VirtualOnlineConsultationCityPage() {
  const { slug } = useParams<{ slug: string }>();
  const row = getVirtualConsultationCityBySlug(slug);

  const faqItems = useMemo(() => {
    if (!row) return [];
    return virtualCityOverviewFaqs(row.city, row.country);
  }, [row]);

  if (!slug || !row) {
    return <Navigate to={ROUTES.onlineConsultation} replace />;
  }

  if (slug.toLowerCase() !== virtualCityPathSegment(row)) {
    return <Navigate to={virtualConsultationCityPath(row)} replace />;
  }

  const path = virtualConsultationCityPath(row);
  const countryHub = getVirtualConsultationCountryForCity(row);
  const title = buildTitle(row.city, row.country);
  const description = buildDescription(row.city, row.country);
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Virtual online consultations", path: ROUTES.onlineConsultation },
    { name: `${row.city}, ${row.country}`, path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path,
      name: title,
      description,
    }),
    virtualConsultationOfferSchema(row),
  ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={title} metaDescription={description} path={path} />
      <JsonLdGraph graph={graph} />
      {faqItems.length > 0 ? (
        <JsonLdFaq items={faqItems} pageUrl={githubPagesAbsoluteUrl(SITE_URL, path)} />
      ) : null}

      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
          Virtual online · {row.city}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          Women&apos;s Health Duo , online care for patients in {row.city}, {row.country}
        </h1>

        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground mb-6">
          <strong>Both doctors, all services, virtually:</strong> Dr. Charmi Shah provides online
          OB-GYN, pregnancy and high-risk obstetrics advice, gynecology, IVF/IUI discussion,
          laparoscopy-related consults, PCOS/endometriosis, and routine women&apos;s health
          screening (as appropriate remotely). Dr. Zalak Shah provides online women&apos;s health
          physiotherapy and STOTT Pilates on Mat and Reformer , pelvic floor, prenatal and postnatal
          care, Mat Pilates online, diastasis recti, incontinence-oriented rehab with physician
          clearance, and musculoskeletal care for women.
        </p>
        <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
          <p>
            <Link
              to={
                countryHub ? virtualConsultationCountryPath(countryHub) : ROUTES.onlineConsultation
              }
              className="text-primary underline underline-offset-4"
            >
              All virtual locations in {row.country}
            </Link>{" "}
            , browse other cities in the same country, then choose the type of care you need.
          </p>
          <p>
            This page is for patients based in{" "}
            <strong className="text-foreground">{row.city}</strong> who want culturally familiar,
            India-trained women&apos;s health clinicians by video. English, Hindi, or Gujarati can
            be requested when you message us.
          </p>
          <p>
            <strong className="text-foreground">In person:</strong>{" "}
            {PRACTICE_BOTH_DOCTORS_IN_PERSON} Book through the practice. See{" "}
            <Link to={ROUTES.drCharmi} className="text-primary underline underline-offset-4">
              Dr. Charmi Shah
            </Link>{" "}
            and{" "}
            <Link to={ROUTES.drZalak} className="text-primary underline underline-offset-4">
              Dr. Zalak Shah
            </Link>{" "}
            for how in-person care works, or ask on WhatsApp. Virtual care remains available from{" "}
            {row.city} even if you never travel to India.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <Button variant="secondary" asChild>
            <Link to={ROUTES.drCharmi}>Dr. Charmi , profile</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to={ROUTES.drZalak}>Dr. Zalak , profile</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={ROUTES.onlineConsultation}>Virtual hub</Link>
          </Button>
        </div>

        <section
          className="border-t border-border/60 pt-10 mb-10"
          aria-labelledby="city-services-heading"
        >
          <h2
            id="city-services-heading"
            className="font-heading text-lg font-semibold text-foreground mb-4"
          >
            Online services in {row.city}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Each link opens a short page about that service when you&apos;re based in {row.city}.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {SEO_ONLINE_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link
                  to={virtualServiceCityPath(row, s.slug)}
                  className="text-primary underline underline-offset-2 hover:text-primary/90"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <InclusiveSeoListFootnote variant="city-services" />
        </section>

        {faqItems.length > 0 ? (
          <FaqSection
            items={faqItems}
            sectionId="virtual-city-overview-faq"
            headingLabel="FAQ"
            headingTitle={`Online visits from ${row.city}`}
            headingIntro="Booking, languages, what telehealth can cover from your city, and when to use local urgent care."
          />
        ) : null}

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
