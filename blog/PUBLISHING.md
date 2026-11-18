# Blog publishing

Calendar source: `WHD_AGENT_ARTICLE_PROMPTS/WHD_BLOG_PLAN.json`  
Draft status: `drafts/STATUS.json`  
Bodies: `src/data/topicGuides/articles/`

All 52 articles are published as of 19 November 2026. There is no promote script. `blog/drafts/STATUS.json` is the publication record, and `npm run blog:generate-drafts` copies `publicationStatus`, `publishedAt`, and reviewer ids into the catalog. Regeneration does not publish a draft and does not change a recorded publish date.

## Rules (YMYL / E-E-A-T)

- Drafts are written in **Dr. Zalak Shah (PT)** or **Dr. Charmi Shah** clinical voice for the matching lane (Indian English, patient-education tone, unique per URL).
- The public byline is “Medically reviewed by” both doctors when `clinicalApproval` is `approved` and `clinicalReviewers` lists `zalak` and `charmi`. Do not set a single `authorId`. Do not invent approval.
- The only public date is `publishedAt` (`actualPublishDate` in STATUS). There is no updated date and no reviewed date.
- Avoid formulaic multi-article boilerplate, keyword stuffing, fake reviews, guaranteed outcomes, or invented doses/timelines.
- A draft stays `publicationStatus: "draft"` and off the public body until the owner sets `published` and `actualPublishDate` in STATUS, then regenerates the catalog.

### SEO practices enforced per article

- One intent, one H1; title ~50–60 chars; meta description 25–160 chars
- Natural internal links (hub, related guides, doctor profile, book consultation)
- Watermarked explainer figure with accurate alt/caption
- Google Images explainer cards (`blog/drafts/explainer-cards.json`): exactly **4** short **question** hooks (curiosity only—no answer spoilers) that match what searchers want and that the article body already answers (section or FAQ)—regenerate with `npm run blog:generate-drafts -- --svg-only`
- Sources list aligned with claim ledger
- Urgent-care guidance separated from routine booking CTAs
- IndexNow submit only for deployed published URLs

## Commands

```sh
# Regenerate the catalog from approved bodies. Keeps recorded publication and approval.
npm run blog:generate-drafts
npm run blog:watermark

# Calendar vs approval state (Asia/Kolkata)
npm run blog:status

# After merge to main + Pages deploy:
npm run blog:submit-index -- --id=W01-Z
```

## Release loop

1. Clinician reviews the draft body, claim ledger (`drafts/<id>/claims.json`), and image.
2. Set `clinicalApproval: "approved"`, `clinicalReviewers`, and `imageApproval: "approved"` in `drafts/STATUS.json`.
3. To publish, set `publicationStatus: "published"` and `actualPublishDate` (the public date). Then `npm run blog:generate-drafts`.
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
