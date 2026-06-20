import { Link, Navigate, useParams } from "react-router-dom";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { PageShell } from "@/components/layout/PageShell";
import { ROUTES } from "@/config/routes";
import {
  getVirtualConsultationCountryByPathSegment,
  virtualConsultationCityPath,
  virtualConsultationCountryPath,
} from "@/lib/virtualConsultation";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { InclusiveSeoListFootnote } from "@/components/seo/InclusiveSeoListFootnote";
import { Button } from "@/components/ui/button";
import { PRACTICE_BOTH_DOCTORS_IN_PERSON } from "@/config/practiceLocations";

function buildTitle(country: string) {
  return `Virtual online consultations — ${country} | Women's Health Duo`;
}

function buildDescription(country: string, cityCount: number) {
  return `Virtual OB-GYN, IVF discussion, laparoscopy consults, women's health physiotherapy, Mat Pilates online, and STOTT Pilates (Mat & Reformer) for patients in ${country}. ${cityCount} city overviews link to each type of online visit—book via WhatsApp or email. ${PRACTICE_BOTH_DOCTORS_IN_PERSON}`;
}

export function VirtualConsultationCountryPage() {
  const { countryCode: countryParam } = useParams<{ countryCode: string }>();
  const row = getVirtualConsultationCountryByPathSegment(countryParam);

  if (!countryParam || !row) {
    return <Navigate to={ROUTES.onlineConsultation} replace />;
  }

  if (countryParam.toLowerCase() !== row.pathSegment) {
    return <Navigate to={virtualConsultationCountryPath(row)} replace />;
  }

  const path = virtualConsultationCountryPath(row);
  const title = buildTitle(row.country);
  const description = buildDescription(row.country, row.cities.length);
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Virtual online consultations", path: ROUTES.onlineConsultation },
    { name: row.country, path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({
      path,
      name: title,
      description,
    }),
  ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={title} metaDescription={description} path={path} />
      <JsonLdGraph graph={graph} />

      <article>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
          Virtual online · {row.country}
        </p>
        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          Women&apos;s Health Duo — virtual care for patients in {row.country}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Browse cities we serve in {row.country}. Each city page introduces Dr. Charmi Shah
          (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women&apos;s health physio, STOTT Pilates)
          and links to every kind of online visit we offer there.
        </p>

        <div className="flex flex-wrap gap-3 mb-10">
          <Button variant="secondary" asChild>
            <Link to={ROUTES.onlineConsultation}>Virtual hub (all regions)</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to={ROUTES.drCharmi}>Dr. Charmi — profile</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to={ROUTES.drZalak}>Dr. Zalak — profile</Link>
          </Button>
        </div>

        <section aria-labelledby="country-cities-heading">
          <h2
            id="country-cities-heading"
            className="font-heading text-lg font-semibold text-foreground mb-4"
          >
            Cities in {row.country} ({row.cities.length})
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Open a city for a short overview and links to each type of online visit we offer there.
          </p>
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
            {row.cities.map((c) => (
              <li key={c.slug}>
                <Link
                  to={virtualConsultationCityPath(c)}
                  className="text-primary underline underline-offset-2 hover:text-primary/90"
                >
                  {c.city}
                </Link>
              </li>
            ))}
          </ul>
          <InclusiveSeoListFootnote variant="cities" />
        </section>

        <div className="mt-12">
          <DirectoryPresence />
        </div>
      </article>
    </PageShell>
  );
}
