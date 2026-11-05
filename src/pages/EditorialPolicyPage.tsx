import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { AppLink as Link } from "@/components/router/AppLink";

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
              Where shown, YouTube descriptions and Instagram captions are usually copied from the
              public post at the time of sync for transparency. If a caption is missing, the live
              post on the platform is authoritative. When a synced caption includes a clinical claim
              we are not ready to stand behind as current on-site guidance, we may replace the
              on-site caption with a short editorial hold or clarification while keeping the
              original platform text in our data for clinician review, we do not invent a full
              medical rewrite in that hold.
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
              Topic guides and clinical review
            </h2>
            <p>
              About <strong className="font-medium text-foreground">100</strong> written topic
              guides (articles and common questions linked from Learn) already exist as educational
              routing pages. Editorial fields support author, reviewer, published/updated/reviewed
              dates, review status, and references. Existing guides default to{" "}
              <strong className="font-medium text-foreground">pending</strong> (or stay in{" "}
              <strong className="font-medium text-foreground">draft</strong> /{" "}
              <strong className="font-medium text-foreground">needs-review</strong>): they are not
              marked as clinician-approved authorship or medical review unless a guide explicitly
              carries <strong className="font-medium text-foreground">approved</strong> status with
              verified author/reviewer fields. We do not backdate review stamps or invent
              credentials. When a guide is approved, the page can show a byline, reviewer name, and
              dates that match those fields.
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
