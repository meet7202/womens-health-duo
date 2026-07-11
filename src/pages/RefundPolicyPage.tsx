import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { CONTACT } from "@/config/site";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { REFUND_DOCUMENT_TITLE, REFUND_H1 } from "@/lib/pageSeoCopy";

const TITLE = REFUND_DOCUMENT_TITLE;
const H1 = REFUND_H1;
const DESCRIPTION =
  "Refund and cancellation policy for Women's Health Duo teleconsultations and in-person appointments.";

const LAST_UPDATED = "July 2026";

export function RefundPolicyPage() {
  const path = ROUTES.refundPolicy;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Refund policy", path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({ path, name: TITLE, description: DESCRIPTION }),
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

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Cancellation by patient
            </h2>
            <p>
              Notify the practice on WhatsApp or email as early as possible if you need to cancel or
              reschedule. Refund eligibility depends on how much notice you give and whether the
              slot can be offered to another patient. Confirm the exact rule for your booking when
              you pay.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Cancellation by clinic
            </h2>
            <p>
              If we cancel or reschedule due to clinician unavailability or technical issues, you
              may choose a new slot or a full refund of any prepaid fee for that visit.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              No-shows and late joins
            </h2>
            <p>
              Missing a confirmed appointment without notice may forfeit the consultation fee. Join
              video visits on time; significant delays may shorten or require rescheduling.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Refund processing
            </h2>
            <p>
              Approved refunds are processed via the original payment method where possible, within
              a reasonable timeframe. Contact {CONTACT.email} with your invoice number and booking
              date.
            </p>
          </section>

          <p>
            See{" "}
            <Link
              to={ROUTES.telemedicinePolicy}
              className="text-primary underline underline-offset-4"
            >
              Telemedicine policy
            </Link>{" "}
            for fees and booking flow.
          </p>
        </div>

        <div className="mt-12">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
