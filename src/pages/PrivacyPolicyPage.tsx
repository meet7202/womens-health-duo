import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { CONTACT } from "@/config/site";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { PRIVACY_DOCUMENT_TITLE, PRIVACY_H1 } from "@/lib/pageSeoCopy";

const TITLE = PRIVACY_DOCUMENT_TITLE;
const H1 = PRIVACY_H1;
const DESCRIPTION =
  "Privacy policy for Women's Health Duo: how we handle personal and health information, consultation records, retention, security, and your rights.";

const LAST_UPDATED = "July 2026";

export function PrivacyPolicyPage() {
  const path = ROUTES.privacyPolicy;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Privacy policy", path },
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
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Who we are</h2>
            <p>
              Women&apos;s Health Duo is operated by Dr. Charmi Shah and Dr. Zalak Shah. Contact:{" "}
              {CONTACT.email}, {CONTACT.phoneE164}.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Information we collect
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Identity and contact details (name, phone, email, address, age/DOB, gender).</li>
              <li>
                Medical history, symptoms, medications, allergies, and reports you share for care.
              </li>
              <li>Booking and consent timestamps when you use our consultation forms.</li>
              <li>
                Payment and invoice details for paid consults (handled via practice channels).
              </li>
              <li>
                Basic website analytics from hosting providers (no patient records on this static
                site).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Medical records and consultation data
            </h2>
            <p>
              Clinical records, consultation notes, prescriptions, uploaded reports, and messages
              sent via WhatsApp or email are maintained by the practice under standard medical
              confidentiality. They are <strong className="text-foreground">not</strong> published
              on this public website. Consultation recordings, if any, are stored only when
              clinically necessary and with appropriate consent.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              How we use health data
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and coordinate teleconsultation and in-person care.</li>
              <li>To issue prescriptions, referrals, and follow-up advice when appropriate.</li>
              <li>To maintain billing, invoices, and appointment history.</li>
              <li>To comply with applicable medical and legal requirements.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Security</h2>
            <p>
              We use encrypted channels where available (HTTPS on this site; end-to-end encryption
              on WhatsApp for messages you send to the practice). Clinical systems are
              access-controlled to authorized staff. No system is perfectly secure; share sensitive
              documents through official practice channels only.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Retention</h2>
            <p>
              Medical records are retained per applicable professional and legal requirements in
              India, typically for the period required for continuity of care and regulatory
              compliance. Marketing website logs are retained only as long as needed for operations.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Who has access
            </h2>
            <p>
              Your treating clinicians, authorized clinic staff, and specialists you are referred to
              may access relevant records. We do not sell patient data. Third-party platforms (e.g.
              WhatsApp, email providers) have their own privacy terms when you use them to contact
              us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Your rights</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Request access to or correction of your records held by the practice.</li>
              <li>
                Request deletion where legally permitted (some medical records must be retained).
              </li>
              <li>Withdraw from teleconsultation before or during a visit when clinically safe.</li>
            </ul>
            <p className="mt-2">
              Email {CONTACT.email} with &quot;Privacy request&quot; in the subject line.
            </p>
          </section>

          <p>
            See also{" "}
            <Link
              to={ROUTES.telemedicinePolicy}
              className="text-primary underline underline-offset-4"
            >
              Telemedicine policy
            </Link>{" "}
            and{" "}
            <Link
              to={ROUTES.medicalDisclaimer}
              className="text-primary underline underline-offset-4"
            >
              Medical disclaimer
            </Link>
            .
          </p>
        </div>

        <div className="mt-12">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
