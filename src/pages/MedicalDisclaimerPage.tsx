import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";

import { MEDICAL_DOCUMENT_TITLE, MEDICAL_H1 } from "@/lib/pageSeoCopy";

const TITLE = MEDICAL_DOCUMENT_TITLE;
const H1 = MEDICAL_H1;
const DESCRIPTION =
  "Medical disclaimer for Women's Health Duo: education and telehealth consults are not emergency care, not a substitute for in-person evaluation when needed, and not supplement retail.";

const LAST_UPDATED = "June 2026";

export function MedicalDisclaimerPage() {
  const path = ROUTES.medicalDisclaimer;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Medical disclaimer", path },
  ];
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

      <article className="max-w-3xl">
        <p className="text-xs text-muted-foreground mb-2">Last updated: {LAST_UPDATED}</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {H1}
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-8">{DESCRIPTION}</p>

        <section className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Not emergency care
            </h2>
            <p>
              Women&apos;s Health Duo is not an emergency service. If you have severe pain, heavy
              bleeding, fever with pelvic pain, pregnancy complications, chest pain, shortness of
              breath, or any urgent symptoms, call your local emergency number or go to the nearest
              emergency department immediately.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Education vs individualized care
            </h2>
            <p>
              Short videos, captions on this site, and general pages are for{" "}
              <strong className="text-foreground">patient education</strong> only. They do not
              create a clinician–patient relationship by themselves and are not a substitute for an
              individualized assessment, examination, or treatment plan.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Consultations and limits of telehealth
            </h2>
            <p>
              Booked video consults are subject to clinical appropriateness, local regulations, and
              your clinician&apos;s judgment. Some conditions require in-person examination,
              imaging, labs, or procedures. Your doctor may advise urgent in-person care even after
              an online visit.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Not supplements or retail products
            </h2>
            <p>
              Women&apos;s Health Duo is a women&apos;s health{" "}
              <strong className="text-foreground">education and consultation platform</strong>. We
              do not sell dietary supplements, vitamins, or pills as a brand offering. Any mention
              of medications in educational content is general information; prescribing belongs in a
              proper consultation and local pharmacy regulations.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              No guarantees of outcomes
            </h2>
            <p>
              Fertility, pregnancy, surgery, and rehabilitation outcomes vary by individual. Past
              results discussed in testimonials or examples do not guarantee similar results for
              you.
            </p>
          </div>

          <p>
            See also our{" "}
            <Link to={ROUTES.editorialPolicy} className="text-primary underline underline-offset-4">
              Editorial policy
            </Link>
            , the{" "}
            <Link to={ROUTES.faq} className="text-primary underline underline-offset-4">
              FAQ
            </Link>
            , and the{" "}
            <Link to={ROUTES.learn} className="text-primary underline underline-offset-4">
              Learn hub
            </Link>
            .
          </p>
        </section>

        <div className="mt-12">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
