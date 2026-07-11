import {
  BookOpen,
  CalendarHeart,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Users,
  Video,
} from "lucide-react";
import { SeoHead } from "@/components/seo/SeoHead";
import { JsonLdGraph } from "@/components/seo/JsonLdGraph";
import { JsonLdFaq } from "@/components/seo/JsonLdFaq";
import { PageShell } from "@/components/layout/PageShell";
import { FaqSection } from "@/components/sections/FaqSection";
import { ROUTES } from "@/config/routes";
import { SITE_URL } from "@/config/site";
import { WHATSAPP_COMMUNITY_INVITE_URL } from "@/config/whatsappCommunity";
import { breadcrumbListSchema, webPageSchema } from "@/components/seo/schema/breadcrumbs";
import { DirectoryPresence } from "@/components/seo/DirectoryPresence";
import { githubPagesAbsoluteUrl } from "@/lib/githubPagesPublicUrl";
import { COMMUNITY_DOCUMENT_TITLE, COMMUNITY_H1 } from "@/lib/pageSeoCopy";
import { COMMUNITY_BENEFITS, COMMUNITY_FAQ, COMMUNITY_TOPICS } from "@/data/communityFaq";
import { Button } from "@/components/ui/button";
import { AppLink as Link } from "@/components/router/AppLink";

const TITLE = COMMUNITY_DOCUMENT_TITLE;
const H1 = COMMUNITY_H1;
const DESCRIPTION =
  "Join Women's Health Duo's free WhatsApp community: health tips, workshop updates, and supportive conversations on pregnancy, fertility, PCOS, pelvic health, and wellness — led by Dr. Charmi & Dr. Zalak.";

function JoinCommunityButton({
  className,
  size = "lg",
}: {
  className?: string;
  size?: "default" | "lg" | "sm";
}) {
  return (
    <Button
      asChild
      size={size}
      className={`bg-[#25D366] hover:bg-[#1ebe57] text-white border-0 shadow-lg ${className ?? ""}`}
    >
      <a href={WHATSAPP_COMMUNITY_INVITE_URL} target="_blank" rel="noopener noreferrer">
        <span className="inline-flex items-center gap-2">
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden />
          Join free on WhatsApp
        </span>
      </a>
    </Button>
  );
}

export function FreeWomensHealthCommunityPage() {
  const path = ROUTES.freeWomensHealthCommunity;
  const pageUrl = githubPagesAbsoluteUrl(SITE_URL, path);
  const crumbs = [
    { name: "Home", path: ROUTES.home },
    { name: "Free community", path },
  ];
  const graph = [
    breadcrumbListSchema(crumbs),
    webPageSchema({ path, name: TITLE, description: DESCRIPTION }),
  ];

  return (
    <PageShell breadcrumbs={crumbs}>
      <SeoHead title={TITLE} metaDescription={DESCRIPTION} path={path} />
      <JsonLdGraph graph={graph} />
      <JsonLdFaq items={COMMUNITY_FAQ.slice(0, 10)} pageUrl={pageUrl} />

      <article className="max-w-3xl">
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            100% free
          </span>
          <span className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground">
            WhatsApp community
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-semibold text-foreground mb-4">
          {H1}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">{DESCRIPTION}</p>

        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 mb-10">
          <p className="text-foreground font-medium mb-4">
            A friendly, free space for women who want practical health education, workshop updates,
            and real conversations — without paying for a membership.
          </p>
          <JoinCommunityButton className="w-full sm:w-auto px-8 py-6 text-base" />
          <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
            This is a <strong className="text-foreground">public community group</strong>, not a
            private chat with the clinic. For personal consults, use{" "}
            <Link
              to={ROUTES.bookConsultation}
              className="text-primary underline underline-offset-4"
            >
              Book consultation
            </Link>{" "}
            or direct WhatsApp with the practice.
          </p>
        </div>

        <section className="mb-10" aria-labelledby="community-benefits-heading">
          <h2
            id="community-benefits-heading"
            className="font-heading text-2xl font-semibold text-foreground mb-4 flex items-center gap-2"
          >
            <Sparkles className="h-6 w-6 text-primary shrink-0" aria-hidden />
            What you get — for free
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-5">
            Our community is built for women searching for{" "}
            <strong className="text-foreground font-medium">
              free women&apos;s health resources
            </strong>
            , supportive peers, and trustworthy tips from India-trained clinicians who also serve
            patients online worldwide.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
            {COMMUNITY_BENEFITS.map((item) => (
              <li
                key={item}
                className="flex gap-2 rounded-xl border border-border/50 bg-muted/20 px-4 py-3 leading-relaxed"
              >
                <span className="text-primary mt-0.5 shrink-0" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10" aria-labelledby="community-topics-heading">
          <h2
            id="community-topics-heading"
            className="font-heading text-2xl font-semibold text-foreground mb-4 flex items-center gap-2"
          >
            <HeartHandshake className="h-6 w-6 text-primary shrink-0" aria-hidden />
            Topics we talk about
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Whether you are planning pregnancy, managing PCOS, recovering postpartum, or simply
            investing in long-term wellness, you will find relevant, approachable content here.
          </p>
          <ul className="flex flex-wrap gap-2">
            {COMMUNITY_TOPICS.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-border/60 bg-background px-3 py-1.5 text-sm text-foreground"
              >
                {topic}
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-10 grid sm:grid-cols-3 gap-4" aria-label="Community highlights">
          <div className="rounded-xl border border-border/50 p-4">
            <Users className="h-5 w-5 text-primary mb-2" aria-hidden />
            <h3 className="font-heading font-semibold text-foreground text-sm mb-1">
              Learn together
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Connect with other women on similar journeys in a moderated, respectful WhatsApp
              space.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 p-4">
            <CalendarHeart className="h-5 w-5 text-primary mb-2" aria-hidden />
            <h3 className="font-heading font-semibold text-foreground text-sm mb-1">
              Hear it first
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Workshop dates, free sessions, and new content alerts land in the community before
              anywhere else.
            </p>
          </div>
          <div className="rounded-xl border border-border/50 p-4">
            <Video className="h-5 w-5 text-primary mb-2" aria-hidden />
            <h3 className="font-heading font-semibold text-foreground text-sm mb-1">
              Clinician-led tips
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dr. Charmi (OB-GYN / IVF) and Dr. Zalak (women&apos;s health physio / STOTT Pilates)
              share education aligned with their practice.
            </p>
          </div>
        </section>

        <section className="mb-10" aria-labelledby="community-free-resources-heading">
          <h2
            id="community-free-resources-heading"
            className="font-heading text-2xl font-semibold text-foreground mb-4 flex items-center gap-2"
          >
            <BookOpen className="h-6 w-6 text-primary shrink-0" aria-hidden />
            More free resources on this site
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The community complements — but does not replace — our open educational library. Explore
            these anytime, with or without joining WhatsApp:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to={ROUTES.learn} className="text-primary underline underline-offset-4">
                Learn hub
              </Link>{" "}
              — doctor-led YouTube Shorts and Instagram Reels on women&apos;s health topics.
            </li>
            <li>
              <Link to={ROUTES.learnArticles} className="text-primary underline underline-offset-4">
                Articles &amp; common questions
              </Link>{" "}
              — written guides on fertility, pregnancy, PCOS, pelvic health, and more.
            </li>
            <li>
              <Link to={ROUTES.faq} className="text-primary underline underline-offset-4">
                FAQ
              </Link>{" "}
              — how consultations, cities, and online care work at Women&apos;s Health Duo.
            </li>
          </ul>
        </section>

        <section
          className="mb-10 rounded-2xl border border-border/50 bg-muted/25 p-6"
          aria-labelledby="community-guidelines-heading"
        >
          <h2
            id="community-guidelines-heading"
            className="font-heading text-xl font-semibold text-foreground mb-3"
          >
            Community vs consultation — please know the difference
          </h2>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-5">
            <li>
              The group is for <strong className="text-foreground">general education</strong>,
              inspiration, and event updates — not personal diagnoses or prescriptions.
            </li>
            <li>
              Do not post private medical records or emergency symptoms in the community; use{" "}
              <Link
                to={ROUTES.bookConsultation}
                className="text-primary underline underline-offset-4"
              >
                teleconsultation booking
              </Link>{" "}
              or local emergency services when needed.
            </li>
            <li>
              Be kind and respectful. This is a supportive women&apos;s health community, not a
              substitute for your own doctor-patient relationship.
            </li>
          </ul>
        </section>

        <div className="rounded-2xl border border-[#25D366]/30 bg-[#25D366]/5 p-6 sm:p-8 text-center">
          <h2 className="font-heading text-xl sm:text-2xl font-semibold text-foreground mb-3">
            Ready to join? It takes one tap.
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            Thousands of women look for a{" "}
            <strong className="text-foreground">free women&apos;s health community</strong> they can
            trust. Ours is led by two sisters who practice OB-GYN and women&apos;s health
            physiotherapy — and there is a lot waiting for you inside.
          </p>
          <JoinCommunityButton className="px-10 py-6 text-base" />
        </div>
      </article>

      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <FaqSection
          items={COMMUNITY_FAQ}
          sectionId="community-faq"
          tightTop
          headingLabel="Community FAQ"
          headingTitle="Questions about the free WhatsApp community"
          headingIntro="Everything you need to know before joining Women's Health Duo's free group — and how it differs from booking a consult."
        />
      </div>

      <div className="max-w-3xl mt-12">
        <DirectoryPresence />
      </div>
    </PageShell>
  );
}
