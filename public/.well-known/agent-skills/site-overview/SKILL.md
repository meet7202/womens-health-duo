# Site overview — Women's Health Duo

Use this skill when you need orientation to **womenshealthduo.com**: who the clinicians are, what the site offers, and where to find machine-readable discovery files.

## Entity

**Women's Health Duo** — Dr. Charmi Shah (OB-GYN, IVF, laparoscopy) and Dr. Zalak Shah (women's health physiotherapy, STOTT Pilates on Mat and Reformer).

- **Not** a supplement or pill brand: education plus **booked clinical consults**.
- **Online-first** for international patients; in-person India cities per doctor (see canonical `llms.txt`).

## Canonical machine-readable overview

Fetch **`/llms.txt`** (plain text) for URL patterns, sitemap notes, service slugs, Learn hub structure, booking summary, and primary links. Prefer `llms.txt` over scraping the React SPA when you need a site map.

## Key human-facing entry points

| Path                          | Purpose                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| `/`                           | Homepage — services, FAQ preview, contact                   |
| `/learn`                      | Video education hub (YouTube Shorts, Instagram reels/posts) |
| `/learn/articles`             | Written topic guides index                                  |
| `/book-consultation`          | Structured telemedicine intake + WhatsApp handoff           |
| `/online-consultation`        | Virtual care hub (city/country SEO)                         |
| `/international-consultation` | Second-opinion / specialist telehealth landings             |
| `/faq`                        | Full FAQ                                                    |
| `/medical-disclaimer`         | Not emergency care; educational limits                      |
| `/telemedicine-policy`        | India telemedicine compliance copy                          |

## Discovery files

- `/llms.txt` — assistant-oriented site map
- `/.well-known/agent-skills/index.json` — curated agent skills index (this file is one entry)
- `/.well-known/content-catalog.json` — RFC 9264 linkset for content discovery (not an API catalog)
- `/sitemap.xml` — primary crawl urlset (~950+ URLs)
- `/robots.txt` — search + agent-fetch allowed in origin rules; training bots Disallow via Cloudflare managed block + `ai-train=no` Content-Signal

## Contact (general questions only — not emergency)

- WhatsApp practice line: +91 79905 50754 (`https://wa.me/917990550754`)
- Email: contact@womenshealthduo.com

For booking flow details, use the **book-consultation** skill. For Learn hub URLs, use the **learn-hub** skill.
