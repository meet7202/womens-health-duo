import { DOCTOR_PHOTOS } from "@/config/doctorPhotos";
import { DOCTOR_BY_SLUG, type DoctorSlug } from "@/data/doctorProfiles";
import { AppLink as Link } from "@/components/router/AppLink";

const DEFAULT_ORDER: readonly DoctorSlug[] = ["zalak", "charmi"];

type ContentAuthorsProps = {
  /** Clinician whose lane this topic belongs to (from the article plan). Not an authorship claim. */
  leadId?: DoctorSlug;
  /** Only pass reviewers after a recorded, approved clinical review. */
  reviewerIds?: readonly DoctorSlug[];
};

/** Names of one or more clinicians, linked to their profiles: "A", "A and B". */
export function DoctorNameList({ slugs }: { slugs: readonly DoctorSlug[] }) {
  return (
    <>
      {slugs.map((slug, i) => (
        <span key={slug}>
          {i > 0 ? (i === slugs.length - 1 ? " and " : ", ") : null}
          <DoctorLink slug={slug} />
        </span>
      ))}
    </>
  );
}

function DoctorLink({ slug }: { slug: DoctorSlug }) {
  return (
    <Link
      to={DOCTOR_BY_SLUG[slug].path}
      className="text-primary font-medium underline underline-offset-4"
    >
      {DOCTOR_BY_SLUG[slug].name}
    </Link>
  );
}

/**
 * Clinician block for articles, the Learn knowledge hub, and other educational pages.
 * Names link to the doctor profiles. Registration numbers stay off this block.
 * Authorship and medical review are never implied: review appears only when recorded.
 */
export function ContentAuthors({ leadId, reviewerIds }: ContentAuthorsProps = {}) {
  const order = leadId ? [leadId, ...DEFAULT_ORDER.filter((s) => s !== leadId)] : DEFAULT_ORDER;
  return (
    <section className="mb-10 mt-12" aria-labelledby="content-authors">
      <h2 id="content-authors" className="font-heading text-xl font-semibold text-foreground mb-2">
        Our clinicians
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {leadId ? (
          <>
            Care for this topic at Women&apos;s Health Duo is led by <DoctorLink slug={leadId} />
            .{" "}
          </>
        ) : null}
        {reviewerIds?.length ? (
          <>
            Medically reviewed by <DoctorNameList slugs={reviewerIds} />.{" "}
          </>
        ) : null}
        <DoctorLink slug="zalak" /> leads women&apos;s health physiotherapy and STOTT Pilates.{" "}
        <DoctorLink slug="charmi" /> leads obstetrics, gynaecology, IVF and laparoscopy.
      </p>
      <ul className="grid gap-3 sm:grid-cols-2">
        {order.map((slug) => {
          const doctor = DOCTOR_BY_SLUG[slug];
          const photo = DOCTOR_PHOTOS[slug];
          return (
            <li key={slug}>
              <Link
                to={doctor.path}
                className="flex h-full items-center gap-3 rounded-2xl border border-border/50 bg-card p-3 shadow-soft hover:border-primary/40"
              >
                <picture>
                  <source type="image/webp" srcSet={photo.srcSetWebp} sizes="64px" />
                  <source type="image/jpeg" srcSet={photo.srcSetJpeg} sizes="64px" />
                  <img
                    src={photo.displaySrc}
                    alt={photo.alt}
                    title={photo.title}
                    width={64}
                    height={80}
                    className="h-20 w-16 shrink-0 rounded-xl object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
                <span className="min-w-0">
                  <span className="block font-heading text-base font-semibold text-foreground">
                    {doctor.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-primary">{doctor.jobTitle}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
