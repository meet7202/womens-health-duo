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
import { SEO_ONLINE_SERVICES, getSeoOnlineServiceBySlug } from "@/data/seoOnlineServices";
import {
  getVirtualConsultationCityBySlug,
  getVirtualConsultationCountryForCity,
  pickSiblingCities,
  virtualCityPathSegment,
  virtualConsultationCityPath,
  virtualConsultationCountryPath,
  virtualServiceCityPath,
} from "@/lib/virtualConsultation";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { virtualServiceCityOfferSchema } from "@/components/seo/schema/virtualServiceCity";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { InclusiveSeoListFootnote } from "@/components/seo/InclusiveSeoListFootnote";
import { Button } from "@/components/ui/button";
import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "@/config/practiceLocations";
import { onlineServiceCityFaqs } from "@/data/contextualFaqs";
import { virtualServiceCityDocumentTitle, virtualServiceCityH1 } from "@/lib/pageSeoCopy";

function buildMetaDescription(
  serviceTitle: string,
  city: string,
  country: string,
  doctor: "charmi" | "zalak",
) {
  const who =
    doctor === "charmi"
      ? "Dr. Charmi Shah (OB-GYN, IVF, laparoscopy)"
      : "Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates)";
  return `${serviceTitle} via online consultation for patients in ${city}, ${country} with ${who}. ${PRACTICE_BOTH_DOCTORS_IN_PERSON} WhatsApp or email to book.`;
}

export function VirtualOnlineServiceCityPage() {
  const { citySlug, serviceSlug } = useParams<{ citySlug: string; serviceSlug: string }>();
  const city = getVirtualConsultationCityBySlug(citySlug);
  const service = getSeoOnlineServiceBySlug(serviceSlug);

  const faqItems = useMemo(() => {
    if (!city || !service) return [];
    return onlineServiceCityFaqs(service, city.city, city.country);
  }, [city, service]);

  if (!citySlug || !serviceSlug || !city || !service) {
    return <Navigate to={ROUTES.onlineConsultation} replace />;
  }

  if (citySlug.toLowerCase() !== virtualCityPathSegment(city)) {
    return <Navigate to={virtualServiceCityPath(city, service.slug)} replace />;
  }

  const path = virtualServiceCityPath(city, service.slug);
  const metaTitle = virtualServiceCityDocumentTitle(service.shortTitle, city.city, city.country);
  const h1 = virtualServiceCityH1(service.title, city.city, city.country);
  const metaDescription = buildMetaDescription(
    service.title,
    city.city,
    city.country,
    service.doctor,
  );
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Virtual online consultations", path: ROUTES.onlineConsultation },
    { name: `${city.city}, ${city.country}`, path: virtualConsultationCityPath(city) },
    { name: service.title, path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path,
      name: metaTitle,
      description: metaDescription,
    }),
    virtualServiceCityOfferSchema(city, service),
  ];

  const otherServices = SEO_ONLINE_SERVICES.filter((s) => s.slug !== service.slug);
  const siblingCities = pickSiblingCities(city, 12);
  const profilePath = service.doctor === "charmi" ? ROUTES.drCharmi : ROUTES.drZalak;
  const countryHub = getVirtualConsultationCountryForCity(city);

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={metaTitle} metaDescription={metaDescription} path={path} />
      <JsonLdGraph graph={graph} />
      {faqItems.length > 0 ? (
        <JsonLdFaq items={faqItems} pageUrl={githubPagesAbsoluteUrl(SITE_URL, path)} />
      ) : null}

      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
          Virtual online · {city.city}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {h1}
        </h1>

        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground mb-6">
          {service.summary} <strong className="text-foreground">In person:</strong>{" "}
          {PRACTICE_BOTH_DOCTORS_IN_PERSON} Book through the practice, see{" "}
          <Link to={ROUTES.drCharmi} className="text-primary underline underline-offset-4">
            Dr. Charmi Shah
          </Link>{" "}
          and{" "}
          <Link to={ROUTES.drZalak} className="text-primary underline underline-offset-4">
            Dr. Zalak Shah
          </Link>{" "}
          for details, or ask on WhatsApp.
        </p>
        <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
          <p>
            <Link
              to={
                countryHub ? virtualConsultationCountryPath(countryHub) : ROUTES.onlineConsultation
              }
              className="text-primary underline underline-offset-4"
            >
              All virtual locations in {city.country}
            </Link>{" "}
            , see other cities, then open a city page for every online service URL.
          </p>
          <p>
            This page is written for people in{" "}
            <strong className="text-foreground">{city.city}</strong>,{" "}
            <strong className="text-foreground">{city.country}</strong> searching for India-trained
            women&apos;s health clinicians online. Booking is the same as every other city page:
            WhatsApp or email with your time zone and a short summary of your concern.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-12">
          <Button variant="secondary" asChild>
            <Link to={profilePath}>
              {service.doctor === "charmi" ? "Dr. Charmi ,  profile" : "Dr. Zalak ,  profile"}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={virtualConsultationCityPath(city)}>All services in {city.city}</Link>
          </Button>
        </div>

        <section
          className="border-t border-border/60 pt-10 mb-10"
          aria-labelledby="similar-services-heading"
        >
          <h2
            id="similar-services-heading"
            className="font-heading text-lg font-semibold text-foreground mb-4"
          >
            Similar services in {city.city}
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Other kinds of online visits we offer in {city.city}, each link is a separate page.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {otherServices.map((s) => (
              <li key={s.slug}>
                <Link
                  to={virtualServiceCityPath(city, s.slug)}
                  className="text-primary underline underline-offset-2 hover:text-primary/90"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
          <InclusiveSeoListFootnote variant="services" />
        </section>

        <section
          className="border-t border-border/60 pt-10 mb-10"
          aria-labelledby="similar-cities-heading"
        >
          <h2
            id="similar-cities-heading"
            className="font-heading text-lg font-semibold text-foreground mb-4"
          >
            {service.title} , other cities
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            A few other metros with the same online service page (short list for readability).
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            {siblingCities.map((c) => (
              <li key={c.slug}>
                <Link
                  to={virtualServiceCityPath(c, service.slug)}
                  className="text-primary underline underline-offset-2 hover:text-primary/90"
                >
                  {c.city}, {c.country}
                </Link>
              </li>
            ))}
          </ul>
          <InclusiveSeoListFootnote variant="cities" />
        </section>

        {faqItems.length > 0 ? (
          <FaqSection
            items={faqItems}
            sectionId="virtual-service-city-faq"
            headingLabel="FAQ"
            headingTitle={`Common questions: ${service.shortTitle} in ${city.city}`}
            headingIntro="How booking, time zones, and video visits usually work for this service when you are based in this city."
          />
        ) : null}

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
