# AI citation optimization — checklist

**Goal:** Improve extractability for ChatGPT, Bing Copilot, Perplexity, and similar systems crawling public HTML.

## Content-level fixes

- [ ] **Answer-first:** first 40–60 words state what the brand is and what it is not (education + consults; not supplements).
- [ ] **Definitions:** one sentence defining PCOS, IVF consult, STOTT Pilates, pelvic floor rehab where those terms lead a section.
- [ ] **Bullets:** use lists for symptoms, when to seek urgent care, and booking steps.
- [ ] **FAQ blocks:** short Q/A; if `FAQPage` JSON-LD is emitted, questions must match visible text verbatim.
- [ ] **Entity strings:** repeat “Women’s Health Duo” + clinician names in consistent order on key templates.

## Page-level fixes (done or planned)

| Page                   | AI-friendly element                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------- |
| Home                   | `HOME_HERO_LEDE` (hero), `HOME_ENTITY_DEFINITION` (Learn + schema seed), H1 with clinical terms, FAQ + JSON-LD, `#pillars` sections. |
| Learn                  | Entity paragraph, topical cluster cards with direct answers, service example URLs.    |
| FAQ                    | Expanded trust strip linking to disclaimer/editorial policy.                          |
| Disclaimer / Editorial | Clear boundaries and process statements.                                              |

## Sitewide

- [ ] Keep [`public/llms.txt`](../public/llms.txt) aligned with routes and entity positioning.
- [ ] Avoid contradictory claims between Instagram captions and on-site disclaimer (if conflict, on-site + disclaimer win).
- [ ] Prefer **stable** URLs (`/medical-disclaimer`) over hash-only pseudo-pages for trust content.

## What not to do

- Keyword stuffing or hidden text.
- `FAQPage` schema for FAQs that are not fully visible.
- Fabricated citations or journal URLs.
