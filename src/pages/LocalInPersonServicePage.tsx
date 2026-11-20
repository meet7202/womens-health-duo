import { useLocation } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { ContentAuthors } from "@/components/seo/ContentAuthors";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { Button } from "@/components/ui/button";
import { AppLink as Link } from "@/components/router/AppLink";
import { AppNavigate as Navigate } from "@/components/router/AppNavigate";
import { TrackedWhatsAppLink } from "@/components/cta/TrackedWhatsAppLink";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { CITY_PAGES } from "@/data/cityPages";
import { localServicePageByPath, localServicePagesForCity } from "@/data/localServicePages";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { bookConsultationPath } from "@/lib/bookingIntent";
import { whatsappUrlWithMessage } from "@/lib/whatsappCta";
import {
  getVirtualConsultationCityBySlug,
  virtualServiceCityPath,
} from "@/lib/virtualConsultation";

export function LocalInPersonServicePage() {
  const { pathname } = useLocation();
  const page = localServicePageByPath(pathname);
  if (!page) return <Navigate to={ROUTES.home} replace />;

  const { service, city } = page;
  const siblings = localServicePagesForCity(city.key).filter((item) => item.path !== page.path);
  const onlineCity = getVirtualConsultationCityBySlug(city.virtualSegment);
  const onlinePath = onlineCity ? virtualServiceCityPath(onlineCity, service.onlineSlug) : null;
  const studio =
    city.key === "bangalore" && service.doctor === "zalak"
      ? CITY_PAGES.bangalore.studio
      : undefined;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: city.h1Place, path: city.path },
    { name: service.titleLead, path: page.path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path: page.path,
      name: page.title,
      description: page.metaDescription,
    }),
  ];
  const whatsappHref = whatsappUrlWithMessage(
    `Hi Women's Health Duo,\n\nI would like to book ${service.titleLead.toLowerCase()} in ${city.titlePlace} with ${page.doctorName}.\n\nSent from womenshealthduo.com${page.path}`,
  );

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={page.title} metaDescription={page.metaDescription} path={page.path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={[...page.faqs]} pageUrl={githubPagesAbsoluteUrl(SITE_URL, page.path)} />

      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
          In person · {city.h1Place}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {page.h1}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{service.intro}</p>

        <figure className="mb-8 max-w-xl">
          <img
            src={service.image.src}
            srcSet={service.image.srcSet}
            sizes="(min-width: 640px) 36rem, 100vw"
            alt={service.image.alt}
            width={service.image.width}
            height={service.image.height}
            loading="lazy"
            decoding="async"
            className={
              service.image.height > service.image.width
                ? "h-auto max-h-[32rem] w-auto max-w-full rounded-lg border border-border/60"
                : "h-auto w-full rounded-lg border border-border/60"
            }
          />
          <figcaption className="mt-2 text-sm text-muted-foreground">
            {service.image.caption}
          </figcaption>
        </figure>

        <section className="mb-8" aria-labelledby="local-service-covers">
          <h2
            id="local-service-covers"
            className="font-heading text-xl font-semibold text-foreground mb-3"
          >
            What the visit covers
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed">
            {service.covers.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        <section className="mb-8" aria-labelledby="local-service-booking">
          <h2
            id="local-service-booking"
            className="font-heading text-xl font-semibold text-foreground mb-3"
          >
            Booking in {city.h1Place}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {page.doctorName} sees patients in person in {city.h1Place} by appointment.{" "}
            {studio ? (
              <>
                Studio: {studio.area}. {studio.hours}{" "}
              </>
            ) : (
              <>The room for that day is confirmed when you book. </>
            )}
            Messages are answered Monday to Saturday, 9:00 AM to 6:00 PM India time.
          </p>
        </section>

        <div className="flex flex-wrap gap-3 mb-10">
          <Button asChild className="bg-whatsapp hover:bg-whatsapp-hover text-white border-0">
            <TrackedWhatsAppLink
              href={whatsappHref}
              ctaPlacement="local_service"
              doctor={service.doctor}
              service={service.analyticsService}
              pagePath={page.path}
            >
              Book on WhatsApp
            </TrackedWhatsAppLink>
          </Button>
          <Button variant="secondary" asChild>
            <Link
              to={bookConsultationPath({
                doctor: service.doctor,
                service: service.bookingService,
              })}
            >
              Book consultation
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={city.path}>{city.h1Place} clinic page</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={page.profilePath}>{page.doctorName}</Link>
          </Button>
        </div>

        <section className="mb-10" aria-labelledby="local-service-siblings">
          <h2
            id="local-service-siblings"
            className="font-heading text-xl font-semibold text-foreground mb-3"
          >
            Other in-person services in {city.h1Place}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2 text-sm">
            {siblings.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className="text-primary underline underline-offset-4">
                  {item.service.titleLead} · {item.doctorName}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="local-service-also">
          <h2
            id="local-service-also"
            className="font-heading text-xl font-semibold text-foreground mb-3"
          >
            Read more, or book the video version
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={service.parent.path} className="text-primary underline underline-offset-4">
                {service.parent.label}
              </Link>
            </li>
            {service.guides.map((guide) => (
              <li key={guide.path}>
                <Link to={guide.path} className="text-primary underline underline-offset-4">
                  {guide.label}
                </Link>
              </li>
            ))}
            {onlinePath ? (
              <li>
                <Link to={onlinePath} className="text-primary underline underline-offset-4">
                  Online {service.titleLead.toLowerCase()} if you are not coming in
                </Link>
              </li>
            ) : null}
          </ul>
        </section>

        <FaqSection
          items={[...page.faqs]}
          sectionId="local-service-faq"
          headingTitle={`Questions about ${service.titleLead.toLowerCase()} in ${city.titlePlace}`}
          headingIntro="Who you see, how this differs from a video consult, and how to book."
        />

        <div className="mt-10">
          <ContentAuthors />
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
