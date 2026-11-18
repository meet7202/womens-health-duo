# Blog publishing (human-gated)

Calendar source: `WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json`  
Draft status: `drafts/STATUS.json`  
Bodies: `src/data/topicGuides/articles/`

## Rules (YMYL / E-E-A-T)

- Drafts are written in **Dr. Zalak Shah (PT)** or **Dr. Charmi Shah** clinical voice for the matching lane (Indian English, patient-education tone, unique per URL).
- Public “Written by / Clinically reviewed by” and Article `author` schema appear **only after** that clinician actually reviews and `clinicalApproval` is set to `approved`, then `blog:promote` runs. Do not invent approval.
- Avoid formulaic multi-article boilerplate, keyword stuffing, fake reviews, guaranteed outcomes, or invented doses/timelines.
- Do **not** run `blog:promote` on unreviewed medical copy for production.
- Refreshes keep the **current live page** until promote swaps in the approved revision.
- New URLs stay `indexable: false` (404 / out of sitemap) until promote.

### SEO practices enforced per article

- One intent, one H1; title ~50–60 chars; meta description 25–160 chars
- Natural internal links (hub, related guides, doctor profile, book consultation)
- Watermarked explainer figure with accurate alt/caption
- Google Images explainer cards (`blog/drafts/explainer-cards.json`): exactly **4** short, answer-forward lines that match what searchers want and that the article body already answers (section or FAQ)—regenerate with `npm run blog:generate-drafts -- --svg-only`
- Sources list aligned with claim ledger
- Urgent-care guidance separated from routine booking CTAs
- IndexNow submit only for promoted, deployed URLs

## Commands

```sh
# Regenerate draft scaffolds + watermarked SVG explainers from the plan
npm run blog:generate-drafts
npm run blog:watermark

# Calendar vs approval state (Asia/Kolkata)
npm run blog:status

# After clinician sets clinicalApproval=approved in drafts/STATUS.json:
npm run blog:promote -- --id=W01-Z

# After merge to main + Pages deploy:
npm run blog:submit-index -- --id=W01-Z
```

## Release loop

1. Clinician reviews draft body, claim ledger (`drafts/<id>/claims.json`), and image.
2. Set `clinicalApproval: "approved"` (and `imageApproval: "approved"` when the graphic is cleared) in `drafts/STATUS.json`.
3. `npm run blog:promote -- --id=Wxx-Y`
4. Open a PR → merge to `main` → GitHub Pages deploy.
5. `npm run blog:submit-index -- --id=Wxx-Y` (IndexNow for that URL).

Optional batch discovery after deploy: `npm run submit:indexnow -- --changed-only`.

## SEO checklist per release

- One H1 matching the primary question/topic
- Title via `formatDocumentTitle` (~50–60 chars); meta 25–160 via `capMetaDescription`
- Self-canonical; indexable only when intended
- Internal links to hub + related guides + correct doctor profile + `/book-consultation/`
- Figure alt/caption; sources list; Article JSON-LD only with truthful dates/attribution
- Urgent-care copy separated from routine booking CTAs
