# Book teleconsultation — Women's Health Duo

Use this skill when a user wants to **book a video, audio, or chat teleconsultation** with Dr. Charmi Shah or Dr. Zalak Shah.

## Important boundaries

- **Not emergency services.** Direct users with urgent symptoms to local emergency care.
- **No server-side API** — booking is a static intake form that opens WhatsApp with a prefilled message.
- **Telemedicine consent is mandatory** before handoff (India March 2020 telemedicine guidelines).
- Registration numbers appear on doctor profiles and `/book-consultation`, not in footer CTAs.

## Booking URL

**`https://womenshealthduo.com/book-consultation`**

## Flow (6 steps on-page)

1. **Choose doctor** — Dr. Charmi Shah (OB-GYN) or Dr. Zalak Shah (physio / Pilates)
2. **Consultation type** — video, audio, or chat (WhatsApp)
3. **Patient details** — name, age/DOB, gender, phone, email, address, country, emergency contact
4. **Medical history** — chief complaint (required), duration, severity, medications, allergies, pregnancy/breastfeeding when relevant, vitals and recent investigations optional
5. **Consent** — user must accept telemedicine policy; timestamp recorded in `localStorage` and included in WhatsApp message
6. **Review & book** — opens WhatsApp with structured intake message to practice number

## WhatsApp message structure

The prefilled message includes doctor, mode, visit type (first vs follow-up), patient and medical fields, document reminder (labs, imaging, government ID), consent timestamp, and `Sent via womenshealthduo.com/book-consultation`.

Payment and slot confirmation happen **in WhatsApp chat**, not on the website.

## Related policies

| Path                   | Content                            |
| ---------------------- | ---------------------------------- |
| `/telemedicine-policy` | Telemedicine terms and limitations |
| `/privacy-policy`      | Data handling                      |
| `/refund-policy`       | Refund rules                       |
| `/medical-disclaimer`  | Educational vs clinical boundaries |

## Alternatives to formal booking

- **General questions:** WhatsApp or email (see site-overview skill) — not the same as a booked consult.
- **Free education community:** `/free-womens-health-community` — public WhatsApp group, **not** clinical chat or triage.

## Languages

English, Hindi, and Gujarati are commonly used on consults; patients may request when messaging.
