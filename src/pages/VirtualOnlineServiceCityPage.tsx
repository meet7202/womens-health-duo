import { Link, Navigate, useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
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

function buildMetaTitle(serviceShort: string, city: string, country: string) {
  return `${serviceShort} online — ${city}, ${country} | Women's Health Duo`;
}

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

  if (!citySlug || !serviceSlug || !city || !service) {
    return <Navigate to={ROUTES.onlineConsultation} replace />;
  }

  if (citySlug.toLowerCase() !== virtualCityPathSegment(city)) {
    return <Navigate to={virtualServiceCityPath(city, service.slug)} replace />;
  }

  const path = virtualServiceCityPath(city, service.slug);
  const metaTitle = buildMetaTitle(service.shortTitle, city.city, city.country);
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
      name: `${service.title} — ${city.city}, ${city.country} | Women's Health Duo`,
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

      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
          Virtual online · {city.city}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {service.title} — online consultation for patients in {city.city}, {city.country}
        </h1>

        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground mb-6">
          {service.summary} <strong className="text-foreground">In person:</strong>{" "}
          {PRACTICE_BOTH_DOCTORS_IN_PERSON} Book through the practice—see{" "}
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
            — see other cities, then open a city page for every online service URL.
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
              {service.doctor === "charmi" ? "Dr. Charmi — profile" : "Dr. Zalak — profile"}
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
            Other kinds of online visits we offer in {city.city}—each link is a separate page.
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
            {service.title} — other cities
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

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
