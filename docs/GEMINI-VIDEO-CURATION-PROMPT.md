# Curating the website videos (27 Nov 2026)

Goal: every video on antarshanti.co.in comes from the **official channel of the organisation your work comes from**, not from random creators. Principles in `docs/GUIDING-PRINCIPLES.md` apply: calm, honest, no fear, no promised outcomes.

## 1. Review of the 8 videos currently on the site

Channel and title below were read from YouTube's own oEmbed data on 27 Nov 2026 (so they are exact). View counts are not available that way; Gemini fills them in.

| Page | Video ID | Channel | Title (as on YouTube) | Verdict |
|---|---|---|---|---|
| Bach | `Cm5DVzkOo_U` | R for Rabbit - Baby & Kids | Which Bach Flower Remedy Is Right for You? Emotional Support for Parents **(Part 2)** | Replace. A baby-products brand, aimed at parents, and "Part 2" of a series. Also reused on the check-in page. |
| Bach | `FafMg6pU8P8` | Stoic Herbalist | Stop Overthinking Your Bach Flower Remedies! | Replace. Random herbalist; the title also undercuts a session ("stop overthinking"). |
| Bach | `9wa5HW0rRoY` | Sharmee Divan, Anxiety Therapist & Counsellor | Wondering if you can mix all 38 Bach Flower remedies together? | Replace. Another practitioner's channel (a competitor, in effect). |
| Happiness | `gWwhIPAajfw` | ART OF LIVING INDIA (`@artoflivingindia8958`) | Sudarshan kriya | Probably keep, but confirm this is the official Art of Living India channel (the handle ends in digits). Also reused on the check-in page. |
| Happiness | `yJeXYLeWKqs` | 7pranayama Yoga App | Sudarshan Kriya Yoga, Benefits for Stress Relief... | Replace. A third-party yoga app, not Art of Living. |
| Happiness | `94pOfxIQMxo` | The Art of Living (`@artofliving-official`) | Learn Sudarshan Kriya... in Anand Utsav with @gurudev | Keep. Official channel, and it features Gurudev. |
| Jyotish | `caBLgExOBsQ` | Komilla Sutton | Vimshottari Dasha: Time and Karma | Replace. A respected astrologer, but another person's brand and not your lineage. |
| Jyotish | `zzRZGZv88n4` | Astrology for you | Vimshottari Mahadasha of Rahu... #astrology #rahu | Replace. Generic hashtag channel; a "Rahu mahadasha" video tends to frighten, which conflicts with principle 1. |

Things found while checking:

- **Vior.** Vior Naturals (viornaturals.in) is a Bach Flower *training* and remedy business. Its YouTube channel appears to be `@BachFlowerTraining` (video `vqjMifTgXZE`, "Bach Flower Remedies Training as Therapist ... Heal Your World", verified on oEmbed). That video is a **course promotion with a phone number**, so it is not a good "what is Bach" explainer. The playlist "BACH-FLOWER HINDI" that shows up in searches belongs to a Kolkata homoeopath (`@DrGopalLOHIYA`), **not** to Vior.
- **Gurudev.** The official channel is `@gurudev` (verified). Verified Gurudev videos found: `xOlLDeVJLGs` "You Can Be Happy Only When..." (Short), `V1CZan9Tb34` "Relieve Anxiety & Stress", `DulNz2CkoHI` "Short Meditation For Beginners" (10 min), `_19sQY5pna8` "Guided Meditation To Deal With Anxiety". `4mOTNlB7KPY` ("Who Is The Most Powerful God?") is a theology Short, so skip it. `icKFs9V5TKA` ("SKY Breathing Technique Is Immensely Beneficial!") is from `@MeditationsByGurudev`: confirm that channel is official.
- **Jyotish Vastu Academy.** I could not find a YouTube channel with exactly that name; the closest is a Hindi channel "Jyotish & Vastu". Since you are not part of the academy yet, embedding its videos on your pages would suggest an affiliation that does not exist. Embedding itself is allowed by YouTube when the owner has not disabled it, but the honest options are: (a) no Jyotish video for now, (b) a plain "learn more" link with the channel named and no implication that you are part of it, or (c) a 30 to 60 second video you record yourself about what a session is like. (c) beats any third-party video.
- Any "benefits" or "cures" claims inside a video are *that organisation's* claims, but on your page a viewer reads them as yours (principle 3). Prefer videos that explain and invite, not promise.

## 2. Prompt for Gemini (copy everything inside the box)

```text
You are helping me curate YouTube videos for my website https://antarshanti.co.in (Antarshanti Healing, Hyderabad, India). I am Srikanth: an Art of Living teacher, a certified Bach Flower therapist and a Jyotish (Vedic astrology) practitioner. The site offers (1) Jyotish consultations (donation-based), (2) Bach Flower consultations, and (3) the Art of Living Happiness Program, which I teach as voluntary service. Visitors are often stressed, tired or worried. Each service page shows 2 to 3 short videos so a first-time visitor can quickly understand and feel what the service is about.

WHY: the current videos were picked at random by an AI and many come from unrelated creators (a baby-products brand, a yoga app, a generic astrology hashtag channel). I only want videos from the OFFICIAL channels of the organisations my work comes from. You have YouTube access: OPEN every video, do not answer from memory, and NEVER invent a video ID or a view count. If you cannot verify something, write "not found" or "not verified".

ALLOWED SOURCES (official channels only, no third-party re-uploads):
A. Bach Flower: Vior Naturals (https://www.viornaturals.in/) and its official YouTube channel(s). Start from the links on viornaturals.in and from @BachFlowerTraining (I believe it is Vior's; confirm, and list any other Vior channels). If Vior has too few suitable videos, you may add the Bach Centre (UK, the Edward Bach heritage centre) as a clearly labelled second source.
B. Happiness Program: Gurudev Sri Sri Ravi Shankar's official channel (@gurudev) and The Art of Living (@artofliving-official, and Art of Living India). Prefer Gurudev's YouTube Shorts. Confirm each channel is official (verified badge, or linked from artofliving.org).
C. Jyotish: Jyotish Vastu Academy. I am NOT yet a member or student there. First tell me: does an official YouTube channel exist, what are its exact name, handle, URL, subscriber count and languages, and do its videos allow embedding? Then list candidate videos. Also tell me honestly whether it is appropriate for me to feature another academy's videos before I am part of it, and what authentic alternative you suggest (for example no video, a link-out, or a short video I record myself).

WHAT TO PICK:
- Bach: 3 videos. Happiness: 3 videos, at least 2 of them YouTube Shorts (60 seconds or less). Jyotish: 2 videos, or "none suitable".
- Most viewed first: inside each allowed channel, shortlist the highest-viewed videos that pass the rules below, then choose the best ones. Give the view count and today's date next to it.
- Short and crisp: Shorts or videos under 3 minutes preferred. Hard limit 5 minutes unless it is a single exceptional explainer (say why).
- Right fit: explains what the thing is, how it feels or how it works, for someone who has never tried it.

REJECT a video if it: promises cures or guaranteed results; makes medical claims or says it replaces a doctor or medicine; uses fear, urgency or doom predictions (especially "bad period" Rahu, Ketu or Saturn content); advertises courses, prices, phone numbers or discount codes, or pushes a purchase; is mainly about politics, other religions, controversy or a topic unrelated to the service (for example "Who is the most powerful God?"); is clickbait, poor audio or low quality; is a third-party re-upload; or cannot be embedded.

LANGUAGES: English first. If a good Hindi or Telugu version of the same idea exists on an official channel, list it as an alternate (my site is in English, Telugu and Hindi).

VERIFY each pick by opening it: confirm channel, exact title, view count today, duration, publish date, language, and that it plays at https://www.youtube.com/embed/VIDEO_ID. Watch or skim it, and quote (with timestamp) any sentence that makes a health or benefit claim or conflicts with the rules.

OUTPUT, in exactly this order:
1) Channel verification table: section, channel name, handle, URL, official? (how you know), subscribers, notes.
2) For each section a table: rank, VIDEO_ID, exact title, URL, channel, duration, views (as of today), published date, language, embeddable Y/N, why it fits (one line), claim to watch (quote + timestamp, or "none"), confidence (high/medium/low).
3) A short list of high-view videos you rejected and the rule each broke, so I can see the rules were applied.
4) Your final recommendation: the 3 + 3 + 2 to use, each with a one-line plain-English caption that makes no health claim.
5) Anything you could not verify.

CURRENT VIDEOS ON MY SITE, give a keep/replace verdict and reason for each:
Bach: Cm5DVzkOo_U (R for Rabbit - Baby & Kids), FafMg6pU8P8 (Stoic Herbalist), 9wa5HW0rRoY (Sharmee Divan).
Happiness: gWwhIPAajfw (ART OF LIVING INDIA, @artoflivingindia8958; is this the official Art of Living India channel?), yJeXYLeWKqs (7pranayama Yoga App), 94pOfxIQMxo (The Art of Living, @artofliving-official).
Jyotish: caBLgExOBsQ (Komilla Sutton), zzRZGZv88n4 (Astrology for you).
```

## 3. After Gemini answers

Paste its section 4 (final recommendation) and section 1 (channel table) to Claude, say which Jyotish option you chose, and Claude will: swap the video IDs in `src/bach.njk`, `src/happiness.njk`, `src/jyotish.njk` and `src/checkin.njk`; update the captions in `en.json`, `te.json` and `hi.json`; and add a small "From the official channel of ..." credit line under each video. Spot-check two or three picks yourself (open them, watch ten seconds) before approving, because the model can still be wrong about view counts and channel ownership.
