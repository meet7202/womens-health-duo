# Internal linking — rules and audit (SPA)

## Rules (from prompt pack)

- Every long-form article (future): **3–5** related internal links + **one** pillar/parent link.
- Avoid weak anchors: “click here”, “read more”, “this page”.
- Priority anchor phrases to seed sitewide: **hormonal imbalance symptoms**, **irregular periods causes**, **PCOS symptoms**, **fertility signs**, **pelvic floor Pilates**.

## Current codebase notes

- **No** `read more` / `click here` strings under `src/` (grep clean).
- **Learn** now links to **Medical disclaimer**, **Editorial policy**, **FAQ**, and homepage **#pillars** with descriptive text ([`LearnPage.tsx`](../src/pages/LearnPage.tsx)).
- **Pillar section** links use pattern `{label} clips`, service + city, and clinician profile — good for entity clarity.
- **Virtual SEO** pages: continue cross-linking to doctor profiles and Learn hub from templates (`VirtualOnline*` pages) using **condition + service** anchors.

## Suggested next replacements (when editing components)

| Area                         | Opportunity                                                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `KnowledgeHubVideoHub` intro | Optional link “Browse **clinical focus clusters**” → `#learn-pillars` on `/learn` only (avoid broken context on topic URLs).  |
| City landings                | Add one explicit link to **STOTT Pilates** virtual service + **Learn** fertility/hormone topics where copy mentions diaspora. |
| Doctor profiles              | Add “**PCOS symptoms and cycle care**” → virtual `pcos-hormonal-disorders` + Learn pillar anchor once article routes exist.   |

## Technical constraint

React Router `Link` — use `to={{ pathname, hash }}` for hash links on home; use full paths for absolute clarity in docs.
