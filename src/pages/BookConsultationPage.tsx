import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { BOOKING_DOCUMENT_TITLE, BOOKING_H1 } from "@/lib/pageSeoCopy";
import { EmergencyDisclaimer } from "@/components/compliance/EmergencyDisclaimer";
import { TelemedicineLimitations } from "@/components/compliance/TelemedicineLimitations";
import { TelemedicineTrustBadges } from "@/components/compliance/TelemedicineTrustBadges";
import { BookingMedicalDisclaimer } from "@/components/compliance/BookingMedicalDisclaimer";
import { DoctorIdentityCard } from "@/components/compliance/DoctorIdentityCard";
import { TelemedicineConsentCheckbox } from "@/components/compliance/TelemedicineConsentCheckbox";
import { recordTelemedicineConsentTimestamp } from "@/lib/telemedicineBooking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { DOCTOR_BY_SLUG, type DoctorSlug } from "@/data/doctorProfiles";
import {
  BOOKING_STEPS,
  defaultBookingFormData,
  openBookingWhatsApp,
  validateBookingStep,
  type BookingFormData,
  type ConsultationMode,
  type ConsultationVisitType,
} from "@/lib/telemedicineBooking";
import { cn } from "@/lib/utils";

const TITLE = BOOKING_DOCUMENT_TITLE;
const H1 = BOOKING_H1;
const DESCRIPTION =
  "Book a teleconsultation with Dr. Charmi Shah (OB-GYN) or Dr. Zalak Shah (women's health physio). Complete patient details, medical history, and mandatory telemedicine consent before confirming via WhatsApp.";

export function BookConsultationPage() {
  const path = ROUTES.bookConsultation;
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Book consultation", path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({ path, name: TITLE, description: DESCRIPTION }),
  ];

  const [step, setStep] = useState(0);
  const [data, setData] = useState<BookingFormData>(defaultBookingFormData);
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentError, setConsentError] = useState(false);

  const progress = useMemo(() => ((step + 1) / BOOKING_STEPS.length) * 100, [step]);

  const patch = useCallback((partial: Partial<BookingFormData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const goNext = () => {
    const err = validateBookingStep(step, data);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep((s) => Math.min(s + 1, BOOKING_STEPS.length - 1));
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  };

  const acceptConsent = () => {
    if (!consentChecked) {
      setConsentError(true);
      setError("Telemedicine consent is required to continue.");
      return;
    }
    const ts = recordTelemedicineConsentTimestamp();
    patch({ consentTimestamp: ts });
    setConsentError(false);
    setError(null);
    setStep(5);
  };

  const submitBooking = () => {
    const err = validateBookingStep(4, data);
    if (err) {
      setError(err);
      setStep(4);
      return;
    }
    openBookingWhatsApp(data);
  };

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={DESCRIPTION} path={path} />
      <JsonLdGraph graph={graph} />

      <article className="max-w-3xl">
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-3">
          {H1}
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-6">{DESCRIPTION}</p>

        <EmergencyDisclaimer className="mb-6" />
        <TelemedicineTrustBadges className="mb-6" />

        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              Step {step + 1} of {BOOKING_STEPS.length}: {BOOKING_STEPS[step]}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" aria-label="Booking progress" />
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8 shadow-card mb-8">
          {step === 0 && (
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Select the clinician you wish to consult. Registration numbers are shown on each
                card.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {(Object.keys(DOCTOR_BY_SLUG) as DoctorSlug[]).map((slug) => (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => patch({ doctor: slug })}
                    className={cn(
                      "text-left rounded-2xl transition ring-2 ring-offset-2 ring-offset-background",
                      data.doctor === slug
                        ? "ring-primary"
                        : "ring-transparent hover:ring-primary/30",
                    )}
                  >
                    <DoctorIdentityCard slug={slug} compact />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <fieldset>
                <legend className="font-heading text-lg font-semibold text-foreground mb-3">
                  Consultation mode
                </legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {(
                    [
                      ["video", "Video"],
                      ["audio", "Audio"],
                      ["chat", "Chat (WhatsApp)"],
                    ] as const
                  ).map(([value, label]) => (
                    <label
                      key={value}
                      className={cn(
                        "flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition",
                        data.consultationMode === value
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border/60 hover:border-primary/40",
                      )}
                    >
                      <input
                        type="radio"
                        name="consultationMode"
                        value={value}
                        checked={data.consultationMode === value}
                        onChange={() => patch({ consultationMode: value as ConsultationMode })}
                        className="sr-only"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-heading text-lg font-semibold text-foreground mb-3">
                  Visit type
                </legend>
                <div className="space-y-3">
                  <label className="flex gap-3 rounded-xl border border-border/60 p-4 cursor-pointer hover:border-primary/40">
                    <input
                      type="radio"
                      name="visitType"
                      checked={data.visitType === "first"}
                      onChange={() => patch({ visitType: "first" as ConsultationVisitType })}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <span className="font-medium text-foreground">First consultation</span>
                      <p className="text-muted-foreground mt-1">
                        New patient, different condition, or more than six months since your last
                        consultation with this doctor for this concern.
                      </p>
                    </div>
                  </label>
                  <label className="flex gap-3 rounded-xl border border-border/60 p-4 cursor-pointer hover:border-primary/40">
                    <input
                      type="radio"
                      name="visitType"
                      checked={data.visitType === "follow-up"}
                      onChange={() => patch({ visitType: "follow-up" as ConsultationVisitType })}
                      className="mt-1"
                    />
                    <div className="text-sm">
                      <span className="font-medium text-foreground">Follow-up consultation</span>
                      <p className="text-muted-foreground mt-1">
                        Same doctor, same condition, within six months of your previous visit.
                      </p>
                    </div>
                  </label>
                </div>
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="fullName">Full name *</Label>
                <Input
                  id="fullName"
                  value={data.fullName}
                  onChange={(e) => patch({ fullName: e.target.value })}
                  required
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageOrDob">Age or date of birth *</Label>
                <Input
                  id="ageOrDob"
                  value={data.ageOrDob}
                  onChange={(e) => patch({ ageOrDob: e.target.value })}
                  placeholder="e.g. 32 or 1992-03-15"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Input
                  id="gender"
                  value={data.gender}
                  onChange={(e) => patch({ gender: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={data.phone}
                  onChange={(e) => patch({ phone: e.target.value })}
                  required
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.email}
                  onChange={(e) => patch({ email: e.target.value })}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="address">Complete address *</Label>
                <Textarea
                  id="address"
                  value={data.address}
                  onChange={(e) => patch({ address: e.target.value })}
                  rows={2}
                  required
                  autoComplete="street-address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Input
                  id="country"
                  value={data.country}
                  onChange={(e) => patch({ country: e.target.value })}
                  required
                  autoComplete="country-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency contact (optional)</Label>
                <Input
                  id="emergencyContact"
                  value={data.emergencyContact}
                  onChange={(e) => patch({ emergencyContact: e.target.value })}
                  placeholder="Name and phone"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="chiefComplaint">Chief complaint *</Label>
                <Textarea
                  id="chiefComplaint"
                  value={data.chiefComplaint}
                  onChange={(e) => patch({ chiefComplaint: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="symptomDuration">Duration</Label>
                  <Input
                    id="symptomDuration"
                    value={data.symptomDuration}
                    onChange={(e) => patch({ symptomDuration: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Input
                    id="severity"
                    value={data.severity}
                    onChange={(e) => patch({ severity: e.target.value })}
                    placeholder="Mild / moderate / severe"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="currentMedications">Current medications</Label>
                <Textarea
                  id="currentMedications"
                  value={data.currentMedications}
                  onChange={(e) => patch({ currentMedications: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  value={data.allergies}
                  onChange={(e) => patch({ allergies: e.target.value })}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="previousDiagnosis">Previous diagnosis</Label>
                  <Input
                    id="previousDiagnosis"
                    value={data.previousDiagnosis}
                    onChange={(e) => patch({ previousDiagnosis: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="previousSurgeries">Previous surgeries</Label>
                  <Input
                    id="previousSurgeries"
                    value={data.previousSurgeries}
                    onChange={(e) => patch({ previousSurgeries: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pregnancyStatus">Pregnancy status</Label>
                  <Input
                    id="pregnancyStatus"
                    value={data.pregnancyStatus}
                    onChange={(e) => patch({ pregnancyStatus: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breastfeeding">Breastfeeding</Label>
                  <Input
                    id="breastfeeding"
                    value={data.breastfeeding}
                    onChange={(e) => patch({ breastfeeding: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={data.height}
                    onChange={(e) => patch({ height: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight</Label>
                  <Input
                    id="weight"
                    value={data.weight}
                    onChange={(e) => patch({ weight: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodPressure">Blood pressure (if known)</Label>
                  <Input
                    id="bloodPressure"
                    value={data.bloodPressure}
                    onChange={(e) => patch({ bloodPressure: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodSugar">Blood sugar (if known)</Label>
                  <Input
                    id="bloodSugar"
                    value={data.bloodSugar}
                    onChange={(e) => patch({ bloodSugar: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="familyHistory">Family history</Label>
                <Textarea
                  id="familyHistory"
                  value={data.familyHistory}
                  onChange={(e) => patch({ familyHistory: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recentInvestigations">Recent investigations</Label>
                <Textarea
                  id="recentInvestigations"
                  value={data.recentInvestigations}
                  onChange={(e) => patch({ recentInvestigations: e.target.value })}
                  rows={2}
                />
              </div>

              <p className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground leading-relaxed">
                Have lab reports, imaging, or prior prescriptions? After the booking message opens
                in WhatsApp, please attach PDFs or photos in that chat (or email the practice).
                Government ID may be requested by the clinic when needed.
              </p>
            </div>
          )}

          {step === 4 && (
            <TelemedicineConsentCheckbox
              checked={consentChecked}
              onCheckedChange={setConsentChecked}
              error={consentError}
            />
          )}

          {step === 5 && (
            <div className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                Review your details. The next step opens WhatsApp with a structured booking message.
                Payment and slot confirmation happen in chat with the practice. Attach any reports
                or documents directly in that WhatsApp chat.
              </p>
              {data.doctor && <DoctorIdentityCard slug={data.doctor} compact />}
              <dl className="grid gap-2 rounded-xl bg-muted/30 p-4">
                <div>
                  <dt className="text-muted-foreground">Patient</dt>
                  <dd className="font-medium text-foreground">{data.fullName}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Mode</dt>
                  <dd className="font-medium text-foreground capitalize">
                    {data.consultationMode}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Visit</dt>
                  <dd className="font-medium text-foreground capitalize">{data.visitType}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Consent at</dt>
                  <dd className="font-medium text-foreground">{data.consentTimestamp || "—"}</dd>
                </div>
              </dl>
              <p className="text-xs text-muted-foreground">
                Invoices include doctor name, registration number, patient name, date, consultation
                type, amount paid, and invoice number when applicable.
              </p>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-border/40">
            {step > 0 && (
              <Button type="button" variant="outline" onClick={goBack}>
                <ChevronLeft className="h-4 w-4 mr-1" aria-hidden />
                Back
              </Button>
            )}
            {step < 4 && (
              <Button type="button" onClick={goNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" aria-hidden />
              </Button>
            )}
            {step === 4 && (
              <Button type="button" onClick={acceptConsent}>
                Accept consent &amp; continue
                <ChevronRight className="h-4 w-4 ml-1" aria-hidden />
              </Button>
            )}
            {step === 5 && (
              <Button
                type="button"
                className="bg-[#25D366] hover:bg-[#1ebe57] text-white"
                onClick={submitBooking}
              >
                <MessageCircle className="h-4 w-4 mr-2" aria-hidden />
                Confirm &amp; open WhatsApp
              </Button>
            )}
          </div>
        </div>

        <TelemedicineLimitations className="mb-8" />
        <BookingMedicalDisclaimer className="mb-8" />

        <p className="text-sm text-muted-foreground">
          Prefer a shorter form? Use the{" "}
          <Link to={ROUTES.homeContact} className="text-primary underline underline-offset-4">
            contact section
          </Link>{" "}
          or read our{" "}
          <Link
            to={ROUTES.telemedicinePolicy}
            className="text-primary underline underline-offset-4"
          >
            Telemedicine policy
          </Link>
          .
        </p>

        <div className="mt-12">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
