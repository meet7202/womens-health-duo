import { CalendarCheck, Globe, MessageCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { EmergencyDisclaimer } from "@/components/compliance/EmergencyDisclaimer";
import type { InternationalService } from "@/data/internationalServices/types";
import { internationalServicePath } from "@/data/internationalServices/internationalServiceRegistry";
import { AppLink as Link } from "@/components/router/AppLink";

export const HOW_IT_WORKS_STEPS = [
  {
    icon: MessageCircle,
    title: "Message on WhatsApp",
    body: "Share your country, time zone, and main concern — or use Book consultation for structured intake and telemedicine consent.",
  },
  {
    icon: CalendarCheck,
    title: "Send records in chat",
    body: "Attach labs, ultrasound summaries, or prior notes when we ask. No file upload on the website — share in WhatsApp.",
  },
  {
    icon: Video,
    title: "Video consult",
    body: "Meet at a scheduled time by secure video. Prescriptions and next steps follow India telemedicine guidelines where applicable.",
  },
  {
    icon: Globe,
    title: "Follow-up worldwide",
    body: "Progress checks and exercise cues can continue on WhatsApp across time zones — always with local emergency care for urgent symptoms.",
  },
] as const;

type InternationalWhatsappButtonProps = {
  message: string;
  label?: string;
  className?: string;
};

export function InternationalWhatsappButton({
  message,
  label = "Book on WhatsApp",
  className,
}: InternationalWhatsappButtonProps) {
  return (
    <Button
      asChild
      size="lg"
      className={`bg-[#25D366] hover:bg-[#1ebe57] text-white border-0 shadow-lg ${className ?? ""}`}
    >
      <a href={whatsappUrlWithMessage(message)} target="_blank" rel="noopener noreferrer">
        <span className="inline-flex items-center gap-2">
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
          {label}
        </span>
      </a>
    </Button>
  );
}

export function InternationalBookConsultationLink({ className }: { className?: string }) {
  return (
    <Button variant="outline" size="lg" asChild className={className}>
      <Link to={ROUTES.bookConsultation}>Book consultation (with consent)</Link>
    </Button>
  );
}

export function InternationalCtaBlock({
  whatsappMessage,
  className,
}: {
  whatsappMessage: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 space-y-4 ${className ?? ""}`}
    >
      <EmergencyDisclaimer />
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
        <InternationalWhatsappButton message={whatsappMessage} />
        <InternationalBookConsultationLink />
      </div>
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section className="mb-10" aria-labelledby="intl-how-heading">
      <h2
        id="intl-how-heading"
        className="font-heading text-2xl font-semibold text-foreground mb-4"
      >
        How international booking works
      </h2>
      <ol className="grid gap-4 sm:grid-cols-2">
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <li
            key={step.title}
            className="rounded-xl border border-border/60 bg-card p-4 shadow-soft list-none"
          >
            <div className="flex gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                {i + 1}
              </span>
              <div>
                <h3 className="font-heading font-semibold text-foreground flex items-center gap-2">
                  <step.icon className="h-4 w-4 text-primary shrink-0" aria-hidden />
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ServiceCardList({
  services,
  heading = "International services",
}: {
  services: readonly InternationalService[];
  heading?: string;
}) {
  return (
    <section className="mb-10" aria-labelledby="intl-services-heading">
      <h2
        id="intl-services-heading"
        className="font-heading text-2xl font-semibold text-foreground mb-4"
      >
        {heading}
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              to={internationalServicePath(s.slug)}
              className="block rounded-xl border border-border/60 bg-card p-4 shadow-soft hover:border-primary/40 hover:bg-primary/5 transition-colors h-full"
            >
              <span className="font-heading font-semibold text-foreground">{s.title}</span>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{s.metaDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ScopeSection({
  canHelp,
  notFor,
}: {
  canHelp: readonly string[];
  notFor: readonly string[];
}) {
  return (
    <section className="mb-10 grid gap-6 sm:grid-cols-2" aria-labelledby="intl-scope-heading">
      <div>
        <h2
          id="intl-scope-heading"
          className="font-heading text-xl font-semibold text-foreground mb-3"
        >
          What we can help with online
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm leading-relaxed">
          {canHelp.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
          Not for teleconsultation
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground text-sm leading-relaxed">
          {notFor.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
