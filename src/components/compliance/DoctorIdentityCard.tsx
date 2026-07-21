import { DOCTOR_BY_SLUG, type DoctorSlug } from "@/data/doctorProfiles";
import { doctorRegistrationLine } from "@/config/doctorRegistration";
import { DOCTOR_PHOTOS } from "@/config/doctorPhotos";
import { cn } from "@/lib/utils";
import { AppLink as Link } from "@/components/router/AppLink";

const PHOTOS: Record<DoctorSlug, string> = {
  charmi: DOCTOR_PHOTOS.charmi.displaySrc,
  zalak: DOCTOR_PHOTOS.zalak.displaySrc,
};

type DoctorIdentityCardProps = {
  slug: DoctorSlug;
  className?: string;
  compact?: boolean;
};

/** Doctor identity block with registration number — required on booking-related pages. */
export function DoctorIdentityCard({ slug, compact, className }: DoctorIdentityCardProps) {
  const d = DOCTOR_BY_SLUG[slug];
  const regLine = doctorRegistrationLine(slug);

  return (
    <article
      className={cn(
        "rounded-2xl border border-border/50 bg-card p-4 shadow-soft",
        compact ? "flex gap-4 items-start" : "sm:flex sm:gap-6",
        className,
      )}
    >
      <picture>
        <source
          type="image/webp"
          srcSet={DOCTOR_PHOTOS[slug].srcSetWebp}
          sizes={compact ? "72px" : "120px"}
        />
        <source
          type="image/jpeg"
          srcSet={DOCTOR_PHOTOS[slug].srcSetJpeg}
          sizes={compact ? "72px" : "120px"}
        />
        <img
          src={PHOTOS[slug]}
          alt={DOCTOR_PHOTOS[slug].alt}
          title={DOCTOR_PHOTOS[slug].title}
          width={compact ? 72 : 120}
          height={compact ? 90 : 150}
          className={cn(
            "rounded-xl object-cover object-top shrink-0",
            compact ? "w-[72px] h-[90px]" : "w-[120px] h-[150px]",
          )}
          loading="lazy"
          decoding="async"
        />
      </picture>
      <div className="min-w-0 flex-1">
        <p className="font-heading text-lg font-semibold text-foreground">{d.name}</p>
        <p className="text-sm text-primary font-medium mt-0.5">{d.jobTitle}</p>
        <p className="text-sm text-muted-foreground mt-1">{d.credentials}</p>
        <p className="text-sm font-medium text-foreground mt-2">
          <span className="text-muted-foreground font-normal">Registration: </span>
          {regLine}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Experience: {d.registration.yearsExperience}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Clinics: {d.cities.join(", ")} · virtual worldwide
        </p>
        {!compact && (
          <Link
            to={d.path}
            className="inline-block mt-3 text-sm text-primary underline underline-offset-4"
          >
            Full profile
          </Link>
        )}
      </div>
    </article>
  );
}
