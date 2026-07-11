import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils";

type BookingMedicalDisclaimerProps = {
  className?: string;
};

/** Short disclaimer shown on booking and teleconsultation pages. */
export function BookingMedicalDisclaimer({ className }: BookingMedicalDisclaimerProps) {
  return (
    <p
      className={cn(
        "text-xs text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-3",
        className,
      )}
    >
      The information on this website is for education and does not replace professional medical
      advice. Teleconsultation is subject to clinical appropriateness. Your clinician may advise
      in-person care whenever necessary. See our{" "}
      <Link to={ROUTES.medicalDisclaimer} className="text-primary underline underline-offset-4">
        Medical disclaimer
      </Link>{" "}
      and{" "}
      <Link to={ROUTES.telemedicinePolicy} className="text-primary underline underline-offset-4">
        Telemedicine policy
      </Link>
      .
    </p>
  );
}
