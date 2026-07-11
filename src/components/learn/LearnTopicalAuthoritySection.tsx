import { Link } from "react-router-dom";
import { ROUTES } from "@/config/routes";
import { publicPathname } from "@/lib/githubPagesPublicUrl";
import {
  LEARN_PILLAR_CLUSTERS,
  pillarLearnTopicLinks,
  pillarWrittenGuideLinks,
} from "@/data/learnPillarClusters";

export function LearnTopicalAuthoritySection() {
  return (
    <section
      id="learn-pillars"
      className="mb-14 scroll-mt-28"
      aria-labelledby="learn-pillars-heading"
    >
      <h2
        id="learn-pillars-heading"
        className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mb-3"
      >
        Pick what you want to learn about
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-3 max-w-3xl">
        Each area below links to content you can filter on this page, and to how we handle related
        questions in clinic, Women&apos;s Health Duo is education plus real consults with our
        doctors, not a supplement shop.
      </p>
      <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-3xl">
        <strong className="font-medium text-foreground">Booked care:</strong> if you want a real
        consultation (not just content), start with{" "}
        <Link
          to={publicPathname(ROUTES.onlineConsultation)}
          className="text-primary font-medium underline underline-offset-4"
        >
          virtual online consultations
        </Link>{" "}
        , how video visits work, what we offer by telehealth, and how to book from wherever you are.
        We also see people in person in{" "}
        <Link
          to={publicPathname(ROUTES.mumbai)}
          className="text-primary underline underline-offset-4"
        >
          Mumbai
        </Link>
        ,{" "}
        <Link
          to={publicPathname(ROUTES.ahmedabad)}
          className="text-primary underline underline-offset-4"
        >
          Ahmedabad
        </Link>
        ,{" "}
        <Link
          to={publicPathname(ROUTES.valsad)}
          className="text-primary underline underline-offset-4"
        >
          Valsad
        </Link>
        , and{" "}
        <Link
          to={publicPathname(ROUTES.bangalore)}
          className="text-primary underline underline-offset-4"
        >
          Bangalore
        </Link>
        .
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {LEARN_PILLAR_CLUSTERS.map((pillar) => {
          const topicLinks = pillarLearnTopicLinks(pillar);
          const writtenGuides = pillarWrittenGuideLinks(pillar);

          return (
            <article
              key={pillar.id}
              className="rounded-2xl border border-border/50 bg-card p-5 sm:p-6 shadow-soft flex flex-col h-full"
              aria-labelledby={`pillar-title-${pillar.id}`}
            >
              <h3
                id={`pillar-title-${pillar.id}`}
                className="font-heading text-lg sm:text-xl font-semibold text-foreground"
              >
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2 flex-1">
                {pillar.directAnswer}
              </p>

              <p className="text-sm font-medium text-foreground mt-4 mb-1.5">
                Questions we often get
              </p>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1.5 mb-4">
                {pillar.symptomContentIdeas.slice(0, 3).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 pt-3 border-t border-border/40">
                {topicLinks.length > 0 ? (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">Content on this site</p>
                    <div className="flex flex-wrap gap-2">
                      {topicLinks.map(({ label, path }) => (
                        <Link
                          key={label}
                          to={path}
                          replace
                          className="text-sm rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-primary font-medium hover:bg-primary/15 transition-colors"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    We&apos;re tagging more content for this area, check back soon or jump to{" "}
                    <Link
                      to={publicPathname(ROUTES.learn)}
                      className="text-primary underline underline-offset-4"
                    >
                      all topics
                    </Link>
                    .
                  </p>
                )}

                {writtenGuides.length > 0 ? (
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">
                      Written guides and common questions
                    </p>
                    <ul className="text-sm space-y-1.5 list-disc pl-4 text-muted-foreground">
                      {writtenGuides.map((a) => (
                        <li key={a.path}>
                          <Link
                            to={a.path}
                            className="text-primary font-medium underline underline-offset-4"
                          >
                            {a.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="text-sm text-muted-foreground leading-relaxed">
                  Looking for a booked consult, not just content?{" "}
                  <Link
                    to={publicPathname(ROUTES.onlineConsultation)}
                    className="text-primary font-medium underline underline-offset-2"
                  >
                    Read about virtual online consultations here
                  </Link>{" "}
                  , same booking path for OB-GYN, IVF discussion, women&apos;s health physiotherapy,
                  and STOTT Pilates-related care by video.
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  <Link
                    to={publicPathname(ROUTES.homeAbout)}
                    className="text-primary font-medium underline underline-offset-2"
                  >
                    Meet our doctors
                  </Link>
                  {" ,  "}
                  Dr. Charmi Shah (OB-GYN / IVF) and Dr. Zalak Shah (women&apos;s health
                  physiotherapy &amp; STOTT Pilates).
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
