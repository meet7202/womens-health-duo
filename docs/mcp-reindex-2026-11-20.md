# MCP knowledge-base notes — 20 November 2026

No reindex was run. Do not run a full-site reindex. Refresh or hold the records below after this release is deployed.

## Refresh when crawl of the new HTML is confirmed

- Dr. Charmi Shah profile
- Dr. Zalak Shah profile
- Learn article inventory (`/learn/articles/`)
- Diastasis recti article, including the reviewer-only byline and the two FAQ answers (they are in the HTML once accordion content stays mounted)
- Privacy policy
- Terms of service
- PMDD article (`/what-is-pmdd/`), including crisis wording already on the page

## Hold

- PCOS / PMOS, including both `/what-is-pcos/` and `/pcos/`, until `docs/clinical-review-2026-11-20.md` is signed
- PMS (`/what-is-pms/`) until the `W27-C` draft is approved and published
- Main FAQ until the force-mounted answers are on the production HTML
- About / practice copy until the eager SSR About section is on production
- The 13 in-review refreshes until each is published

## Retire these URLs after redirects deploy

Point knowledge-base records at the target. Do not keep the old URL as a separate condition.

| From                                            | To                                                         |
| ----------------------------------------------- | ---------------------------------------------------------- |
| `/exercises-for-pregnancy/`                     | `/pregnancy-exercises-by-trimester/`                       |
| `/bladder-leakage-after-pregnancy/`             | `/why-am-i-leaking-urine-after-childbirth/`                |
| `/weak-pelvic-floor/`                           | `/how-do-i-know-if-my-pelvic-floor-is-weak/`               |
| `/pelvic-floor-exercises/`                      | `/are-kegels-right-for-everyone/`                          |
| `/how-to-strengthen-pelvic-floor/`              | `/are-kegels-right-for-everyone/`                          |
| `/what-is-postpartum-recovery/`                 | `/how-long-does-postpartum-recovery-take/`                 |
| `/can-physiotherapy-help-after-childbirth/`     | `/how-long-does-postpartum-recovery-take/`                 |
| `/can-physiotherapy-help-with-bladder-leakage/` | `/can-pelvic-floor-therapy-help-with-bladder-leakage/`     |
| `/painful-intercourse/`                         | `/can-pelvic-floor-therapy-help-with-painful-intercourse/` |
| `/pilates-for-pregnancy/`                       | `/is-pilates-safe-during-pregnancy/`                       |
| `/prenatal-pilates/`                            | `/is-pilates-safe-during-pregnancy/`                       |
| `/postnatal-pilates/`                           | `/pilates-after-pregnancy/`                                |
| `/what-is-pilates/`                             | `/what-is-stott-pilates/`                                  |
| `/pilates-for-beginners/`                       | `/what-is-stott-pilates/`                                  |
| `/can-pcos-affect-fertility/`                   | `/can-i-get-pregnant-with-pcos/`                           |
| `/back-pain-in-pregnancy/`                      | `/how-to-relieve-back-pain-during-pregnancy/`              |
| `/pelvic-pain-in-pregnancy/`                    | `/how-to-relieve-pelvic-pain-during-pregnancy/`            |
| `/ivf/`                                         | `/what-is-ivf/`                                            |
| `/trying-to-conceive/`                          | `/pregnancy-planning/`                                     |
| `/who-needs-womens-health-physiotherapy/`       | `/what-is-womens-health-physiotherapy/`                    |
| `/can-physiotherapy-help-with-back-pain/`       | `/womens-health-physiotherapy/`                            |
| `/can-physiotherapy-improve-posture/`           | `/womens-health-physiotherapy/`                            |
| `/can-physiotherapy-improve-core-strength/`     | `/womens-health-physiotherapy/`                            |
| `/how-does-exercise-improve-womens-health/`     | `/womens-health-physiotherapy/`                            |
| `/can-pilates-help-with-back-pain/`             | `/pilates/`                                                |
| `/can-pilates-improve-posture/`                 | `/pilates/`                                                |
| `/can-pilates-strengthen-the-core/`             | `/pilates/`                                                |
| `/how-often-should-i-do-pilates/`               | `/pilates/`                                                |
| `/can-physiotherapy-help-with-pelvic-pain/`     | `/pelvic-pain-in-women/`                                   |
| `/signs-of-hormonal-imbalance/`                 | `/what-is-hormonal-imbalance/`                             |
| `/how-do-hormones-affect-womens-health/`        | `/what-is-hormonal-imbalance/`                             |
| `/how-does-stress-affect-womens-health/`        | `/what-is-hormonal-imbalance/`                             |
| `/how-does-sleep-affect-hormones/`              | `/what-is-hormonal-imbalance/`                             |

Service and city pages did not justify a full refresh from this audit.
