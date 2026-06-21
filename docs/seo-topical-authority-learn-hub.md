# Learn hub — topical authority architecture

This document matches the **in-code** pillar registry in [`src/data/learnPillarClusters.ts`](../src/data/learnPillarClusters.ts) and the UI block [`LearnTopicalAuthoritySection`](../src/components/learn/LearnTopicalAuthoritySection.tsx) (`/learn#learn-pillars`).

## Current product reality

- **Shipped:** Curated YouTube + Instagram embeds with **topic** and **doctor** filters (`learnHubUrls.ts`, `KnowledgeHubVideoHub.tsx`).
- **Not shipped:** Long-form article routes or a `/blog` tree. “Supporting articles” below are **planned URLs** (MDX, CMS, or static pages) once you add a publisher route.

## Pillar hubs (5)

| Pillar                           | Primary clinician | Bing-style targets (examples)                                     | Learn topic filters (when tags exist on clips)            | Virtual service spokes (slug)                                               |
| -------------------------------- | ----------------- | ----------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------------------------------------- |
| Hormonal Health                  | Dr. Charmi        | hormonal imbalance symptoms women; perimenopause telehealth India | Patient education, Pregnancy                              | `menopause-wellness`, `pcos-hormonal-disorders`, `gynecological-care`       |
| Menstrual Health                 | Dr. Charmi        | irregular periods causes; heavy periods when to see doctor        | Patient education, Labor & delivery, Pelvic floor         | `gynecological-care`, `laparoscopic-surgery`, `pelvic-floor-rehabilitation` |
| Fertility & Ovulation            | Dr. Charmi        | fertility signs ovulation; IVF consultation online NRI            | Fertility, Patient education, Pregnancy                   | `ivf-fertility-treatments`, `pregnancy-high-risk-obstetrics`                |
| PCOS                             | Dr. Charmi        | PCOS symptoms women; PCOS fertility online                        | Patient education, Fertility                              | `pcos-hormonal-disorders`, `ivf-fertility-treatments`, `gynecological-care` |
| STOTT Pilates for Women’s Health | Dr. Zalak         | STOTT Pilates women’s health; pelvic floor Pilates online         | STOTT Pilates, Pilates, Pelvic floor, Pregnancy, Exercise | `stott-pilates`, `mat-pilates-online`, `pelvic-floor-rehabilitation`        |

## Internal linking map (use descriptive anchors)

- **Every Learn view** → [`/faq`](../src/pages/FaqPage.tsx) (“Women’s Health Duo FAQ — booking & services”).
- **Learn root** → [`/services`](../src/pages/Index.tsx) (“Services” includes the quick topic map `/pillars` or `#pillars` plus the full doctor-by-doctor list).
- **Each pillar card** → matching `/learn/topic/...` chips, then **always** the shared hub [`/online-consultation`](../src/pages/VirtualOnlineConsultationHubPage.tsx) for “read about virtual visits + book,” plus [`/about`](../src/pages/Index.tsx) (“Meet our doctors” — both clinicians). City×service SEO URLs under `/online-consultation/:city/:service` remain in the sitemap for search; Learn pillar UI no longer deep-links a single metro there.
- **Doctor profiles** → Learn hub + virtual hub + India city pages (already pattern; keep anchors condition-specific).

## Missing content (symptom-led, high intent)

1. **Shorts/Reels tags:** Many Instagram imports use only `Women's health` — **sub-tag** reels into `PCOS`, `Fertility`, `Pelvic floor`, `STOTT Pilates` so pillar chips populate.
2. **Dedicated PCOS + menstrual topic labels:** Consider adding canonical labels `PCOS` and `Menstrual health` on clips so `/learn/topic/pcos` becomes indexable without overstretching unrelated clips.
3. **Long-form:** One evidence-based article per pillar (see blog rewrite template) linking back to Learn topic filters and to the right `seoOnlineServices` slug.

## Operational checklist

- [ ] After adding reels: run caption sync scripts (see `AGENTS.md`).
- [ ] When adding article routes: extend `SITEMAP_PATHS` + `App.tsx` and add `Article` + `FAQPage` JSON-LD only if full FAQ is on-page.
