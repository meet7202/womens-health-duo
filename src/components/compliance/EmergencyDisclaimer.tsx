import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type EmergencyDisclaimerProps = {
  className?: string;
};

/** Red emergency notice — required on all booking / teleconsultation pages. */
export function EmergencyDisclaimer({ className }: EmergencyDisclaimerProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-xl border-2 border-red-600 bg-red-50 px-4 py-4 text-red-900 dark:bg-red-950/40 dark:text-red-100 dark:border-red-500",
        className,
      )}
    >
      <div className="flex gap-3">
        <AlertTriangle
          className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400 mt-0.5"
          aria-hidden
        />
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-red-800 dark:text-red-200 mb-1">Medical emergency?</p>
          <p>
            If you are experiencing chest pain, severe bleeding, difficulty breathing, loss of
            consciousness, seizures, suicidal thoughts, or any medical emergency,{" "}
            <strong>do not book a teleconsultation</strong>. Immediately visit the nearest emergency
            department or call your local emergency medical services.
          </p>
        </div>
      </div>
    </div>
  );
}
