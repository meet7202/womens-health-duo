import { cn } from "@/lib/utils";
import { TELEMEDICINE_CAN_HELP, TELEMEDICINE_IN_PERSON_REQUIRED } from "@/data/telemedicineScope";

type TelemedicineLimitationsProps = {
  className?: string;
};

/** Explains when teleconsultation is appropriate vs when in-person care is required. */
export function TelemedicineLimitations({ className }: TelemedicineLimitationsProps) {
  return (
    <section
      className={cn("grid gap-8 md:grid-cols-2", className)}
      aria-labelledby="telemedicine-limitations-heading"
    >
      <h2 id="telemedicine-limitations-heading" className="sr-only">
        Teleconsultation scope and limits
      </h2>
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
          What teleconsultation can help with
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          {TELEMEDICINE_CAN_HELP.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-6 dark:border-amber-900 dark:bg-amber-950/30">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
          When an in-person visit is required
        </h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
          {TELEMEDICINE_IN_PERSON_REQUIRED.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
