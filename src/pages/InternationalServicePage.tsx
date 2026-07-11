import { useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { internationalServiceDocumentTitle } from "@/lib/pageSeoCopy";
import { AppLink as Link } from "@/components/router/AppLink";
import { AppNavigate as Navigate } from "@/components/router/AppNavigate";
import {
  getInternationalDoctorHub,
  getInternationalService,
  internationalDoctorHubPath,
  internationalServicePath,
  INTERNATIONAL_CONSULTATION_BASE,
} from "@/data/internationalServices/internationalServiceRegistry";
import { INTERNATIONAL_DOCTOR_HUBS } from "@/data/internationalServices/hubContent";
import {
  InternationalCtaBlock,
  ScopeSection,
  HowItWorksSection,
} from "@/components/international/InternationalConsultationLayout";
import { whatsappMessageInternationalService } from "@/lib/whatsappCta";

export function InternationalServicePage() {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();

  if (!serviceSlug) {
    return <Navigate to={INTERNATIONAL_CONSULTATION_BASE} replace />;
  }

  if (getInternationalDoctorHub(serviceSlug)) {
    return (
      <Navigate to={internationalDoctorHubPath(getInternationalDoctorHub(serviceSlug)!)} replace />
    );
  }

  const service = getInternationalService(serviceSlug);
  if (!service) {
    return <Navigate to={INTERNATIONAL_CONSULTATION_BASE} replace />;
  }

  const path = internationalServicePath(service.slug);
  const pageUrl = githubPagesAbsoluteUrl(SITE_URL, path);
  const TITLE = internationalServiceDocumentTitle(service.shortTitle);
  const doctorHub = INTERNATIONAL_DOCTOR_HUBS.find((h) => h.doctor === service.doctor)!;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "International consultation", path: INTERNATIONAL_CONSULTATION_BASE },
    { name: doctorHub.documentTitlePrimary, path: internationalDoctorHubPath(doctorHub) },
    { name: service.title, path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({ path, name: TITLE, description: service.metaDescription }),
  ];
  const related = service.relatedSlugs
    .map((slug) => getInternationalService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={service.metaDescription} path={path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={[...service.faqs]} pageUrl={pageUrl} />

      <article className="max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {service.title}
        </h1>
        {service.intro.map((p) => (
          <p key={p.slice(0, 40)} className="text-lg text-muted-foreground leading-relaxed mb-4">
            {p}
          </p>
        ))}

        <InternationalCtaBlock
          whatsappMessage={whatsappMessageInternationalService(service.title, path)}
          className="mb-10"
        />

        <ScopeSection canHelp={service.canHelp} notFor={service.notFor} />

        <HowItWorksSection />

        {related.length > 0 && (
          <section className="mb-10" aria-labelledby="intl-related-heading">
            <h2
              id="intl-related-heading"
              className="font-heading text-xl font-semibold text-foreground mb-3"
            >
              Related international services
            </h2>
            <ul className="flex flex-wrap gap-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={internationalServicePath(r.slug)}
                    className="inline-block rounded-full border border-border/60 bg-muted/30 px-3 py-1.5 text-sm text-foreground hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    {r.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
          <Link
            to={internationalDoctorHubPath(doctorHub)}
            className="text-primary underline underline-offset-4"
          >
            All {doctorHub.documentTitlePrimary.toLowerCase()} services
          </Link>
          {" · "}
          <Link
            to={ROUTES.telemedicinePolicy}
            className="text-primary underline underline-offset-4"
          >
            Telemedicine policy
          </Link>
        </p>

        <FaqSection
          items={[...service.faqs]}
          sectionId={`intl-service-faq-${service.slug}`}
          headingTitle="Common questions"
        />
        <div className="mt-10">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
