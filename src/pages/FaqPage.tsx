import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { SITE_FAQ } from "@/data/siteFaq";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";

const TITLE = "FAQ | Women's Health Duo — OB-GYN, IVF & Women's Health Physio";
const DESCRIPTION =
  "Frequently asked questions about Women's Health Duo: Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, Mat Pilates online, STOTT Pilates), cities served, and online consultations.";

export function FaqPage() {
  const path = ROUTES.faq;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "FAQ", path },
  ];
  const pageUrl = `${SITE_URL}${path}`;
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path,
      name: TITLE,
      description: DESCRIPTION,
    }),
  ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={DESCRIPTION} path={path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={SITE_FAQ} pageUrl={pageUrl} />

      <article className="max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          Frequently asked questions
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-4">{DESCRIPTION}</p>
        <p className="text-sm text-muted-foreground leading-relaxed mb-8 border-l-2 border-primary/30 pl-4">
          For emergencies, telehealth limits, and how we publish captions on the Learn hub, read the{" "}
          <Link to={ROUTES.medicalDisclaimer} className="text-primary underline underline-offset-4">
            Medical disclaimer
          </Link>{" "}
          and{" "}
          <Link to={ROUTES.editorialPolicy} className="text-primary underline underline-offset-4">
            Editorial policy
          </Link>
          .
        </p>
      </article>

      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <FaqSection items={SITE_FAQ} />
      </div>

      <div className="max-w-3xl mt-12">
        <DirectoryPresence />
      </div>
    </PageShell>
  );
}
