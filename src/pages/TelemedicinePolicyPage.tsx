import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { TELEMEDICINE_DOCUMENT_TITLE, TELEMEDICINE_H1 } from "@/lib/pageSeoCopy";
import { EmergencyDisclaimer } from "@/components/compliance/EmergencyDisclaimer";
import { TelemedicineLimitations } from "@/components/compliance/TelemedicineLimitations";
import { TELEMEDICINE_FAQ } from "@/data/telemedicineFaq";
import { DOCTOR_BY_SLUG } from "@/data/doctorProfiles";
import { doctorRegistrationLine } from "@/config/doctorRegistration";
import { AppLink as Link } from "@/components/router/AppLink";

const TITLE = TELEMEDICINE_DOCUMENT_TITLE;
const H1 = TELEMEDICINE_H1;
const DESCRIPTION =
  "Telemedicine policy for Women's Health Duo: how online consultations work, patient and doctor responsibilities, consent, prescriptions, privacy, fees, and emergency care.";

const LAST_UPDATED = "July 2026";

export function TelemedicinePolicyPage() {
  const path = ROUTES.telemedicinePolicy;
  const pageUrl = githubPagesAbsoluteUrl(SITE_URL, path);
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Telemedicine policy", path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({ path, name: TITLE, description: DESCRIPTION }),
  ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={DESCRIPTION} path={path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={TELEMEDICINE_FAQ.slice(0, 8)} pageUrl={pageUrl} />

      <article className="max-w-3xl">
        <p className="text-xs text-muted-foreground mb-2">Last updated: {LAST_UPDATED}</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {H1}
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-6">{DESCRIPTION}</p>

        <EmergencyDisclaimer className="mb-8" />

        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              How teleconsultation works
            </h2>
            <p>
              Book via our{" "}
              <Link
                to={ROUTES.bookConsultation}
                className="text-primary underline underline-offset-4"
              >
                Book consultation
              </Link>{" "}
              form or WhatsApp. After you share patient details and accept telemedicine consent, the
              practice confirms a slot and consultation mode (video, audio, or chat). Consultations
              are delivered by registered practitioners from India to patients in India and abroad,
              subject to clinical appropriateness and applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Registered practitioners
            </h2>
            <ul className="space-y-3">
              {(Object.keys(DOCTOR_BY_SLUG) as (keyof typeof DOCTOR_BY_SLUG)[]).map((slug) => (
                <li key={slug} className="rounded-lg border border-border/40 p-3 bg-muted/20">
                  <strong className="text-foreground">{DOCTOR_BY_SLUG[slug].name}</strong>
                  <br />
                  {DOCTOR_BY_SLUG[slug].credentials}
                  <br />
                  <span className="text-foreground font-medium">
                    {doctorRegistrationLine(slug)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <TelemedicineLimitations className="!grid-cols-1 md:!grid-cols-2 my-8" />

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Patient responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Provide accurate identity and contact information.</li>
              <li>Share relevant medical history, medications, allergies, and reports honestly.</li>
              <li>Use a private, stable connection for video or audio consults.</li>
              <li>
                Seek emergency care locally for urgent symptoms — do not use teleconsultation.
              </li>
              <li>Follow up in person when your clinician advises examination or procedures.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Doctor responsibilities
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Verify patient identity to a reasonable standard before clinical advice.</li>
              <li>Exercise professional judgment on whether teleconsultation is appropriate.</li>
              <li>
                Decline or stop teleconsultation when examination or emergency care is needed.
              </li>
              <li>Issue prescriptions only when legally permitted and clinically justified.</li>
              <li>Maintain confidential consultation records per professional standards.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Consent</h2>
            <p>
              Before booking, you must accept our telemedicine consent, acknowledging limitations,
              possible need for in-person care, secure record-keeping, and your right to withdraw
              from teleconsultation. Consent is timestamped when you submit a booking request.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Prescription policy
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Only registered medical practitioners may issue prescriptions.</li>
              <li>Prescriptions are digitally signed where applicable.</li>
              <li>Some medicines cannot legally be prescribed via teleconsultation.</li>
              <li>
                Your doctor may decline to prescribe if history or examination is insufficient.
              </li>
              <li>Physiotherapy sessions do not include independent medication prescribing.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Privacy and data storage
            </h2>
            <p>
              Health information you share is handled confidentially by the practice, not published
              on this website. See our{" "}
              <Link to={ROUTES.privacyPolicy} className="text-primary underline underline-offset-4">
                Privacy policy
              </Link>{" "}
              for medical records, retention, access, and deletion requests.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Fees, payment, and refunds
            </h2>
            <p>
              Consultation fees are confirmed at booking via WhatsApp or email. Payment modes depend
              on your location and visit type. Refunds follow our{" "}
              <Link to={ROUTES.refundPolicy} className="text-primary underline underline-offset-4">
                Refund policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">
              Technology requirements
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Stable internet for video or audio consults.</li>
              <li>WhatsApp or email for booking and document sharing.</li>
              <li>Camera and microphone for video visits when requested.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-2">Invoices</h2>
            <p>
              Paid consultations receive an invoice including doctor name, registration number,
              patient name, date, consultation type, amount paid, and invoice number when
              applicable.
            </p>
          </section>

          <p>
            Related:{" "}
            <Link
              to={ROUTES.medicalDisclaimer}
              className="text-primary underline underline-offset-4"
            >
              Medical disclaimer
            </Link>
            ,{" "}
            <Link to={ROUTES.faq} className="text-primary underline underline-offset-4">
              FAQ
            </Link>
            ,{" "}
            <Link to={ROUTES.termsOfService} className="text-primary underline underline-offset-4">
              Terms of service
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
