import { ShieldCheck, ClipboardCheck, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Honest trust signals only — no unverified “encrypted / secure / verified” claims (SEO-18).
 * Registration numbers are shown on doctor profiles and the booking identity card; consent + intake
 * are required on `/book-consultation`.
 */
const BADGES = [
  { icon: UserCheck, label: "Registered practitioners" },
  { icon: ShieldCheck, label: "Registration numbers on profiles & booking" },
  { icon: ClipboardCheck, label: "Consent & intake before booking" },
] as const;

type TelemedicineTrustBadgesProps = {
  className?: string;
};

/** Trust signals for telehealth pages — factual practice disclosures only. */
export function TelemedicineTrustBadges({ className }: TelemedicineTrustBadgesProps) {
  return (
    <ul
      className={cn("flex flex-wrap gap-3", className)}
      aria-label="Telemedicine practice disclosures"
    >
      {BADGES.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <Icon className="h-3.5 w-3.5 text-primary shrink-0" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}
