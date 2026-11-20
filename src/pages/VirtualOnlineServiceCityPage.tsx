import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { ROBOTS_INDEX_FOLLOW, ROBOTS_NOINDEX_FOLLOW } from "@/config/routeDisposition";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { SEO_ONLINE_SERVICES, getSeoOnlineServiceBySlug } from "@/data/seoOnlineServices";
import { AppLink as Link } from "@/components/router/AppLink";
import { AppNavigate as Navigate } from "@/components/router/AppNavigate";
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
import { ContentAuthors } from "@/components/seo/ContentAuthors";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { InclusiveSeoListFootnote } from "@/components/seo/InclusiveSeoListFootnote";
import { Button } from "@/components/ui/button";
import {
  inPersonClinicFor,
  localCityPageFor,
  PRACTICE_CHARMI_IN_PERSON,
  PRACTICE_IN_PERSON_BOOKING_LINE,
  PRACTICE_ZALAK_IN_PERSON,
} from "@/config/practiceLocations";
import { onlineServiceCityFaqs } from "@/data/contextualFaqs";
import { bookConsultationPath } from "@/lib/bookingIntent";
import { virtualServiceCitySeo } from "@/lib/virtualServiceCitySeo";
import { virtualServiceCityLocalFacts } from "@/lib/serviceCityLocalFacts";
import { SERVICE_CITY_CONTENT } from "@/data/serviceCityContent";
import { DOCTOR_BY_SLUG } from "@/data/doctorProfiles";
import { TelemedicineComplianceBlock } from "@/components/compliance/TelemedicineComplianceBlock";

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

  const seo = virtualServiceCitySeo(city, service);
  const { path, h1, metaDescription } = seo;
  const metaTitle = seo.title;
  const content = SERVICE_CITY_CONTENT[service.slug];
  const local = virtualServiceCityLocalFacts(city.city, city.countryCode);
  const doctor = DOCTOR_BY_SLUG[service.doctor];
  const ownClinic = inPersonClinicFor(city.city, service.doctor);
  const cityClinic = localCityPageFor(city.city);
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
      <SeoHead
        title={metaTitle}
        metaDescription={metaDescription}
        path={path}
        robots={seo.indexable ? ROBOTS_INDEX_FOLLOW : ROBOTS_NOINDEX_FOLLOW}
      />
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

        <TelemedicineComplianceBlock className="mb-8" showLimitations={false} />

        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground mb-6">
          {service.summary} This is{" "}
          <strong className="text-foreground">online advice / video consultation</strong> with an
          India-trained clinician. We do not claim to run a physical clinic in {city.city}.
          Availability and suitability for your location are confirmed when you enquire.
        </p>
        <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
          <p>
            Written for people in <strong className="text-foreground">{city.city}</strong>,{" "}
            <strong className="text-foreground">{city.country}</strong> who want{" "}
            <strong className="text-foreground">{service.shortTitle}</strong> guidance online.
            Prefer starting from the{" "}
            <Link
              to={ROUTES.onlineConsultation}
              className="text-primary underline underline-offset-4"
            >
              online consultation hub
            </Link>
            {countryHub ? (
              <>
                {" "}
                or{" "}
                <Link
                  to={virtualConsultationCountryPath(countryHub)}
                  className="text-primary underline underline-offset-4"
                >
                  all virtual locations in {city.country}
                </Link>
              </>
            ) : null}
            , then book with your time zone and a short summary of your concern.
          </p>
          <p>
            {ownClinic ? (
              <>
                <strong className="text-foreground">Online and in person in {city.city}:</strong>{" "}
                this page is the video consult with {doctor.name}. The same doctor also sees
                patients in person here. Book a clinic visit from the{" "}
                <Link to={ownClinic.path} className="text-primary underline underline-offset-4">
                  {ownClinic.label} page
                </Link>
                , or stay on video. {PRACTICE_IN_PERSON_BOOKING_LINE}
              </>
            ) : cityClinic ? (
              <>
                <strong className="text-foreground">Video consult in {city.city}:</strong>{" "}
                {doctor.name} sees patients online here. In-person visits with {doctor.name} are in{" "}
                {service.doctor === "charmi" ? PRACTICE_CHARMI_IN_PERSON : PRACTICE_ZALAK_IN_PERSON}
                . The{" "}
                <Link to={cityClinic.path} className="text-primary underline underline-offset-4">
                  {cityClinic.label} clinic page
                </Link>{" "}
                is for the doctor who does see patients in person in this city.{" "}
                {PRACTICE_IN_PERSON_BOOKING_LINE}
              </>
            ) : (
              <>
                <strong className="text-foreground">In-person option:</strong> this {city.city} page
                is for video care only. If you can travel, Dr. Charmi Shah sees patients in{" "}
                {PRACTICE_CHARMI_IN_PERSON}, and Dr. Zalak Shah in {PRACTICE_ZALAK_IN_PERSON}, by
                appointment at those centres. {PRACTICE_IN_PERSON_BOOKING_LINE}
              </>
            )}
          </p>
        </div>

        {content ? (
          <>
            <figure className="mb-8 max-w-xl">
              <img
                src={content.image.src}
                srcSet={content.image.srcSet}
                sizes="(min-width: 640px) 36rem, 100vw"
                alt={content.image.alt}
                width={content.image.width}
                height={content.image.height}
                loading="lazy"
                decoding="async"
                className={
                  content.image.height > content.image.width
                    ? "h-auto max-h-[32rem] w-auto max-w-full rounded-lg border border-border/60"
                    : "h-auto w-full rounded-lg border border-border/60"
                }
              />
              <figcaption className="mt-2 text-sm text-muted-foreground">
                {content.image.caption}
              </figcaption>
            </figure>

            <p className="text-muted-foreground leading-relaxed mb-8">
              Led by{" "}
              <Link to={profilePath} className="text-primary underline underline-offset-4">
                {doctor.name}
              </Link>{" "}
              ({doctor.credentials}).
            </p>

            <section className="mb-8" aria-labelledby="service-city-covers-heading">
              <h2
                id="service-city-covers-heading"
                className="font-heading text-xl font-semibold text-foreground mb-3"
              >
                What an online visit from {city.city} can cover
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                {content.covers.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8" aria-labelledby="service-city-in-person-heading">
              <h2
                id="service-city-in-person-heading"
                className="font-heading text-xl font-semibold text-foreground mb-3"
              >
                What still needs a local visit in {city.city}
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                {content.inPerson.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8" aria-labelledby="service-city-prepare-heading">
              <h2
                id="service-city-prepare-heading"
                className="font-heading text-xl font-semibold text-foreground mb-3"
              >
                Before your video call
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
                {content.prepare.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="mb-8" aria-labelledby="service-city-time-heading">
              <h2
                id="service-city-time-heading"
                className="font-heading text-xl font-semibold text-foreground mb-3"
              >
                Time zone and booking from {city.city}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {local.timeZoneLine} Book on WhatsApp with {city.city} and your concern in the first
                message.
              </p>
            </section>
          </>
        ) : null}

        <div className="flex flex-wrap gap-3 mb-12">
          <Button asChild>
            <Link to={bookConsultationPath({ doctor: service.doctor, service: service.slug })}>
              Book consultation
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to={profilePath}>
              {service.doctor === "charmi" ? "Dr. Charmi Shah profile" : "Dr. Zalak Shah profile"}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={virtualConsultationCityPath(city)}>All services in {city.city}</Link>
          </Button>
        </div>

        {content ? (
          <section
            className="border-t border-border/60 pt-10 mb-10"
            aria-labelledby="service-city-guides-heading"
          >
            <h2
              id="service-city-guides-heading"
              className="font-heading text-lg font-semibold text-foreground mb-4"
            >
              Read before you book
            </h2>
            <ul className="grid gap-2 sm:grid-cols-2 text-sm">
              <li>
                <Link
                  to={content.parent.path}
                  className="text-primary underline underline-offset-2 hover:text-primary/90"
                >
                  {content.parent.label}
                </Link>
              </li>
              {content.guides.map((g) => (
                <li key={g.path}>
                  <Link
                    to={g.path}
                    className="text-primary underline underline-offset-2 hover:text-primary/90"
                  >
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

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
            {service.title} in other cities
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

        <ContentAuthors />
        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
