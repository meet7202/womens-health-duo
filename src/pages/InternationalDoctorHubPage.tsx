import { Link, Navigate, useLocation } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { ROUTES } from "@/config/routes";
import { DOCTOR_BY_SLUG } from "@/data/doctorProfiles";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { internationalDoctorHubDocumentTitle } from "@/lib/pageSeoCopy";
import {
  getInternationalDoctorHub,
  internationalDoctorHubPath,
  internationalServicesForDoctor,
  INTERNATIONAL_CONSULTATION_BASE,
} from "@/data/internationalServices/internationalServiceRegistry";
import {
  HowItWorksSection,
  InternationalCtaBlock,
  ServiceCardList,
} from "@/components/international/InternationalConsultationLayout";
import { whatsappMessageInternationalDoctorHub } from "@/lib/whatsappCta";

export function InternationalDoctorHubPage() {
  const { pathname } = useLocation();
  const pathSegment = pathname.replace(/\/+$/, "").split("/").pop() ?? "";
  const hub = getInternationalDoctorHub(pathSegment);

  if (!hub) {
    return <Navigate to={INTERNATIONAL_CONSULTATION_BASE} replace />;
  }

  const path = internationalDoctorHubPath(hub);
  const doctor = DOCTOR_BY_SLUG[hub.doctor];
  const services = internationalServicesForDoctor(hub.doctor);
  const TITLE = internationalDoctorHubDocumentTitle(hub.documentTitlePrimary);
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "International consultation", path: INTERNATIONAL_CONSULTATION_BASE },
    { name: hub.documentTitlePrimary, path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({ path, name: TITLE, description: hub.metaDescription }),
  ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={hub.metaDescription} path={path} />
      <JsonLdGraph graph={graph} />

      <article className="max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {hub.h1}
        </h1>
        {hub.intro.map((p) => (
          <p key={p.slice(0, 40)} className="text-muted-foreground leading-relaxed mb-4">
            {p}
          </p>
        ))}

        <InternationalCtaBlock
          whatsappMessage={whatsappMessageInternationalDoctorHub(doctor.name, path)}
          className="mb-10"
        />

        <ServiceCardList services={services} heading={`${doctor.name} — international services`} />

        <HowItWorksSection />

        <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
          <Link to={doctor.path} className="text-primary underline underline-offset-4">
            Full profile
          </Link>
          {" · "}
          <Link
            to={INTERNATIONAL_CONSULTATION_BASE}
            className="text-primary underline underline-offset-4"
          >
            All international services
          </Link>
          {" · "}
          <Link
            to={ROUTES.onlineConsultation}
            className="text-primary underline underline-offset-4"
          >
            Virtual by city
          </Link>
        </p>

        <div className="mt-10">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
