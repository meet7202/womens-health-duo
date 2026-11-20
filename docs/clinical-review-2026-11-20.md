# Clinician review — 20 November 2026 audit

Nothing in this file is approval. Contested wording stays off new live pages until a named clinician signs the row.

The diastasis recti article (`/what-is-diastasis-recti/`) shows “Medically reviewed by Dr. Zalak Shah (PT) and Dr. Charmi Shah” because `reviewerIds` are set. It has no `authorId`, so there is no “Written by” line. That is intentional. Do not invent an author.

## Hold until signed

| Item                                                        | Where it lives now                                                                         | What to confirm                                                                                                       |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| PMOS rename and the 27 May 2026 ASRM citation               | Live only on `/what-is-pcos/` (already published). Not newly expanded here.                | Is “Polyendocrine Metabolic Ovarian Syndrome” the wording WHD will use, and is that ASRM page an acceptable citation? |
| Adult and adolescent diagnostic framing on the PCOS article | Same live article                                                                          | Does the adult versus adolescent wording match how Dr. Charmi Shah explains diagnosis?                                |
| Tele-MANAS 14416 / 1-800-891-4416 and 112                   | Live on `/what-is-pmdd/`                                                                   | Are those the crisis numbers WHD wants named?                                                                         |
| PMS page                                                    | Draft `W27-C`, `publicationStatus: in_clinical_review`. Live `/what-is-pms/` is unchanged. | Approve the timing-and-diary draft. Severe mood symptoms point at the PMDD page instead of repeating the hotline.     |
| `/pcos/` alias sentence                                     | `blog/drafts/pcos-hub-pmos-alias.json` only. The hub text is unchanged.                    | May this sentence be added to the hub after the PMOS row above is signed?                                             |

## Draft refreshes (not live)

These catalog rows are `in_clinical_review`. `publishedArticleForSlug` ignores them, so the current pages stay as they are.

- Dr. Charmi Shah: `what-is-pms`, `what-is-hormonal-imbalance`, `how-to-improve-fertility`, `can-stress-affect-fertility`, `symptoms-women-should-never-ignore`
- Dr. Zalak Shah (PT): `what-is-womens-health-physiotherapy`, `online-womens-health-physiotherapy`, `what-is-pelvic-floor-dysfunction`, `pelvic-pain-in-women`, `frequent-urination-in-women`, `postpartum-pelvic-pain`, `common-pregnancy-discomforts`, `is-online-pilates-effective`

Open questions are in each `blog/drafts/<id>/claims.json`. Reviewer ids were not added.
