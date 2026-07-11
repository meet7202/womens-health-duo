import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";

import { EDITORIAL_DOCUMENT_TITLE, EDITORIAL_H1 } from "@/lib/pageSeoCopy";

const TITLE = EDITORIAL_DOCUMENT_TITLE;
const H1 = EDITORIAL_H1;
const DESCRIPTION =
  "How Women's Health Duo publishes Learn hub captions, video selections, and on-site health content, authorship, accuracy intent, and corrections.";

const LAST_UPDATED = "June 2026";

export function EditorialPolicyPage() {
  const path = ROUTES.editorialPolicy;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Editorial policy", path },
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
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Who we are</h2>
            <p>
              Public education content is produced under the clinical brands of{" "}
              <Link to={ROUTES.drCharmi} className="text-primary underline underline-offset-4">
                Dr. Charmi Shah
              </Link>{" "}
              (obstetrician–gynecologist, IVF, laparoscopy) and{" "}
              <Link to={ROUTES.drZalak} className="text-primary underline underline-offset-4">
                Dr. Zalak Shah
              </Link>{" "}
              (women&apos;s health physiotherapist; STOTT Pilates instructor, Mat &amp; Reformer).
              Short-form posts may be scripted for clarity; they remain educational, not
              personalized medical advice.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Learn hub captions
            </h2>
            <p>
              Where shown, YouTube descriptions and Instagram captions are copied from the public
              post at the time of sync for transparency. If a caption is missing, the live post on
              the platform is authoritative. We do not alter clinical claims in captions except to
              fix obvious formatting for readability on this site.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Accuracy and updates
            </h2>
            <p>
              Medicine evolves. Pages carry a &quot;Last updated&quot; note where applicable. When
              we materially change guidance on this marketing site, we aim to update the relevant
              page and keep high-traffic hubs consistent with our current practice positioning.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Citations and long-form articles
            </h2>
            <p>
              This repository is primarily a consultation and education routing site with a video
              hub, not a medical journal. If we publish long-form articles in the future, we will
              list author credentials, revision dates, and reference sections where clinical claims
              require them.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Corrections</h2>
            <p>
              If you believe something on this site is incorrect or outdated, contact us via email
              or WhatsApp (see footer). We appreciate specifics: page URL, what should change, and
              optional references.
            </p>
          </div>

          <p>
            Read the{" "}
            <Link
              to={ROUTES.medicalDisclaimer}
              className="text-primary underline underline-offset-4"
            >
              Medical disclaimer
            </Link>{" "}
            for care limits, emergencies, and telehealth boundaries.
          </p>
        </section>

        <div className="mt-12">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
