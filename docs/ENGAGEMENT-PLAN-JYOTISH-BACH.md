# Plan: the Jyotish and Bach "taste" activities (28 Nov 2026)

Replaces the Jyotish and Bach rows of `ENGAGEMENT-IDEAS.md` (sample chart, sample blend). Mock-up: `docs/images/jyotish-bach-mockups.png`.

## 1. Why the first idea changes

A personal sample chart or sample bottle needs one person's details, and a reading cannot be given to every visitor. So the activity must be **the same for everyone, take under a minute, need no input, and still teach something true that visitors do not know**. The pattern: find the question people ask most, find the common misunderstanding behind it, and show the more specific truth. The specific truth always needs the person, so the next step is a booking, never a pitch.

## 2. What the research found

### Jyotish
- **What people ask.** Career, marriage and relationships, and doshas with remedies dominate; "when" questions (when will I marry, why is it delayed, when will a job come) are the typical form. Source: a vendor's own study of about 134,000 opening questions to an AI Jyotishi (career 39%, marriage 24%, doshas and remedies 22%). It is a commercial source, so treat the numbers as direction only.
- **The misunderstanding that is least known and easiest to show: "my sign".** People think Jyotish reads from the sign in the newspaper. Three facts, none widely known:
  1. Jyotish uses the **sidereal** zodiac. It sits about **24.2 degrees** behind the Western (tropical) one in 2026. I counted over a year: the Vedic Sun sign differs from the Western Sun sign on **294 of 365 days (81%)**. Sources describe both systems as internally consistent; it is not a disagreement about astronomy.
  2. A Jyotishi's "sign" means the **Moon sign** and the **rising sign (Lagna)**, not the Sun sign.
  3. The rising sign changes about **every two hours**, so two people born the same day have different charts. Computed for Hyderabad on 28 Nov 2026: all 12 signs rise within one day, each for **1.6 to 2.2 hours**. Check: at sunrise the rising sign equals the Sun's sign (Scorpio that day), as it should.
- **Other facts people get wrong** (candidates for small "did you know" cards, your call):
  - **Sade Sati** is counted from the Moon sign (not the Sun sign or Lagna), lasts about 7.5 years (three signs of about 2.5 years) and comes about every 29.5 years, so most people meet it two or three times. Several sources call "7.5 years of suffering" an oversimplification that creates unnecessary fear. It is tradition, not tested fact.
  - **Rahu and Ketu** are two mathematical points (where the Moon's path crosses the Sun's), not planets. (General astronomy, not from the searches.)
  - **Timing is by seasons, not dates.** The Vimshottari system is a 120-year cycle of nine planetary periods; the first one is set by the Moon's nakshatra at birth. Sources say it shows windows better than exact dates.
- **Not found:** any independent evidence that Jyotish predicts events. The activity must therefore describe how a chart is built, never promise outcomes. Your own hero wording ("a reflective framework, not a promise about the future") stays.

### Bach
- **What people ask.** "Which flower remedy is for my anxiety / stress?" and "Is Rescue Remedy the Bach remedy?" (general product-page questions; I found no study of what is asked).
- **The misunderstanding that is least known and easiest to show: "one remedy per feeling word".** In Dr Bach's system the **Fear** group alone has five remedies, chosen by the *kind* of fear: Rock Rose (terror, panic), Mimulus (fear of known things), Cherry Plum (fear of the mind giving way, losing control), Aspen (fear or dread of unknown origin), Red Chestnut (over-concern for loved ones). So "anxious" is at least five different feelings, and telling them apart is the work of a consultation. This is exactly what the interview does, and it needs no claim about results.
- **Other facts people get wrong** (candidate cards):
  - **Rescue Remedy is not one of the 38.** It is a blend of five (Rock Rose, Impatiens, Clematis, Star of Bethlehem, Cherry Plum) for stressful moments.
  - **Not homeopathy.** Diluted in a similar way but not potentised or shaken, and not "like cures like". Preserved in brandy.
  - **Chosen by how you feel, not by a diagnosis.** The Bach Centre says each remedy is directed at an emotional state.
- **The honest evidence note (important).** Systematic reviews (Thaler and colleagues, 2009; Ernst) found no benefit beyond placebo, for example in exam-anxiety trials with Rescue Remedy; the evidence is small and low in quality, and the remedies were judged probably safe. The Bach Centre itself says it does not see its role as proving the remedies work. So the site must **not** say the remedies reduce anxiety. The truthful and still valuable framing: *a calm way to name and notice what you feel; complementary, not a treatment, not a replacement for care.* This is your professional and ethical call; I recommend one short line near the activity.
- **Source limits.** The Bach Centre website is not reachable from my sandbox, so the keyword wording above comes from several secondary sources. One questionnaire blurs Cherry Plum and Red Chestnut. **Please check every line against the Bach Centre's own text before anything goes live.**

## 3. Jyotish activity: "Twelve charts, one birthday"

**Where and how.** Under the Jyotish hero text, same spot as the breathing orb on the Happiness page, in the saffron colour. A round chart (12 signs, 12 house numbers) and one time slider.

**What the visitor does (under a minute).**
1. Sees one sample day in Hyderabad, set at sunrise, with a plain line: "Everyone born today shares the same Sun sign."
2. Drags the time (15-minute steps, 96 positions; arrow keys work). The rising sign lights up and the house numbers turn around the chart. The Sun sign never changes.
3. After a few moves (or on release) the closing line appears: "Same day, same Sun sign, twelve different charts. A newspaper horoscope speaks to all of them at once. A reading starts from your birth time."
4. One button: "Book a reading ↓" (scrolls to the booking widget when pressed; asks nothing else) and WhatsApp.

**Optional second layer: three small cards under the chart.** "Your Vedic Sun sign is usually one sign earlier than the newspaper's (4 days in 5)." "Jyotish reads from your Moon and rising sign." "Sade Sati: a season, about 7.5 years, that most people meet two or three times." Each labelled as traditional.

**Data.** A fixed table of 96 rising signs for the sample day, computed once at build time with a proper ephemeris (Swiss Ephemeris, Lahiri) and checked against your own Jyotish software. No calculation in the browser, about 1 KB, no personal data. My sandbox could not install Swiss Ephemeris, so the numbers above come from a standard sidereal-time formula (checked at sunrise), good to a few minutes; the shipped table must be re-checked.

**Phase 2 (not now).** "Life seasons": a bar of the nine Vimshottari periods (Ketu 7, Venus 20, Sun 6, Moon 10, Mars 7, Rahu 18, Jupiter 16, Saturn 19, Mercury 17 years) to answer the "when" question: life is lived in seasons of 6 to 20 years. Needs your review of the wording.

## 4. Bach activity: "Anxious? Which kind?"

**Where and how.** Under the Bach hero text, rose colour. Five petals around the word "Anxious".

**What the visitor does.**
1. Reads "Anxious can mean five different things. Which sounds most like you?"
2. Taps a petal: a sudden fright or panic; a fear of something you know; a dread with no clear reason; a fear of losing control of your mind; worry for someone else.
3. A card opens in plain words (draft in the mock-up). Optionally "In Dr Bach's system this has its own flower: Aspen. (Traditional description, not a prescription.)"
4. Closing line: "The same word gave five answers. Which one fits you is what a conversation is for." Buttons: "Book a consultation ↓" and WhatsApp. Visitors can tap several petals; nothing is scored or stored.

**Safety.** The "sudden fright or panic" and "losing control of your mind" cards add the care line (talk to someone you trust; Tele-MANAS 14416), as on the home picker. No card names a condition or promises relief, and none suggests a purchase. Wording always "traditionally associated with".

**Variant without flower names.** Show only the five feelings, never the flowers. Safer and plainer, but loses the curiosity that makes the Bach side feel real. I recommend showing the names, with the traditional-description line.

## 5. Shared rules (same as the Happiness orb)
- One tap to start; no popup, sound or autoplay; page works without it.
- Nothing stored; analytics only counts (`engage_start`, `engage_cta`), never which petal or time.
- Reduced motion: no animation; the chart and petals change state instantly. Keyboard and screen readers: real buttons and a range input; an `aria-live` line says what changed ("At 12:30 the rising sign is Aquarius").
- Phone: chart and petals scale to the width; 44 px targets; 16 px text.
- Languages: en, te, hi. Sign names have standard Telugu and Hindi forms; new strings are logged in `TRANSLATION-CHANGES-LOG.md` for native review.
- Cost: about 3 to 4 KB of script per page plus the 96-value table; no libraries; no layout shift (space reserved).
- Measure: compare booking clicks before and after launch over weeks, not engaged versus not engaged.

## 6. What I need from you
1. **Approve the two ideas** (or pick another "misunderstanding" from section 2).
2. **Bach wording:** verify the five feelings and keywords against the Bach Centre; decide whether flower names are shown; decide the honest line about evidence.
3. **Jyotish facts:** confirm you are comfortable with the three "did you know" cards (especially Sade Sati wording), and cross-check the 28 Nov Hyderabad rising-sign table (06:30 Scorpio, 12:30 Aquarius, 19:30 Gemini) in your own software.
4. **Sample day and place:** Hyderabad on a fixed sample day (as above), or another.

## 7. Build order
1. Jyotish chart (medium).
2. Bach petals (small, after your wording is final).
3. Optional "did you know" cards.
4. Later: "Life seasons"; "Doorways" design option from the earlier round.

## 8. Sources
- Questions people ask: [Ishvaram, "what India actually asks a Jyotishi"](https://ishvaram.com/blog/what-india-actually-asks-a-jyotishi/) (vendor study); [Vedic Feed](https://vedicfeed.com/questions-to-ask-astrologer/).
- Sade Sati: [Wikipedia](https://en.wikipedia.org/wiki/Sade_Sati); [Astromedha](https://astromedha.in/insights/concepts/what-is-sade-sati).
- Sidereal and tropical, ayanamsa: [Natal Echo](https://natalecho.com/learn/astrology/tropical-sidereal-zodiac-ayanamsha); [Dekho Panchang](https://dekhopanchang.com/en/learn/sidereal-vs-tropical); [Art of Living, Vedic astrology](https://www.artofliving.org/us-en/spirituality/vedic-astrology).
- Rising sign: [Farmers' Almanac](https://www.farmersalmanac.com/rising-signs-guide); [Wikipedia, Ascendant](https://en.wikipedia.org/wiki/Ascendant).
- Dasha: [Wikipedia, Dasha](https://en.wikipedia.org/wiki/Dasha_(astrology)).
- Bach: [Bach Centre FAQ](https://bachcentre.com/en/contact/faqs/on-theory-belief-research/) and [quick reference guide](https://bachcentre.com/en/remedies/the-38-remedies/quick-reference-guide/) (not readable from the sandbox; seen only through search summaries); [Thaler et al. 2009, systematic review](https://pubmed.ncbi.nlm.nih.gov/19470153/); [Edzard Ernst on Bach remedies](https://edzardernst.com/category/bach-flower-remedies/).
