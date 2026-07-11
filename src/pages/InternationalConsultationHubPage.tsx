import { Globe } from "lucide-react";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { AppLink as Link } from "@/components/router/AppLink";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import {
  internationalConsultationHubDocumentTitle,
  internationalConsultationHubH1,
} from "@/lib/pageSeoCopy";
import {
  INTERNATIONAL_DOCTOR_HUBS,
  INTERNATIONAL_HUB,
  INTERNATIONAL_HUB_FAQS,
} from "@/data/internationalServices/hubContent";
import {
  internationalDoctorHubPath,
  internationalServicesForDoctor,
  INTERNATIONAL_CONSULTATION_BASE,
} from "@/data/internationalServices/internationalServiceRegistry";
import {
  HowItWorksSection,
  InternationalCtaBlock,
  ServiceCardList,
} from "@/components/international/InternationalConsultationLayout";
import { whatsappMessageInternationalHub } from "@/lib/whatsappCta";

const path = INTERNATIONAL_CONSULTATION_BASE;
const TITLE = internationalConsultationHubDocumentTitle();
const H1 = internationalConsultationHubH1();
const DESCRIPTION = INTERNATIONAL_HUB.metaDescription;

export function InternationalConsultationHubPage() {
  const pageUrl = githubPagesAbsoluteUrl(SITE_URL, path);
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "International consultation", path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({ path, name: TITLE, description: DESCRIPTION }),
  ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={DESCRIPTION} path={path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={[...INTERNATIONAL_HUB_FAQS]} pageUrl={pageUrl} />

      <article className="max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary inline-flex items-center gap-1">
            <Globe className="h-3.5 w-3.5" aria-hidden />
            Worldwide
          </span>
          <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            Second opinion &amp; telehealth
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {H1}
        </h1>
        {INTERNATIONAL_HUB.intro.map((p) => (
          <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-4">
            {p}
          </p>
        ))}

        <InternationalCtaBlock
          whatsappMessage={whatsappMessageInternationalHub()}
          className="mb-10"
        />

        <section className="mb-10" aria-labelledby="intl-doctor-hubs-heading">
          <h2
            id="intl-doctor-hubs-heading"
            className="font-heading text-2xl font-semibold text-foreground mb-4"
          >
            Choose your specialist
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {INTERNATIONAL_DOCTOR_HUBS.map((hub) => (
              <Link
                key={hub.pathSegment}
                to={internationalDoctorHubPath(hub)}
                className="rounded-xl border border-border/60 bg-card p-5 shadow-soft hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <h3 className="font-heading text-lg font-semibold text-foreground">{hub.h1}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {hub.metaDescription}
                </p>
                <span className="inline-block mt-3 text-sm text-primary font-medium">
                  View services →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {INTERNATIONAL_DOCTOR_HUBS.map((hub) => (
          <ServiceCardList
            key={hub.pathSegment}
            heading={hub.h1}
            services={internationalServicesForDoctor(hub.doctor)}
          />
        ))}

        <HowItWorksSection />

        <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
          Also browse{" "}
          <Link
            to={ROUTES.onlineConsultation}
            className="text-primary underline underline-offset-4"
          >
            virtual consultation by city
          </Link>{" "}
          or read the{" "}
          <Link to={ROUTES.faq} className="text-primary underline underline-offset-4">
            FAQ
          </Link>
          .
        </p>

        <FaqSection
          items={[...INTERNATIONAL_HUB_FAQS]}
          sectionId="international-hub-faq"
          headingTitle="International consultation FAQ"
        />
        <div className="mt-10">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
