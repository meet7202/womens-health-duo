import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { EmergencyDisclaimer } from "@/components/compliance/EmergencyDisclaimer";
import { TelemedicineLimitations } from "@/components/compliance/TelemedicineLimitations";
import { TelemedicineTrustBadges } from "@/components/compliance/TelemedicineTrustBadges";
import { BookingMedicalDisclaimer } from "@/components/compliance/BookingMedicalDisclaimer";
import { cn } from "@/lib/utils";
import { AppLink as Link } from "@/components/router/AppLink";

type TelemedicineComplianceBlockProps = {
  className?: string;
  showLimitations?: boolean;
};

/** Shared compliance strip for teleconsultation and booking surfaces. */
export function TelemedicineComplianceBlock({
  className,
  showLimitations = true,
}: TelemedicineComplianceBlockProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <EmergencyDisclaimer />
      <div className="flex flex-wrap items-center gap-3">
        <Button asChild size="sm">
          <Link to={ROUTES.bookConsultation}>Book teleconsultation</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link to={ROUTES.telemedicinePolicy}>Telemedicine policy</Link>
        </Button>
      </div>
      <TelemedicineTrustBadges />
      {showLimitations && <TelemedicineLimitations />}
      <BookingMedicalDisclaimer />
    </div>
  );
}
