import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { CONTACT } from "@/config/site";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { TERMS_DOCUMENT_TITLE, TERMS_H1 } from "@/lib/pageSeoCopy";
import { AppLink as Link } from "@/components/router/AppLink";

const TITLE = TERMS_DOCUMENT_TITLE;
const H1 = TERMS_H1;
const DESCRIPTION =
  "Terms of service for using the Women's Health Duo website and booking teleconsultations.";

const LAST_UPDATED = "July 2026";

export function TermsOfServicePage() {
  const path = ROUTES.termsOfService;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Terms of service", path },
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
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Acceptance</h2>
            <p>
              By using womenshealthduo.com, submitting a booking request, or contacting the
              practice, you agree to these terms, our{" "}
              <Link to={ROUTES.privacyPolicy} className="text-primary underline underline-offset-4">
                Privacy policy
              </Link>
              ,{" "}
              <Link
                to={ROUTES.telemedicinePolicy}
                className="text-primary underline underline-offset-4"
              >
                Telemedicine policy
              </Link>
              , and{" "}
              <Link
                to={ROUTES.medicalDisclaimer}
                className="text-primary underline underline-offset-4"
              >
                Medical disclaimer
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Website use</h2>
            <p>
              Content on this site is for education and practice information. It does not create a
              doctor–patient relationship until a consultation is booked and accepted. Do not misuse
              contact forms for spam, abuse, or false information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Bookings</h2>
            <p>
              Submitting a booking request does not guarantee an appointment until confirmed by the
              practice. Fees, slots, and consultation mode are agreed before the visit. You must
              provide accurate patient information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Limitation of liability
            </h2>
            <p>
              To the extent permitted by law, the website is provided as-is. Emergency care is not
              offered through this site. Clinical decisions remain with your treating clinician.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Contact</h2>
            <p>
              Questions: {CONTACT.email} or {CONTACT.phoneE164}.
            </p>
          </section>
        </div>

        <div className="mt-12">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
