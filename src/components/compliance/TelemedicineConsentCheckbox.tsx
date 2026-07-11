import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";
import { AppLink as Link } from "@/components/router/AppLink";

type TelemedicineConsentCheckboxProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  className?: string;
  error?: boolean;
};

/** Mandatory telemedicine consent per India's Telemedicine Practice Guidelines. */
export function TelemedicineConsentCheckbox({
  checked,
  onCheckedChange,
  id = "telemedicine-consent",
  className,
  error,
}: TelemedicineConsentCheckboxProps) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 space-y-3",
        error ? "border-red-500 bg-red-50/50" : "border-border/60 bg-muted/20",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          aria-required="true"
          aria-invalid={error || undefined}
          className="mt-1"
        />
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <Label htmlFor={id} className="font-medium text-foreground cursor-pointer">
            I understand and voluntarily consent to receive medical consultation through
            telemedicine. *
          </Label>
          <p>By checking this box, I acknowledge that:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Telemedicine has limitations and may not replace an in-person examination.</li>
            <li>A physical examination may be required for accurate diagnosis or treatment.</li>
            <li>
              The doctor may refuse or discontinue a teleconsultation if it is not clinically
              appropriate.
            </li>
            <li>I may be referred for urgent or routine in-person care when needed.</li>
            <li>
              Consultation records will be stored securely per our privacy and telemedicine
              policies.
            </li>
          </ul>
          <p>
            Read our{" "}
            <Link
              to={ROUTES.telemedicinePolicy}
              className="text-primary underline underline-offset-4"
            >
              Telemedicine policy
            </Link>{" "}
            and{" "}
            <Link to={ROUTES.privacyPolicy} className="text-primary underline underline-offset-4">
              Privacy policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
