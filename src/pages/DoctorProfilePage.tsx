import { MessageCircle } from "lucide-react";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { CONTACT, SITE_URL } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { whatsappMessageDoctorProfile, whatsappUrlWithMessage } from "@/lib/whatsappCta";
import { DOCTOR_BY_SLUG, type DoctorSlug } from "@/data/doctorProfiles";
import { doctorDocumentTitle } from "@/lib/pageSeoCopy";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { InclusiveSeoListFootnote } from "@/components/seo/InclusiveSeoListFootnote";
import {
  PRACTICE_CHARMI_IN_PERSON,
  PRACTICE_CHARMI_LOCATIONS_LINE,
  PRACTICE_ZALAK_LOCATIONS_LINE,
} from "@/config/practiceLocations";
import { BRAND_ENTITY_LINE } from "@/config/brandLine";
import { doctorRegistrationLine } from "@/config/doctorRegistration";
import { EmergencyDisclaimer } from "@/components/compliance/EmergencyDisclaimer";
import { TelemedicineTrustBadges } from "@/components/compliance/TelemedicineTrustBadges";
import { BookingMedicalDisclaimer } from "@/components/compliance/BookingMedicalDisclaimer";
import { DOCTOR_PHOTOS } from "@/config/doctorPhotos";
import { AppLink as Link } from "@/components/router/AppLink";

const IMAGES: Record<
  DoctorSlug,
  {
    src: string;
    width: number;
    height: number;
    alt: string;
    title: string;
    srcSetJpeg: string;
    srcSetWebp: string;
  }
> = {
  charmi: {
    src: DOCTOR_PHOTOS.charmi.displaySrc,
    width: DOCTOR_PHOTOS.charmi.width,
    height: DOCTOR_PHOTOS.charmi.height,
    alt: DOCTOR_PHOTOS.charmi.alt,
    title: DOCTOR_PHOTOS.charmi.title,
    srcSetJpeg: DOCTOR_PHOTOS.charmi.srcSetJpeg,
    srcSetWebp: DOCTOR_PHOTOS.charmi.srcSetWebp,
  },
  zalak: {
    src: DOCTOR_PHOTOS.zalak.displaySrc,
    width: DOCTOR_PHOTOS.zalak.width,
    height: DOCTOR_PHOTOS.zalak.height,
    alt: DOCTOR_PHOTOS.zalak.alt,
    title: DOCTOR_PHOTOS.zalak.title,
    srcSetJpeg: DOCTOR_PHOTOS.zalak.srcSetJpeg,
    srcSetWebp: DOCTOR_PHOTOS.zalak.srcSetWebp,
  },
};

const PHYSICIAN_IDS: Record<DoctorSlug, string> = {
  charmi: `${githubPagesAbsoluteUrl(SITE_URL, "/")}#physician-charmi`,
  zalak: `${githubPagesAbsoluteUrl(SITE_URL, "/")}#physician-zalak`,
};

type DoctorProfilePageProps = {
  slug: DoctorSlug;
};

export function DoctorProfilePage({ slug }: DoctorProfilePageProps) {
  const d = DOCTOR_BY_SLUG[slug];
  const docTitle = doctorDocumentTitle(
    d.name,
    slug === "charmi" ? "OB-GYN, IVF & laparoscopy" : "Women's health physio & Pilates",
  );
  const img = IMAGES[slug];
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: d.name, path: d.path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path: d.path,
      name: docTitle,
      description: d.metaDescription,
      aboutId: PHYSICIAN_IDS[slug],
    }),
  ];

  const cityLinks =
    slug === "charmi"
      ? [
          { to: ROUTES.ahmedabad, label: "Ahmedabad" },
          { to: ROUTES.mumbai, label: "Mumbai" },
          { to: ROUTES.valsad, label: "Valsad" },
        ]
      : [
          { to: ROUTES.ahmedabad, label: "Ahmedabad" },
          { to: ROUTES.bangalore, label: "Bangalore" },
        ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={docTitle} metaDescription={d.metaDescription} path={d.path} />
      <JsonLdGraph graph={graph} />

      <article>
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">Profile</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-2">
          {d.name}
        </h1>
        <p className="text-lg text-primary font-medium mb-1">{d.jobTitle}</p>
        <p className="text-sm text-muted-foreground mb-1">{d.credentials}</p>
        <p className="text-sm font-medium text-foreground mb-1">
          {doctorRegistrationLine(slug)} · {d.registration.yearsExperience} clinical experience
        </p>
        <TelemedicineTrustBadges className="mb-4" />
        <p className="text-sm text-foreground/90 border-l-2 border-primary/35 pl-3 mb-8 max-w-2xl">
          {BRAND_ENTITY_LINE}
        </p>

        <div className="float-none sm:float-right sm:ml-8 sm:mb-4 w-full max-w-[220px] mx-auto sm:mx-0">
          <picture>
            <source type="image/webp" srcSet={img.srcSetWebp} sizes="220px" />
            <source type="image/jpeg" srcSet={img.srcSetJpeg} sizes="220px" />
            <img
              src={img.src}
              alt={img.alt}
              title={img.title}
              width={img.width}
              height={img.height}
              className="rounded-2xl object-cover object-top shadow-card w-full aspect-[4/5]"
              loading="eager"
              decoding="async"
            />
          </picture>
        </div>

        <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
          {d.overview.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <h2 className="font-heading text-xl font-semibold text-foreground clear-both sm:clear-none mt-10 mb-3">
          Specialties and focus areas
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-10">
          {d.specialties.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>

        <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
          {slug === "charmi"
            ? `Online (worldwide) & in person (${PRACTICE_CHARMI_IN_PERSON})`
            : "Online (worldwide) & in person (Bangalore, Ahmedabad)"}
        </h2>
        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">Online is the default for global patients:</strong>{" "}
          book the same clinicians by WhatsApp or email from any country.{" "}
          {slug === "charmi" ? PRACTICE_CHARMI_LOCATIONS_LINE : PRACTICE_ZALAK_LOCATIONS_LINE} See{" "}
          <Link
            to={ROUTES.internationalConsultation}
            className="text-primary underline underline-offset-4"
          >
            international consultation services
          </Link>
          ,{" "}
          <Link
            to={ROUTES.onlineConsultation}
            className="text-primary underline underline-offset-4"
          >
            virtual online consultation city pages
          </Link>{" "}
          for NRIs in major metros, or the{" "}
          <Link to={ROUTES.faq} className="text-primary underline underline-offset-4">
            FAQ
          </Link>
          .
        </p>
        <ul className="flex flex-wrap gap-2 mb-10">
          {cityLinks.map((c) => (
            <li key={c.to}>
              <Button variant="secondary" size="sm" asChild>
                <Link to={c.to}>{c.label}</Link>
              </Button>
            </li>
          ))}
        </ul>
        <InclusiveSeoListFootnote variant="cities" className="mb-10" />

        <h2 className="font-heading text-xl font-semibold text-foreground mb-3">
          Official profiles & verification links
        </h2>
        <ul className="space-y-2 mb-10">
          {d.external.map((x) => (
            <li key={x.href}>
              <a
                href={x.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4"
              >
                {x.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="space-y-6 mb-12">
          <p className="text-sm text-muted-foreground">
            Educational videos and reels:{" "}
            <a
              href={CONTACT.youtube}
              className="text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube
            </a>{" "}
            ·{" "}
            <a
              href={CONTACT.instagram}
              className="text-primary underline underline-offset-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            ·{" "}
            <Link to={ROUTES.learn} className="text-primary underline underline-offset-4">
              Learn
            </Link>
          </p>
          <p className="text-sm text-muted-foreground">
            Other doctor:{" "}
            <Link
              to={slug === "charmi" ? ROUTES.drZalak : ROUTES.drCharmi}
              className="text-primary underline underline-offset-4"
            >
              {slug === "charmi" ? DOCTOR_BY_SLUG.zalak.name : DOCTOR_BY_SLUG.charmi.name}
            </Link>
          </p>
        </div>

        <section
          className="clear-both rounded-2xl border border-border/50 bg-card p-6 sm:p-8 shadow-card mb-12"
          aria-labelledby="doctor-profile-cta-heading"
        >
          <EmergencyDisclaimer className="mb-6" />
          <h2
            id="doctor-profile-cta-heading"
            className="font-heading text-xl font-semibold text-foreground mb-2"
          >
            Consult us
          </h2>
          <p className="text-sm text-muted-foreground mb-2 max-w-xl">
            To book with {d.name}, use our structured{" "}
            <Link
              to={ROUTES.bookConsultation}
              className="text-primary underline underline-offset-4"
            >
              Book consultation
            </Link>{" "}
            form (includes telemedicine consent) or WhatsApp for quick messages.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button size="lg" variant="default" asChild className="min-h-[3rem]">
              <Link to={ROUTES.bookConsultation}>Book consultation</Link>
            </Button>
            <Button
              size="lg"
              asChild
              className="bg-[#25D366] hover:bg-[#1ebe57] text-white border-0 shadow-sm min-h-[3rem]"
            >
              <a
                href={whatsappUrlWithMessage(whatsappMessageDoctorProfile(d.name, d.path))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
                  WhatsApp
                </span>
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="min-h-[3rem]">
              <Link to={ROUTES.homeContact}>Contact</Link>
            </Button>
          </div>
          <BookingMedicalDisclaimer className="mt-6" />
        </section>

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
