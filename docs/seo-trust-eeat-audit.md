# Trust & E-E-A-T audit (YMYL) — Women’s Health Duo

## What was already strong

- **Named physicians** with dedicated routes (`/dr-charmi-shah`, `/dr-zalak-shah`), photos, credentials, and `Physician` JSON-LD in [`JsonLd.tsx`](../src/components/seo/JsonLd.tsx).
- **Organization / MedicalOrganization** graph with `knowsAbout`, `disambiguatingDescription`, and `sameAs` (Instagram, YouTube, WhatsApp).
- **FAQ** with matching `FAQPage` JSON-LD where emitted.
- **Learn hub transparency:** original platform captions under embeds.

## Gaps closed in this pass

| Signal             | Implementation                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| Medical disclaimer | [`/medical-disclaimer`](../src/pages/MedicalDisclaimerPage.tsx) — emergencies, education vs care, telehealth limits, not supplements. |
| Editorial policy   | [`/editorial-policy`](../src/pages/EditorialPolicyPage.tsx) — authorship, caption sourcing, corrections, future references policy.    |
| Cross-links        | Footer, FAQ intro, Learn closing paragraph link to both pages + homepage pillars.                                                     |
| Last updated       | Visible on disclaimer and editorial pages (static month/year; bump when content changes).                                             |

## Still recommended (future)

1. **`MedicalClinic` / `Physician` review** — add `hasCredential` or structured medical identifiers only if you have stable public URIs (do not invent).
2. **References section** — for long-form articles only: numbered citations + “last medically reviewed by” with date.
3. **`dateModified` on WebPage JSON-LD** — wire from build time or CMS when you have a real content pipeline.
4. **VideoObject** — optional `uploadDate` from `postedAt` if you want richer Bing/YouTube alignment (tradeoff: must stay accurate).

## Practitioner bio template (short block)

Use on any new landing page:

> **Dr. [Name]** — [credentials, registrations]. **Practice:** [in-person cities] + **video consults worldwide**. **Scope:** [2–3 sentences]. **Not:** emergency care, prescription without consultation, or supplement retail under the Women’s Health Duo brand.

## Schema suggestions (incremental)

- Keep **`MedicalOrganization` + `Organization`** dual `@type` on the org node.
- When articles ship: **`Article`** with `author` → `Person` (physician), `datePublished`, `dateModified`, `mainEntityOfPage`, and `isPartOf` → `WebSite`.
