import { Link } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { CONTACT, SITE_URL } from "@/config/site";
import { ROUTES } from "@/config/routes";
import { DOCTOR_BY_SLUG, type DoctorSlug } from "@/data/doctorProfiles";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { InclusiveSeoListFootnote } from "@/components/seo/InclusiveSeoListFootnote";
import {
  PRACTICE_CHARMI_LOCATIONS_LINE,
  PRACTICE_ZALAK_LOCATIONS_LINE,
} from "@/config/practiceLocations";
import { BRAND_ENTITY_LINE } from "@/config/brandLine";
import drCharmi from "@/assets/dr-charmi.jpeg";
import drZalak from "@/assets/dr-zalak.jpg";

const IMAGES: Record<DoctorSlug, { src: string; width: number; height: number; alt: string }> = {
  charmi: { src: drCharmi, width: 849, height: 1024, alt: "Dr. Charmi Shah — portrait" },
  zalak: { src: drZalak, width: 479, height: 563, alt: "Dr. Zalak Shah — portrait" },
};

const PHYSICIAN_IDS: Record<DoctorSlug, string> = {
  charmi: `${SITE_URL}/#physician-charmi`,
  zalak: `${SITE_URL}/#physician-zalak`,
};

type DoctorProfilePageProps = {
  slug: DoctorSlug;
};

export function DoctorProfilePage({ slug }: DoctorProfilePageProps) {
  const d = DOCTOR_BY_SLUG[slug];
  const img = IMAGES[slug];
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: d.name, path: d.path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path: d.path,
      name: d.metaTitle,
      description: d.metaDescription,
      aboutId: PHYSICIAN_IDS[slug],
    }),
  ];

  const cityLinks =
    slug === "charmi"
      ? [
          { to: ROUTES.ahmedabad, label: "Ahmedabad" },
          { to: ROUTES.mumbai, label: "Mumbai" },
        ]
      : [
          { to: ROUTES.ahmedabad, label: "Ahmedabad" },
          { to: ROUTES.bangalore, label: "Bangalore" },
        ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={d.metaTitle} metaDescription={d.metaDescription} path={d.path} />
      <JsonLdGraph graph={graph} />

      <article>
        <p className="text-sm font-medium uppercase tracking-wide text-primary mb-2">Profile</p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-2">
          {d.name}
        </h1>
        <p className="text-lg text-primary font-medium mb-1">{d.jobTitle}</p>
        <p className="text-sm text-muted-foreground mb-8">{d.credentials}</p>
        <p className="text-sm text-foreground/90 border-l-2 border-primary/35 pl-3 mb-8 max-w-2xl">
          {BRAND_ENTITY_LINE}
        </p>

        <div className="float-none sm:float-right sm:ml-8 sm:mb-4 w-full max-w-[220px] mx-auto sm:mx-0">
          <img
            src={img.src}
            alt={img.alt}
            width={img.width}
            height={img.height}
            className="rounded-2xl object-cover object-top shadow-card w-full aspect-[4/5]"
            loading="eager"
            decoding="async"
          />
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
            ? "Online (worldwide) & in person (Mumbai, Ahmedabad)"
            : "Online (worldwide) & in person (Bangalore, Ahmedabad)"}
        </h2>
        <p className="text-muted-foreground mb-3">
          <strong className="text-foreground">Online is the default for global patients:</strong>{" "}
          book the same clinicians by WhatsApp or email from any country.{" "}
          {slug === "charmi" ? PRACTICE_CHARMI_LOCATIONS_LINE : PRACTICE_ZALAK_LOCATIONS_LINE} See{" "}
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

        <DirectoryPresence />
      </article>
    </PageShell>
  );
}
