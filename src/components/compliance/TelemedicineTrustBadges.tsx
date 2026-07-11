import { ShieldCheck, Lock, UserCheck, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

const BADGES = [
  { icon: UserCheck, label: "Registered practitioners" },
  { icon: ShieldCheck, label: "Registration verified" },
  { icon: Lock, label: "Encrypted consultation channels" },
  { icon: CreditCard, label: "Secure payment coordination" },
] as const;

type TelemedicineTrustBadgesProps = {
  className?: string;
};

/** Trust signals for telehealth pages — no false HIPAA certification claims. */
export function TelemedicineTrustBadges({ className }: TelemedicineTrustBadgesProps) {
  return (
    <ul
      className={cn("flex flex-wrap gap-3", className)}
      aria-label="Telemedicine trust and security highlights"
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
