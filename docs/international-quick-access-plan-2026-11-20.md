# International quick-access pages — plan (20 November 2026)

Patients outside India who cannot find a women's health physiotherapist, a prenatal or postnatal class, or a second OB-GYN opinion near them, or who face a long wait for one. This plan adds a few pages for that search, on the existing international hub, and does not add more overseas city×service pages (`AGENTS.md`: win the hub and the booking path first).

## What Search Console shows (last 180 days, outside India)

Overseas impressions by country: Singapore 386, USA 302, UK 153, South Africa 133, Australia 121, Canada 63. Almost nothing is clicked, and the average position is 50 to 90. The site is seen for these searches but is not chosen.

Overseas searches that match this plan:

| Search                                                                             | Country                                  | Impressions | Position |
| ---------------------------------------------------------------------------------- | ---------------------------------------- | ----------- | -------- |
| book pelvic floor therapy                                                          | South Africa                             | 65          | 49       |
| online doctor for women's health                                                   | UK                                       | 31          | 83       |
| non invasive pelvic floor therapy near me                                          | South Africa                             | 27          | 46       |
| online womens doctor australia                                                     | Australia                                | 21          | 52       |
| online gynecologist consultation / obgyn online / online consultation gynecologist | Ireland, Canada, US, Australia, Tanzania | 2–9 each    | 4–89     |
| online consultation for physiotherapy / online physiotherapy consultation          | Australia                                | 3 each      | 72–74    |
| online fertility consultation                                                      | Singapore                                | 5           | 77       |

Menopause clinic searches (UK, Singapore, Canada) are also present. They belong to Dr. Charmi Shah's existing menopause page and are not part of this plan.

## What already exists (do not duplicate)

`/international-consultation/` hub, two doctor hubs, and 15 service pages. Dr. Charmi Shah: IVF second opinion, fertility, recurrent pregnancy loss, high-risk pregnancy, endometriosis second opinion, PCOS, report review, menopause. Dr. Zalak Shah: pelvic floor physio, prenatal and postnatal physio, Mat Pilates, STOTT Pilates, postpartum recovery, diastasis recti, pregnancy exercise planning. Each page is service-led ("X online"). None of them answers the search behind this plan: "I cannot get seen locally, what can I do now?"

## New pages (four)

All four live under `/international-consultation/`, use `InternationalServicePage`, go in the sitemap and prerender list, and name the right doctor. Titles go through `formatDocumentTitle` (the part before the brand must be 38 characters or fewer). Each has one H1, a FAQ that matches FAQPage JSON-LD (up to 10), a WhatsApp CTA with `ctaPlacement` `international_service`, and booking through `/book-consultation/`.

### 1. OB-GYN second opinion online — Dr. Charmi Shah

- URL `/international-consultation/ob-gyn-second-opinion-online/`
- Title "OB-GYN second opinion online" · H1 "Online OB-GYN second opinion with Dr. Charmi Shah"
- Searches: online gynecologist consultation, obgyn online, gynecologist second opinion, online doctor for women's health.
- Why new: the existing second-opinion pages are for IVF and endometriosis only. This is the umbrella page for "I have been told X and want a second view": hysterectomy or fibroid surgery advised, abnormal scan in pregnancy, delivery plan or C-section advice, abnormal Pap or ultrasound result, heavy bleeding with no clear plan.
- Sections: who this suits; what to send (reports, scan images, medication list, dates); what the consult gives you (a plain explanation, options, questions to take to your local doctor); what a video consult cannot do (examine you, operate, or replace urgent local care); prescriptions come from your local doctor where you live; links to the IVF, endometriosis, report review, and high-risk pregnancy pages.

### 2. Women's health physio online — Dr. Zalak Shah

- URL `/international-consultation/womens-health-physio-online/`
- Title "Women's health physio online" · H1 "Online women's health physiotherapy with Dr. Zalak Shah"
- Searches: online physiotherapy consultation, women's health physiotherapist online, female physio online, pelvic floor physio waiting list.
- Why new: there is no umbrella page for the specialty itself. It should be the landing page for "no women's health physio where I live, or the wait is long".
- Sections: what a women's health physiotherapist treats; what can be assessed well by video (history, breathing, posture, movement, a guided diastasis self-check, a bladder diary) and what cannot (internal examination, so a local referral is suggested when needed); how the first session runs; setting up your room and camera; using it while you wait for a local appointment; links to the pelvic floor, diastasis, postpartum, and prenatal pages.
- Pelvic floor wait-list wording goes here and on the existing pelvic floor page. No separate wait-list page.

### 3. Online antenatal classes — Dr. Zalak Shah

- URL `/international-consultation/online-antenatal-classes/`
- Title "Online antenatal classes" · H1 "Online antenatal classes with Dr. Zalak Shah"
- Searches: antenatal classes online, prenatal classes online, birth preparation class online, Hindi antenatal class.
- Why new: `/prenatal/` and `/dr-zalak-shah/prenatal-classes/` are written for India and in-person classes. Families abroad want a class at a time that suits their time zone, often in English, Hindi, or Gujarati, with a partner or grandparent joining.
- Sections: what the class covers (movement through trimesters, labour positions and breathing, pelvic floor, early postnatal recovery); format (needs owner input below); joining from abroad; what the class is not (obstetric care, which stays with the local obstetrician or Dr. Charmi Shah).

### 4. Hindi and Gujarati speaking doctors online — both doctors

- URL `/international-consultation/hindi-gujarati-doctor-online/`
- Title "Hindi & Gujarati doctor online" · H1 "Women's health consults in Hindi and Gujarati, online"
- Searches: hindi speaking gynecologist, gujarati doctor online, indian gynecologist online UK/USA/Canada, indian women's health physio abroad.
- Why new: language is the real reason many diaspora families look for an Indian doctor, and no page says it. Must name both doctors in their correct lanes.
- Sections: which doctor for what; consults in English, Hindi, or Gujarati (needs owner confirmation per doctor); family members can join; same booking path and same limits on prescriptions abroad.

## Changes to existing pages (no new URL)

- International hub: add a short "Cannot get seen locally?" block that links the four new pages above the service list.
- Pelvic floor physio online and postpartum recovery online: add a "while you wait for a local appointment" section. Do not create a separate postnatal-check page; it would compete with these two.
- Book consultation page: ask for the patient's country and time zone and show slot times in that time zone (needs owner input on how slots are offered).
- Virtual country pages for Singapore, USA, UK, South Africa, Australia, and Canada: link the four new pages. No new city pages.

## Facts confirmed by the owner (20 November 2026)

These are written on the four pages, the international hub, the six country pages (Singapore, United States, United Kingdom, South Africa, Australia, Canada), and the booking form. They are usual practice, not a promise that every request gets the same slot or the same fee.

1. Overseas patients are usually seen within 1 to 2 days, depending on availability. A same-day visit is offered when a slot is open.
2. Hours are the same as the clinics, Monday to Saturday, 9:00 AM to 6:00 PM India time, and can move to the patient's time zone when a slot allows.
3. Fees are competitive and, for many patients outside India, lower than a local specialist visit. The amount and how to pay are confirmed on WhatsApp. No price is printed on the site.
4. Online antenatal classes are one-to-one. Prenatal and postnatal physiotherapy, pelvic floor care, diastasis recti care, and Pilates can be done by video. Session count and days are agreed at the first visit. An examination that needs hands is local.
5. Both doctors consult in English, Hindi, and Gujarati.
6. Dr. Charmi Shah can set out the medicine and its contents when India's telemedicine guidelines and the patient's local law allow it. If an Indian prescription cannot be dispensed locally, the note is for the local doctor. Dr. Zalak Shah does not prescribe.
7. Reports are sent before the visit, reviewed during the consultation, with follow-up on WhatsApp. There is no separate written-report turnaround.

## Measurement

After deploy, request indexing for the four URLs, then compare overseas impressions, clicks, and position for the searches above at 28 and 90 days. Track `whatsapp_click` events with `service` set to `online_consult`, `prenatal`, `postnatal`, `incontinence`, or `diastasis` (as `AGENTS.md` requires) and `cta_placement` `international_service`.
