# Small "taste" activities for each page (28 Nov 2026)

> **Update 28 Nov 2026:** the Jyotish and Bach rows below (sample chart, sample blend) are replaced by `ENGAGEMENT-PLAN-JYOTISH-BACH.md`, because a personal sample cannot be given to every visitor.


One tiny, calm activity under the hero text of each page. It gives a **glimpse of what the visitor would get**, takes under a minute, asks for nothing, and ends with **one gentle next step** (scroll to booking or registration) plus the human option (WhatsApp).

Status: **Happiness is built** (preview branch `design/wheel-moment`). Home, Jyotish and Bach are proposals with mock-ups, waiting for your choice.

## 1. Rules every activity follows (from `GUIDING-PRINCIPLES.md` and the Awwwards review)

1. **Opt-in and small.** One tap to start. No pop-up, no modal, no autoplay, no sound, never blocks the page.
2. **Under a minute**, and the page works the same without it.
3. **Nothing stored, nothing typed.** Choices only; no free text; no personal data. Analytics only counts that something happened, never *what* the person chose or felt.
4. **Start with what is good, tell the truth.** No fear, no predictions, no cures. Traditional associations are labelled as traditional; samples are labelled "sample".
5. **A human is one tap away.** WhatsApp is always offered at the end. Where a choice suggests someone may be struggling, the next step is a person or real help, never a sale.
6. **The next step is an offer, not a push.** The end state shows one button, "See the next batch ↓" or "Book a reading ↓". It scrolls smoothly (instantly with reduced motion) and moves keyboard focus to the target.
7. **Same spot, same form, per-page colour.** Under the hero text; a round, quiet element in the page's own colour (peach home, saffron Jyotish, rose Bach, green Happiness).
8. **Reduced motion and keyboard are first-class.** Still version with words and numbers; real buttons; screen-reader captions.
9. **Cheap to load.** A few KB of JavaScript, only on that page; no libraries; no layout shift.
10. **Three languages.** English, Telugu, Hindi, with the new words logged in `TRANSLATION-CHANGES-LOG.md` for native review.

### Scroll: ask, or scroll automatically?
**Ask.** After the activity, a button offers the next step and scrolls only when tapped. Automatic scrolling takes control from the visitor (the Awwwards review lists scroll-jacking as a score killer) and clashes with a calm site. If you still prefer automatic, the safe form is "scroll only after the visitor taps the button on the result", which is what the button already does.

## 2. The ideas

| Page | Activity | What they do | The glimpse of what they get | Ends with | Effort | Risk |
|---|---|---|---|---|---|---|
| **Happiness** (built) | A minute of calm breathing: in 4, hold 4, out 6, rest 2, x3 | Tap the orb; follow the counting orb; answer "How do you feel?" | What guided breathing feels like | Calmer or same: "See the next batch ↓" (scrolls to `#register`) + WhatsApp. Uneasy: WhatsApp only | Done | Low (see safety) |
| **Home** | "How are you arriving today?" | Tap one of four: busy mind / heavy heart / want direction / just looking | How the three paths fit together; the right door for them | Highlights the matching card and offers "Show me ↓". "Just looking" offers the 5-minute check-in. "Heavy heart" adds the care line (talk to someone you trust; Tele-MANAS 14416) | Small | Low. Routing, not a glimpse of a service (deviation, see section 4) |
| **Jyotish** | "See what a reading looks like": a **sample** chart explained | Tap Rising sign, Moon, Life season; each lights a part of a sample chart with two plain lines | The actual deliverable: a chart read for temperament, feelings and life season | "Book a reading ↓" (to `#booking-widget`) + WhatsApp | Medium | Low if clearly "sample, not a real person" and no predictions |
| **Bach** | "What are you feeling these days?" and a **sample blend** | Pick up to three feelings; a bottle fills with a sample blend | A personalised bottle: how a consultation turns feelings into a blend | "Book a consultation ↓" (to `#booking-widget`) + WhatsApp | Medium | Medium: remedy wording must stay "traditionally associated" and never a prescription |

Mock-ups of Home, Jyotish and Bach are in the chat (`engagement-ideas.png`). Happiness is live on the preview.

### Alternatives considered
- **Jyotish: "Today's planet".** Each weekday has a traditional planet (Sunday Sun, Monday Moon, Tuesday Mars, Wednesday Mercury, Thursday Jupiter, Friday Venus, Saturday Saturn). One line plus a gentle reflection for today. No data, changes daily, easy to build. It shows the *language* of Jyotish, not the *deliverable*, and it needs wording that never sounds like a forecast. Good as a small second line later; weaker than the sample chart for booking.
- **Jyotish: "Bring one question".** Four life areas (work, relationships, energy, change) each showing how a session approaches it. Simpler than a chart, less visual.
- **Bach: single feeling, one essence.** Simpler than the bottle, but loses the "my own blend" idea that explains why a consultation is needed.
- **Home: showing all three tastes** (a one-minute breath, a sample chart, a sample bottle). Too much for the top of the home page; the picker routes people to the page where the taste lives instead.
- **Check-in page:** already an activity (the 5-minute check-in); no change.

## 3. Guardrails per activity

**Happiness (breathing).** Breath holds are not comfortable for everyone. So: a visible "Skip the holds (gentler)" option; "a bit uneasy" is a valid answer and never leads to registration; a short note says it is simple paced breathing, **not Sudarshan Kriya** (learned with a teacher in the program) and not medical advice. Do not call it "SKY".

**Home (picker).** "Heavy heart" must show the care line and must not suggest a product as treatment. No scores, no labels.

**Jyotish (sample chart).** A made-up chart, labelled as such. Explanations are about temperament and patterns, "a reflective framework, not a promise about the future" (your own hero wording). No planetary "bad periods".

**Bach (blend).** Essence names and one-line keywords come from Dr Bach's traditional descriptions. Wording stays "in Dr Bach's system ... traditionally associated with ...", plus "a real blend is chosen with you in a consultation; this is only a glimpse". For "Low or hopeless", add the care line (doctor or counsellor, Tele-MANAS 14416). Bach remedies are complementary; do not imply treatment of a condition. **You are the certified practitioner, so every essence and keyword line should be checked by you before it goes live.**

## 4. Where an idea deviates from "a glimpse of what you get"
- **Home picker** routes rather than previews. It is still worth it: it removes the "which path is for me?" hesitation, which is the usual reason people leave a three-offering home page.
- **Today's planet** previews the language, not the service.
- The **sample chart** and **sample bottle** are the true "glimpses", which is why they come closest to booking.

## 5. Measuring whether it helps (without being pushy or invasive)
Events (counts only, no choices): `engage_start`, `engage_done`, `engage_cta` with `{page}`. Happiness currently sends `breathe_start`, `breathe_done`, `breathe_cta`; renaming to the shared names is a two-line change when the others are built.

Read them against the events already on the site (`register_click`, `slot_selected`, `pay_click`, `whatsapp_click`). People who choose to engage are more interested to begin with, so compare *before and after* the launch, over several weeks, rather than engaged against not engaged. With low traffic, treat the numbers as a direction, not proof. Netlify split testing (half the visitors see it) is the cleaner test if traffic grows.

## 6. Suggested build order
1. **Happiness breathing**: done; review on the preview, then merge.
2. **Home picker**: smallest, and routes visitors to every other page.
3. **Jyotish sample chart.**
4. **Bach sample blend**: last, because its wording needs your review.

## 7. Questions for you
- Home: keep the Whisper wheel alone, or add the picker?
- Jyotish: sample chart, or "Today's planet", or both?
- Bach: do you want the bottle, and which essences and keywords are you comfortable showing?
- Keep the scroll as a button ("ask"), or add automatic scrolling after the button is tapped?
