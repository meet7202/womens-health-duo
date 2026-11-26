import { useMemo } from "react";
import { AppLink as Link } from "@/components/router/AppLink";

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
import { ContentAuthors } from "@/components/seo/ContentAuthors";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { indiaCityDocumentTitle } from "@/lib/pageSeoCopy";
import { localServicePagesForCity, type LocalServicePage } from "@/data/localServicePages";
import { TrackedWhatsAppLink } from "@/components/cta/TrackedWhatsAppLink";
import { whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { CONTACT } from "@/config/site.defaults";
import {
  getVirtualConsultationCityBySlug,
  virtualConsultationCityPath,
} from "@/lib/virtualConsultation";

type CityLandingPageProps = {
  cityKey: CityKey;
};

export function CityLandingPage({ cityKey }: CityLandingPageProps) {
  const city = CITY_PAGES[cityKey];
  const docTitle = indiaCityDocumentTitle(cityKey);
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: city.h1, path: city.path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path: city.path,
      name: docTitle,
      description: city.metaDescription,
    }),
    medicalClinicForCity(city),
  ];
  const faqItems = useMemo(() => indiaCityFaqs(cityKey, city.cityName), [cityKey, city.cityName]);
  const onlineCity = getVirtualConsultationCityBySlug(
    cityKey === "bangalore" ? "bengaluru" : cityKey,
  );
  const localServices = localServicePagesForCity(cityKey);

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={docTitle} metaDescription={city.metaDescription} path={city.path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={faqItems} pageUrl={githubPagesAbsoluteUrl(SITE_URL, city.path)} />

      <article>
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">City</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {city.h1}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{city.intro}</p>

        <ClinicListings city={city} services={localServices} />

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

        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-foreground mb-8">
          <strong>Online in {city.cityName} too.</strong>{" "}
          {onlineCity ? (
            <>
              Every video service for this city is on{" "}
              <Link
                to={virtualConsultationCityPath(onlineCity)}
                className="text-primary underline underline-offset-4"
              >
                online consultations in {onlineCity.city}
              </Link>
              .{" "}
            </>
          ) : null}
          Patients in other countries start from{" "}
          <Link
            to={ROUTES.onlineConsultation}
            className="text-primary underline underline-offset-4"
          >
            virtual online consultations
          </Link>
          . Online OB-GYN and physio consults are booked the same way worldwide.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <Link to={ROUTES.drCharmi} className="text-sm text-primary underline underline-offset-4">
            Dr. Charmi Shah: full profile
          </Link>
          <span className="text-muted-foreground" aria-hidden>
            ·
          </span>
          <Link to={ROUTES.drZalak} className="text-sm text-primary underline underline-offset-4">
            Dr. Zalak Shah: full profile
          </Link>
          {cityKey === "bangalore" || cityKey === "ahmedabad" ? (
            <>
              <span className="text-muted-foreground" aria-hidden>
                ·
              </span>
              <Link
                to="/diastasis-recti"
                className="text-sm text-primary underline underline-offset-4"
              >
                Diastasis recti physiotherapy
              </Link>
            </>
          ) : null}
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
          headingTitle={`Common questions about care in ${city.cityName}`}
          headingIntro="Booking, who you will see, and how in-person and online visits fit together."
        />

        <ContentAuthors />
        <DirectoryPresence />
      </article>
    </PageShell>
  );
}

const CLINIC_CARD: Record<
  LocalServicePage["service"]["doctor"],
  { heading: string; credentials: string; service: string }
> = {
  zalak: {
    heading: "Women's health physiotherapy clinic",
    credentials: "BPT, MPT (Women's Health); STOTT Pilates Instructor (Mat & Reformer)",
    service: "womens-health-physiotherapy",
  },
  charmi: {
    heading: "Gynecology and IVF clinic",
    credentials: "MBBS, MS (Obstetrics & Gynecology); fellowship training in laparoscopy and IVF",
    service: "gynecological-care",
  },
};

function ClinicListings({
  city,
  services,
}: {
  city: CityPageData;
  services: readonly LocalServicePage[];
}) {
  const groups = (["zalak", "charmi"] as const)
    .map((doctor) => ({
      doctor,
      services: services.filter((service) => service.service.doctor === doctor),
    }))
    .filter((group) => group.services.length > 0);

  return (
    <section className="mb-10" aria-labelledby={`clinics-${city.key}`}>
      <h2
        id={`clinics-${city.key}`}
        className="font-heading text-xl font-semibold text-foreground mb-3"
      >
        Clinics in {city.cityName}
      </h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Women's Health Duo, {city.cityName}. Visits are by appointment. Say the city and the service
        in the first message to {CONTACT.phoneE164}.
      </p>
      <div className="space-y-4">
        {groups.map((group) => {
          const card = CLINIC_CARD[group.doctor];
          const doctorName = group.services[0]?.doctorName ?? "";
          const studio = group.doctor === "zalak" ? city.studio : undefined;
          const href = whatsappUrlWithMessage(
            `Hi Women's Health Duo,\n\nI would like an in-person visit at the ${city.cityName} clinic with ${doctorName}.\n\nSent from womenshealthduo.com${city.path}`,
          );
          return (
            <article key={group.doctor} className="rounded-xl border border-border/50 bg-card p-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {card.heading} in {city.cityName}
              </h3>
              <p className="mt-1 text-sm text-foreground">
                {doctorName}. {card.credentials}
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {studio ? (
                  <>
                    Studio: {studio.area}. {studio.hours}
                  </>
                ) : (
                  <>
                    In person in {city.cityName} by appointment. The room for that day is confirmed
                    when you book. Messages are answered Monday to Saturday, 9:00 AM to 6:00 PM
                    India time.
                  </>
                )}
              </p>
              <p className="mt-3 text-sm font-medium text-foreground">
                Patients book this clinic for
              </p>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2 text-sm">
                {group.services.map((service) => (
                  <li key={service.path}>
                    <Link to={service.path} className="text-primary underline underline-offset-4">
                      {service.service.titleLead}
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm">
                <TrackedWhatsAppLink
                  href={href}
                  ctaPlacement="city_clinic"
                  doctor={group.doctor}
                  service={card.service}
                  pagePath={city.path}
                  className="text-primary underline underline-offset-4"
                >
                  Book this clinic on WhatsApp
                </TrackedWhatsAppLink>
              </p>
            </article>
          );
        })}
      </div>
    </section>
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
        <strong className="text-foreground">Dr. Zalak Shah on Google Business:</strong>{" "}
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
        <strong className="text-foreground">Dr. Zalak Shah on Google Business (this city):</strong>{" "}
        <GbpLink href={ahm}>Ahmedabad listing</GbpLink>
        <span className="text-muted-foreground">; also on Google: </span>
        <GbpLink href={blr}>Bengaluru (Bangalore)</GbpLink>
      </p>
    );
  }

  return (
    <p className="text-sm text-muted-foreground mb-10">
      <strong className="text-foreground">Dr. Zalak Shah on Google Business (this city):</strong>{" "}
      <GbpLink href={blr}>Bengaluru (Bangalore) listing</GbpLink>
      <span className="text-muted-foreground">; also on Google: </span>
      <GbpLink href={ahm}>Ahmedabad</GbpLink>
    </p>
  );
}
