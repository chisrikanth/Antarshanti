# Telugu and Hindi: status and how to get them reviewed

## Where each page's notes are (start here)
**Newest first: Part 7 (18 Nov, gist-first rewrite), Part 6 (18 Nov, questions) and Part 5 (17 Nov, later in the day) supersede anything in Parts 1 to 4 that it contradicts. Open items for you are in `TODO-SRIKANTH.md` (D4); AI-side follow-ups are in `docs/AI-ACTIONS.md`.**

Every page has its own list of doubts, written by the translator at the time. Each row says: the key in the language file | what was used | why unsure | alternative. Go page by page.

| Page | Telugu and Hindi notes are in |
|---|---|
| Free check-in | Part 1 (check-in), plus the plain-words list in Part 3 |
| Home | Part 2 |
| Happiness Program | Part 2 |
| Jyotish (with its booking widget) | Part 3 |
| Bach Flower (with its booking widget and payment messages) | Part 3 |
| Booking widget words shared by both (days, months, buttons) | Part 3 |
| Privacy Policy | Part 4 |
| Terms of Use | Part 4 |
| Refund Policy | Part 4 |
| Check-in plain-words changes, all pages | Part 3 ("Plain-words pass") |
| **"Thinking in English" fixed: check-in statements and all pages rewritten from the meaning** | **Part 7** |
| **All questions (check-in 25 items, FAQs, prompts) rewritten to sound natural** | **Part 6** |
| **Second read-through (all pages): natural headlines, everyday words, questions for you** | **Part 5**, and the line-by-line before/after list in `docs/TRANSLATION-CHANGES-LOG.md` |

**How to give feedback:** send "page, item number or key, your replacement". Or edit `src/_data/i18n/te.json` / `hi.json` yourself (keys are named in every row). Nothing goes live until the flags in `src/_data/i18n/review.json` are set to true.


## What exists now
| Part | English | Telugu | Hindi |
|---|---|---|---|
| Check-in (ad landing page): consent, 25 questions, results, safety box, next steps, save form | done | **draft** | **draft** |
| Menu, footer, "talk to Srikanth" strip | done | **draft** | **draft** |
| **Home page** | done | **draft** | **draft** |
| **Happiness Program page** (incl. batch cards, FAQ, video captions) | done | **draft** | **draft** |
| **Jyotish and Bach Flower pages** (with booking widgets, FAQs) | done | **draft** | **draft** |
| **Privacy, Terms and Refund pages** | done | **draft** | **draft** |

Draft means: translated by an AI assistant, **not yet read by a native speaker**. Because this is a mental-wellbeing tool, nothing in Telugu or Hindi goes on antarshanti.co.in until a person you trust has read it.

## The safety gate (already built)
- Telugu and Hindi pages are built **only on the staging and test sites**, never on the live site, until you change a switch.
- The switch is the file `src/_data/i18n/review.json`: `{ "te": false, "hi": false }`. Change `false` to `true` for a language once it is reviewed and merged to `main`, and it appears on the live site, in the sitemap, and in Google with proper language tags.
- A visitor whose phone is set to Telugu or Hindi then sees a small, dismissible suggestion ("View this page in Telugu"). Nobody is forced; the choice is remembered.

## Where to read the drafts (staging site)
- Telugu: `https://staging--aquamarine-croquembouche-26e205.netlify.app/te/checkin`
- Hindi: `https://staging--aquamarine-croquembouche-26e205.netlify.app/hi/checkin`
- Ask the reviewer to take the whole check-in **once with mostly good answers and once with mostly heavy answers** (to see both kinds of result text, and the helpline box).

## A message you can send the reviewer (WhatsApp)
> Namaste, could you please read this short wellbeing check-in in Telugu/Hindi (link) and tell me anything that sounds unnatural, too formal, too harsh or wrong? It's for people who may be feeling low or stressed, so it must sound warm, simple and calm, never scary. Please note any word you would change and what you would use instead.

## What to ask the reviewer to look at first
1. Does it sound like a kind person talking, in everyday language? (not bookish, not like a medical form)
2. Is anything frightening or too blunt, especially the "Heavy right now" result and the safety box?
3. Are the five answer words natural and evenly spaced? (Never, Rarely, Sometimes, Often, Always)
4. Question 25 (the self-harm question): is the meaning clear and direct without being harsh?
5. Any English words that are better than the Telugu/Hindi ones people actually use?

## Specific word choices to double-check
**Telugu**
- *Feeling low* = "దిగులు" (everyday feeling word; might feel more "sad" than "low")
- *Worry and tension* = "ఆందోళన, టెన్షన్"
- *Emotional balance* = "భావాల సమతుల్యత" (slightly bookish; the result text elsewhere says "భావోద్వేగ", so this is not fully consistent)
- *Mindfulness* = "ధ్యాస" (attention/awareness; may feel plain)
- *Self-esteem* = "ఆత్మగౌరవం"
- *Heavy right now* = "ఇప్పుడు బరువుగా ఉంది" and its note ("మిమ్మల్ని చాలా బరువుగా నొక్కుతోంది": is that too strong?)
- Answer words: అస్సలు లేదు / అరుదుగా / కొన్నిసార్లు / తరచుగా / ఎప్పుడూ. The assistant was least sure here. Alternatives: "ఒక్కసారీ లేదు" for Never, "ఎల్లప్పుడూ" for Always.
- Self-harm question: "...మిమ్మల్ని మీరు బాధపెట్టుకోవాలనే ఆలోచనలు". Does "బాధపెట్టుకోవడం" clearly mean self-harm? Alternative "గాయపరచుకోవడం" is clearer but harsher.
- "On edge" has no exact Telugu word; "మనసు నిలకడ లేకుండా" is an approximation.
- "Showing up often" = "తరచుగా కనిపిస్తోంది" (very literal); maybe "తరచుగా ఉంటోంది".
- Product names are written in Telugu script (సుదర్శన క్రియ, బాచ్ ఫ్లవర్, వాట్సాప్, కౌన్సెలర్, డాక్టర్).
- Some words use a zero-width joiner (e.g. "వాట్సాప్‌లో"): check they display correctly on common Android phones.

**Hindi**
- *Feeling low* = "उदास मन" (a bit blunter than "low"; alternative "मन भारी", but that is used for the top band)
- *Worry and tension* = "चिंता और तनाव"
- *Emotional balance* = "भावनात्मक संतुलन" (a little bookish; softer: "मन का संतुलन")
- *Mindfulness* = "माइंडफुलनेस" (transliterated; or "सजगता")
- *Heavy right now* = "अभी मन भारी है"
- *A real strength* = "सच्ची ताक़त" (weakest point)
- *Snapshot* = "झलक"; *areas* = "हिस्से" ("{n} हिस्सों को..." reads well?)
- Answer words: कभी नहीं / शायद ही कभी / कभी-कभी / अक्सर / हमेशा
- Self-harm question: "ऐसे विचार आए कि जीवन जीने लायक नहीं है, या खुद को नुकसान पहुँचाने के विचार आए" (weakest: "जीने लायक")
- Verbs are gender-neutral throughout, so a few lines may read slightly stiff. "श्रीकांत जी" is used in running text.
- The sentence "{primary} के साथ {other} भी अपनाया जा सकता है" is passive and slightly less warm than the English.

## How the reviewer's corrections get in
Easiest: the reviewer sends a list ("replace X with Y"), and you paste it to Claude. Or edit the file directly on GitHub: `src/_data/i18n/te.json` or `hi.json` (the English master is `en.json`, keys are identical). Never change anything inside `{braces}` or HTML tags.

## Next translation steps
1. Nothing left to translate on the site pages. Remaining: server messages, and re-translating whenever the English changes.
3. Privacy, terms and refund pages (these need a careful, ideally professional translation).
4. WhatsApp pre-filled messages on those pages.


---

# Part 2: Home and Happiness pages — doubts logged for review (added 17 Nov 2026)

Staging links: `/te/` and `/hi/` (Home), `/te/happiness` and `/hi/happiness`.
Everything below is a place where the AI translator was **not sure**. Please have your reviewers look at each one. "Alt" means the alternative the translator suggested. Items marked **[DECISION]** need a choice from you, not just a language check.

## Things that need a decision from you
- **[DECISION] How to address Srikanth in messages.** Hindi uses "श्रीकांत जी". Telugu Home/Happiness messages use "శ్రీకాంత్ గారు" but the earlier Telugu check-in messages use plain "శ్రీకాంత్". Pick one (suggest "గారు" everywhere, it is more respectful).
- **[DECISION] Donation wording.** The sentence "the program is by donation to the Art of Living Foundation and I offer it as voluntary service" is a factual/financial statement. Please confirm the wording is accurate in all three languages and not read as a fixed charge (Telugu `happiness.register.text`; Hindi `happiness.register.text`).
- **[DECISION] Jyotish contribution wording on the Home card** ("contribute what feels right"): Telugu "మీకు తోచినంత సమర్పించవచ్చు", Hindi "जो ठीक लगे, उतना योगदान दें". Make sure it matches the donation wording on the Jyotish page when that is translated, and does not sound like a fee or pressure.
- **[DECISION] "Heal/healing" in the brand voice.** Hindi uses the English word "हीलिंग" in running text; Telugu uses "స్వస్థత" (Sanskritised) in one heading. Choose the style you want.
- **Batch details** (time, fee, mode) are translated automatically only for the standard phrases ("By donation to the Art of Living Foundation", "Evening · 6:00–8:30 PM IST", "Online (Zoom)", "Online", "In-person"). Any other wording shows in English unless you add translations in the batch's `translations` (Supabase) or `i18n` (site.json). Dates are formatted automatically by the browser (e.g. Telugu "3 డిసెం, గురు – 6 డిసెం, ఆది 2026") and should be glanced at.

## TELUGU: doubts (37)
**Headlines and brand voice**
1. `home.hero.title` "అంతర్శాంతికి స్వాగతం — మీ మనశ్శాంతికి దారి." The ending "కి" attaches straight to the styled brand name; "your path to inner peace" became "the way to your mind's peace", looser than English. Alt: "మనశ్శాంతి వైపు మీ ప్రయాణం".
2. `home.hero.intro` four "-ని" endings in a row in first person may sound heavy. "జ్యోతిష్యుడు" right word? Alt: "జ్యోతిష్య నిపుణుడిని".
3. "జ్యోతిష్య నిపుణుడు" for "Jyotish practitioner" (`home.hero.proof`, `home.about.chips[2]`, `home.hero.portraitAlt`): male-gendered, and "నిపుణుడు" sounds like "expert". Alt: "జ్యోతిష్య సలహాదారు" or "జ్యోతిష్య సాధకుడు".
4. `happiness.hero.title` (also topbar, cta) "ప్రశాంతమైన మనసు, ఒక్కో శ్వాసతో." Does "one breath at a time" read right, not "one breath each"? Alt: "ఒక్క శ్వాస తర్వాత ఒక్క శ్వాసగా".
**Home page**
5. `home.offerings.intro` "మార్గపటం" (map) is bookish; "గమ్యం", "వ్యవస్థ" feel formal. Alt: "దారిని చూపిస్తుంది", "మ్యాప్ లాంటిది".
6. `home.offerings.jyotish.text` "కాలాలు" (seasons of life) may read as weather seasons; "ధోరణులు" formal. Alt: "జీవితంలోని వేర్వేరు దశలకు".
7. `home.offerings.jyotish.btn` "సంప్రదింపు బుక్ చేయండి →" ("Book a reading"): generic. Alt: "జాతక పరిశీలన బుక్ చేయండి".
8. `home.offerings.bach.text` "చింత, దుఃఖం, భయం, ఆత్మసందేహాల్లో తోడ్పడే…": "చింత" chosen because "ఆందోళన" is used for anxiety in the check-in; "ఆత్మసందేహం" Sanskritised; dropped "to support you through" so grammar is loose. Alt for self-doubt: "తనపై తనకే సందేహం", "ఆత్మవిశ్వాసం తగ్గడం".
9. Eyebrow "భావోద్వేగ సౌఖ్యం" for "Emotional Wellness" (`home.offerings.bach.eyebrow`, `happiness.explore.bach.eyebrow`): "సౌఖ్యం" slightly literary. Alt: "భావోద్వేగ శ్రేయస్సు", "మానసిక సౌఖ్యం".
10. `home.offerings.happiness.ask` "తదుపరి బ్యాచ్ వివరాలు వాట్సాప్‌లో" is slightly passive. Alt: "తదుపరి బ్యాచ్ వాట్సాప్‌లో తెలియజేస్తాం".
11. `home.about.p1` "ఈ కాలపు ఒత్తిడి నాకు స్వయంగా తెలుసు": "firsthand understanding" became "I know it myself", "ఈ కాలపు" is literary. Alt: "ఈనాటి ఒత్తిడి".
12. `home.about.p2` "జీవితాంతం సాగే పిలుపు" (lifelong calling) too poetic/religious? "మనం పుట్టిన ఆకాశంలో" is a literal image that may sound strange without astrology context. Alt: "జీవితాంతం సాగే ఆసక్తి, సేవ".
13. `home.about.title` "రెండు లోకాలనూ చూసిన సాధకుడు": metaphor plus spiritual tone. Alt: "కార్పొరేట్ ప్రపంచాన్ని, ఆధ్యాత్మిక ప్రపంచాన్ని తెలిసిన వ్యక్తి".
14. `home.about.chips[4]` "20+ ఏళ్లు కార్పొరేట్ టెక్నాలజీ": terse. Alt: "20+ ఏళ్ల కార్పొరేట్ టెక్నాలజీ అనుభవం".
15. `home.kind.title` "నాతో కలిసి నడిచినవారి మాటల్లో" poetic vs "worked with". Alt: "నాతో పనిచేసినవారి మాటలు".
16. `home.cta.title` "స్వస్థత ప్రయాణం" Sanskritised; brand uses "హీలింగ్". Alt: "హీలింగ్ ప్రయాణం".
**Happiness page: wording of careful claims (please check these especially)**
17. `happiness.hero.intro` "ఎన్నో ప్రచురిత అధ్యయనాలకు కేంద్రమైన శ్వాస పద్ధతి": literal, "కేంద్రమైన" bookish. Alt: "ఎన్నో అధ్యయనాలు ప్రచురితమైన శ్వాస పద్ధతి".
18. `happiness.whatIs.text` "ప్రచురిత అధ్యయనాల ప్రకారం…తగ్గించడానికి…తోడ్పడవచ్చు": "ప్రకారం" (according to) may sound firmer than "suggest". Alt: "అధ్యయనాలు సూచిస్తున్నాయి". Check that "may help / results vary / complements, never replaces, medical care" still reads clearly and softly.
19. `happiness.whatIs.title` "చాలామందికి ఎంతో ప్రశాంతతనిచ్చే శ్వాస అభ్యాసం" states the effect more directly than "many people find". Alt: "చాలామంది ఎంతో ప్రశాంతంగా భావించే శ్వాస అభ్యాసం".
20. `happiness.learn.items[0].text` "ఉత్సాహంగా" (energising) means cheerful/enthusiastic. Alt: "శక్తినిచ్చేదిగా".
**Happiness page: other**
21. `happiness.learn.items[5].title` "కమ్యూనిటీ & సంఘం": "సంఘం" means society and may lose the meditation-community meaning. Alt: "సంఘ్" or "కమ్యూనిటీ & సత్సంగం".
22. `happiness.learn.items[2,3].title` "యోగా & స్ట్రెచింగ్", "గైడెడ్ ధ్యానం" loanwords; pure option "మార్గదర్శక ధ్యానం".
23. `happiness.register.fine` "అందరికీ స్వాగతం" changed "All levels welcome". Alt: "అన్ని స్థాయిల వారికీ స్వాగతం".
24. `happiness.faq[1].a` "లౌకికమైనది" (secular) can mean "worldly". Alt: "ఏ మతానికీ సంబంధం లేనిది".
25. `happiness.faq[2].a` "6:00–8:30 PM IST" left in Latin letters. Alt: "సాయంత్రం 6:00–8:30 (IST)".
26. `happiness.faq[3].a` "లాంగ్-SKY సెషన్‌లు": is there a Telugu name in use for "Long SKY"?
27. `happiness.watch.text` "గుడ్డిగా నమ్మాల్సిన అవసరం లేదు" ("blindly") stronger than English. Alt: "కేవలం నమ్మకం మీదే ఎంచుకోవాల్సిన పని లేదు".
28. `happiness.watch.channel.desc` spelling of "జర్నీ విదిన్", "పంచకోశ" (maybe "పంచకోశ ధ్యానం"); "గురుదేవ్" should maybe be "గురుదేవ్ శ్రీ శ్రీ రవిశంకర్"; "ది" dropped from "The Art of Living".
29. `happiness.watch.course.desc` "లైవ్ ఆన్‌లైన్, ప్రత్యక్ష…" the comma reads as two things; "ప్రత్యక్ష" (in-person) vs "live". Alt: "ఆన్‌లైన్‌లో, ఎదురెదురుగా (ఇన్-పర్సన్)".
30. `happiness.js.soonText` "ఫీజు, మీరు నిర్ణయించుకునే ముందే చెబుతాం." stray comma, literal. Alt: "ఫీజు గురించి ముందే చెబుతాం — మీరు నిర్ణయం తీసుకునే ముందు".
31. `happiness.js.seats` "{n} సీట్లు" (spoken) vs "{n} స్థానాలు" (formal).
32. "రిజిస్టర్ చేయండి" used for both the verb Register and the noun Registration; nothing earlier to reuse.
33. `happiness.register.text` donation sentence awkward ("విరాళంతో ఉంటుంది"). Alt: "విరాళం ఆధారంగా ఉంటుంది — ఫీజును ఫౌండేషన్‌కు విరాళంగా ఇస్తారు". (see decision above)
34. Overall register may be slightly bookish ("సంప్రదింపులు", "తోడ్పాటు", "స్వస్థత", "ప్రశాంతమైన"). Native reviewer: please say if it should be more conversational.
35. WhatsApp pre-filled messages all use "శ్రీకాంత్ గారు" (see decision).
36. `happiness.faq[3]` / FAQ and the batch-date formats: please confirm weekday/month abbreviations (e.g. "గురు", "ఆది", "డిసెం") look natural.
37. Fonts: the pages use Noto Sans Telugu; please check on a low-cost Android phone that conjuncts and the zero-width-joiner words (e.g. "వాట్సాప్‌లో") render correctly.

## HINDI: doubts (30)
**Headlines and brand voice**
1. `home.hero.intro` "…ध्यान प्रशिक्षक, हैदराबाद से।" reads clipped; "टीचर" + "प्रशिक्षक" mixes English and Hindi. Alt: "…और ध्यान प्रशिक्षक हूँ, हैदराबाद में रहता हूँ।", or "शिक्षक".
2. `home.hero.title` "भीतर की शांति की ओर आपका रास्ता।" slogan-like. Alt: "भीतर की शांति तक आपका सफ़र।"
3. `happiness.hero.title` (also topbar, cta) "शांत मन, एक-एक साँस से।" shorter than English. Alt: "थोड़ा और शांत मन, एक-एक साँस के साथ।"
**Home page**
4. `home.offerings.jyotish.ask` "जो ठीक लगे, उतना योगदान दें": "योगदान" may sound like a fee. Alt: "अपनी श्रद्धा से दक्षिणा", "अपनी इच्छा से जो दें". (see decision)
5. `home.offerings.jyotish.btn` "परामर्श बुक करें →" ("Book a reading"). Alt: "रीडिंग बुक करें →".
6. `home.offerings.jyotish.text` and `happiness.explore.jyotish.text` "ढर्रों" (patterns) can sound negative (a rut). Alt: "रुझानों", "चलनों".
7. `home.offerings.intro` "कोमल व्यवस्था" ("system") sounds administrative. Alt: "एक कोमल तालमेल", "एक-दूसरे के पूरक".
8. `home.offerings.bach.text` "प्राकृतिक फूलों के सार" unclear ("flower essences"). Alt: "फूलों के प्राकृतिक अर्क", "पुष्प-सार"; "खुद पर शक" for self-doubt, alt "आत्म-संदेह".
9. `home.about.title`/`p1`: long sentence with repeated "में", "बहुराष्ट्रीय" formal; "दोनों दुनियाएँ" (alt "दोनों दुनियाओं को"). Alt: "…एक बड़ी मल्टीनेशनल कंपनी की टेक्नोलॉजी इंडस्ट्री में…".
10. `home.about.p2` "जीवन भर का एक बुलावा" may read as a summons. Alt: "जीवन भर की एक पुकार", "…का एक लगाव". "हीलिंग" is an English word in the flow; alt "उपचार", "ठीक होना".
11. `home.about.chips[4]` "20+ साल कॉर्पोरेट टेक्नोलॉजी में": digit mix and chip length.
12. `home.kind.eyebrow` "दो अच्छे शब्द" unclear; alt "लोगों की ओर से", "आभार के शब्द". `home.kind.title` long.
13. `home.hero.waMessage` "…मुझे आपके काम के बारे में और जानकारी चाहिए।" (gender-neutral) may sound blunt.
**Happiness page: wording of careful claims (please check these especially)**
14. `happiness.hero.intro` first clause long; "साफ़" (clearer) may read as "clean". Alt: "ज़्यादा स्पष्ट".
15. `happiness.hero.about` "शोध का सार" natural? "गैर-लाभकारी" formal. Alt: "बिना मुनाफ़े वाली संस्था".
16. `happiness.whatIs.text` "नतीजे हर व्यक्ति में अलग हो सकते हैं" is slightly weaker than "results vary" (alt "अलग होते हैं"); "यह चिकित्सकीय देखभाल का पूरक है, उसकी जगह कभी नहीं लेता" reads heavy. Alt: "इलाज के साथ चल सकता है, इलाज की जगह नहीं ले सकता". Confirm it keeps the careful, non-promising tone.
17. `happiness.whatIs.title` longer than English. Alt: "साँस का अभ्यास, जो कई लोगों को गहरा सुकून देता है".
18. `happiness.learn.items[5].title` "समुदाय और संगत": "संगत" vs "सत्संग" (Art of Living term) vs "संघ". Alt: "समुदाय और सत्संग".
19. `happiness.learn.items[0,1].text` "ताज़गी" for "energising" (alt "ऊर्जा देने वाली"); "एकाग्रता में सहायक" bookish (alt "ध्यान लगाने में मदद करने वाला").
20. `happiness.faq[2].a` "6:00–8:30 PM IST" in Latin letters; alt "शाम 6:00–8:30 बजे (IST)". "तीनों दिन हर दिन" clumsy.
21. `happiness.faq[3].a` "लॉन्ग-SKY" Latin/Hindi mix; the Art of Living Hindi term may differ.
22. `happiness.register.text` "दान देकर किया जाता है" may suggest a mandatory payment; "कराता हूँ" male verb form (fine for Srikanth). (see decision)
23. `happiness.register.fine` "हर स्तर के लोगों का स्वागत": "स्तर" unclear for beginners. Alt: "नए और अनुभवी, सबका स्वागत".
24. `happiness.watch.text` "आँख मूँदकर मानने" idiom may sound confrontational. Alt: "आपको बस किसी के कहने पर यक़ीन करने की ज़रूरत नहीं।" "गुरुदेव" honorific usage.
25. `happiness.watch.playlist.desc` "किनके काम आती है" ("who it helps") could read as a promise. Alt: "किन लोगों ने इसे आज़माया है". Spellings "जर्नी विदिन", "पंचकोश" (alt "पंचकोशा") vs Art of Living usage.
26. `happiness.watch.course.title/kind` "कोर्स का शेड्यूल", "बैच खोजें" English words. Alt: "कार्यक्रम की तारीख़ें".
27. `happiness.js.soonText` clumsy. Alt: "जुड़ने से पहले ही आपको शुल्क साफ़ बता दिया जाता है।" "सीटों"/"{n} सीटें" vs "स्थान".
28. `happiness.js.registerMsg` the `{mode}` value now translates for standard phrases, but custom text may be English inside a Hindi sentence.
29. "रजिस्टर करें", "बुक करें", "शेड्यूल" are English loanwords chosen for the WhatsApp tone; a reviewer may prefer "पंजीकरण कराएँ" etc.
30. Visitor messages are gender-neutral ("मुझे … करना है"): do they sound stiff or like orders? Srikanth's own lines use male verb forms.

## How to turn these into fixes
Send Claude the reviewer's list as "item number → replacement", or edit `src/_data/i18n/te.json` / `hi.json` directly (keys are named above). After corrections, re-read once on staging, then switch the language on in `src/_data/i18n/review.json`.


---

# Part 3: Bach Flower and Jyotish pages, and the plain-words pass (added 17 Nov 2026)

Staging links: `/te/bach`, `/hi/bach`, `/te/jyotish`, `/hi/jyotish`. Same rules as before: nothing is live until you switch the language on in `review.json`.

## Plain-words pass (your request: no bookish words)
You rejected "సంభాళిస్తున్నారు" as too heavy. I had the whole existing Telugu (check-in, Home, Happiness) and Hindi text re-read for the same problem, and wrote the new Bach/Jyotish text with the same rule (everyday words; common English words like టెన్షన్, ఫీజు, బుక్, सेशन, फ़ीस are kept because that is what people say). **The check-in sentence now says "ఎలా చూసుకుంటున్నారు".** Telugu: 44 strings changed. Hindi: 80 strings changed. The full list is below so a native reader can veto any swap. A few words are left on purpose because newspapers use them (Telugu: అభ్యాసం, సమతుల్యత, సంప్రదింపులు; Hindi: भावनात्मक, संपर्क, उपलब्ध). If you want it even lighter, those are the next candidates.

Things to check in the swaps: Hindi **"गोपनीय → निजी"** (privacy words), **"कोमल → नर्म"** for "gentle", **"निदान → डायग्नोसिस"**, and **"पूरक → इलाज के साथ-साथ चलने वाला"** for "complementary" (longer, but plainer). On the new Bach/Jyotish pages the Hindi "परामर्श/कोमल/व्यक्तिगत/पूरक/प्रमाणित" were changed to the same plain forms (कंसल्टेशन, नर्म, पर्सनल, इलाज के साथ, सर्टिफ़ाइड).

### Telugu: words changed (44)

key | change
---|---
`checkin.consent.intro` | సంభాళిస్తున్నారు -> చూసుకుంటున్నారు; ప్రశ్నావళి -> ప్రశ్నలు
`checkin.consent.eyebrow` | స్వీయ పరిశీలన -> మనసును చూసుకునే
`checkin.topbar` | స్వీయ-ఆలోచన -> మీ గురించి మీరు ఆలోచించుకునే (notices.0 తో ఒకే మాట)
`checkin.consent.notices.4` | మూసివేయవచ్చు -> మూసేయవచ్చు
`checkin.consent.agree` | ప్రశ్నావళి, అంగీకరిస్తున్నాను, స్వీయ-పరిశీలన, వైద్య లేదా మానసిక సలహాకు ప్రత్యామ్నాయం -> ప్రశ్నలు, ఒప్పుకుంటున్నాను, నా గురించి నేను ఆలోచించుకోవడం, డాక్టర్/కౌన్సెలర్ సలహాకు బదులు
`checkin.how.body` | స్ఫూర్తి పొందిన సులభమైన మార్గదర్శకం, ధ్రువీకరించినవి, పరిగణిస్తాయి -> చూసి పెట్టుకున్న సులభమైన అంచనా, పరీక్షించి రుజువైనవి, లెక్కలోకి తీసుకుంటాయి (వాక్యం కూడా సరళం)
`checkin.save.text` | భద్రపరచబడతాయి -> సేవ్ చేస్తాం
`checkin.save.email` | ఐచ్ఛికం -> మీ ఇష్టం
`checkin.save.btn` | భద్రపరచండి -> సేవ్ చేయండి
`checkin.js.saveMsg.saving` | భద్రపరుస్తున్నాం -> సేవ్ చేస్తున్నాం
`checkin.js.saveMsg.saved` | భద్రపరిచాం -> సేవ్ చేశాం
`checkin.js.saveMsg.savedBtn` | భద్రపరిచాం -> సేవ్ చేశాం
`checkin.js.saveMsg.error` | భద్రపరచలేకపోయాం -> సేవ్ చేయలేకపోయాం
`chrome.footer.fine` | ప్రత్యామ్నాయం కావు -> బదులు కావు; భద్రపరచబడతాయి -> సేవ్ చేస్తాం
`checkin.js.sections.selfEsteem.items.1` | విచక్షణ -> ఆలోచన
`checkin.js.sections.depression.items.1` | నిస్సారంగా -> ఖాళీగా
`checkin.js.sections.emotionRegulation.items.0` | శాంతపరచుకోగలిగారు -> కుదుటపరచుకోగలిగారు
`checkin.js.sections.emotionRegulation.items.4` | భావోద్వేగ ఒత్తిడి -> మనసులో ఒత్తిడి
`checkin.js.bands.strength.0.note` | అభ్యాసాలు -> అలవాట్లు
`checkin.js.bands.strength.2.label` | స్థిరంగా -> నిలకడగా (మిగతా చోట్లలాగే)
`checkin.js.bands.strength.3.note` | పోషించుకోండి -> కాపాడుకోండి
`checkin.js.groups.resources` | అంతర్గత -> లోపలి
`checkin.js.rowNotEnough` | తగినన్ని -> సరిపడా
`checkin.js.snap.none.title` | తగినన్ని -> సరిపడా
`checkin.js.crisis.highBody` | కలుపుకోండి -> కలవండి; స్థిమితం -> మనసు కుదుటపడ్డాక
`checkin.js.next.intro.steady` | సరళమైన -> సులభమైన
`checkin.js.next.sky.body` | లయబద్ధమైన, ప్రచురితమైన పలు, నివేదించాయి, భావిస్తారు -> లయతో చేసే, ప్రచురించిన చాలా, చెప్పాయి, అనిపిస్తుంది
`checkin.js.next.steadyLine` | భావోద్వేగ తోడ్పాటు -> మనసుకు తోడ్పాటు
`home.offerings.intro` | వ్యవస్థ, మార్గపటం, సాధనాలు -> తోడుగా ఉంటాయి, దారి చూపే మ్యాప్, పద్ధతులు
`home.offerings.jyotish.ask` | సమర్పించవచ్చు -> ఇవ్వవచ్చు
`home.offerings.bach.eyebrow` | భావోద్వేగ సౌఖ్యం -> మనసు ఆరోగ్యం
`happiness.explore.bach.eyebrow` | భావోద్వేగ సౌఖ్యం -> మనసు ఆరోగ్యం
`home.offerings.bach.text` | ఆత్మసందేహాల్లో -> తమపై తమకే సందేహం కలిగినప్పుడు
`happiness.explore.bach.text` | ఆత్మసందేహం -> తమపై తమకే సందేహం
`home.about.p2` | స్వస్థత -> హీలింగ్
`home.cta.title` | స్వస్థత -> హీలింగ్
`happiness.hero.intro` | సరళమైన, ప్రచురిత అధ్యయనాలకు కేంద్రమైన -> సులభమైన, అధ్యయనాల్లో పరిశీలించి ప్రచురించిన
`happiness.hero.about` | ప్రచురిత -> ప్రచురించిన
`happiness.whatIs.text` | లయబద్ధ, ప్రచురిత, సరళమైన, ప్రత్యామ్నాయం -> లయతో చేసే, ప్రచురించిన, సులభమైన, బదులు
`happiness.learn.items.0.text` | లయబద్ధ, భావిస్తారు -> లయతో చేసే, అనిపిస్తుంది
`happiness.learn.items.1.text` | సహాయకరంగా భావించే -> సాయపడే, అనిపించే
`happiness.faq.0.a` | అనుభవజ్ఞులు -> అనుభవం ఉన్నవారు
`happiness.faq.1.a` | లౌకికమైనది -> ఏ మతానికీ సంబంధం లేనిది
`happiness.watch.playlist.desc` | సంకలనం -> వీడియోల జాబితా

### Hindi: words changed (80)

key | change
---|---
`chrome.footer.hours` | परामर्श -> कंसल्टेशन
`chrome.footer.privacy` | गोपनीयता -> प्राइवेसी
`chrome.footer.fine` | गोपनीय/सहमति/सहेजी -> निजी/इजाज़त/सेव; पूरक/चिकित्सा/आर्थिक -> साथ-साथ चलने वाली/डॉक्टरी/पैसों की
`checkin.seoDescription` | आत्म-चिंतन -> खुद को समझने का; निदान -> डायग्नोसिस
`checkin.topbar` | आत्म-चिंतन का साधन -> खुद को समझने का ज़रिया
`checkin.consent.eyebrow` | आत्म-चिंतन साधन -> खुद को समझने का ज़रिया
`checkin.consent.intro` | प्रश्नावली -> सवाल
`checkin.consent.notices.0` | आत्म-चिंतन/साधन/निदान -> खुद को समझने का ज़रिया/डायग्नोसिस
`checkin.consent.notices.2` | गोपनीय -> निजी
`checkin.consent.agree` | इच्छा/आत्म-चिंतन प्रश्नावली/भाग लेना/सहमत -> मर्ज़ी/चेक-इन/हिस्सा लेना/राज़ी; चिकित्सा -> डॉक्टरी
`checkin.how.body` | सरल मार्गदर्शन/प्रेरित/चिकित्सकीय रूप से प्रमाणित -> आसान गाइड/देखकर बनाई/मेडिकल तौर पर जाँची-परखी; शून्य -> ज़ीरो; निदान -> डायग्नोसिस
`checkin.disclaimer` | आत्म-चिंतन/साधन/निदान -> खुद को समझने का ज़रिया/डायग्नोसिस
`checkin.save.text` | गोपनीय/सहमति/सहेजी -> निजी/इजाज़त/सेव; वैकल्पिक -> ज़रूरी नहीं
`checkin.save.email` | वैकल्पिक -> ज़रूरी नहीं
`checkin.save.btn` | सहेजें -> सेव करें
`checkin.js.sections.depression.items.4` | जीवन -> ज़िंदगी
`checkin.js.crisis.intro` | गोपनीय -> निजी; कठिन -> मुश्किल
`checkin.js.crisis.more` | विचार करें -> सोचिए; अधिक -> और
`checkin.js.crisis.skipped` | गोपनीय -> निजी
`checkin.js.crisis.highBody` | कोमल -> नर्म
`checkin.js.next.intro.heavy` | कोमल -> नर्म; व्यक्तिगत -> पर्सनल
`checkin.js.next.intro.steady` | सरल -> आसान
`checkin.js.next.sky.body` | लयबद्ध -> लय में साँस लेने; प्रकाशित -> छपे
`checkin.js.next.bach.sub` | कोमल -> नर्म; व्यक्तिगत -> पर्सनल
`checkin.js.next.bach.cta` | सत्र -> सेशन
`checkin.js.next.bach.body` | कोमल -> नर्म; व्यक्तिगत -> पर्सनल
`checkin.js.next.steadyLine` | अतिरिक्त -> और
`checkin.js.saveMsg.saving` | सहेजा जा रहा है -> सेव हो रहा है
`checkin.js.saveMsg.saved` | सहेज लिया गया -> सेव हो गया
`checkin.js.saveMsg.savedBtn` | सहेज लिया -> सेव हो गया
`checkin.js.saveMsg.error` | सहेज नहीं पाए -> सेव नहीं कर पाए
`home.hero.eyebrow` | परामर्श -> कंसल्टेशन
`home.hero.intro` | प्रशिक्षक -> ट्रेनर
`home.hero.proof` | अभ्यासी -> ज्योतिषी; प्रमाणित -> सर्टिफ़ाइड
`home.hero.portraitAlt` | अभ्यासी -> ज्योतिषी
`home.band.text` | आत्म-चिंतन करना -> खुद को टटोलना; निदान -> डायग्नोसिस; कोमल -> नर्म
`home.offerings.intro` | कोमल -> नर्म; साधन -> तरीके
`home.offerings.jyotish.title` | परामर्श -> कंसल्टेशन
`home.offerings.jyotish.text` | जीवन -> ज़िंदगी; जीवन के ढर्रे -> ज़िंदगी के पैटर्न; ढर्रे -> पैटर्न
`home.offerings.jyotish.ask` | योगदान दें -> दें
`home.offerings.jyotish.btn` | परामर्श -> कंसल्टेशन
`home.offerings.bach.text` | कोमल, पूरक -> नर्म, इलाज के साथ-साथ; सार -> अर्क; शोक -> ग़म
`home.offerings.bach.ask` | परामर्श -> कंसल्टेशन
`home.offerings.bach.btn` | सत्र -> सेशन
`home.about.title` | अभ्यासी/दुनियाएँ -> इंसान/दुनिया
`home.about.p1` | बहुराष्ट्रीय -> मल्टीनेशनल; उद्योग -> इंडस्ट्री
`home.about.p2` | जीवन -> ज़िंदगी; अभ्यासी -> ज्योतिषी; प्रमाणित -> सर्टिफ़ाइड; प्रशिक्षक -> ट्रेनर
`home.about.chips.1` | प्रमाणित -> सर्टिफ़ाइड
`home.about.chips.2` | अभ्यासी -> ज्योतिषी
`home.about.chips.3` | प्रशिक्षक -> ट्रेनर
`home.about.alt` | अभ्यासी -> ज्योतिषी
`home.cta.text` | सत्र -> सेशन
`happiness.seoDescription` | शुल्क -> फ़ीस
`happiness.hero.intro` | सरल साधन -> आसान तरीके; प्रकाशित -> छपे
`happiness.hero.about` | स्थापित/वैश्विक गैर-लाभकारी/प्रकाशित शोध -> शुरू हुई/दुनिया भर में फैली नॉन-प्रॉफ़िट/छपी रिसर्च
`happiness.whatIs.text` | चिकित्सकीय देखभाल का पूरक -> डॉक्टरी इलाज के साथ चलने वाला; सरल -> आसान; लयबद्ध -> लय में साँस लेने; प्रकाशित -> छपे; एकाग्रता -> फ़ोकस; तथा -> और; तथा/और दोहराव ठीक किया
`happiness.learn.items.0.text` | लयबद्ध -> लय में साँस लेने
`happiness.learn.items.1.text` | एकाग्रता/सहायक -> फ़ोकस/मददगार
`happiness.learn.items.2.text` | कोमल -> नर्म
`happiness.learn.items.3.title` | निर्देशित ध्यान -> गाइडेड मेडिटेशन
`happiness.learn.items.4.text` | व्यावहारिक साधन -> काम के तरीके
`happiness.learn.items.5.text` | साधकों/वैश्विक -> SKY करने वालों/दुनिया भर में फैले
`happiness.says.eyebrow` | प्रतिभागी -> जुड़ने वाले
`happiness.says.title` | प्रतिभागी -> जुड़ने वाले
`happiness.says.more` | प्रतिभागी -> जुड़ने वाले
`happiness.register.text` | स्वैच्छिक सेवा -> वॉलंटियर बनकर सेवा; स्वैच्छिक सेवा -> वॉलंटियर सेवा
`happiness.faq.0.a` | साधक -> लोग
`happiness.faq.1.a` | धर्मनिरपेक्ष/आस्था -> किसी धर्म से जुड़ा नहीं/धर्म
`happiness.faq.2.q` | सत्र -> सेशन
`happiness.faq.3.a` | सत्र -> सेशन
`happiness.explore.jyotish.title` | परामर्श -> कंसल्टेशन
`happiness.explore.jyotish.text` | जीवन के ढर्रे -> ज़िंदगी के पैटर्न
`happiness.explore.bach.text` | कोमल -> नर्म; व्यक्तिगत -> पर्सनल; शोक -> ग़म
`happiness.watch.text` | निर्देशित ध्यान -> गाइडेड मेडिटेशन
`happiness.watch.playlist.title` | व्याख्या -> समझें
`happiness.watch.playlist.desc` | शोध -> रिसर्च; संग्रह -> कलेक्शन
`happiness.watch.channel.desc` | निर्देशित ध्यान -> गाइडेड मेडिटेशन
`happiness.js.soonTitle` | घोषणा -> जानकारी
`happiness.js.soonText` | शुल्क -> फ़ीस
`happiness.js.feeDefault` | शुल्क -> फ़ीस

## New decisions for you
- **Telugu "contribute"**: the new Jyotish text says "మీకు తోచినంత ఇవ్వండి" (give what you feel). The Home page still says "సమర్పించవచ్చు" in places (the plain-words pass changed one to "ఇవ్వవచ్చు"); the two should match. Suggest "ఇవ్వండి" everywhere.
- **Telugu hold button**: "స్లాట్ హోల్డ్ చేయండి". Do people say "హోల్డ్" or "రిజర్వ్" for keeping a time for them? Your call.
- **Hindi "सेशन / फ़ीस / पेमेंट"** replaced the earlier "सत्र / शुल्क / भुगतान" across the whole Hindi file for consistency. Say if you prefer the older words.
- **"Sun-sign"** kept as "సన్ సైన్" in Telugu because the common Telugu horoscope column is Moon-sign based; Hindi uses "सूर्य राशि का राशिफल".
- **Times** such as "09:00 AM" stay in English letters on all pages (these are also what the server uses).
- **Server messages** (e.g. "That time is not open for booking", returned by the booking server) still appear in English; translating them is a small separate task.
- Short month and weekday names in the booking widget are my choice; please check them.

## Telugu: doubts on Bach, Jyotish and the booking widget

key path | my translation | why unsure | alternative
---|---|---|---
booking.months | జన, ఫిబ్ర, మార్చి, ఏప్రి, మే, జూన్, జూలై, ఆగ, సెప్టె, అక్టో, నవం, డిసెం | Short month forms vary; these are common newspaper/calendar abbreviations | జనవరి etc. in full if space allows
booking.days | ఆది, సోమ, మంగళ, బుధ, గురు, శుక్ర, శని | Standard; "మంగళ" is 3 letters wide in a narrow chip | మంగ
booking.at | {date}, {time} IST | Telugu has no neat "at"; a comma is simplest and always grammatical | {date} న {time} IST
booking.noTimes | ...{next} చూడండి, లేదా {wa} — ఆయన మీకు ఒక సమయం చూస్తారు. | Depends on {next}/{wa} being inserted as links with no case endings; grammar works only if they stay as plain phrases | split into two sentences
booking.waLink | శ్రీకాంత్‌కు వాట్సాప్‌లో మెసేజ్ చేయండి | "మెసేజ్ చేయండి" is spoken style; te.json uses "వాట్సాప్ చేయండి" | శ్రీకాంత్‌కు వాట్సాప్ చేయండి
booking.availNote | IST (భారత ప్రామాణిక సమయం) | Expansion of IST is heavy-ish | just "IST"
jyotish.hero.titleA/B | మీ జీవితాన్ని చదవండి, / నక్షత్రాల వెలుగులో. | Order kept so A+B reads as one line; "through the stars" rendered as "in the light of the stars" | నక్షత్రాల ద్వారా
jyotish.hero.intro | ...దాన్ని మరింత అవగాహనతో ఎలా దాటాలి అన్నవి. | Long English list; "అవగాహన" and "ధోరణులు" (patterns) are used already in te.json | ఆలోచనతో
jyotish.whatIs.text | మీ నిర్ణయాలు ఎప్పుడూ మీ చేతుల్లోనే ఉంటాయి | "Free will" rendered as everyday phrase "decisions are always in your hands"; "స్వేచ్ఛా సంకల్పం" felt too heavy | స్వేచ్ఛా సంకల్పం ఎప్పుడూ ఉంటుంది
jyotish.whatIs.text | దశలు | Kept as the common word for dashas (also in <em>) | దశ/మహాదశ
jyotish.whatIs.videos[0] | విమ్శోత్తరి దశ ... కోమిల్లా సటన్ | Transliteration of Vimshottari and Komilla Sutton; no existing te.json spelling | వింశోత్తరి; కోమిల్లా సుట్టన్
jyotish.consult.eyebrow/title | సంప్రదింపు / సంప్రదింపు ఎలా ఉంటుంది | English eyebrow and title are identical ("The Consultation"); I made the title slightly fuller so they do not repeat | keep both "సంప్రదింపు"
jyotish.consult.desc | జాతకాల పొంతన | "compatibility question" as "match of charts" (everyday wedding term); may feel marriage-specific | జాతకాల పోలిక
jyotish.consult.noFee / jyotish.topbar.tail / jyotish.cta | ఫిక్స్‌డ్ ఫీజు | English "fee" used as in the style guide; te.json home uses "మీకు తోచినంత సమర్పించవచ్చు" | నిర్ణీత రుసుము (too heavy)
jyotish.consult.gift1 + book.step3 + payTitle + topbar tail | మీకు తోచినంత ఇవ్వండి | "contribute" as "give what you feel"; te.json home uses "సమర్పించవచ్చు", which sounded more formal/temple-like | మీకు తోచినంత సమర్పించండి (matches home.ask)
jyotish.consult.gift1 | ఈ విద్య నాకు బహుమతిగా అందింది | "knowledge" = విద్య; may read slightly bookish | ఈ జ్ఞానం
jyotish.consult.gift1 | నేను చెప్పే మాట మారదు | "The guidance does not change" | నా సలహా మారదు
jyotish.consult.fine | రాసిన సారాంశం ఇస్తాం | "Written summary provided" in plural-we voice (Srikanth's first-person is "నేను" elsewhere) | రాసిన సారాంశం ఇస్తాను
jyotish.book.holdIntro / consent | శ్రీకాంత్ (without గారు) | Followed te.json site text style (no గారు outside visitor WhatsApp messages) | శ్రీకాంత్ గారు
jyotish.book.holdBtn etc. | హోల్డ్ చేయండి / హోల్డ్ అయింది | "hold" kept as English loanword; people may not use it for slot reservation | రిజర్వ్ చేయండి / రిజర్వ్ అయింది
jyotish.book.steps[0] | (పూర్తయింది) | "(done)" | (అయింది)
jyotish.book.steps[1] | నేను కన్ఫర్మ్ చేస్తాను | Everyday "confirm" | నిర్ధారిస్తాను (heavier)
jyotish.book.qrAlt | అంతర్శాంతికి సహకారం ఇవ్వడానికి PhonePe QR కోడ్ | "contribute" here as "సహకారం" (support) | విరాళం ఇవ్వడానికి
jyotish.book.waMsg | ... నా పుట్టిన వివరాలు: (trailing space kept) | Placeholder {name} follows "నేను"; reads fine when name is inserted | -
jyotish.faq[0].a | రెక్టిఫికేషన్ పద్ధతులు | "rectification techniques" has no common Telugu term; transliterated | జనన సమయ సవరణ పద్ధతులు
jyotish.faq[1].a | ముందే రాసిపెట్టిన జోస్యం | "fixed predictions" | స్థిరమైన అంచనాలు
jyotish.faq[2].q/a | సన్ సైన్ రాశి ఫలాలు / సన్ సైన్ కాలమ్ / వర్గ చక్రాలు | "Sun-sign" kept in English because the common Telugu "రాశి ఫలాలు" is usually Moon-sign based; "divisional charts" = వర్గ చక్రాలు (technical) | సూర్య రాశి ఫలాలు; షోడశ వర్గాలు
jyotish.cta.btn | సంప్రదింపు బుక్ చేయండి ↑ | English says "Book a reading"; I used the same word as the other buttons to stay consistent | రీడింగ్ బుక్ చేయండి; జాతకం చూపించుకోండి
jyotish.explore.bach.text | ... చాలామంది క్లయింట్లకు నచ్చుతుంది | "Many clients enjoy exploring the two together" | -
jyotish.explore.happiness.text | జీవిత పటం | "life map" (also used in home.offerings.jyotish.text as "పటం") | -
jyotish.explore.happiness.eyebrow / bach.explore.happiness.eyebrow | శ్వాస · ధ్యానం | home uses "శ్వాస · ధ్యానం · SKY"; English here has no SKY so I dropped it | శ్వాస · ధ్యానం · SKY
bach.topbar.tail | అదనపు తోడ్పాటు | "Complementary wellness" rendered as "extra support", consistent with te.json "అదనపు" | కాంప్లిమెంటరీ వెల్‌నెస్
bach.hero.titleA/B | మాటలకు అందని భావాలకు / సున్నితమైన తోడ్పాటు. | English order was "Gentle support for the / feelings words cannot reach."; reversed so the two lines read naturally in Telugu. If the page puts titleB in a highlight style, the highlight now lands on "gentle support" rather than "feelings" | titleA "సున్నితమైన తోడ్పాటు,", titleB "మాటలకు అందని భావాలకు." (word order awkward)
bach.hero.intro | బాగా తెలిసిన అదనపు భావోద్వేగ సంరక్షణ విధానం | "well-known system of complementary emotional care" - "సంరక్షణ" slightly formal | అదనపు భావోద్వేగ తోడ్పాటు విధానం
bach.whatIs.text | ఎంపిక బాగా కుదురుతుంది | "the choice works best when matched carefully" kept soft (no "పనిచేస్తాయి") to avoid strengthening the claim | -
bach.whatIs.title | మనసుకు పూల సారాలు | "for the emotional self" simplified | భావోద్వేగ మనసుకు పూల సారాలు
bach.book.* | పేమెంట్ / వెరిఫై / ఫెయిల్ / కన్ఫర్మ్ | Everyday English loanwords as asked; "payment ID {id}తో" attaches a Telugu suffix directly to the placeholder | పేమెంట్ ID {id} తో (with space)
bach.book.payOk | శ్రీకాంత్ సిద్ధం కావడానికి | "so Srikanth can prepare" | శ్రీకాంత్ గారు సిద్ధపడటానికి
bach.faq[0].a | ఆల్కహాల్ తీసుకోకూడదనుకుంటే | "avoid alcohol" could mean cannot/choose not to drink; my phrase covers "you do not want to take alcohol" | మద్యం తీసుకోకూడదంటే
bach.learn.text | నేను చేసే ప్రతిదీ ... అనుసరిస్తుంది | Subject-verb agreement slightly stiff; "unchanged" attached to Bach's method | నేను చేసేదంతా ... అనుసరిస్తాను
bach.learn.cards[*].kind | ది బాచ్ సెంటర్ | Transliteration of "The Bach Centre" | బాచ్ సెంటర్
bach.learn.cards[0].desc | మౌంట్ వెర్నాన్ | Transliteration of Mount Vernon | మౌంట్ వెర్నన్
bach.learn.cards[2].title/desc | సన్ మెథడ్, బాయిలింగ్ మెథడ్ | English terms kept (the Telugu would be "సూర్యకాంతి పద్ధతి", "మరిగించే పద్ధతి") | సూర్యకాంతి పద్ధతి, మరిగించే పద్ధతి
bach.learn.cards[3].desc | ప్రాక్టీషనర్ | Common English word for practitioner | వైద్యుడు (wrong implication; avoided)

## Hindi: doubts on Bach, Jyotish and the booking widget

---|---|---|---
booking.* / jyotish.* / bach.* (all "session") | सेशन | The existing hi.json uses "सत्र" (e.g. home.offerings.bach.btn "सत्र बुक करें"). I followed the owner's "everyday English word" rule, so the site now mixes सत्र (home/happiness) and सेशन (these pages). | Use "सत्र" everywhere to match hi.json, or change hi.json to सेशन
jyotish.*, bach.* ("fee") | फ़ीस | hi.json uses "शुल्क" (happiness, js.feeDefault). I used the spoken "फ़ीस" as requested. | शुल्क
bach.book.* ("payment") | पेमेंट | Not used in hi.json yet. Spoken word chosen. | भुगतान
jyotish.consult.desc (compatibility question) | कुंडली मिलान जैसा कोई सवाल | "Compatibility" is broader than marriage matching; "कुंडली मिलान" may sound like it is only about marriage. | रिश्ते की अनुकूलता का कोई सवाल
jyotish.faq[0].a (rectification) | सही समय के क़रीब पहुँचने की तकनीकें (रेक्टिफ़िकेशन) | No common spoken Hindi word for birth-time rectification. | जन्म-समय सुधारने की तकनीकें
jyotish.faq[2].q / a (Sun-sign horoscope, 16 divisional charts) | सूर्य राशि का राशिफल; 16 वर्ग-कुंडलियाँ | "Sun-sign" is not a natural Hindi phrase; "वर्ग-कुंडली" is a technical term. I added "अख़बार वाले" in the question only as a plain explanation (it is not in the English). | "सन-साइन राशिफल"; "16 डिवीज़नल चार्ट"
jyotish.faq[2].q | यह अख़बार वाले सूर्य राशि के राशिफल से कैसे अलग है? | "अख़बार वाले" is a small addition for clarity. | Remove "अख़बार वाले"
jyotish.hero.intro | "खुद को समझने का एक ज़रिया है, भविष्य का कोई वादा नहीं" | "Reflective framework" has no neat spoken equivalent. The English "awareness" became "समझ और होश". | "आत्म-चिंतन का एक ढाँचा"
jyotish.whatIs.text ("free will always applies; nothing is guaranteed") | इंसान की अपनी मर्ज़ी हमेशा मायने रखती है; कुछ भी पक्का नहीं है | Free will is usually "फ्री विल" or "स्वतंत्र इच्छा" in bookish Hindi. I used a plainer phrase. The softness is kept. | "आपकी अपनी पसंद-नापसंद और फ़ैसले हमेशा चलते हैं"
jyotish.whatIs.text (<em>दशाओं</em>) | ग्रहों की अवधियों यानी <em>दशाओं</em> | The English <em> is kept around the Hindi plural form. | <em>दशा</em>
jyotish.whatIs.videos | विमशोत्तरी दशा: समय और कर्म — कोमिल्ला सटन; वैदिक ज्योतिष में राहु महादशा | Transliteration of Vimshottari and Komilla Sutton, which are not in hi.json. The video titles are probably English on YouTube. | Keep the English titles
jyotish.consult.gift1 ("gift") | तोहफ़े में मिला है | "तोहफ़ा" is spoken; "उपहार" or "सौग़ात" would be more formal. | उपहार के रूप में मिला है
jyotish.consult.gift1 ("whatever the session was worth to you") | सेशन आपके लिए जितना मायने रखता हो, उतना योगदान दे दीजिए | Slightly roundabout; it keeps the no-pressure tone. | जितना आपको ठीक लगे, उतना
jyotish.strip.sub ("Donation-based") | दान के आधार पर | The elsewhere-used phrase is "योगदान" (contribution). "दान" matches the Art of Living line in hi.json, but the English here is "donation-based". | जो ठीक लगे, वही योगदान
jyotish.testimonials / bach.testimonials ("What clients say") | लोग क्या कहते हैं / उन्हीं की ज़ुबानी | "Clients" translated as "लोग" to avoid the word क्लाइंट. home.kind in hi.json uses "दो अच्छे शब्द", so a mismatch is possible. | क्लाइंट क्या कहते हैं
bach.hero.intro | "भावनात्मक देखभाल का एक जाना-माना पूरक तरीका" | I merged "well-known system of complementary emotional care" and softened it. "पद्धति" (system) is slightly formal but already used on the site. | "भावनात्मक देखभाल का एक जाना-माना तरीका, जो इलाज की जगह नहीं लेता"
bach.whatIs.text ("diluted") | बहुत पतली (डाइल्यूट) की जाती हैं | No common Hindi word for "diluted" in this sense. | "बहुत हल्की मात्रा में बनाई जाती हैं"
bach.whatIs.videos[1] | अपनी बाख फ्लावर रेमेडीज़ के बारे में ज़रूरत से ज़्यादा सोचना छोड़िए | "Stop overthinking" is an imperative title and may sound a bit pushy in Hindi. Guiding principles ask for no pressure. | "बाख फ्लावर रेमेडीज़ को लेकर ज़्यादा उलझन में न पड़ें"
bach.who.items[1] | शोक, किसी को खोना, या भावनात्मक रूप से सुन्न महसूस करना | "Grief, loss" has two meanings of loss; I used "किसी को खोना", which may exclude loss of a job. | "शोक, कोई बड़ा नुक़सान, या ..."
bach.who.title | शायद आप इस दौर से गुज़र रहे हैं… | "You may be going through…" turned into a full sentence start; the list items are noun phrases. Works, but the grammar is loose. | "आप शायद इनसे गुज़र रहे हों…"
bach.book.payBtn | {price} पेमेंट करें और कन्फ़र्म करें → | "Pay & Confirm" in spoken form. | {price} चुकाएँ और कन्फ़र्म करें →
bach.book.payUnverified / payVerifyErr | पेमेंट की पुष्टि नहीं हो सकी / नहीं हो पाई | The two English strings are near-identical, so the two Hindi ones also differ only slightly. "पुष्टि" is a little formal. | "पेमेंट कन्फ़र्म नहीं हो सका"
bach.faq[0].a ("avoid alcohol") | अल्कोहल से परहेज़ करते हैं | The English reads as "if you avoid alcohol" (e.g. religious or health reasons); that is how I read it. | "अगर आपको अल्कोहल से बचना है"
bach.faq[3].q | क्या इन्हें दवा के साथ लिया जा सकता है? | Used a passive to stay gender-neutral. | "क्या मैं इन्हें दवा के साथ ले सकता/सकती हूँ?"
bach.learn.text (first person) | मैं जो भी करता हूँ ... | Masculine first person for Srikanth, as asked. | None
bach.learn.cards[*] ("Quick reference guide", "Sun method", "boiling method") | क्विक रेफ़रेंस गाइड; सन मेथड, बॉइलिंग मेथड | English terms transliterated since the Bach Centre pages use them. | "धूप विधि, उबालने की विधि"
bach.learn.cards[0].desc | माउंट वर्नन में डॉ. बाख के अपने घर से | "Mount Vernon" and the "Bach Centre" ("द बाख सेंटर") are transliterations; hi.json has no existing spelling. | "बाख सेंटर"
bach.learn.cards[1].desc | काम आता है अगर आप हमारी बात से पहले अपनी हालत पहचानना चाहें | "Before we speak" became "हमारी बात से पहले". Slightly stiff. | "बात करने से पहले अपनी हालत पहचानना चाहें तो काम का"
booking.noTimes + nextLink + waLink | "{next} देखिए, या {wa}, वे आपके लिए कोई समय निकाल देंगे।" with nextLink "अगला हफ़्ता" and waLink "श्रीकांत को व्हाट्सऐप पर मैसेज करें" | The two link texts are inserted into the sentence. The grammar works only if the links keep these exact forms. | If the layout changes, rewrite all three keys together
booking.months | जन, फ़र, मार्च, अप्रैल, मई, जून, जुल, अग, सित, अक्टू, नव, दिस | Short Hindi month names are not standardised; some are full words (मार्च, अप्रैल, मई, जून). | English abbreviations (Jan, Feb, ...)
booking.at | {date} को {time} IST | "IST" kept as asked; Hindi order is "{date} को {time}". | {date}, {time} IST
booking.availNote | ... · IST (भारतीय मानक समय) | The Hindi expansion of IST is not in the English. It is only an explanation. | Keep "IST (India Standard Time)" as in the English
booking.headerSub | सेशन का प्रकार चुनिए, तारीख़ और समय चुनिए — तुरंत कन्फ़र्म करें | "Choose a type" assumes the tabs (Jyotish / Bach) are called session types. | "सेवा चुनिए ..."
jyotish.book.waMsg | नमस्ते श्रीकांत जी, मेरा नाम {name} है। ... | Used "मेरा नाम ... है" instead of "मैं {name} हूँ" to avoid gender markers. | "मैं {name} बोल रहा/रही हूँ"
jyotish.book.steps[1] | मैं 24 घंटे के अंदर कन्फ़र्म कर देता हूँ। | Masculine first-person verb for Srikanth, as asked. | None
All visitor WhatsApp messages | "मुझे ... बुक करना है / जानना है" | Gender-neutral on purpose (matches hi.json style "मुझे ... रजिस्टर करना है"). | None


---

# Part 4: Privacy Policy, Terms of Use, Refund Policy (added 17 Nov 2026)

Staging links: `/te/privacy`, `/hi/privacy`, `/te/terms`, `/hi/terms`, `/te/refund`, `/hi/refund`. These three pages are still marked "noindex" (draft) in English, so they are hidden from Google until you approve the English text. The translations follow whatever the English says.

## Read this first
1. **Have a lawyer read the English first.** These are legal documents. Any change to the English later means the Telugu and Hindi must be updated to match.
2. **I added a short note at the top of each translated legal page** (Telugu and Hindi only): "This page is translated to help you read it. If the translation and the English version ever differ, the English version applies." This is a protective choice that you or your lawyer should confirm. Delete it from `legal.translationNote` in `te.json`/`hi.json` if you do not want it.
3. Each translator also made a list of **legal-sensitive points**: places where a small change in nuance could change the legal meaning (consent, withdrawal, erasure, liability, courts, refund timing, children). Please have the reviewer look at those first. They are at the end of each language's list below.
4. A small thing to check in Telugu: the refund line "24 గంటలు లేదా అంతకంటే ముందు" must read as "24 hours or more before", not "exactly 24 hours". And "18 ఏళ్ల లోపు" must read as "under 18".
5. Names written in English letters (Razorpay, Supabase, Netlify, Google Analytics, KIRAN, UPI) stay that way. Tele-MANAS is spelled "టెలి-మానస్" on the check-in page; if the legal pages spell it differently, please pick one spelling.

## Telugu: doubts on Privacy, Terms, Refund

Format: key path | Telugu phrase used | why unsure | alternative

General note: ZWNJ joiners were added before case endings after English loanwords, as in te.json (వాట్సాప్‌లో, ఆన్‌లైన్‌లో, సైట్‌ను). Names with an existing te.json spelling (వాట్సాప్, ఆర్ట్ ఆఫ్ లివింగ్, హైదరాబాద్) use that spelling. Names the brief said to keep (Razorpay, Supabase, Netlify, Google Analytics, Meta Pixel, Plausible, UPI, DPDP Act, Data Protection Board of India, Tele-MANAS, KIRAN) stay in English letters.

### Privacy

key path | Telugu phrase used | why unsure | alternative
---|---|---|---
privacy.h1 / seoTitle | గోప్యతా విధానం | Footer in te.json says only "గోప్యత". "గోప్యతా విధానం" is the usual website heading but a bit formal | ప్రైవసీ పాలసీ
privacy.sections.0.html | ఉచిత 5 నిమిషాల చెక్-ఇన్ | English says "free 5-minute wellbeing check-in"; I used the te.json name and dropped "wellbeing" | ఉచిత 5 నిమిషాల వెల్‌బీయింగ్ చెక్-ఇన్
privacy.sections.0.html | Digital Personal Data Protection Act, 2023 (DPDP Act) | Kept in English as the brief asked; a Telugu sentence around an English law name reads a little mixed | డిజిటల్ వ్యక్తిగత డేటా రక్షణ చట్టం, 2023
privacy.sections.0.html | మీ వివరాలను ఎందుకు, ఎలా వాడాలో శ్రీకాంతే నిర్ణయిస్తారు | English "decides why and how your information is used" (the DPDP "data fiduciary" idea). Plain wording used, no legal term | డేటా ఫిడ్యూషియరీ అయిన శ్రీకాంత్ (too legal)
privacy.sections.1.html | సమాధానాలు, స్కోర్లు, పేరు, వాట్సాప్ నంబర్ ... మా దగ్గర ఉంటాయి (check-in bullet) | English "we store"; I used "మా దగ్గర ఉంటాయి" (stay with us) which is softer than "we store" | మేము సేవ్ చేస్తాం
privacy.sections.1.html | నమోదు చేసుకుంటాం (utm values) | "we note them"; "నమోదు" is slightly formal | రాసుకుంటాం / సేవ్ చేసుకుంటాం
privacy.sections.1.html | వెబ్‌సైట్ వాడకం లెక్కలు (అనలిటిక్స్) | "Usage analytics". Added "అనలిటిక్స్" in brackets so it matches the tool names below | కేవలం "అనలిటిక్స్"
privacy.sections.1.html | గుర్తింపు కోడ్‌లు | "similar identifiers" (cookies and the like). No common Telugu term | ఐడెంటిఫైయర్లు
privacy.sections.1.html | జ్యోతిష్య విరాళం (bullet heading) | English "Jyotish contributions"; te.json uses "విరాళం" for donation-based | జ్యోతిష్య సహకారం
privacy.sections.1.html | ఈ సైట్ వాటిని ఎప్పుడూ చూడదు, సేవ్ చేసుకోదు | "never sees or stores"; "సేవ్ చేసుకోదు" used instead of a heavier word for "store" | భద్రపరచదు (owner dislikes)
privacy.sections.3.html | మేనేజ్డ్ డేటాబేస్ సర్వీస్ | "managed database service" kept as loanwords | డేటాబేస్ సేవ
privacy.sections.4.html | ఎవరివో గుర్తుపట్టలేని విధంగా మార్చేస్తాం | English "anonymise". Explained in plain words; longer than the original | పేరు, నంబర్ లేకుండా మార్చేస్తాం
privacy.sections.4.html | ఆ తర్వాత | English "After that" is slightly open (after you ask / he clears). Kept the same loose link | -
privacy.sections.5.html | మేము దాన్ని పరిశీలించేలా చూడటం | "have it looked at" (complaint). Awkward but literal | మా పరిశీలన కోరడం
privacy.sections.5.html | అది నిజంగా మీరేనా అని చెక్ చేసుకోవాల్సి రావచ్చు | "confirm it is really you". Everyday, not "ధృవీకరించు" | నిర్ధారించుకోవాల్సి రావచ్చు
privacy.sections.6.html | తల్లిదండ్రులు లేదా గార్డియన్ | "guardian" as English loanword (people say గార్డియన్) | సంరక్షకులు (heavier)
privacy.sections.7.html | Tele-MANAS / KIRAN హెల్ప్‌లైన్ | Kept in English letters as the brief said, but te.json check-in page writes "టెలి-మానస్". Site will show two spellings | టెలి-మానస్
privacy.sections.7.html | ఇది అత్యవసర పరిస్థితికి స్పందించలేదు | "cannot respond to a crisis". Plain, but a bit blunt | ఇది అత్యవసర సమయంలో తోడుగా ఉండలేదు
privacy.sections.7.html | మిమ్మల్ని మీరు బాధపెట్టుకోవాలనే ఆలోచనలు | Same phrase as te.json check-in ("harming yourself") | -
privacy.sections.9.html | నంబర్‌కు కాల్ చేయండి | English "call"; kept "కాల్ చేయండి" | ఫోన్ చేయండి

### Terms

key path | Telugu phrase used | why unsure | alternative
---|---|---|---
terms.h1 / seoTitle / privacy link text | వినియోగ నిబంధనలు | Standard website heading but "వినియోగ" is a bit bookish. te.json footer says only "నిబంధనలు" | వాడుక నిబంధనలు; నిబంధనలు
terms.intro | వీటిని మీరు అంగీకరించినట్టే | "you agree to them". "అంగీకరించు" is common in apps and newspapers but slightly formal | వీటికి ఒప్పుకున్నట్టే
terms.sections.0.html | అదనపు వెల్‌నెస్ సేవలు | "complementary wellness services"; te.json uses "అదనపు" for complementary | కాంప్లిమెంటరీ వెల్‌నెస్ సేవలు
terms.sections.0.html | వైద్య, మానసిక, న్యాయ లేదా ఆర్థిక సలహా | "psychological" as "మానసిక" (as in te.json footer); can be read as "mental" | మానసిక ఆరోగ్య సలహా
terms.sections.0.html | నయం చేస్తామని, చికిత్స చేస్తామని, రాకుండా చేస్తామని మేము చెప్పుకోం | "claim to cure, treat or prevent". Three verbs kept separate | -
terms.sections.1.html | ఇది జరిగే సంఘటనలను ఖచ్చితంగా చెప్పదు | "does not predict events with certainty". Could be read as "never predicts"; I kept "ఖచ్చితంగా" (with certainty) so the sense is the same | కచ్చితంగా (everyday spelling)
terms.sections.1.html | షరతు | "condition of a consultation". Everyday word | నిబంధన
terms.sections.1.html | ఫిక్స్‌డ్ ఫీజు లేదు | Same as te.json | నిర్ణీత రుసుము (heavy)
terms.sections.2.html | ₹1,000 (written for "Rs 1,000") | Allowed by brief | రూ. 1,000
terms.sections.5.html | IST (భారత సమయం) | English has "Indian Standard Time (IST)" | భారత ప్రామాణిక సమయం (IST)
terms.sections.6.html | సైట్‌ను దుర్వినియోగం చేయకండి | "Do not misuse the site"; "దుర్వినియోగం" is fairly common but heavy | సైట్‌ను తప్పుగా వాడకండి
terms.sections.6.html | చట్టవిరుద్ధమైనదేదైనా | "anything unlawful"; one long word | చట్టానికి వ్యతిరేకమైనది ఏదైనా
terms.sections.7.html | మేము బాధ్యులం కాదు | "we are not liable". Common newspaper form | మాది బాధ్యత కాదు
terms.sections.7.html | చట్టం అనుమతించిన మేరకు | "as far as the law allows" | చట్టం ఒప్పుకున్నంత వరకు
terms.sections.7.html | పరిమితం చేయలేని మీ ఏ హక్కునూ ఈ నిబంధనలు పరిమితం చేయవు | "limits any right ... that cannot be limited by law". "పరిమితం" repeated twice on purpose | తగ్గించలేని ... తగ్గించవు
terms.sections.11.html | హైదరాబాద్‌లోని కోర్టులకు విచారణ చేసే అధికారం (పరిధి) ఉంటుంది | "have jurisdiction". Kept non-exclusive, as in English (did not write "only" / "ప్రత్యేక") | హైదరాబాద్ కోర్టుల పరిధిలో ఉంటుంది (could read as exclusive)
terms.sections.11.html | భారతదేశ చట్టాలు వర్తిస్తాయి | "governed by the laws of India" | భారత చట్టాల ప్రకారం నడుస్తాయి

### Refund

key path | Telugu phrase used | why unsure | alternative
---|---|---|---
refund.h1 | రీఫండ్, రద్దు విధానం | English "Refund and Cancellation Policy"; "రద్దు" as in te.json ("పేమెంట్ రద్దయింది") | రీఫండ్, క్యాన్సిలేషన్ పాలసీ
refund.sections.0.html | మీ స్లాట్‌కు 24 గంటలు లేదా అంతకంటే ముందు రద్దు చేస్తే | "24 or more hours before your slot". Telugu word order could be read as "24 hours before the slot" with the "or more" at the end; check this reads as at least 24 hours | మీ స్లాట్‌కు కనీసం 24 గంటల ముందు రద్దు చేస్తే
refund.sections.0.html | రీషెడ్యూల్: ... ఒక్కసారి ఉచితంగా మార్చుకోవచ్చు | "move your booking once, free of charge". "ఒక్కసారి" = one time only | ఒకసారి మాత్రమే
refund.sections.0.html | మేము రద్దు చేస్తే, లేదా మీ సెషన్ జరపలేకపోతే | "cancel or cannot hold your session" | మేము సెషన్ జరపలేకపోతే
refund.sections.0.html | ఎలాంటి ఛార్జీ లేకుండా కొత్త స్లాట్ | "new slot at no charge" | అదనపు ఖర్చు లేకుండా
refund.sections.0.html | మీరు మొదట చెల్లించిన పద్ధతికే | "original payment method" | అదే పేమెంట్ పద్ధతికి
refund.sections.0.html | 5-7 పని రోజుల్లో | "working days". "పని రోజులు" is common in newspapers; some people say "వర్కింగ్ డేస్" | 5-7 వర్కింగ్ డేస్‌లో
refund.sections.1.html | రీఫండ్ చేస్తాం లేదా కొత్తది ఇస్తాం | "refund or replace". The choice stays with us, as in English | -
refund.sections.1.html | అది అందిన తర్వాత వీలైనంత త్వరగా | "as soon as you can after it arrives". No fixed deadline in English, none added | -
refund.sections.2.html | మేము పరిశీలిస్తాం | "we will look into it". Deliberately does not promise a refund | మేము చూస్తాం (could sound like a promise)
refund.sections.3.html | వారికి చేసిన చెల్లింపులను మేము రీఫండ్ చేయలేం | "we cannot refund payments made to them" | -

### Legal-sensitive points (lawyer / reviewer please check these first)

key path | Telugu phrase | what a wrong nuance would change
---|---|---
privacy.sections.2.html | మీ అనుమతిని మీరు ఎప్పుడైనా వెనక్కి తీసుకోవచ్చు; ... వెనక్కి తీసుకునేలోపు మేము చేసినవాటిని అది వెనక్కి తిప్పదు; చట్టం కోరితే, పేమెంట్ రికార్డులను మేము ఇంకా ఉంచుకోవచ్చు | Consent and withdrawal: right to withdraw "at any time", no retroactive effect, and the exception for payment records "if the law requires it". "ఇంకా ఉంచుకోవచ్చు" says we may keep, not that we must
privacy.sections.2.html | మీరు ఒక నిర్దిష్ట కారణం కోసం వివరాలు ఇచ్చారు కాబట్టి వాటిని వాడతాం | Basis of consent: purpose-specific. "for a specific purpose" must not read as general consent
privacy.sections.4.html | 12 నెలల వరకు ఉంచుతాం. మీరు అంతకంటే ముందే తొలగించమని కోరితే తొలగిస్తాం | Retention: "up to 12 months" and erasure on request. Payment records "as long as we need them for refunds, accounts and legal reasons" (no fixed period)
privacy.sections.5.html | తొలగించమని కోరడం | Erasure right ("తొలగించు" = delete). Lawyer to confirm this is enough for the DPDP "erasure" right
privacy.sections.5.html | సరిచేయమని కోరడం / మీ అనుమతిని వెనక్కి తీసుకోవడం / Data Protection Board of India దగ్గరకు తీసుకెళ్లవచ్చు | Correction, withdrawal and complaint rights listed exactly as in English. Board escalation is "may", only if not satisfied
privacy.sections.5.html | అది నిజంగా మీరేనా అని చెక్ చేసుకోవాల్సి రావచ్చు | Identity check before acting on a request ("may need")
privacy.sections.3.html | మీ వివరాలను మేము అమ్మం. పైన చెప్పినవారితో తప్ప, లేదా చట్టం కోరితే తప్ప, ఇతరులతో పంచుకోం | "We do not sell" and the only two exceptions to sharing
privacy.sections.6.html | 18 ఏళ్ల లోపు ... పిల్లల తరఫున అనుమతి కూడా వారే ఇస్తారు | Children: age 18 and parent/guardian consent. "లోపు" means below 18; check it does not read as "up to and including 18"
privacy.sections.7.html | helpline numbers and "ఇది అత్యవసర పరిస్థితికి స్పందించలేదు" | Safety note: must not suggest the check-in gives crisis help
terms.sections.0.html | ఏ అనారోగ్యాన్నైనా నయం చేస్తామని, చికిత్స చేస్తామని, రాకుండా చేస్తామని మేము చెప్పుకోం; ఆరోగ్య ఫలితానికి హామీ అనుకోకండి | No cure/treatment/prevention claim and no promised outcome (also a guiding principle)
terms.sections.1.html | ఏ ఫలితానికీ హామీ లేదు; విరాళం ఇవ్వడం, సంప్రదింపుకు ఎప్పుడూ షరతు కాదు | No guarantee; a contribution is never a condition
terms.sections.2.html | ₹1,000 ... రెమెడీ బాటిల్ ... వేరుగా బిల్ చేస్తాం | Fee amount and that the remedy bottle is billed separately (optional)
terms.sections.7.html | చట్టం అనుమతించిన మేరకు ... మేము బాధ్యులం కాదు ... పరిమితం చేయలేని మీ ఏ హక్కునూ ఈ నిబంధనలు పరిమితం చేయవు | Liability limit, "as far as the law allows", and the carve-out for rights that cannot be limited
terms.sections.9.html | అప్‌డేట్ తర్వాత కూడా సైట్‌ను వాడితే, కొత్త నిబంధనలను మీరు అంగీకరించినట్టే | Acceptance of changes by continued use
terms.sections.11.html | భారతదేశ చట్టాలు వర్తిస్తాయి; హైదరాబాద్‌లోని కోర్టులకు విచారణ చేసే అధికారం (పరిధి) ఉంటుంది | Governing law and jurisdiction. Kept non-exclusive as in English
terms.sections.3.html | ఆర్ట్ ఆఫ్ లివింగ్ ... వారి నిబంధనలు, విధానాలే వర్తిస్తాయి | Third-party terms apply to Art of Living registration/donation
refund.sections.0.html | మీ స్లాట్‌కు 24 గంటలు లేదా అంతకంటే ముందు రద్దు చేస్తే: పూర్తి రీఫండ్ | Refund threshold: 24 hours or more before the slot = full refund
refund.sections.0.html | సెషన్ జరిగిన తర్వాత: రీఫండ్ ఉండదు | No refund after the session
refund.sections.0.html | ఒక్కసారి ఉచితంగా మార్చుకోవచ్చు | Reschedule once only, free
refund.sections.0.html | మేము రద్దు చేస్తే ... పూర్తి రీఫండ్ లేదా ... కొత్త స్లాట్, ఏదైనా మీరు ఎంచుకోవచ్చు | If we cancel, the choice is the customer's
refund.sections.0.html | మీరు మొదట చెల్లించిన పద్ధతికే, 5-7 పని రోజుల్లో | Refund method and timing (5-7 working days)
refund.sections.1.html | రవాణాలో అది దెబ్బతిని వస్తే, రీఫండ్ చేస్తాం లేదా కొత్తది ఇస్తాం | Damaged remedy bottle: refund or replace, photo and prompt notice asked
refund.sections.2.html | రీఫండ్ ప్రక్రియ ఏదీ లేదు ... మేము పరిశీలిస్తాం | Jyotish: no refund process; mistaken or duplicate payments only "looked into", not promised
refund.sections.3.html | వారికి చేసిన చెల్లింపులను మేము రీఫండ్ చేయలేం | Payments to Art of Living cannot be refunded by us
legal.translationNote | ఇంగ్లీష్ వెర్షన్ వర్తిస్తుంది | English version prevails if there is a difference

## Hindi: doubts on Privacy, Terms, Refund

Conventions used (flip if you prefer): spellings follow hi.json (व्हाट्सऐप, आर्ट ऑफ़ लिविंग, टेली-मानस, हैदराबाद, श्रीकांत जी, रिफ़ंड, कैंसल, कंसल्टेशन, सेशन, फ़ीस, पेमेंट, बाख फ्लावर, चेक-इन). Razorpay, Supabase, Netlify, Google Analytics, Meta Pixel, Plausible, KIRAN, UPI, DPDP Act, Digital Personal Data Protection Act 2023 and Data Protection Board of India are kept in Latin script. The brief listed WhatsApp, Art of Living, Tele-MANAS and Hyderabad as names to keep untouched, but also asked to reuse hi.json spellings, which write them in Devanagari; I followed hi.json.

### Privacy

| Key path | Hindi phrase used | Why unsure | Alternative |
|---|---|---|---|
| privacy.sections.0.html | आपकी जानकारी किसलिए और कैसे इस्तेमाल होगी, यह श्रीकांत जी तय करते हैं | "decides why and how" is the DPDP "Data Fiduciary" idea; plain Hindi loses the technical term | "...के लिए श्रीकांत जी डेटा फ़िडूशियरी हैं" (too technical, not used) |
| privacy.sections.0.html | "Digital Personal Data Protection Act, 2023 (DPDP Act)" kept in English | Mixed script inside a Hindi sentence | डिजिटल पर्सनल डेटा प्रोटेक्शन एक्ट, 2023 |
| privacy.sections.1.html (check-in) | हम आपके जवाब और स्कोर सेव करते हैं | "answers and scores" literal; fine | जवाब और अंक |
| privacy.sections.1.html (check-in) | अगर आप कहें तो श्रीकांत जी आपसे संपर्क कर सकें | "follow up if you ask him to": makes clear it is on the person's request | अगर आप चाहें कि वे आपसे बात करें |
| privacy.sections.1.html (analytics) | कुकी या उसी तरह की पहचान | "cookies or similar identifiers"; "पहचान" may sound vague | कुकी या ऐसे ही दूसरे आइडेंटिफ़ायर |
| privacy.sections.1.html (campaign tags) | कैंपेन टैग (utm_ वैल्यू) | Marketing jargon, kept as loanword | प्रचार के टैग |
| privacy.sections.1.html (Jyotish) | ज्योतिष दान के आधार पर है | Same phrasing as hi.json ("दान के आधार पर"); "contribution" rendered as योगदान | दक्षिणा / भेंट (not used, more bookish) |
| privacy.sections.2.h | आपकी सहमति और उसे वापस कैसे लें | "सहमति" is understood but slightly formal | मंज़ूरी / इजाज़त (hi.json footer uses इजाज़त) |
| privacy.sections.2.html | सहमति वापस लेने से, उससे पहले हमने जो कुछ किया, वह रद्द नहीं हो जाता | Long sentence to keep "does not undo anything done before" exact | वापस लेने का असर पहले की बातों पर नहीं पड़ता |
| privacy.sections.2.html | अगर कानून के हिसाब से ज़रूरी हो, तो हम पेमेंट के रिकॉर्ड फिर भी रख सकते हैं | "may still keep ... if the law requires" | कानून माँगे तो |
| privacy.sections.3.html | शेयर करते हैं | "share" as loanword; the legal word would be साझा | साझा करते हैं |
| privacy.sections.4.html | ऐसा बदल देते हैं कि उससे आपकी पहचान न हो सके | "anonymise" described, not a one-word term | गुमनाम कर देते हैं |
| privacy.sections.4.html | ज़्यादा से ज़्यादा 12 महीने तक | "up to 12 months" | अधिकतम (bookish, not used) |
| privacy.sections.5.html | कह सकते हैं कि हम आपकी जानकारी मिटा दें | "erasure" rendered as मिटा दें (plain) | हटा दें / डिलीट कर दें |
| privacy.sections.5.html | हमसे शिकायत कर सकते हैं, और उसे देखा जाएगा | "have it looked at" is vague in English too; kept equally vague | हम उस पर गौर करेंगे |
| privacy.sections.5.html | Data Protection Board of India के पास ले जा सकते हैं | Name kept in English | डेटा प्रोटेक्शन बोर्ड ऑफ़ इंडिया |
| privacy.sections.6.html | माता-पिता या अभिभावक | "guardian"; अभिभावक is a bit formal | माता-पिता या गार्डियन |
| privacy.sections.6.html | 18 साल से कम उम्र के लोगों के लिए नहीं है | "not directed at anyone under 18" | 18 साल से छोटे लोगों के लिए नहीं |
| privacy.sections.7.html | यह किसी संकट में जवाब नहीं दे सकता | "cannot respond to a crisis"; संकट is slightly formal | मुश्किल घड़ी / इमरजेंसी में |
| privacy.sections.9.html | रिक्वेस्ट | "requests" as loanword | अनुरोध |

### Terms

| Key path | Hindi phrase used | Why unsure | Alternative |
|---|---|---|---|
| terms.intro | साइट इस्तेमाल करने का मतलब है कि आप इनसे सहमत हैं | "By using the site, you agree" | साइट इस्तेमाल करके आप इन्हें मान लेते हैं |
| terms.sections.0.html | कृपया उसे जारी रखिए | "keep following any treatment" | चलाते रहिए |
| terms.sections.0.html | फ़ाइनेंशियल एडवाइज़र | loanword for "financial adviser" | पैसों का सलाहकार |
| terms.sections.1.html | सोच-विचार के एक ढाँचे की तरह | "reflective framework"; same wording as hi.json jyotish | सोचने-समझने का एक तरीक़ा |
| terms.sections.1.html | किसी घटना को पक्के तौर पर नहीं बताता | "does not predict events with certainty" | पक्की भविष्यवाणी नहीं करता |
| terms.sections.1.html | योगदान देना कंसल्टेशन की कोई शर्त नहीं है | "never a condition of a consultation" | कंसल्टेशन के लिए योगदान देना ज़रूरी नहीं है |
| terms.sections.2.html | रेमेडी की बोतल ... उसका बिल अलग से बनता है | "billed separately" | अलग से चार्ज होती है |
| terms.sections.3.h/html | सेवा के रूप में, अपनी मर्ज़ी से सिखाते हैं | "voluntary service"; no exact everyday phrase | स्वयंसेवा के तौर पर / वॉलंटियर के तौर पर |
| terms.sections.4.html | इमरजेंसी वाला नोट | "crisis note", pointing to Privacy heading | मदद वाला नोट |
| terms.sections.5.html | भारतीय समय (IST) | "Indian Standard Time" | भारतीय मानक समय |
| terms.sections.6.html | गैरकानूनी | "unlawful" | कानून के ख़िलाफ़ |
| terms.sections.6.html | कमर्शियल इस्तेमाल | "commercial use" | कारोबारी इस्तेमाल / बिज़नेस के लिए |
| terms.sections.7.h | हमारी ज़िम्मेदारी कहाँ तक | Heading for "Liability"; friendly, not formal | ज़िम्मेदारी की सीमा |
| terms.sections.7.html | किसी भी नुक़सान | "any loss or harm" covered by single word नुक़सान | नुक़सान या हानि |
| terms.sections.7.html | आपके उस हक़ को सीमित नहीं करती, जिसे कानून सीमित नहीं होने देता | Mirror of "any right ... that cannot be limited by law"; sounds clumsy | कानून जो हक़ आपसे छीनने नहीं देता, उसे ये नियम नहीं छीनते |
| terms.sections.9.html | बदले हुए नियम मानते हैं | "accept the updated terms" | मंज़ूर करते हैं |
| terms.sections.10.h/html | सुनवाई का अधिकार (ज्यूरिस्डिक्शन) हैदराबाद की अदालतों के पास होगा | "have jurisdiction": not clear if exclusive; I kept it non-exclusive-sounding, same as English | क्षेत्राधिकार (formal); "सिर्फ़ हैदराबाद की अदालतों में" (would make it exclusive, not used) |
| terms.sections.10.html | भारत के कानूनों के हिसाब से चलेंगे | "governed by the laws of India" | भारत के कानून लागू होंगे |

### Refund

| Key path | Hindi phrase used | Why unsure | Alternative |
|---|---|---|---|
| refund.sections.0.html | स्लॉट से 24 घंटे या उससे ज़्यादा पहले कैंसल करने पर: पूरा रिफ़ंड | "24 or more hours before your slot" | 24 घंटे पहले या उससे भी पहले |
| refund.sections.0.html | आप अपनी बुकिंग एक बार बिना किसी चार्ज के दूसरे समय पर कर सकते हैं | "move once, free of charge"; stays limited to one time | एक बार फ़्री में बदल सकते हैं |
| refund.sections.0.html | अगर हम कैंसल करें या आपका सेशन नहीं ले पाएँ | "cannot hold your session" | सेशन न कर पाएँ |
| refund.sections.0.html | जिस पेमेंट तरीक़े से आपने दिया था, उसी में, 5-7 कामकाजी दिनों के अंदर | "original payment method" and "working days"; unclear if days count from refund approval or request (same as English) | वर्किंग डेज़; "मूल पेमेंट तरीक़े" |
| refund.sections.0.html | समय बदलना (रीशेड्यूल) | "Reschedule" has no common Hindi word | रीशेड्यूल only |
| refund.sections.1.html | रास्ते में टूट-फूट जाए या खराब हो जाए, तो हम उसका रिफ़ंड देंगे या उसकी जगह दूसरी भेजेंगे | "damaged in transit ... refund or replace"; I added "या खराब हो जाए" for clarity, only "damaged" in English | सिर्फ़ "टूट-फूट जाए" |
| refund.sections.1.html | पहुँचने के बाद जितनी जल्दी हो सके बता दीजिए | "as soon as you can after it arrives"; no fixed time (same as English) | |
| refund.sections.2.html | इसलिए रिफ़ंड की कोई प्रक्रिया नहीं है | "no refund process"; then "हम उसे देखेंगे" for "we will look into it" (not a promise of refund) | कोई रिफ़ंड नहीं मिलता (would be stronger, not used) |
| refund.sections.3.html | उन्हें किए गए पेमेंट का रिफ़ंड हम नहीं कर सकते | "we cannot refund payments made to them" | |

### Legal-sensitive points (reviewer or lawyer, please check these first)

1. **Consent and withdrawal** (privacy.sections.2.html): "सहमति कभी भी वापस ले सकते हैं ... वापस लेने से, उससे पहले हमने जो कुछ किया, वह रद्द नहीं हो जाता ... कानून के हिसाब से ज़रूरी हो, तो हम पेमेंट के रिकॉर्ड फिर भी रख सकते हैं". Check that "not undone" and "may still keep payment records" are exactly as strong as in English.
2. **Controller statement** (privacy.sections.0.html): "आपकी जानकारी किसलिए और कैसे इस्तेमाल होगी, यह श्रीकांत जी तय करते हैं" stands for the DPDP "Data Fiduciary" role.
3. **Erasure and correction rights** (privacy.sections.5.html): "मिटा दें", "सही करें" and the complaint line ("शिकायत ... देखा जाएगा ... Data Protection Board of India के पास ले जा सकते हैं"). Check that the complaint wording does not promise an outcome or time.
4. **Identity check before acting on a request** (privacy.sections.5.html): "हमें पक्का करना पड़ सकता है कि वह सचमुच आप ही हैं": "may need", not "will".
5. **Retention** (privacy.sections.4.html): "ज़्यादा से ज़्यादा 12 महीने ... जब तक कि आप उन्हें पहले हटाने को न कहें", and the "delete or anonymise" ending.
6. **Sharing / no sale** (privacy.sections.3.html): "बेचते नहीं हैं ... सिर्फ़ ऊपर बताए तरीक़े से शेयर करते हैं, या तब, जब कानून ज़रूरी करे".
7. **Children** (privacy.sections.6.html): "18 साल से कम", parent or guardian gives information and consent on the child's behalf.
8. **Significant-change consent** (privacy.sections.8.html): "जहाँ कानून ज़रूरी करे, वहाँ हम आपसे दोबारा सहमति माँगेंगे".
9. **No cure claims / not professional advice** (terms.sections.0.html): "ठीक करने, उसका इलाज करने या उसे रोकने का दावा नहीं करते".
10. **Liability limit** (terms.sections.7.html): "कानून जितनी छूट देता है, उस हद तक ... ज़िम्मेदार नहीं हैं" and the saving clause for rights that cannot be limited.
11. **Acceptance by continued use** (terms.intro, terms.sections.9.html): "सहमत हैं" and "बदले हुए नियम मानते हैं".
12. **Governing law and jurisdiction** (terms.sections.10.html): "भारत के कानूनों के हिसाब से चलेंगे ... हैदराबाद की अदालतों के पास होगा". English says "have jurisdiction" without "exclusive"; Hindi keeps it the same.
13. **Refund timing and conditions** (refund.sections.0.html): 24 hours or more before the slot, full refund; reschedule once free; no refund after the session; full refund or new slot if we cancel; 5-7 working days to original payment method.
14. **Remedy bottle refund** (refund.sections.1.html): refund or replace only if damaged in transit; photo and prompt notice, with no fixed deadline.
15. **Jyotish "no refund process" and mistaken contribution** (refund.sections.2.html): "रिफ़ंड की कोई प्रक्रिया नहीं है" versus "हम उसे देखेंगे".
16. **Art of Living payments** (refund.sections.3.html, terms.sections.3.html): their policy applies; we cannot refund.
17. **Translation note** (legal.translationNote): English version prevails ("अंग्रेज़ी वर्शन ही लागू होगा").

Doubts total: 47 rows (Privacy 20, Terms 18, Refund 9), plus 17 legal-sensitive points.



---

# Part 5: second read-through by a stronger editor model, and your feedback applied (17 Nov 2026)

**Parts 1 to 4 describe the first draft. Where Part 5 says something different, Part 5 is newer and wins.** The full before/after list of every line changed is in `docs/TRANSLATION-CHANGES-LOG.md` (Telugu 151 + 96 changes, Hindi 89 changes).

## What was done
- **Your feedback applied:** Jyotish and other headlines rewritten in natural Telugu (gist kept, not word-for-word); Hindi headlines kept in their rhyming style; heavy and church-like words removed (తోడ్పాటు, తోడ్పడు, సంప్రదింపు, అభ్యాసం, ఆత్మసందేహం, ఆత్మగౌరవం, సమతుల్యత, సారాంశం and more, about 140 uses, now సాయం, ఆసరా, సెషన్, పద్ధతి and similar everyday words); "మనసు ఆరోగ్యం" replaced. The "English version applies" note stays. The గారు/जी addressing is left as it is.
- **"Mental health / emotional wellness":** the clinical meaning is **మానసిక ఆరోగ్యం** (used where a sentence means real mental health, for example in the disclaimers "వైద్య, మానసిక… సలహా"). For the Bach label "Emotional Wellness" I used **మానసిక ప్రశాంతత** (mental calm). It uses your word మానసిక, but I avoided "మానసిక ఆరోగ్యం" on the Bach label itself because a flower-remedy page should not read as if it treats mental health. If you want exactly "మానసిక ఆరోగ్యం" there, change 4 lines (search the Telugu file for మానసిక ప్రశాంతత).
- **Booking messages and times:** server messages (slot taken, not available and so on) now appear in Telugu and Hindi, and times show as "ఉదయం 9:00", "సాయంత్రం 5:00", "सुबह 9:00 बजे", "शाम 5:00 बजे".
- **Bugs found and fixed on the way:** the check-in page's links to Bach and Jyotish (one briefly broke the page's script in the previous push to staging; fixed now and re-tested in English, Telugu and Hindi); the Telugu draft had also strengthened some claims ("several studies" had become "many", "studies suggest" had become "according to studies", "many people find it calming" had become "it gives calm") and a price line said "for only one session" instead of "per session". All put back to the English meaning.
- **No specialist Telugu/Hindi model was available in this session.** The check was done by the strongest model I have access to, working as a native-speaker copy editor. A second check by a dedicated Indian-language model is on the AI action list (`docs/AI-ACTIONS.md`), not on yours.

## Telugu headlines: the choice made, with two alternatives each
Pick a different option for any of them and I will swap it in.

key | now says | other options | why
---|---|---|---
`checkin.topbar` | మీ మనసును మీరే చూసుకునే ఒక సున్నితమైన సాధనం — అంతర్శాంతి హీలింగ్ | అంతర్శాంతి హీలింగ్ నుండి: మనసును తరచి చూసుకునే చిన్న సాధనం / మిమ్మల్ని మీరు తెలుసుకునే సున్నితమైన సాధనం · అంతర్శాంతి హీలింగ్ | The old line stacked two relative clauses ('...అందించే మీ గురించి మీరు ఆలోచించుకునే...') and read like a translation; brand moved to the end like a signature.
`checkin.consent.h1` | మనసు ఎలా ఉంది? 5 నిమిషాల ఉచిత చెక్-ఇన్ | మీ మనసు కోసం 5 నిమిషాలు · ఉచిత చెక్-ఇన్ / ఉచిత 5 నిమిషాల మనసు చెక్-ఇన్ | English has 'Wellbeing' which the draft dropped; a friendly question (already used in the SEO title) carries that warmth the way the Hindi 'मन का...' does.
`checkin.results.eyebrow` | ఒక్క చూపులో మీ మనసు | మీ మనసు ఇప్పుడు ఇలా ఉంది / మీ మనసు — ఒక చిన్న చిత్రం | 'మనసు స్థితి సారాంశం' (summary of mind-state) sounds like a report heading; this is short and warm, like the Hindi 'मन की झलक'.
`checkin.save.title` | మీ ఫలితాలు శ్రీకాంత్‌కు చూపించాలనుకుంటున్నారా? | మీ ఫలితాలను శ్రీకాంత్ ఒకసారి చూసి చెప్పాలా? / శ్రీకాంత్ మీ ఫలితాలు చూడాలనుకుంటున్నారా? | 'శ్రీకాంత్ చూడాలా?' can read as 'Should Srikanth see?' (or even 'Must he?'); this clearly asks what the visitor wants.
`checkin.js.snap.none.title` | ఫలితం చూపడానికి సరిపడా సమాధానాలు లేవు | ఇంకొన్ని సమాధానాలు కావాలి / ఫలితానికి ఇంకా సమాధానాలు కావాలి | 'సారాంశానికి' (for a summary) is bookish for 'snapshot'.
`checkin.js.snap.attention.titleGoodOne` | కొన్ని విషయాలు బాగున్నాయి, ఒక అంశానికి కాస్త శ్రద్ధ కావాలి | కొన్ని విషయాలు బాగానే ఉన్నాయి; ఒక అంశం మాత్రం కాస్త శ్రద్ధ అడుగుతోంది / చాలా విషయాలు బాగానే ఉన్నాయి, ఒక్క అంశాన్ని కాస్త చూసుకోవాలి | Bare 'కొన్ని బాగున్నాయి' (some are good) has no noun and sounds clipped.
`checkin.js.snap.attention.titleGoodMany` | కొన్ని విషయాలు బాగున్నాయి, {n} అంశాలకు కాస్త శ్రద్ధ కావాలి | కొన్ని విషయాలు బాగానే ఉన్నాయి; {n} అంశాలు కాస్త శ్రద్ధ అడుగుతున్నాయి / కొన్ని బాగున్నాయి, {n} అంశాలను కాస్త చూసుకోవాలి | Same fix as titleGoodOne.
`checkin.js.snap.attention.titleNone` | ప్రస్తుతం కొన్ని అంశాలకు కాస్త శ్రద్ధ కావాలి | ఇప్పుడు కొన్ని అంశాలు కాస్త శ్రద్ధ అడుగుతున్నాయి / కొన్ని అంశాలను ఇప్పుడు కాస్త చూసుకోవాలి | 'చాలా అంశాలకు' means 'many areas', stronger and more alarming than 'several' (principle 1).
`checkin.js.snap.mild.titleGoodOne` | కొన్ని విషయాలు బాగున్నాయి, ఒక అంశానికి కాస్త శ్రద్ధ పెడితే మంచిది | కొన్ని విషయాలు బాగానే ఉన్నాయి; ఒక అంశాన్ని కాస్త చూసుకుంటే మంచిది / కొన్ని బాగున్నాయి, ఒక అంశానికి కొంచెం శ్రద్ధ చాలు | 'శ్రద్ధ ఇవ్వవచ్చు' reads as 'you are allowed to give care'; 'పెడితే మంచిది' is the natural 'could use some care' and stays softer than the 'కావాలి' used for the stronger band.
`checkin.js.snap.mild.titleGoodMany` | కొన్ని విషయాలు బాగున్నాయి, {n} అంశాలకు కాస్త శ్రద్ధ పెడితే మంచిది | కొన్ని విషయాలు బాగానే ఉన్నాయి; {n} అంశాలను కాస్త చూసుకుంటే మంచిది / కొన్ని బాగున్నాయి, {n} అంశాలకు కొంచెం శ్రద్ధ చాలు | Same fix as mild.titleGoodOne.
`checkin.js.snap.mild.titleNoneOne` | ఒక అంశానికి కాస్త శ్రద్ధ పెడితే మంచిది | ఒక అంశాన్ని కాస్త చూసుకుంటే మంచిది / ఒక అంశానికి కొంచెం శ్రద్ధ చాలు | Same fix as mild.titleGoodOne.
`checkin.js.snap.mild.titleNoneMany` | {n} అంశాలకు కాస్త శ్రద్ధ పెడితే మంచిది | {n} అంశాలను కాస్త చూసుకుంటే మంచిది / {n} అంశాలకు కొంచెం శ్రద్ధ చాలు | Same fix as mild.titleGoodOne.
`checkin.js.crisis.title` | ఈ బరువును మీరు ఒంటరిగా మోయనక్కర్లేదు | ఈ భారం మీరు ఒక్కరే మోయాల్సిన పని లేదు / మీరు దీన్ని ఒంటరిగా మోయనక్కర్లేదు | 'ఇది మీరు ఒక్కరే మోయాల్సిన అవసరం లేదు' has a stray 'ఇది' with no object case; 'బరువు' names what is carried, and 'మోయనక్కర్లేదు' is the spoken form. Meaning unchanged.
`checkin.js.crisis.highTitle` | మీకు ఎప్పుడు వీలనిపిస్తే అప్పుడు | మీరు సిద్ధమైనప్పుడు / మీకు ఎప్పుడు అనిపిస్తే అప్పుడే | 'సిద్ధంగా అనిపించినప్పుడు' is a literal 'feel ready'; 'ఎప్పుడు... అప్పుడు' is the natural, no-pressure Telugu.
`checkin.js.next.eyebrow` | ముందుకు ఒక మంచి అడుగు | ఇప్పుడు వేయగల మంచి అడుగు / తర్వాత ఏం చేయవచ్చు? | 'మంచి తదుపరి అడుగు' copies English word order and uses bookish 'తదుపరి'.
`home.hero.title` | <em>అంతర్శాంతి</em>కి స్వాగతం —<br>మనశ్శాంతి వైపు మీ ప్రయాణం. | <em>అంతర్శాంతి</em>కి స్వాగతం —<br>మనశ్శాంతి వైపు మీ తొలి అడుగు. / <em>అంతర్శాంతి</em>కి స్వాగతం —<br>మనశ్శాంతికి మీ దారి ఇదే. | 'మీ మనశ్శాంతికి దారి' is flat word-for-word and ends abruptly; 'వైపు మీ ప్రయాణం' flows as a welcome line.
`home.offerings.eyebrow` | మీ దారి ఎంచుకోండి | మీకు సరిపోయే దారి / ఏ దారి మీది? | Same as hero.btnPath, so the two stay identical.
`home.offerings.bach.eyebrow` | మనసుకు ఊరట | మనసుకు హాయి / మనసు బాగోగులు | 'మనసు ఆరోగ్యం' is ungrammatical (two nouns side by side) and sounds clinical; 'ఊరట' (comfort, relief) is warm everyday Telugu.
`home.about.title` | రెండు ప్రపంచాలనూ దగ్గరగా చూసిన వ్యక్తి | ఆఫీసు ఒత్తిడీ తెలుసు, మనశ్శాంతి దారీ తెలుసు / కార్పొరేట్ జీవితం, ఆధ్యాత్మిక సాధన — రెండూ తెలిసిన వ్యక్తి | 'రెండు లోకాలనూ చూసిన సాధకుడు' sounds mythological (లోకాలు = heavenly worlds) and religious; 'ప్రపంచాలు' is the everyday word for the corporate and spiritual worlds.
`home.kind.eyebrow` | మనసారా అన్న మాటలు | ఆప్యాయమైన మాటలు / వారి మనసులోని మాట | 'ఆప్యాయమైన మాటలు' is fine but flat; 'మనసారా' (from the heart) is how Telugu speakers describe heartfelt words.
`home.kind.title` | నా దగ్గరకు వచ్చినవారి మాటల్లో | నాతో పనిచేసినవారు ఇలా అంటున్నారు / వారి మాటల్లోనే | 'నాతో కలిసి నడిచినవారు' (walked with me) is poetic; 'నా దగ్గరకు వచ్చినవారు' is how a practitioner refers to the people he has helped.
`home.cta.title` | మీ హీలింగ్ ప్రయాణం మొదలుపెడదామా? | మీ హీలింగ్ ప్రయాణం మొదలుపెట్టడానికి సిద్ధమా? / మనశ్శాంతి వైపు తొలి అడుగు వేద్దామా? | '...మొదలుపెట్టడానికి సిద్ధమా?' is the English 'Ready to...?' pattern; 'మొదలుపెడదామా?' (shall we begin?) is warm, inclusive and has no pressure.
`happiness.topbar.text` | హ్యాపీనెస్ ప్రోగ్రామ్ — ఒక్కో శ్వాసతో, మనసు మరింత ప్రశాంతం · | హ్యాపీనెస్ ప్రోగ్రామ్ — శ్వాస మీద ధ్యాస, మనసుకు ప్రశాంతత · / హ్యాపీనెస్ ప్రోగ్రామ్ — ప్రశాంతమైన మనసు, శ్వాస శ్వాసకూ · | Matches the new hero line.
`happiness.hero.title` | ఒక్కో శ్వాసతో,<br><span class="hl">మనసు మరింత ప్రశాంతం.</span> | శ్వాస మీద ధ్యాస,<br><span class="hl">మనసుకు ప్రశాంతత.</span> / ప్రశాంతమైన మనసు,<br><span class="hl">శ్వాస శ్వాసకూ.</span> | 'ప్రశాంతమైన మనసు, ఒక్కో శ్వాసతో' copies English order and loses 'calmer'; this keeps the gist ('with each breath, a calmer mind') and puts the payoff in the highlight, short and balanced like the Hindi.
`happiness.strip.title` | రాబోయే హ్యాపీనెస్ ప్రోగ్రామ్ బ్యాచ్‌కు రిజిస్టర్ చేసుకోండి | రాబోయే హ్యాపీనెస్ ప్రోగ్రామ్ బ్యాచ్‌లో చేరండి / హ్యాపీనెస్ ప్రోగ్రామ్ — రాబోయే బ్యాచ్‌లో మీ పేరు నమోదు చేసుకోండి | 'తదుపరి' -> 'రాబోయే'; 'చేసుకోండి' since you register yourself.
`happiness.whatIs.title` | చాలామందికి ఎంతో ప్రశాంతంగా అనిపించే శ్వాస అభ్యాసం | ఎంతోమందికి మనసుకు హాయిగా అనిపించే శ్వాస అభ్యాసం / చాలామందికి ప్రశాంతతను అనుభవంలోకి తెచ్చే శ్వాస అభ్యాసం | 'ప్రశాంతతనిచ్చే' (that gives calm) states the effect as fact; 'అనిపించే' keeps 'many people find' and is less bookish.
`happiness.learn.items.5.title` | తోటి సాధకుల తోడు | కమ్యూనిటీ & సత్సంగం / సాధకుల సంఘం | 'కమ్యూనిటీ & సంఘం' — 'సంఘం' reads as 'society/association' and the pair is redundant; this rhymes softly (తోటి/తోడు) and says what Sangha means.
`happiness.register.title` | రాబోయే హ్యాపీనెస్ ప్రోగ్రామ్‌లో చేరండి | హ్యాపీనెస్ ప్రోగ్రామ్‌లో మీరూ చేరండి / రాబోయే బ్యాచ్‌లో మీకూ చోటుంది | 'తదుపరి' -> 'రాబోయే' (everyday).
`happiness.cta.title` | ముందడుగు వేయడానికి సిద్ధమా? | ఇక ముందడుగు వేద్దామా? / మనశ్శాంతి వైపు ఒక అడుగు వేద్దామా? | 'తదుపరి అడుగు' is bookish; 'ముందడుగు' (step forward) is the everyday Telugu idiom.
`happiness.cta.text` | ఒక్కో శ్వాసతో, మనసు మరింత ప్రశాంతం · రాబోయే బ్యాచ్ చూడండి | శ్వాస మీద ధ్యాస, మనసుకు ప్రశాంతత · రాబోయే బ్యాచ్ చూడండి / ప్రశాంతమైన మనసు, శ్వాస శ్వాసకూ · రాబోయే బ్యాచ్ చూడండి | Matches the new hero line; 'తదుపరి' -> 'రాబోయే'.
`happiness.explore.title` | అంతర్శాంతిలో మరిన్ని దారులు | అంతర్శాంతిలో ఇంకొన్ని దారులు / ఇవి కూడా మీ కోసం | 'ఇతర దారులు' is formal; 'మరిన్ని' is inviting.
`happiness.explore.bach.eyebrow` | మనసుకు ఊరట | మనసుకు హాయి / మనసు బాగోగులు | Same as home.offerings.bach.eyebrow.
`happiness.watch.title` | రిజిస్టర్ చేసుకునే ముందు | చేరే ముందు ఒకసారి చూడండి / రిజిస్టర్ చేసుకునే ముందు చూడండి | Reflexive 'చేసుకునే' (you register yourself).
`happiness.js.soonTitle` | రాబోయే బ్యాచ్ వివరాలు త్వరలో | కొత్త బ్యాచ్ తేదీలు త్వరలో / తర్వాతి బ్యాచ్ త్వరలోనే | 'త్వరలో ప్రకటిస్తాం' (we will announce) is formal; short and light like the Hindi 'अगले बैच की जानकारी जल्द'.
`jyotish.hero.titleA` | మీ జాతకం, | గ్రహాల గమనంలో, / నక్షత్రాల వెలుగులో | Owner flagged 'మీ జీవితాన్ని చదవండి, నక్షత్రాల వెలుగులో' as unnatural (nobody 'reads their life' in Telugu). 'జాతకం జీవితానికి అద్దం' is a familiar Telugu image and fits the site's 'reflection, not prediction' stance; titleB carries the coloured payoff.
`jyotish.hero.titleB` | మీ జీవితానికి అద్దం. | మీ జీవిత గమనం. / మిమ్మల్ని మీరు చూసుకోండి. | Second half of the new headline: 'Your chart, a mirror to your life.' Alternatives pair with titleA alternatives in the same order.
`jyotish.hero.intro` | వేదాలకు కన్ను వంటిది జ్యోతిష్యం. ఇది భవిష్యత్తు గురించి ఇచ్చే హామీ కాదు, ఆలోచించుకోవడానికి ఒక ఆధారం. మిమ్మల్ని మీరు అర్థం చేసుకునే ఒక దారి: మీ స్వభావం, మీలో ఉన్న ధోరణులు, జీవితంలో మీరు ఇప్పుడు ఏ దశలో ఉండవచ్చు, ఆ దశను మరింత అవగాహనతో ఎలా దాటాలి. | జ్యోతిష్యం వేదాలకు కన్ను లాంటిది. ఇది భవిష్యత్తు గురించి ఇచ్చే హామీ కాదు, ఆలోచించుకోవడానికి ఒక ఆధారం. మిమ్మల్ని మీరు అర్థం చేసుకునే ఒక దారి: మీ స్వభావం, మీలో ఉన్న ధోరణులు, జీవితంలో మీరు ఇప్పుడు ఏ దశలో ఉండవచ్చు, ఆ దశను మరింత అవగాహనతో ఎలా దాటాలి. / వేదానికి నేత్రం జ్యోతిష్యం అంటారు. ఇది భవిష్యత్తు గురించి ఇచ్చే హామీ కాదు, ఆలోచించుకోవడానికి ఒక ఆధారం. మిమ్మల్ని మీరు అర్థం చేసుకునే ఒక దారి: మీ స్వభావం, మీలో ఉన్న ధోరణులు, జీవితంలో మీరు ఇప్పుడు ఏ దశలో ఉండవచ్చు, ఆ దశను మరింత అవగాహనతో ఎలా దాటాలి. | Owner flagged 'జ్యోతిష్యం — వేదాల కన్ను —'. The traditional Telugu saying is 'వేదాలకు కన్ను వంటిది జ్యోతిష్యం' and works as an opening line; the rest is split into short sentences. 'Not a promise about the future' kept exactly.
`jyotish.whatIs.title` | మనల్ని మనం తెలుసుకునే సంప్రదాయ పద్ధతి | మనల్ని మనం అర్థం చేసుకునే పురాతన దారి / తనను తాను తెలుసుకునే ఒక పాత విద్య | 'చూసుకోవడానికి ఒక సంప్రదాయ పద్ధతి' is a calque of 'system of self-reflection'; shorter and more natural.
`jyotish.cta.title` | మీ జాతకం ఒకసారి చూద్దామా? | మీ జాతకం చూపించుకోవడానికి సిద్ధమా? / జాతకం చూద్దాం, జీవితాన్ని అర్థం చేసుకుందాం. | 'జాతకం చూసుకోవడానికి సిద్ధమా?' copies the English 'Ready to...?' pattern; 'ఒకసారి చూద్దామా?' (shall we take a look at your chart?) is how a Telugu astrologer actually invites you.
`jyotish.explore.title` | అంతర్శాంతిలో మరిన్ని దారులు | అంతర్శాంతిలో ఇంకొన్ని దారులు / ఇవి కూడా మీ కోసం | Same as happiness.explore.title.
`jyotish.explore.bach.eyebrow` | మనసుకు ఊరట | మనసుకు హాయి / మనసు బాగోగులు | Same as home.offerings.bach.eyebrow.
`bach.hero.eyebrow` | మనసుకు ఊరట | మనసుకు హాయి / మనసు బాగోగులు | Same as home.offerings.bach.eyebrow.
`bach.hero.titleB` | సున్నితమైన ఆసరా. | మెల్లని తోడు. / మృదువైన ఆసరా. | 'తోడ్పాటు' is a formal, slightly bookish word; 'ఆసరా' (support to lean on) is warm everyday Telugu, like the Hindi 'सहारा' the owner likes. titleA 'మాటలకు అందని భావాలకు' stays as is and reads well with it; if the owner wants a titleA change, 'మాటల్లో చెప్పలేని మనసుకు' pairs with 'మెల్లని తోడు.'
`bach.strip.title` | మీ బాచ్ ఫ్లవర్ సంప్రదింపు బుక్ చేసుకోండి | బాచ్ ఫ్లవర్ సంప్రదింపు — మీ సమయం ఎంచుకోండి / మీ బాచ్ ఫ్లవర్ సెషన్ బుక్ చేసుకోండి | Booking for yourself is 'బుక్ చేసుకోండి' (as on the Jyotish strip).
`bach.whatIs.title` | పూల సారం, మనసుకు తోడు | మనసు కోసం పూల సారాలు / పువ్వుల సారం, మనసుకు ఆసరా | 'మనసుకు పూల సారాలు' is a clipped literal; two balanced halves (సారం / తోడు) read like a Telugu tagline.
`bach.who.eyebrow` | ఇది ఎవరి కోసం? | ఎవరికి ఉపయోగం? / ఇది మీ కోసమేనా? | Bare 'ఎవరికి?' (to whom?) is too clipped to stand alone.
`bach.who.title` | మీరు ఇలాంటి దశలో ఉన్నారేమో… | బహుశా మీరు ఇలాంటి సమయంలో ఉన్నారేమో… / ఇవి మీకు తెలిసినవేనా… | 'ఇలాంటి స్థితిలో ఉండవచ్చు' is a literal 'may be'; 'ఉన్నారేమో…' is the gentle spoken form.
`bach.cta.title` | మొదలుపెడదామా? | మొదలుపెట్టడానికి సిద్ధమా? / మీ మనసు కోసం ఒక అడుగు వేద్దామా? | 'మొదలుపెట్టడానికి సిద్ధమా?' copies the English 'Ready to...?'; 'మొదలుపెడదామా?' is warm and pressure-free.
`bach.explore.title` | అంతర్శాంతిలో మరిన్ని దారులు | అంతర్శాంతిలో ఇంకొన్ని దారులు / ఇవి కూడా మీ కోసం | Same as happiness.explore.title.
`bach.learn.title` | ఈ పద్ధతి మూలాలు | ఈ పద్ధతి ఎక్కడ పుట్టింది / మూలం నుంచే తెలుసుకోండి | 'ఈ పని ఎక్కడినుంచి వచ్చింది' (where did this job come from) is word-for-word.
`booking.headerTitle` | మీ సెషన్ బుక్ చేసుకోండి | మీకు వీలైన సమయం ఎంచుకోండి / మీ సెషన్ సమయం ఎంచుకోండి | 'షెడ్యూల్ చేసుకోండి' is less common than 'బుక్' in everyday Telugu (Hindi also says बुक).
`booking.headerSub` | సెషన్ రకం, తేదీ, సమయం ఎంచుకోండి — వెంటనే కన్ఫర్మ్ | రకం, తేదీ, సమయం ఎంచుకోండి — వెంటనే కన్ఫర్మ్ అవుతుంది / సెషన్, తేదీ, సమయం — మూడు ఎంచుకుంటే చాలు | Repeated 'ఎంచుకోండి' and 'డేట్, టైమ్' (the rest of the site uses 'తేదీ', 'సమయం').

## Telugu: lessons about what made the draft sound unnatural
1. **English sentence shape copied into Telugu.** "Ready to …?" became "…కి సిద్ధమా?" everywhere, and "A good next step" became "మంచి తదుపరి అడుగు". Telugu invites with "…దామా?" (మొదలుపెడదామా?, చూద్దామా?) or with an idiom (ముందడుగు).
2. **English idioms translated word by word.** "read your life", "good to see", "a good place to start", "build on", "has been with you", "what works for you", "landed on a page", "open mind", "on autopilot", "racing thoughts", "acting on it". Find the Telugu idiom first. If there isn't one, say what it means in plain words.
3. **Headlines translated, not rewritten.** Telugu headlines work as two short, balanced halves, often with a repeated sound or word (పూల సారం, మనసుకు తోడు; ఒక్కో శ్వాసతో, మనసు మరింత ప్రశాంతం; జాతకం … జీవితానికి అద్దం). Keep the gist, then write the line again in Telugu.
4. **Newspaper or Sanskrit words where speech has an everyday word.** తదుపరి, బహుళజాతి సంస్థ, దశాబ్దాలు, గడువులు, త్వరిత, మూల వనరులు, భావోద్వేగ సంరక్షణ, నిర్వహణ, పటం, క్రమాలు, సాధనాలు. People in Hyderabad say రాబోయే, మల్టీనేషనల్ కంపెనీ, ఇరవై ఏళ్లు, డెడ్‌లైన్లు, మ్యాప్, ఆసనాలు, మెలకువలు.
5. **Small grammar slips that a native reader notices at once.** Plural subject with singular verb (ప్రశ్నలు … తోడ్పడుతుంది), missing case endings (ఇవి/వీటిని, సెషన్ ముందు/సెషన్‌కు ముందు, స్వాగతం needs the dative), and "ఒక్క" (only one) used where "ఒక్కో" (per/each) was meant, which put a pricing error in two places.
6. **Long sentences with stacked participles and the subject at the end.** For example: "…రూపొందించిన ఇవి, … అందించే, బాగా తెలిసిన … విధానం". Split them into two short sentences.
7. **Strength of claims drifted.** "several studies" became "చాలా" (many), "suggest" became "ప్రకారం" (according to), "many people find it calming" became "ప్రశాంతతనిచ్చే" (it gives calm), "can help" became "తోడ్పడుతుంది" (helps). Hedge words need their own exact Telugu: పలు, సూచిస్తున్నాయి, అనిపించే, తోడ్పడవచ్చు.
8. **The reader's point of view was lost.** "తమపై తమకే సందేహం" (themselves) was used in cards that speak to "you" ("మీపై మీకే"), and "ఇతరుల భయం" says "others' fear" where the English means "fear of others".
9. **Reflexive verbs.** When you do something for yourself, Telugu uses రిజిస్టర్ / బుక్ **చేసుకోండి**, not **చేయండి**. The WhatsApp messages already did this. The buttons did not.

## Telugu: questions for you (context-dependent choices)
**Settled on 18 Nov: the owner said the existing headings are fine and "नर्म" is fine, so the heading questions below (1 to 3, 10) need no action. Items 4 to 9 stay open for the native reviewers.**

1. **Jyotish hero.** I propose "మీ జాతకం, / మీ జీవితానికి అద్దం." (your chart, a mirror to your life). It matches the site's message that Jyotish is for reflection, not prediction. The other option, "గ్రహాల గమనంలో, / మీ జీవిత గమనం.", has more rhythm but sounds more like fate. Which do you prefer?
2. **Happiness hero.** I propose "ఒక్కో శ్వాసతో, / మనసు మరింత ప్రశాంతం." The more poetic option is "శ్వాస మీద ధ్యాస, / మనసుకు ప్రశాంతత." (it rhymes, but drops "calmer"). Whichever you choose should also go into topbar.text and cta.text.
3. **Emotional Wellness eyebrow.** Which do you prefer: "మనసుకు ఊరట" (comfort for the mind), "మనసుకు హాయి", or the current "మనసు ఆరోగ్యం"? The current one is grammatically loose and sounds clinical.
4. **"Book a reading" buttons.** The idiom people actually use is "జాతకం చూపించుకోండి". Would you like that on home.offerings.jyotish.btn and jyotish.cta.btn instead of "సంప్రదింపు బుక్ చేయండి"? It is warmer, but it sounds more like a traditional astrologer.
5. **"Jyotish practitioner".** The current word, "జ్యోతిష్య నిపుణుడు", means "expert". Keep it, or use the plainer "జ్యోతిష్యుడు"?
6. **"A Jyotish conversation".** The current "జ్యోతిష్య సంభాషణ" is understandable but sounds translated. Keep it, or use "జ్యోతిష్య సంప్రదింపు" to match the rest of the page?
7. **Mood.** "మనసు స్థితి" is used for "mood" in the check-in. Many Hyderabad speakers would just say "మూడ్". Should we switch?
8. **In-person.** Is "ప్రత్యక్షంగా" fine, or do you prefer the spoken "నేరుగా"?
9. **Hold.** "హోల్డ్ చేయండి" is still open from earlier. The natural Telugu would be "ఈ సమయం మీ కోసం ఉంచుతాం" in the sentences, with the button kept as "స్లాట్ హోల్డ్ చేయండి". Should I do that?
10. **"About" title.** I chose the safe "రెండు ప్రపంచాలనూ దగ్గరగా చూసిన వ్యక్తి". A punchier option is "ఆఫీసు ఒత్తిడీ తెలుసు, మనశ్శాంతి దారీ తెలుసు". Do you like that style for this heading?

## Telugu: uncommon words audit (what was replaced, other options, what was kept on purpose)
| Uncommon word | Count | Replacement used | Other options | Context notes |
|---|---|---|---|---|
| తోడ్పాటు / తోడ్పడు (all forms) | 25 (14 + 11) | **సాయం / సాయపడు** (most); **ఆసరా** where the sense is emotional support; **ఉపయోగపడు** for "who it helps" | సహాయం, తోడు, సపోర్ట్ | This is the owner's "church" word. "మద్దతు" was rejected: it sounds like politics or news ("మద్దతు ప్రకటించారు"). "అదనపు సాయం" carries "complementary support" without making the claim stronger. |
| సంప్రదింపు / -లు / -కు / -ను | 48 | **సెషన్ / సెషన్‌లు / సెషన్‌కు / సెషన్‌ను** | కన్సల్టేషన్, "జాతకం చూపించుకోవడం" | "సంప్రదింపులు" is news language (talks between governments). The site's buttons already say "సెషన్ బుక్ చేయండి", so one word now runs through cards, booking, prices and the legal pages. The "consultation fee ₹1,000" is now "సెషన్ ఫీజు ₹1,000". The amounts and the meaning are the same. |
| అభ్యాసం (శ్వాస అభ్యాసం) | 15 | **పద్ధతి / పద్ధతులు** ("శ్వాస పద్ధతి") | సాధన, శ్వాస వ్యాయామం, ప్రాక్టీస్ | In Telugu, "అభ్యాసం" sounds like a school exercise. "శ్వాస పద్ధతి" was already used elsewhere on the page. "SKY అభ్యాసంతో" became "SKY చేస్తూ". |
| ధోరణులు | 6 | **తీరు**, "ఏం నడుస్తోంది", "జరుగుతున్నదాని తీరు" | మలుపులు, పోకడ | "ధోరణి" is a news word ("trend"). In jyotish talk people say "జాతకంలో ఏం నడుస్తోంది". |
| ఆత్మగౌరవం (self-esteem) | 4 | **మీపై మీకు నమ్మకం** (chip and section title) / **మీపై మీకున్న నమ్మకం** (in sentences) | మీ మీద మీకు గౌరవం, సెల్ఫ్-ఎస్టీమ్ | In Hyderabad, "ఆత్మగౌరవం" means political dignity ("తెలంగాణ ఆత్మగౌరవం"), not the psychology idea. |
| ఆత్మవిశ్వాసం | 1 | **మీపై మీకు నమ్మకం** | ఆత్మవిశ్వాసం (keep), కాన్ఫిడెన్స్ | This word is genuinely common in news and film. I replaced it only because the owner gave it as the example and the new form matches the check-in. Reverting is safe. |
| భావాల సమతుల్యత (Emotional balance) | 5 | **మనసు నిలకడ** (chip and title); in sentences "మనసు ఎలా ఉంది, ఎంత నిలకడగా ఉంది" / "నిలకడగా ఉండటానికి" | ఎమోషనల్ బ్యాలెన్స్, మనసు స్థిరంగా ఉండటం | "సమతుల్యత" is textbook or diet-page language ("సమతుల ఆహారం"). |
| సారాంశం | 5 | "ఎలా ఉన్నారో చూపిస్తుంది" (check-in snapshot), **క్లుప్తంగా** (research overview, one-page guide), "ముఖ్యమైన విషయాలు రాసి ఇస్తాం" (written summary) | సంగ్రహం (worse) | "సారాంశం" is used in news but sounds like an essay. |
| భావోద్వేగ (స్థితి / ధోరణులు) | 3 | **మనసు స్థితి**, "లోతైన భావాలు" | భావాలు, మూడ్ | "భావోద్వేగానికి లోనయ్యారు" is news jargon. |
| సాధకులు | 2 | "SKY చేసేవారు"; the title is now **తోటివారి తోడు, సత్సంగం** | సాధన చేసేవారు | "సాధకులు" is insider spiritual jargon. "సత్సంగం" is ordinary temple and Hindu usage, and it matches the English "Sangha". |
| జ్యోతిష్య సంభాషణ | 4 of 5 | **జ్యోతిష్య సెషన్** | జాతకం గురించి మాట్లాడుకోవడం | This was a coined, literary phrase. The fifth use, "వాట్సాప్ సంభాషణలు" in Privacy, is kept on purpose (legal text). |
| ఆదరణ … అర్హులు | 1 | **ఆప్యాయత … తగినవారు** | ప్రేమ, దయ | "ఆదరణ" sounds like "audience response" in film news. |
| ముందస్తు అభిప్రాయాలు | 1 | "మనసులో ముందే ఏ అభిప్రాయాలూ పెట్టుకోకుండా" | ఓపెన్ మైండ్‌తో | |
| అనిశ్చితి | 1 | "ఏమవుతుందో తెలియని **పరిస్థితి**" | అయోమయం | "అనిశ్చితి" is a political-news word. |
| జనన సమయ సవరణ | 1 | "పుట్టిన సమయాన్ని సరిచేసే (రెక్టిఫికేషన్)" | | This is how astrologers say it aloud. |

On సాయం vs. సహాయం: both are everyday Telugu. The new text uses సాయం to match the existing "సాయపడతాయి". Where the file already said "సహాయపడవచ్చు", I left it as it was.

### 2. "Mental health" and "Emotional Wellness": decision
**Update after the owner's feedback:** the Bach label now reads **మానసిక ప్రశాంతత** (the owner wanted మానసిక in it). The text below was written before that and still mentions "మనసుకు ఊరట".

- **The clinical idea, "mental health" or "psychological"**, should be **మానసిక** / **మానసిక ఆరోగ్యం**. That is the standard term on Telugu news and health pages and in government messages (Tele-MANAS). The footer and Terms already say "వైద్య, మానసిక, న్యాయ లేదా ఆర్థిక సలహా". That is correct and I kept it. No string in en.json actually says "mental health", so no new string was needed. If one is ever added, for example in a disclaimer, use "మానసిక ఆరోగ్యం". Never use "మనసు ఆరోగ్యం".
- **The Bach "Emotional Wellness" eyebrow** (home, happiness and jyotish explore cards, bach hero) stays **మనసుకు ఊరట**. This was the earlier pass's choice. It is an everyday phrase, warm and short. "మనశ్శాంతి" was rejected for two reasons: it is close to the brand "అంతర్శాంతి", and the home hero already uses "మనశ్శాంతి వైపు మీ ప్రయాణం". "మానసిక ఆరోగ్యం" was rejected because a clinical word on a complementary-remedy label would suggest a health claim.
- **Running text about wellbeing** (Bach "support their mood", "caring for your wellbeing") uses **మనసు బాగుండటం / మనసు, శరీరం బాగుండటానికి**. It is neutral and makes no promise.
- **Check-in disclaimers** keep "రోగ నిర్ధారణ కాదు" and "డాక్టర్ లేదా కౌన్సెలర్". Those are plain and correct, so I did not touch them.

Rule for consistency: clinical or advice meaning → మానసిక; label for the Bach offering → మనసుకు ఊరట; describing feeling well → మనసు బాగుండటం.

### 3. Words kept on purpose because they are genuinely common

- **రోగ నిర్ధారణ / నిర్ధారించలేం** (9). This is the standard word for "diagnosis" on health pages. It sits in disclaimers, so I did not touch it.
- **సంప్రదించండి / సంప్రదిస్తారు** (13), meaning "contact". It appears on every banner and ad ("వివరాలకు సంప్రదించండి"). Only the noun "సంప్రదింపు" was the problem.
- **అవగాహన** (3). Very common ("అవగాహన కార్యక్రమం", "అవగాహన లేదు").
- **పరిశీలిస్తాం / పరిశీలించేలా** (2). Normal customer-care wording, and these are in legal text.
- **మానసిక** (2). See above.
- **సున్నితమైన** (14), meaning "gentle". It is understood. It is repeated often, but it is not wrong.
- **మనసు స్థితి** (mood). It is plain, not the bookish "మనఃస్థితి".
- Also kept:
  - **ధ్యాస**, **ఏకాగ్రత**, **కుదుటపడు**, **ఆసరా**, **తోడు**, **ప్రత్యేకమైన**, **గమ్యం**, **ఆధారం**, **మిశ్రమం**, **దుఃఖం**, **స్వభావం**
  - **పొంతన**, **దశ**, **జాతకం**, **విరాళం**, **ప్రాచీన జ్ఞానం**, **మెలకువలు**, **సత్సంగం**
  - **స్వచ్ఛంద సేవ**, **లాభాపేక్ష లేని సంస్థ**, **ప్రచురించిన అధ్యయనాలు** (study claims: kept exactly), **రూపొందించారు**, **ప్రసంగాలు**, **శిక్షకుడు**, **నిపుణుడు**, **అధికారిక**, **భారత ప్రామాణిక సమయం**
- **Legal register, kept on purpose:** వినియోగ నిబంధనలు, వర్తిస్తాయి, అభ్యర్థనలు, అంగీకరిస్తున్నాను, నిర్దిష్ట, దుర్వినియోగం, బాధ్యులం, పరిధి, అర్హత కలిగిన డాక్టర్ (safety text). These are standard in Telugu official text, and changing them could shift legal meaning.
- **ప్రత్యక్షంగా** (In-person, 4). Understood, but slightly formal. A possible later swap is "నేరుగా". I did not change it, because "నేరుగా" alone is unclear as a mode label.

### 4. What the patches did not change

- No disclaimer, price, refund timing, helpline text or legal obligation was made stronger or weaker.
- Placeholders, HTML, emoji/symbols, URLs and numbers were checked by script.
- The address forms ("శ్రీకాంత్ గారు" in WhatsApp messages) and the "English version applies" note are unchanged.
- Short strings stay short: chips, titles and eyebrows are at most 4 words. "తోటివారి తోడు, సత్సంగం" is the longest.

## Hindi headlines changed (all others, including the rhyming Jyotish and Happiness heroes, were kept)

key | now says | other options | why
---|---|---|---
`home.hero.title` | <em>अंतर्शांति</em> में आपका स्वागत है —<br>मन की शांति की ओर आपका रास्ता। | <em>अंतर्शांति</em> में आपका स्वागत है —<br>मन की शांति का आपका रास्ता। / <em>अंतर्शांति</em> में आपका स्वागत है —<br>सुकून भरे मन की ओर आपका सफ़र। | 'भीतर की शांति' is a literal 'inner peace'; everyday Hindi says 'मन की शांति'. Rhythm and structure kept.
`home.kind.eyebrow` | प्यार भरे शब्द | लोगों के अनुभव / आभार के शब्द | 'दो अच्छे शब्द' is unclear (flagged) and sounds like 'a couple of nice words'; 'प्यार भरे शब्द' is the natural 'kind words'.
`happiness.whatIs.title` | साँस का एक अभ्यास, जिससे बहुत-से लोगों को गहरा सुकून मिलता है | साँस का एक अभ्यास — बहुत-से लोगों के लिए गहरे सुकून का ज़रिया / साँस का वह अभ्यास, जिसमें कई लोग गहरा सुकून पाते हैं | '...सुकून देने वाला लगता है' is long and literal ('find deeply calming'); flagged as longer than English.
`happiness.learn.title` | तीन दिन, जो साथ रह जाते हैं | तीन दिन, जो याद रह जाते हैं / तीन दिन, जो मन में बस जाते हैं | 'जो आपके साथ रहते हैं' is a literal 'stay with you' (sounds like the days physically stay); 'साथ रह जाते हैं' is the idiom for something lasting.
`jyotish.whatIs.title` | खुद को समझने की एक पारंपरिक विद्या | खुद को समझने का एक पारंपरिक तरीका / खुद को जानने की सदियों पुरानी विद्या | 'पुरानी पद्धति' can read as 'old/outdated method'; 'पारंपरिक' = traditional, and 'विद्या' is the warm, common word for Jyotish.
`bach.hero.titleA` | उन एहसासों को एक नर्म सहारा, | उन एहसासों को प्यार भरा सहारा, / उन भावनाओं के लिए एक नर्म सहारा, | 'भावनाओं' is the bookish word; 'एहसास' is what people say for feelings and sounds softer with 'जिन तक शब्द नहीं पहुँच पाते'. Rhythm kept.
`bach.whatIs.title` | भावनाओं के लिए फूलों के अर्क | मन के लिए फूलों के अर्क / फूलों के अर्क, मन की देखभाल के लिए | Term consistency: 'flower essences' = 'फूलों के अर्क' on Home and the rest of Bach; 'सार' also means 'summary' and is used that way on this site.
`bach.who.title` | शायद आप इनमें से किसी दौर से गुज़र रहे हों… | हो सकता है, आप इनमें से किसी से गुज़र रहे हों… / शायद इनमें से कुछ आपको अपना-सा लगे… | 'इस दौर से गुज़र रहे हैं…' is singular and definite but introduces a list of noun phrases (flagged loose grammar); subjunctive 'हों' also keeps the gentle 'may be'.
`bach.learn.title` | यह तरीका कहाँ से आया | इस तरीके की जड़ें / यह पद्धति कहाँ से आई | 'यह काम कहाँ से आता है' is a word-for-word 'where this work comes from'; 'काम' reads as 'job'.

## Hindi: editor's notes and questions for you
The patch file `hi_natural.json` sits next to this note. It has 89 changes: 71 naturalness, 9 word/term, 9 headline. Confidence: 43 high, 46 medium. It does not touch the settled decisions: "श्रीकांत जी", सेशन/फ़ीस/पेमेंट, the "English version applies" note, the donation wording, prices, the safety and helpline text, or the self-harm item.

### 1. What sounded unnatural (general lessons)

1. **English sentence shapes copied word for word.** Examples: "यह बात आपके लिए कितनी बार सच रही" ("true for you"), "शुरू करने के लिए अच्छी जगह" ("a good place to start"), "जो आपके लिए काम कर रहा है" ("what works for you"), "तय भविष्यवाणी के मतलब में नहीं" ("not in the sense of"), "काम आता है अगर…" (English word order), "हिस्से के रूप में" ("as part of"). Hindi says the idea, not the English structure.
2. **"find it X" written as "X देने वाला लगता है / पाते हैं".** Hindi says "इससे … मिलता है" (बहुत-से लोगों को इससे सुकून मिलता है). This was fixed on Happiness, check-in and Bach. The careful claims ("many people", "may help") are kept every time.
3. **Stacked participles and noun chains.** Examples: "इलाज के साथ-साथ अपनाया जा सकने वाला एक नर्म तरीका", "एक जाना-माना इलाज के साथ-साथ चलने वाला तरीका", "…पर खुद को समझने का 5 मिनट का मुफ़्त, निजी चेक-इन". These were split into short clauses.
4. **Gender agreement with placeholders.** "{name} सुझाया गया था" and "{other} भी अपनाया जा सकता है" are masculine. They become ungrammatical when the value is "सुदर्शन क्रिया" or "ज्योतिष पर एक बातचीत". Both are rewritten so every value fits.
5. **"ज़रूरी नहीं" for "you don't have to".** "आपको इसे अकेले संभालना ज़रूरी नहीं" reads like "it is not compulsory". The warm idiom is "आपको यह सब अकेले नहीं सँभालना है".
6. **Words with a misleading second meaning.**
   - "पुरानी पद्धति" can mean outdated, so it became "पारंपरिक विद्या".
   - "सच्ची ताक़त" suggests other strengths are fake.
   - "सबूत" sounds like a courtroom.
   - "बुलावा" sounds like a summons.
   - "हर स्तर के लोग" can sound like social class.
   - "आपके लिए गए फ़ैसलों" in Terms reads as "decisions taken FOR you", the opposite of the English.
   - "सेशन नहीं ले पाएँ" sounds like a student missing a class.
7. **Real errors.**
   - "विमशोत्तरी" should be "विंशोत्तरी".
   - "थोड़ी-सी अल्कोहल" should be masculine: "थोड़ा-सा अल्कोहल".
   - "…होगी कि आप … बताइए" needs the subjunctive "बताएँ".
   - "अगर आपने जिस लिंक…" (Privacy) is a broken clause.
   - "रेमेडी की बोतल, अगर…, उसका बिल" (Terms) is a broken sentence.
8. **Small meaning drifts the earlier draft had introduced, now set back to the English.**
   - "the choice works best" had become "the remedy works better", which is an effect claim.
   - Jyotish payFine had dropped "never".
   - Happiness "results vary" had become "may vary".

### 2. Terms standardised

| Concept | Standard now | Replaced |
|---|---|---|
| financial advice | पैसों से जुड़ी सलाह | पैसों की सलाह (footer, Terms), आर्थिक सलाह (Jyotish ×2) |
| flower essences | फूलों के अर्क | फूलों के सार / नर्म सार (Bach), बाख फ्लावर एसेंस (Jyotish) |
| grief | ग़म | शोक (Bach hero, who-list, Jyotish explore); the plain-words pass had already done Home and Happiness |
| tools | तरीके | साधन (one leftover on Jyotish) |
| hold a slot | रोकना | होल्ड (booking.errors.hold_failed) |
| payment confirmed / not | कन्फ़र्म | पुष्टि (Bach payUnverified) |
| cancelled | कैंसल | रद्द (bach.book.cancelled), matching the Refund page |
| alcohol | masculine: थोड़ा-सा अल्कोहल | थोड़ी-सी अल्कोहल |
| "you don't have to … alone" | आपको (यह सब) अकेले नहीं सँभालना है | …संभालना ज़रूरी नहीं (है) |
| spelling | सँभालना (with chandrabindu) in changed strings | संभालना. Several untouched strings still have "संभाल"; both spellings are accepted. |

### 3. Questions for the owner

1. **"नर्म" for "gentle".** The plain-words pass turned every कोमल into नर्म. In Hindi, नर्म is mostly about texture (soft bread, soft cloth). With सहारा/तरीका/स्वभाव it is acceptable, so I left those. With सुझाव/संकेत/व्यवस्था/क्रम/सार it sounded wrong, so I changed those. About 12 strings still say "नर्म सहारा" or "नर्म तरीका". If you want, the alternatives are "सहज" (easy, natural) or "हल्का" (mild). Do you want a single word everywhere?
2. **"इलाज के साथ वेलनेस"** (bach.topbar.tail, bach.cta.sub, for "Complementary wellness") is a short chip and sounds a little odd. Options: keep it; "इलाज के साथ-साथ" alone; or the English loanword "कॉम्प्लिमेंटरी वेलनेस", which many people may misread as "free".
3. **Medical word.** The footer and check-in say "डॉक्टरी सलाह/इलाज", while Jyotish and Terms say "मेडिकल सलाह". Both are natural. Pick one if you want strict consistency; I did not change them.
4. **"ध्यान ट्रेनर"** (Home intro and chips) mixes Hindi and English. "मेडिटेशन ट्रेनर" or "ध्यान सिखाने वाला" are the options. I left it.
5. **Address form in running text.** Booking errors and Privacy say "श्रीकांत जी", while check-in, Bach and Jyotish running text say plain "श्रीकांत" (with वे). The address decision is final, so I did not touch this. Just confirm the mix is intended: "जी" in messages and legal text, plain name in page copy.
6. **Headlines with alternatives.** These 9 are in the patch: home.hero.title, home.kind.eyebrow, happiness.whatIs.title, happiness.learn.title, jyotish.whatIs.title, bach.hero.titleA, bach.whatIs.title, bach.who.title, bach.learn.title. The Jyotish hero ("अपनी ज़िंदगी को पढ़िए / सितारों के ज़रिए") and the Happiness hero ("शांत मन, एक-एक साँस से") were kept as they are.
7. **Still open from earlier lists (not decided here):** "समुदाय और संगत" vs "सत्संग"; "दान के आधार पर" vs "योगदान"; "अख़बार वाले" in the Jyotish FAQ; "हीलिंग"; "लॉन्ग-SKY"; Refund's extra words "या खराब हो जाए".


---

# Part 6: all questions rewritten to sound natural (18 Nov 2026)

You said the questions read like literal translations, especially in Telugu (examples: "మనసు ఎలా ఉంది?" and "మాట్లాడి చెప్పుకోవాలనుకుంటున్నారా?"). All of them were reviewed and rewritten as a Hyderabad speaker would actually ask them. Line-by-line before/after with two alternatives each: `docs/TRANSLATION-CHANGES-LOG.md` (last two sections). Staging: `/te/checkin`, `/hi/checkin`, and the FAQ on each page.

**The main idea (both languages):** the old card showed a full closed question and, under it, a bare report-like statement, which is what read as a translation. Now the stem starts the sentence and each of the 25 items finishes it, so the pair reads like one spoken question. In Telugu: "గత రెండు వారాల్లో, ఎంత తరచుగా…" then "దిగులుగా, ఖాళీగా, ఏ ఆశా లేనట్టు అనిపించింది?". In Hindi: "पिछले दो हफ़्तों में कितनी बार ऐसा हुआ कि…" then "आपको …". Two answer labels were changed to what people really answer (Telugu "అరుదుగా" → "ఎప్పుడో ఒకసారి", "తరచుగా" → "చాలాసార్లు"; Hindi "शायद ही कभी" → "बहुत कम"). Scoring is unchanged: every item keeps its meaning and its positive/negative direction. I tested all 25 questions on a 320 px and 390 px phone in Telugu and Hindi: nothing overflows and the card does not jump around.

**Examples you flagged:** the check-in title "మనసు ఎలా ఉంది? 5 నిమిషాల ఉచిత చెక్-ఇన్" is now "మీ మనసు కోసం 5 నిమిషాల ఉచిత చెక్-ఇన్" (question-style alternative: "ఈ మధ్య మనసు బాగుంటోందా?"); "మాట్లాడి చెప్పుకోవాలనుకుంటున్నారా?" is now "మనసు విప్పి మాట్లాడాలని ఉందా?"; "ఎక్కడ మొదలుపెట్టాలో తెలియడం లేదా?" is now "…తోచడం లేదా?". Also fixed: the Telugu self-harm item used "బాధపెట్టుకోవడం", which usually means hurting your feelings; it now says clearly that the person may hurt themselves ("హాని చేసుకోవాలనే ఆలోచనలు"), keeping the item gentle but unmistakable.

**Please have a Telugu-speaking counsellor, or someone you trust, read the safety item first** (Feeling low, item 5) in both languages. It is the one line where wording matters most.

**Settled by you on 18 Nov (no action left):** the existing page headings and the Part 5 "questions for you" about heroes and eyebrows are fine as they are; the word "नर्म" stays.

## Telugu notes, the 25 items and questions for you

Patch file: `te_questions.json` in this folder. It has 43 changes, and each one has two alternatives. te.json itself was not edited. Every `old` value matches te.json exactly, and numbers, symbols and HTML are unchanged (checked by script).

### Rule of thumb: how Telugu asks these questions

1. **Ask the question a counsellor would ask out loud.** English questionnaires put a question on top ("How often has this been true?") and a statement under it ("Felt low"). Telugu does not split it like that. A Hyderabad counsellor says **"గత రెండు వారాల్లో, ఎంత తరచుగా దిగులుగా అనిపించింది?"**, which is one sentence. So the stem now **opens** the sentence ("గత రెండు వారాల్లో, ఎంత తరచుగా…") and each item **finishes** it, ending with "?". The old pair read as two separate lines: a full question and then a report about the reader ("…గమనించారు"). That is the "literal translation" feeling the owner noticed.
2. **The answer has to be what a person would actually say back.** To "ఎంత తరచుగా…?" people answer *అస్సలు లేదు / ఎప్పుడో ఒకసారి / కొన్నిసార్లు / చాలాసార్లు / ఎప్పుడూ*. "అరుదుగా" and "తరచుగా" are written words. "తరచుగా" also just repeated the question.
3. **Do not copy the "Do you want to…? / Ready to…?" shape.** "…చెప్పుకోవాలనుకుంటున్నారా?", "…చూపించాలనుకుంటున్నారా?" and "…సిద్ధమా?" are translated UI patterns. Telugu offers and invites with **"…ఉందా?"** (మాట్లాడాలని ఉందా?), **"…మంటారా?"** (చూడమంటారా?) and **"…దామా?"** (ముందడుగు వేద్దామా?).
4. **Use the spoken idiom when one exists.** Examples: తోచడం లేదా (not sure), మనసు విప్పి మాట్లాడటం (talk it through), మనసు పెట్టి (with full attention), ఉన్నట్టే (as it is), ఆలోచనలు పరుగులు తీయడం (racing thoughts), గుండె దడ, ఒళ్లు బిగుసుకుపోవడం, కుదురు లేకపోవడం (on edge), లోపలే దాచుకోవడం (bottling up), తొణకకుండా (steady), బతకడం ఎందుకని. Hyderabad loanwords that people really use are fine: రియాక్ట్, అప్‌సెట్, ఫ్రెండ్.
5. **Avoid written postpositions and connectors**, such as -పై, వంటి, ప్రతి, సవాళ్లు, ఆధారం, స్పందించకుండా, మతపరమైన. Use మీద, లాంటి, ఒక్కో, కష్టాలు, కారణం, రియాక్ట్ అవకుండా, మతానికి సంబంధించిన.
6. **A bare "మనసు ఎలా ఉంది?" is not something you say to a stranger.** Telugu speakers ask "ఎలా ఉన్నారు?" or "ఈ మధ్య … బాగుంటోందా?". The page title and h1 are now a warm statement: "మీ మనసు కోసం 5 నిమిషాల ఉచిత చెక్-ఇన్".

### How the visitor now reads one card

> గత రెండు వారాల్లో, ఎంత తరచుగా…
> **దిగులుగా, ఖాళీగా, ఏ ఆశా లేనట్టు అనిపించింది?**
> ○ అస్సలు లేదు ○ ఎప్పుడో ఒకసారి ○ కొన్నిసార్లు ○ చాలాసార్లు ○ ఎప్పుడూ

Each item was read aloud with the stem and all five labels. For example, "ఎంత తరచుగా… మీ గురించి మీకు తృప్తిగా అనిపించింది? — చాలాసార్లు." works as a natural question and answer for all 25 items.

**Things to know before applying:**
- The stem, the two labels and the 25 items should go in **together**. The new stem needs items that end in "?". If you prefer stem alternative 2 ("…ఇలా ఎన్నిసార్లు జరిగింది?"), the items would need to drop the "?". The scoring order is unchanged (0 to 4).
- Five items are 1 to 4 code points longer than before, mostly because of the added "?". The longest new item has 75 code points, and the longest old one had 84, so everything still fits inside the 4-line card height the phone layout keeps for Telugu. Nineteen items are now shorter and one is the same length.
- The h1 and SEO title are on the owner's example list, so they changed even though they are headings. No other hero title or eyebrow was touched.

### The 25 items

| # | Area (polarity) | English | New Telugu (reads after "గత రెండు వారాల్లో, ఎంత తరచుగా…") | Note |
|---|---|---|---|---|
| 1 | Mindfulness (+) | Noticed small sensory details around you — light, sound, smell | చుట్టూ వెలుతురు, శబ్దం, వాసన లాంటి చిన్న విషయాలు గమనించారు? | Dash-list folded into the sentence |
| 2 | Mindfulness (+) | Paused before reacting instead of responding on autopilot | అలవాటుగా వెంటనే రియాక్ట్ అవకుండా, ఒక్క క్షణం ఆగారు? | "స్పందించకుండా" is too written |
| 3 | Mindfulness (+) | Noticed your breath or body without trying to change it | శ్వాసను, శరీరాన్ని మార్చాలని చూడకుండా ఉన్నట్టే గమనించారు? | Old wording could be read as "change your body" |
| 4 | Mindfulness (+) | Did ordinary tasks — eating, walking, showering — with full attention | తినడం, నడవడం, స్నానం లాంటి పనులు మనసు పెట్టి చేశారు? | Uses the idiom మనసు పెట్టి |
| 5 | Mindfulness (+) | Observed your emotions arise without being swept away by them | మనసులో ఏదైనా భావం వస్తుంటే, దానిలో మునిగిపోకుండా గమనించారు? | "భావాలు పుడుతున్నప్పుడు" was a calque |
| 6 | Self-esteem (+) | Felt satisfied with who you are | మీ గురించి మీకు తృప్తిగా అనిపించింది? | |
| 7 | Self-esteem (+) | Felt confident in your own judgment and decisions | మీ ఆలోచన మీద, నిర్ణయాల మీద నమ్మకంగా అనిపించింది? | Small fix |
| 8 | Self-esteem (+) | Felt you handle challenges about as well as most people | కష్టాలను చాలామందిలాగే మీరూ ఎదుర్కోగలరనిపించింది? | "సవాళ్లు" is a poster word |
| 9 | Self-esteem (+) | Felt worthy of respect and care, including your own | మీ దృష్టిలో కూడా మీరు గౌరవానికి, ఆప్యాయతకు తగినవారని అనిపించింది? | Medium confidence. Old version was 84 code points and stacked. "మీ దృష్టిలో కూడా" carries "including your own" |
| 10 | Self-esteem (+) | Spoke to yourself with the same kindness you'd offer a friend | ఫ్రెండ్‌తో మాట్లాడేంత ఆప్యాయంగా, మీతో మీరు మాట్లాడుకున్నారు? | "ఫ్రెండ్" is gender-neutral |
| 11 | Worry (−) | Felt nervous, worried or on edge | కంగారుగా, ఆందోళనగా, కుదురు లేనట్టు అనిపించింది? | Old version reused the "మనసు నిలకడ" area title |
| 12 | Worry (−) | Found it hard to switch off racing thoughts | ఆలోచనలు పరుగులు తీస్తుంటే, ఆపుకోవడం కష్టమైంది? | Uses an existing idiom |
| 13 | Worry (−) | Felt your heart race or body tense for no clear reason | కారణం తెలియకుండానే గుండె దడదడలాడింది, లేదా ఒళ్లు బిగుసుకుపోయింది? | Body words people actually use |
| 14 | Worry (−) | Avoided a task or situation because it felt overwhelming | ఏదైనా పనో, పరిస్థితో మరీ భారమనిపించి తప్పించుకున్నారు? | |
| 15 | Worry (−) | Expected something to go wrong, even without evidence | కారణం లేకపోయినా, ఏదో చెడు జరగబోతోందనిపించింది? | "ఆధారం" sounds legal |
| 16 | Feeling low (−) | Lost interest in things you'd usually enjoy | మామూలుగా నచ్చేవాటిపై కూడా ఆసక్తి పోయింది? | |
| 17 | Feeling low (−) | Felt low, flat or hopeless | దిగులుగా, ఖాళీగా, ఏ ఆశా లేనట్టు అనిపించింది? | Was already close |
| 18 | Feeling low (−) | Had noticeably low energy or motivation | శక్తి, ఉత్సాహం బాగా తగ్గినట్టు అనిపించింది? | Was already close |
| 19 | Feeling low (−) | Struggled with sleep — too little or too much | నిద్ర సరిగా పట్టలేదు, లేదా మరీ ఎక్కువ నిద్రపోయారు? | "నిద్రలో ఇబ్బంది" meant trouble *during* sleep |
| 20 | Feeling low (−) **SAFETY** | Had thoughts that life isn't worth living, or of hurting yourself | బతకడం ఎందుకని అనిపించింది, లేదా మీకు మీరే హాని చేసుకోవాలనే ఆలోచనలు వచ్చాయి? | See question 1 below |
| 21 | Emotional balance (+) | Managed to calm yourself down once upset | అప్‌సెట్ అయ్యాక, మీ మనసును మీరే శాంతపరచుకున్నారు? | "కలత చెందిన" is too written |
| 22 | Emotional balance (+) | Understood what triggered a strong emotion, even after the fact | మనసు బాగా కదిలినప్పుడు, ఎందుకలా అయిందో తర్వాతైనా అర్థమైంది? | Medium confidence. "బలమైన భావం" was a calque |
| 23 | Emotional balance (+) | Let a difficult feeling pass without acting on it impulsively | మనసుకు కష్టంగా ఉన్నప్పుడు, తొందరపడకుండా అది తగ్గేవరకు ఆగారు? | |
| 24 | Emotional balance (+) | Expressed what you felt in words rather than bottling it up | మనసులో ఉన్నది లోపలే దాచుకోకుండా, మాటల్లో చెప్పారు? | |
| 25 | Emotional balance (+) | Stayed steady in your responses even under emotional pressure | మనసు ఒత్తిడిలో ఉన్నా, తొణకకుండా స్పందించారు? | Uses the idiom తొణకకుండా |

Labels: Never **అస్సలు లేదు** (kept) · Rarely **ఎప్పుడో ఒకసారి** (was అరుదుగా) · Sometimes **కొన్నిసార్లు** (kept) · Often **చాలాసార్లు** (was తరచుగా) · Always **ఎప్పుడూ** (kept).

### Other questions and prompts changed (18)

The stem, the 2 labels, the h1/SEO title, the talk strip, "how is this worked out", the save title, three "not sure where to begin" lines, the Happiness CTA (it still had the "సిద్ధమా?" pattern), 4 Happiness FAQs, 1 Jyotish FAQ and 1 Bach FAQ. Full reasons are in the JSON.

**Reviewed and kept on purpose, because they already sound natural:**
- "…అంటే ఏమిటి?" (×6)
- jyotish.cta.title మీ జాతకం ఒకసారి చూద్దామా?
- bach.cta.title మొదలుపెడదామా?
- home.cta.title (settled in Part 5)
- jyotish.faq 0, 1 and 3
- bach.faq 0, 1 and 2
- the "మీకు ఏ బాచ్ ఫ్లవర్ రెమెడీ సరిపోతుంది?" video titles
- "మొత్తం 38 రెమెడీలను కలిపి తీసుకోవచ్చా?"
- happiness.register.btnWa "సందేహాలా?"
- checkin.js.next.steadyLine
- bach.who.title

### Questions for the owner

1. **Safety item (#20).** I used "బతకడం ఎందుకని అనిపించింది" (felt "why live?"). This is how people actually say it, and it is neither dramatic nor softened. "మీకు మీరే హాని చేసుకోవాలనే ఆలోచనలు" is the standard, unmistakable self-harm wording. The old "బాధపెట్టుకోవడం" usually means hurting your feelings, which weakens a safety question. The other option is "బతికి లాభం లేదని అనిపించింది", which is a little closer to "not worth living" but harsher. Which one sounds right to you? Since the crisis box depends on this item, please also have it read by a Telugu-speaking counsellor or a Tele-MANAS-style reference if you can.
2. **Loanwords.** Should I keep "రియాక్ట్" (#2), "అప్‌సెట్" (#21) and "ఫ్రెండ్" (#10)? They are how Hyderabad speaks. If you would rather have pure Telugu, the alternatives in the JSON have స్పందించకుండా / కలత చెందాక / స్నేహితుడు.
3. **h1 and page title.** These are now statements ("మీ మనసు కోసం 5 నిమిషాల ఉచిత చెక్-ఇన్"). If you would like to keep a question there, the natural one is "ఈ మధ్య మనసు బాగుంటోందా?" ("has your mind been alright lately?"). Which do you prefer?
4. **"ఇది ఎవరి కోసం?"** (bach.who.eyebrow) was left as it is, because it is common in Telugu ads. A more spoken option is "ఎవరికి ఉపయోగపడవచ్చు?". Should I change it?
5. **home.band.text** still lists "మనసు ఎలా ఉంది, ఎంత నిలకడగా ఉంది" inside a sentence. It is not a question to the visitor, so I left it. If the open "మూడ్" decision (Part 5, question 7) goes ahead, it could become "ఒత్తిడి, మూడ్, మనసు నిలకడ గురించి…".


## Hindi notes, the 25 items and questions for you

Patch: `hi_questions.json` (same folder). 39 changes (22 high, 17 medium): stem 1, answer labels 1, check-in statements 25, other questions/prompts 12. hi.json itself is not edited.

### Rule of thumb used

1. **Read it aloud as one question.** Stem + statement + answer must sound like one person asking another. The old stem ("…ऐसा कितनी बार हुआ?") was a closed question followed by a subject-less fragment ("खुद से संतुष्टि महसूस हुई"), so it read like a form. The new stem ends in **"कि…"** ("पिछले दो हफ़्तों में कितनी बार ऐसा हुआ कि…"), which is how Hindi speakers actually ask "how often did…", and every statement is now a full clause with its subject (आपने / आपको / आपका / मन में) that completes it. Each statement still reads as a full sentence on its own.
2. **Say the idea, not the English shape.** Calques removed: "racing thoughts" -> "ख़याल रुकने का नाम ही नहीं ले रहे थे"; "lost interest" -> "मन नहीं लगा"; "expressed in words" -> "मन की बात कहकर बताई"; "no clear reason" -> "बिना किसी ख़ास वजह के"; "even after the fact" -> "चाहे बाद में ही सही"; "Ready to…?" -> "…चाहेंगे?"; "read your chart" -> "कुंडली दिखाना".
3. **Everyday words over formal ones:** प्रतिक्रिया, स्थिति, ऊर्जा, संतुष्टि, आदर/देखभाल -> झट से कुछ कहना-करना, बात, एनर्जी, तसल्ली, इज़्ज़त/परवाह.
4. **Gender-neutral by grammar.** Hindi verbs carry gender, so every statement uses ने / को / का constructions (आपने देखा, आपको लगा, आपका मन रहा), which read the same for a man or a woman. Two old lines ended in masculine "लेते हैं / करते"; both fixed.
5. **Polarity and meaning unchanged.** Positive areas still describe the good thing happening; Worry and Feeling low still describe the difficulty. Nothing is softened into "a little" or hardened into "never".
6. **Length.** Statements stay within about ±10 characters of the current Hindi (the safety item is 85 vs 80; one line got shorter).

### Stem and answer labels

- Stem: **पिछले दो हफ़्तों में कितनी बार ऐसा हुआ कि…**
- Labels: कभी नहीं · **बहुत कम** (was "शायद ही कभी", a textbook "rarely") · कभी-कभी · अक्सर · हमेशा

Read aloud: *पिछले दो हफ़्तों में कितनी बार ऐसा हुआ कि… आपका ध्यान आसपास की छोटी-छोटी चीज़ों पर गया — रोशनी, आवाज़, खुशबू* -> कभी नहीं / बहुत कम / कभी-कभी / अक्सर / हमेशा.

### The 25 statements

| area | English | new Hindi | note |
|---|---|---|---|
| Mindfulness (+) 1 | Noticed small sensory details around you — light, sound, smell | आपका ध्यान आसपास की छोटी-छोटी चीज़ों पर गया — रोशनी, आवाज़, खुशबू | Adds the subject so it completes the stem; "बातों" (matters/talk) -> "चीज़ों" for sensory details. |
| Mindfulness (+) 2 | Paused before reacting instead of responding on autopilot | आपने झट से कुछ कहने या करने से पहले एक पल रुककर सोचा | "बिना सोचे प्रतिक्रिया देने के बजाय" is a literal "instead of reacting on autopilot"; "प्रतिक्रिया" is bookish. "झट से" carries the autopilot idea. |
| Mindfulness (+) 3 | Noticed your breath or body without trying to change it | आपने साँस या शरीर पर बस ध्यान दिया, उसे बदलने की कोशिश नहीं की | The stacked "बिना बदलने की कोशिश किए महसूस किया" is hard to read in one go; split into two plain clauses. |
| Mindfulness (+) 4 | Did ordinary tasks — eating, walking, showering — with full attention | आपने खाना, चलना, नहाना जैसे रोज़ के काम पूरे ध्यान से किए | Only adds "आपने" so the line completes the stem; the rest was already natural. |
| Mindfulness (+) 5 | Observed your emotions arise without being swept away by them | आपने भावनाओं को उठते देखा, उनमें बहे बिना | "भावनाओं में बहे बिना उन्हें उठते हुए देखा" follows English order; this leads with the subject and a plain verb, and stays gender-neutral. |
| Self-esteem (+) 1 | Felt satisfied with who you are | आप जैसे हैं, उससे आपको तसल्ली महसूस हुई | "खुद से संतुष्टि महसूस हुई" drops "who you are" and sounds formal; "आप जैसे हैं" is how people say it. |
| Self-esteem (+) 2 | Felt confident in your own judgment and decisions | आपको अपनी समझ और अपने फ़ैसलों पर भरोसा रहा | "भरोसा महसूस हुआ" (felt trust) is literal; "भरोसा रहा" is the idiom. Adds subject for the stem. |
| Self-esteem (+) 3 | Felt you handle challenges about as well as most people | आपको लगा कि मुश्किलें सँभालने में आप ज़्यादातर लोगों से कम नहीं | Old line was long and ended in masculine "संभाल लेते हैं"; "…से कम नहीं" is the everyday way to say "about as well as most people" and is gender-neutral. |
| Self-esteem (+) 4 | Felt worthy of respect and care, including your own | आपको लगा कि आप इज़्ज़त और परवाह के हक़दार हैं — दूसरों की भी, अपनी भी | "दूसरों से और खुद से भी आदर और देखभाल के हक़दार" is a dense noun chain; "इज़्ज़त/परवाह" are the spoken words and the tag "दूसरों की भी, अपनी भी" keeps "including your own". |
| Self-esteem (+) 5 | Spoke to yourself with the same kindness you'd offer a friend | आपने खुद से भी उतने ही प्यार से बात की, जितने प्यार से किसी दोस्त से | Adds subject; drops the trailing masculine "करते" (the verb is understood), so it reads the same for everyone. |
| Worry (−) 1 | Felt nervous, worried or on edge | आपको घबराहट, चिंता या बेचैनी महसूस हुई | Only adds "आपको" so it completes the stem; wording was already natural. |
| Worry (−) 2 | Found it hard to switch off racing thoughts | दिमाग़ में ख़याल रुकने का नाम ही नहीं ले रहे थे | "दौड़ते विचारों को शांत करना" is a literal "switch off racing thoughts"; "रुकने का नाम नहीं ले रहे थे" is the everyday idiom for exactly that. |
| Worry (−) 3 | Felt your heart race or body tense for no clear reason | बिना किसी ख़ास वजह के आपका दिल तेज़ धड़का या शरीर में तनाव रहा | "साफ़ वजह" is a literal "clear reason"; "बिना किसी ख़ास वजह के" is the idiom. Adds subject. |
| Worry (−) 4 | Avoided a task or situation because it felt overwhelming | कोई काम या बात बहुत भारी लगी, इसलिए आपने उसे टाल दिया | "स्थिति" is formal; "बात" covers a situation in speech. Adds "आपने". |
| Worry (−) 5 | Expected something to go wrong, even without evidence | कोई वजह न होते हुए भी आपको लगा कि कुछ गड़बड़ होने वाली है | "भले ही ऐसा लगने की कोई वजह न हो" is a long literal of "even without evidence"; shorter and spoken. "गड़बड़" = "go wrong". |
| Feeling low (−) 1 | Lost interest in things you'd usually enjoy | जिन चीज़ों में आमतौर पर मज़ा आता है, उनमें आपका मन नहीं लगा | "दिलचस्पी कम हो गई" is a direct "lost interest"; "मन नहीं लगा" is how people say it. |
| Feeling low (−) 2 | Felt low, flat or hopeless | आपका मन उदास, बुझा-बुझा या निराश रहा | "…लगा" (seemed) -> "रहा" (stayed): you are asked how you felt, not how the mood seemed. Adds subject. |
| Feeling low (−) 3 | Had noticeably low energy or motivation | आपकी एनर्जी या कुछ करने का मन काफ़ी कम रहा | "ऊर्जा" is bookish; "एनर्जी" is what people say. "कुछ भी" dropped (it hardened "low" towards "none"). |
| Feeling low (−) 4 | Struggled with sleep — too little or too much | आपकी नींद गड़बड़ रही — या तो बहुत कम, या बहुत ज़्यादा | "नींद की परेशानी रही" is translation-like; "नींद गड़बड़ रही" is everyday, and "या तो… या…" keeps both sides. |
| Feeling low (−) 5 | Had thoughts that life isn't worth living, or of hurting yourself | मन में ख़याल आया कि ज़िंदगी जीने लायक नहीं है, या खुद को नुकसान पहुँचाने का ख़याल आया | SAFETY ITEM: meaning unchanged ("life isn't worth living" and "hurting yourself" both explicit; "नुकसान पहुँचाना" kept to match the crisis box and footer). Only "विचार" -> spoken "ख़याल" and a subject so it completes the stem. Owner to confirm. |
| Emotional balance (+) 1 | Managed to calm yourself down once upset | परेशान होने के बाद आपने अपने मन को शांत कर लिया | Adds subject; otherwise kept. |
| Emotional balance (+) 2 | Understood what triggered a strong emotion, even after the fact | किसी तेज़ भावना की वजह आपको समझ आई — चाहे बाद में ही सही | "भले ही बाद में" is clipped; "चाहे बाद में ही सही" is the natural idiom for "even after the fact". |
| Emotional balance (+) 3 | Let a difficult feeling pass without acting on it impulsively | आपने किसी भारी एहसास को जल्दबाज़ी में कुछ किए बिना गुज़र जाने दिया | "मुश्किल भावना" is a literal "difficult feeling", and the one-clause original stacks two participles; "भारी एहसास" is how people say it, and the subject now completes the stem. |
| Emotional balance (+) 4 | Expressed what you felt in words rather than bottling it up | आपने मन की बात अंदर दबाने के बजाय कहकर बताई | "जो महसूस हुआ, उसे शब्दों में कहा" is a literal "expressed in words"; "मन की बात कहकर बताई" is everyday and shorter. |
| Emotional balance (+) 5 | Stayed steady in your responses even under emotional pressure | भावनाओं के दबाव में भी आपने खुद को सँभाले रखा | "बर्ताव संतुलित रहा" is formal; "खुद को सँभाले रखा" is the spoken way to say "stayed steady". |

### Other questions and prompts

key | now | proposed | why
---|---|---|---
`checkin.talkStrip.prompt` | बात करके देखना चाहेंगे? | सवालों के बजाय सीधे बात करना चाहेंगे? | "बात करके देखना" means "try talking", and loses "prefer"; this says "rather talk than answer questions?".
`checkin.how.summary` | यह कैसे निकाला जाता है? | ये नतीजे कैसे निकाले जाते हैं? | "यह कैसे निकाला जाता है?" has no noun ("how is this taken out?"); naming the results makes it clear.
`checkin.save.title` | क्या चाहेंगे कि श्रीकांत आपके नतीजे देखें? | क्या आप चाहेंगे कि श्रीकांत आपके नतीजे देखें? | Restores "आप"; without it the line is clipped and can read as "would (he) like…".
`checkin.js.next.steadyLine` | दिशा या समय के बारे में सोच रहे हैं?  | ज़िंदगी की दिशा या सही समय को लेकर मन में सवाल हैं?  | "दिशा या समय के बारे में सोच रहे हैं?" is a literal "Thinking about direction or timing?" (and masculine); "मन में सवाल हैं" is natural and neutral. Links untouched.
`home.cta.title` | अपनी हीलिंग यात्रा शुरू करने के लिए तैयार हैं? | अपनी हीलिंग यात्रा शुरू करना चाहेंगे? | "…के लिए तैयार हैं?" copies "Ready to…?"; Hindi invites with "…चाहेंगे?". Same lesson as the Telugu "సిద్ధమా?".
`happiness.cta.title` | अगला कदम उठाने के लिए तैयार हैं? | अगला कदम उठाना चाहेंगे? | Same "Ready to…?" calque; shorter and warmer.
`jyotish.cta.title` | अपनी कुंडली पढ़वाने के लिए तैयार हैं? | अपनी कुंडली दिखाना चाहेंगे? | "कुंडली पढ़वाने के लिए तैयार हैं?" is a calque; in Hindi you "show your kundli" (कुंडली दिखाना) to a jyotishi.
`bach.cta.title` | शुरू करने के लिए तैयार हैं? | तो चलिए, शुरू करें? | Same "Ready to begin?" calque; "चलिए, शुरू करें?" is the everyday invitation.
`happiness.register.btnWa` | सवाल है? श्रीकांत को व्हाट्सऐप करें | कोई सवाल? श्रीकांत को व्हाट्सऐप करें | "सवाल है?" sounds abrupt; "कोई सवाल?" is the natural short form on a button.
`jyotish.faq.0.q` | क्या मुझे अपने जन्म का सही समय पता होना ज़रूरी है? | क्या जन्म का सही समय पता होना ज़रूरी है? | "क्या मुझे अपने जन्म का…" is a word-for-word "Do I need to know my…"; Hindi FAQs drop the pronouns.
`jyotish.faq.1.q` | क्या ज्योतिष भविष्य बताने के लिए है? | क्या ज्योतिष का मतलब भविष्य बताना है? | "भविष्य बताने के लिए है" is a literal "is about"; "का मतलब … है" is how people ask it.
`bach.faq.3.q` | क्या इन्हें दवा के साथ लिया जा सकता है? | क्या इन्हें दवाइयों के साथ ले सकते हैं? | Passive "लिया जा सकता है" is formal; "ले सकते हैं" is spoken.

### Checked and left as they are (already natural)
`checkin.question.skip`, `checkin.talk.title` / `home.topbar.text` / `home.band.title` ("समझ नहीं आ रहा कहाँ से शुरू करें?"), `checkin.js.snap.none.label`, `checkin.consent.notices.3`, `happiness.hero.btnWhat`, all "… क्या है?" eyebrows, `bach.who.eyebrow`, `happiness.faq.0–3.q`, `jyotish.faq.3.q`, `bach.faq.0–2.q`, the video titles (`bach.whatIs.videos.0/2`, `checkin.js.next.bach.ytTitle`; they mirror video titles), WhatsApp pre-filled messages. `checkin.consent.h1` and `checkin.seoTitle` are headings, not questions, in Hindi, and the owner is happy with headings: not changed (see question 2). `jyotish.faq.2.q` ("अख़बार वाले…") is still an open item from Part 5: not touched.

### Questions for the owner

1. **Safety item (Feeling low 5).** Meaning is unchanged; only "विचार" became the spoken "ख़याल" and the sentence now completes the stem. I kept "नुकसान पहुँचाना" because the crisis box and footer use it. "चोट पहुँचाना" (hurt) is more direct and closer to "hurting yourself". Keep "नुकसान" for consistency, or switch all three places to "चोट"?
2. **Check-in heading.** Telugu now opens with a question ("మనసు ఎలా ఉంది?"). Do you want the Hindi heading to match, for example "मन कैसा है? 5 मिनट का मुफ़्त चेक-इन", or keep "मन का मुफ़्त 5-मिनट चेक-इन" (unchanged in this patch)?
3. **"हमेशा" for "Always".** With "कितनी बार ऐसा हुआ कि…", "हमेशा" works. Some people prefer "हर बार". I kept "हमेशा" to keep the English scale exact.
4. **CTA questions.** I replaced the four "…के लिए तैयार हैं?" titles with "…चाहेंगे?" / "चलिए, शुरू करें?". "तैयार हैं?" is common in ads, so it is not wrong. If you like its energy, keep any of them.
5. **"एनर्जी"** (Feeling low 3) instead of "ऊर्जा". It is how people speak; "जोश" is the Hindi option if you prefer no English word there.
6. **Self-esteem 3: "ज़्यादातर लोगों से कम नहीं"** for "about as well as most people". It is the everyday idiom. The more literal option "…सँभालना आपको भी ज़्यादातर लोगों जितना ही आता है" is in the alternatives.



---

# Part 7: "thinking in English, writing in Telugu" fixed across the site (18 Nov 2026)

**Your feedback:** several lines were English thinking put into Telugu (for example the check-in label "ఒక్క చూపులో మీ మనసు"), and the check-in statements were translated as they stood. **What was done:** every Telugu string in the check-in, Home, Happiness, Jyotish, Bach, booking and legal text was re-read from its *meaning*. For each, the editor wrote a one-line plain-English gist first, then wrote the Telugu fresh as a Telugu writer would, and compared it with the current line. Lines that were already natural were kept (more than half). **207 Telugu lines and 49 Hindi check-in lines were rewritten.** The same method was applied to the Hindi check-in. The full list with the gist for each line is at the end of `docs/TRANSLATION-CHANGES-LOG.md`. Headings you approved (page hero titles and eyebrows) were not touched.

**Implemented without asking, as you said** (the obvious ones). Examples: the check-in results label "ఒక్క చూపులో మీ మనసు" is now "ఈ రెండు వారాల్లో మీరు ఎలా ఉన్నారంటే…"; "విరాళం ఆధారంగా" (sounds like a temple donation) on the Jyotish strip is now "మీకు తోచినంత"; "నష్టం" (which means money loss) is now "ఎవరినైనా కోల్పోవడం" for grief; "ఖాళీగా" said of a person (idle) is now "అందుబాటులో"; book/register buttons now use the reflexive "బుక్ చేసుకోండి / రిజిస్టర్ చేసుకోండి"; a Telugu grammar slip ("రెమెడీలుతో") in the next-step text is fixed. Also re-checked: punctuation (dashes, spacing, full stops; nothing outstanding), the joiner character before case endings after English words (two spots fixed), and the heavy word "సంభాళిస్తున్నారు", which one rewrite had brought back in a new spelling ("సంబాళించుకుంటున్నారు"); it is gone again.

## What is flagged as critical (please read; everything else was applied silently)
The rewrites below touch safety wording, a hedge, a price, contribution wording or legal meaning. Each was made without changing the meaning, but they deserve a reader who is a native speaker (a counsellor for the safety lines, a lawyer for the legal lines).

key | before | after
---|---|---
`checkin.seoDescription` (Telugu) | ఒత్తిడి, మనసు స్థితి, ధ్యాస, మీపై మీకున్న నమ్మకం, మనసు నిలకడ గురించి 5 నిమిషాల్లో మిమ్మల్ని మీరు చూసుకునే ఉచిత, గోప్యమైన చెక్-ఇన్. ఏది సహాయప | ఒత్తిడి, మనసు స్థితి, ధ్యాస, మీపై మీకున్న నమ్మకం, మనసు నిలకడ ఈ మధ్య ఎలా ఉన్నాయో 5 నిమిషాల్లో చూసుకోండి. ఉచితం, గోప్యం. మీకు ఏది సాయపడవచ్చో ఒక చిన్న సూచన కూడా ఉం
`checkin.consent.notices.0` (Telugu) | ఇది మీ గురించి మీరు ఆలోచించుకునే సాధనం మాత్రమే, రోగ నిర్ధారణ కాదు | ఇది మీ గురించి మీరు ఆలోచించుకోవడానికి మాత్రమే, రోగ నిర్ధారణ కోసం కాదు
`checkin.how.body` (Telugu) | ప్రతి అంశంలో ఐదు ప్రశ్నలు ఉంటాయి. ప్రతి ప్రశ్నకు 0 నుండి 4 వరకు మార్కులు వేసి కూడతాం (0 నుండి 20). మొత్తాన్ని నాలుగు విభాగాలుగా చూపిస్తాం. ఈ | ఒక్కో అంశంలో ఐదు ప్రశ్నలు ఉంటాయి. ఒక్కో ప్రశ్నకు 0 నుండి 4 మార్కులు, అన్నీ కలిపితే 0 నుండి 20. ఈ మొత్తాన్ని బట్టి నాలుగు స్థాయిల్లో ఒకటి చూపిస్తాం. ఈ స్థాయిలు ఒ
`checkin.disclaimer` (Telugu) | ఈ చెక్-ఇన్ మీ గురించి మీరు ఆలోచించుకునే సాధనం మాత్రమే, రోగ నిర్ధారణ కాదు. మీ మనసు బరువుగానే ఉంటే లేదా ఎక్కువైతే, దయచేసి డాక్టర్‌ను లేదా కౌన్ | ఈ చెక్-ఇన్ మీ గురించి మీరు ఆలోచించుకోవడానికి మాత్రమే, రోగ నిర్ధారణ కాదు. మనసు భారం తగ్గకపోయినా, ఇంకా పెరిగినా, దయచేసి డాక్టర్‌ను లేదా కౌన్సెలర్‌ను కలవండి.
`checkin.js.sections.depression.items.4` (Telugu) | బతకడం ఎందుకని అనిపించింది, లేదా మీకు మీరే హాని చేసుకోవాలనే ఆలోచనలు వచ్చాయి? | బతకడం ఎందుకని, లేదా మీకు మీరే హాని చేసుకోవాలని ఆలోచనలు వచ్చాయి?
`checkin.js.bands.distress.3.note` (Telugu) | ఈ మధ్య ఇది మీ మనసుపై చాలా బరువుగా ఉంది. డాక్టర్‌తో లేదా కౌన్సెలర్‌తో మాట్లాడటం మంచి అడుగు, దీన్ని మీరు ఒంటరిగా మోయాల్సిన అవసరం లేదు. | ఈ మధ్య ఇది మీకు చాలా భారంగా ఉంది. డాక్టర్‌తోనో, కౌన్సెలర్‌తోనో ఒకసారి మాట్లాడితే మంచిది. దీన్ని మీరు ఒక్కరే మోయనక్కర్లేదు.
`checkin.js.bands.strength.0.note` (Telugu) | ఇది మంచి ప్రారంభం. రోజూ చేసే చిన్న చిన్న అలవాట్లు దీన్ని పెంచడానికి సాయపడతాయి. | ఇక్కడి నుంచే మెల్లగా పెంచుకోవచ్చు. రోజూ చేసే చిన్న చిన్న అలవాట్లు ఇందుకు సాయపడగలవు.
`checkin.js.crisis.title` (Telugu) | ఈ బరువును మీరు ఒంటరిగా మోయనక్కర్లేదు | ఈ బాధను మీరు ఒక్కరే మోయనక్కర్లేదు
`checkin.js.crisis.intro` (Telugu) | మీ సమాధానాల్లో ఒకటి చూస్తే, ప్రస్తుతం మీరు చాలా కష్టకాలంలో ఉండవచ్చనిపిస్తోంది. దయచేసి ఈ రోజే ఎవరితోనైనా మాట్లాడండి. టెలి-మానస్ భారత ప్రభుత్వ | మీరిచ్చిన ఒక సమాధానం చూస్తే, ప్రస్తుతం మీకు చాలా కష్టంగా ఉందేమో అనిపిస్తోంది. దయచేసి ఈ రోజే ఎవరితోనైనా మాట్లాడండి. టెలి-మానస్ అనేది భారత ప్రభుత్వం నడిపే ఉచిత, గ
`checkin.js.crisis.more` (Telugu) | మరింత సమాచారం: <a href="https://telemanas.mohfw.gov.in" target="_blank" rel="noopener">telemanas.mohfw.gov.in</a>. మీరు వెంటనే ప్రమాదంలో ఉంట | మరింత సమాచారం: <a href="https://telemanas.mohfw.gov.in" target="_blank" rel="noopener">telemanas.mohfw.gov.in</a>. మీరు ఇప్పుడే ప్రమాదంలో ఉంటే, 112కు కాల్ చేయండ
`checkin.js.crisis.skipped` (Telugu) | మనసు మరీ బరువుగా అనిపిస్తే, టెలి-మానస్ (<a href="tel:14416">14416</a>) ఉచితం, గోప్యం, 24 గంటలూ అందుబాటులో ఉంటుంది. | ఎప్పుడైనా మనసు మరీ భారంగా అనిపిస్తే, టెలి-మానస్‌కు (<a href="tel:14416">14416</a>) కాల్ చేయవచ్చు: ఉచితం, గోప్యం, 24 గంటలూ పనిచేస్తుంది.
`checkin.js.crisis.highBody` (Telugu) | శ్రీకాంత్ వాట్సాప్‌లో మీ మాట సంతోషంగా వింటారు. దయచేసి డాక్టర్‌ను లేదా కౌన్సెలర్‌ను కూడా కలవండి. మీకు కాస్త మనసు కుదుటపడ్డాక, శ్వాస పద్ధతి లే | మీకు మాట్లాడాలనిపిస్తే, శ్రీకాంత్ వాట్సాప్‌లో మీ మాట వింటారు. దయచేసి డాక్టర్‌ను లేదా కౌన్సెలర్‌ను కూడా కలుస్తూ ఉండండి. మనసు కాస్త కుదుటపడ్డాక, శ్వాస పద్ధతి, బాచ
`checkin.js.next.intro.stress` (Telugu) | మీ సమాధానాలు చూస్తే కొంత టెన్షన్, ఆగని ఆలోచనలు ఉన్నట్టు తెలుస్తోంది. అది బరువుగానే ఉంటే లేదా రోజువారీ జీవితంపై ప్రభావం చూపడం మొదలైతే, దయచేసి | మీ సమాధానాలు చూస్తే, కొంత టెన్షన్, ఆగకుండా వచ్చే ఆలోచనలు ఉన్నట్టు అనిపిస్తోంది. ఇది తగ్గకుండా అలాగే ఉన్నా, రోజువారీ పనులకు అడ్డొస్తున్నా, దయచేసి డాక్టర్‌ను లేదా
`checkin.js.next.intro.heavy` (Telugu) | మీ సమాధానాలు చూస్తే మనసులో కొంత బరువు ఉన్నట్టు తెలుస్తోంది. అది బరువుగానే ఉంటే లేదా రోజువారీ జీవితంపై ప్రభావం చూపడం మొదలైతే, దయచేసి డాక్టర్‌ | మీ సమాధానాలు చూస్తే, మనసులో కొంత భారం ఉన్నట్టు అనిపిస్తోంది. ఇది తగ్గకుండా అలాగే ఉన్నా, రోజువారీ పనులకు అడ్డొస్తున్నా, దయచేసి డాక్టర్‌ను లేదా కౌన్సెలర్‌ను కలవండ
`checkin.js.next.bach.body` (Telugu) | బాచ్ ఫ్లవర్ రెమెడీలు సున్నితమైన, వ్యక్తిగతంగా ఎంచే విధానం. చాలామంది తమ మనసు బాగుండటానికి, నిలకడగా ఉండటానికి ఆసరాగా వీటిని వాడతారు. మీకు ఈ మధ | బాచ్ ఫ్లవర్ రెమెడీలు ఒక సున్నితమైన పద్ధతి, ఒక్కొక్కరికి విడిగా ఎంచి ఇస్తారు. మనసు బాగుండటానికి, నిలకడగా ఉండటానికి చాలామంది వీటిని ఆసరాగా వాడతారు. ఈ మధ్య మీకు ఎల
`chrome.footer.fine` (Telugu) | అంతర్శాంతి సేవలు మనసుకు, శరీరానికి సాయపడే అదనపు సేవలు మాత్రమే. ఇవి వైద్య, మానసిక, న్యాయ లేదా ఆర్థిక సలహాలకు బదులు కావు. మీ వ్యక్తిగత వివరాలు | అంతర్శాంతి సేవలు మనసు, శరీరం బాగుండటానికి అదనంగా సాయపడేవి మాత్రమే. వైద్య, మానసిక, న్యాయ, ఆర్థిక సలహాలకు ఇవి బదులు కావు. మీ వ్యక్తిగత వివరాలు పూర్తిగా గోప్యంగా ఉ
`home.band.text` (Telugu) | ఒత్తిడి, మనసు ఎలా ఉంది, ఎంత నిలకడగా ఉంది అన్నవాటి గురించి 5 నిమిషాల చెక్-ఇన్ చేయండి. చివర్లో మీకు ఏ దారి సరిపోవచ్చో తెలుస్తుంది — ఇది ఒక సున | ఒత్తిడి ఎంత ఉంది, మనసు ఎలా ఉంది, ఎంత నిలకడగా ఉంది — 5 నిమిషాల్లో ఒకసారి మీరే చూసుకోండి. చివర్లో మీకు ఏ దారి సరిపోవచ్చో తెలుస్తుంది. ఇది దారి చూపే చిన్న సూచన మాత
`home.offerings.bach.text` (Telugu) | చింత, దుఃఖం, భయం, మీపై మీకే సందేహం — ఇలాంటి సమయాల్లో తోడుగా నిలిచే సహజమైన పూల సారాలు. మీకు ఈ మధ్య ఎలా అనిపిస్తోందో దానికి తగ్గట్టు వ్యక్తిగత | చింత, దుఃఖం, భయం, మీ మీద మీకే సందేహం — ఇలాంటప్పుడు తోడుగా ఉండే సహజమైన పూల సారాలు. ఈ మధ్య మీకు ఎలా అనిపిస్తోందో చూసి, మీ కోసమే వాటిని ఎంచుతాం. సున్నితంగా, అదనపు 
`happiness.hero.intro` (Telugu) | శ్వాస, ధ్యానం, రోజువారీ జీవితాన్ని మరింత ప్రశాంతంగా, స్పష్టంగా ఉంచే సులభమైన పద్ధతులు — ఇవన్నీ 3 రోజుల్లో. ఆర్ట్ ఆఫ్ లివింగ్ హ్యాపీనెస్ ప్రోగ | 3 రోజుల్లో శ్వాస, ధ్యానంతో పాటు, రోజూ మరింత ప్రశాంతంగా, స్పష్టంగా గడపడానికి పనికొచ్చే సులభమైన పద్ధతులు నేర్చుకుంటారు. ఆర్ట్ ఆఫ్ లివింగ్ హ్యాపీనెస్ ప్రోగ్రామ్‌కు
`happiness.whatIs.text` (Telugu) | సుదర్శన క్రియ (SKY) ఒక ప్రత్యేకమైన, లయతో చేసే శ్వాస పద్ధతి. ఇది ఒత్తిడి, ఆందోళన, దిగులు తగ్గడానికి, నిద్రకు, ఏకాగ్రతకు సాయపడవచ్చని ప్రచురించ | సుదర్శన క్రియ (SKY) ఒక ప్రత్యేకమైన, లయతో చేసే శ్వాస పద్ధతి. ఇది ఒత్తిడి, ఆందోళన, దిగులు తగ్గడానికి, నిద్ర బాగా పట్టడానికి, ఏకాగ్రత కుదరడానికి సాయపడవచ్చని ప్రచుర
`happiness.learn.items.1.text` (Telugu) | చాలామందికి ప్రశాంతంగా అనిపించే, ఏకాగ్రతకు సాయపడే శ్వాస వ్యాయామాలు. | శ్వాస వ్యాయామాలు. వీటితో మనసు ప్రశాంతంగా, ఏకాగ్రతగా ఉన్నట్టు చాలామందికి అనిపిస్తుంది.
`happiness.register.text` (Telugu) | రిజిస్ట్రేషన్ ఆర్ట్ ఆఫ్ లివింగ్ సైట్‌లో జరుగుతుంది. ఈ ప్రోగ్రామ్ ఆర్ట్ ఆఫ్ లివింగ్ ఫౌండేషన్‌కు ఇచ్చే విరాళం ఆధారంగా జరుగుతుంది; నేను దీన్ని  | రిజిస్ట్రేషన్ ఆర్ట్ ఆఫ్ లివింగ్ సైట్‌లోనే జరుగుతుంది. ఈ ప్రోగ్రామ్‌కు మీరిచ్చేది ఆర్ట్ ఆఫ్ లివింగ్ ఫౌండేషన్‌కు విరాళంగా వెళ్తుంది; నేను దీన్ని స్వచ్ఛంద సేవగా నే
`happiness.js.soonText` (Telugu) | వాట్సాప్ లిస్ట్‌లో చేరితే తేదీ, ఫీజు, సీట్ల వివరాలు అందరికంటే ముందు మీకు తెలుస్తాయి. మీరు నిర్ణయం తీసుకునే ముందే ఫీజు ఎంతో చెబుతాం. | వాట్సాప్ లిస్ట్‌లో చేరితే తేదీ, ఫీజు, సీట్ల వివరాలు అందరికంటే ముందు మీకు తెలుస్తాయి. మీరు చేరాలా వద్దా అనుకునే ముందే ఫీజు ఎంతో చెబుతాం.
`jyotish.hero.intro` (Telugu) | వేదాలకు కన్ను వంటిది జ్యోతిష్యం. ఇది భవిష్యత్తు గురించి ఇచ్చే హామీ కాదు, ఆలోచించుకోవడానికి ఒక ఆధారం. మిమ్మల్ని మీరు అర్థం చేసుకునే ఒక దారి:  | జ్యోతిష్యాన్ని వేదాలకు కన్ను అంటారు. ఇది భవిష్యత్తు గురించి ఇచ్చే హామీ కాదు; మిమ్మల్ని మీరు అర్థం చేసుకోవడానికి ఒక దారి. మీ స్వభావం, మీలో మళ్లీ మళ్లీ కనిపించే త
`jyotish.strip.sub` (Telugu) | విరాళం ఆధారంగా · UPI · స్లాట్లు సోమ, బుధ, శుక్ర, శని | మీకు తోచినంత · UPI · సోమ, బుధ, శుక్ర, శని వారాల్లో స్లాట్లు
`jyotish.whatIs.text` (Telugu) | వైదిక జ్యోతిష్యం ఆకాశాన్ని, కాలాన్ని కలిపి చూసే భారతీయ సంప్రదాయ పద్ధతి. మీరు పుట్టిన ఖచ్చితమైన సమయం, తేదీ, ప్రదేశం ఆధారంగా వేసే మీ జన్మ జాతక | వైదిక జ్యోతిష్యం మన భారతీయ సంప్రదాయ పద్ధతి; ఆకాశంలో గ్రహాల స్థితిని కాలంతో కలిపి చూస్తుంది. మీరు పుట్టిన తేదీ, సరైన సమయం, పుట్టిన ఊరు తీసుకుని జాతకం వేస్తాం. మీ
`jyotish.consult.gift1` (Telugu) | ఈ విద్య నాకు బహుమతిగా అందింది. మీకూ అలాగే అందాలని నా కోరిక. మనం మాట్లాడిన తర్వాత, ఈ సెషన్ మీకు ఎంత విలువైనదిగా అనిపిస్తే అంత ఇవ్వండి — బుకిం | ఈ విద్య నాకు ఒక కానుకలా దక్కింది; మీకూ అలాగే దక్కాలని నా కోరిక. సెషన్ అయ్యాక, మీకు ఎంత ఇవ్వాలనిపిస్తే అంత ఇవ్వండి — బుకింగ్ ప్యానెల్‌లో ఉన్న PhonePe QR ద్వారా. 
`jyotish.book.errConsent` (Telugu) | శ్రీకాంత్ మిమ్మల్ని సంప్రదించడానికి, దయచేసి బాక్స్‌ను టిక్ చేయండి. | శ్రీకాంత్ మీకు మెసేజ్ చేయాలంటే, దయచేసి బాక్స్ టిక్ చేయండి.
`jyotish.book.steps.2` (Telugu) | సెషన్ తర్వాత, అది మీకు ఎంత విలువైనదిగా అనిపిస్తే అంత ఇవ్వండి — అది ఉపయోగపడితేనే. | సెషన్ అయ్యాక, మీకు ఉపయోగపడితేనే, ఎంత ఇవ్వాలనిపిస్తే అంత ఇవ్వండి.
`jyotish.book.paySub` (Telugu) | కోడ్ స్కాన్ చేయండి, లేదా మీ ఫోన్ నుంచే కింద ట్యాప్ చేసి చెల్లించండి. ఇంత ఇవ్వాలనే నియమం లేదు, ఇవ్వాలని ఆశించడం కూడా లేదు — సెషన్ తర్వాత, అది | QR కోడ్ స్కాన్ చేయండి, లేదా ఈ ఫోన్‌లోనే చెల్లించాలంటే కింద ట్యాప్ చేయండి. ఇంత ఇవ్వాలని ఏమీ లేదు, ఇవ్వాల్సిందే అని కూడా లేదు — సెషన్ అయ్యాక, ఉపయోగపడితే ఇవ్వండి.
`jyotish.book.payFine` (Telugu) | ఏదేమైనా మీ స్లాట్ హోల్డ్‌లోనే ఉంటుంది. డబ్బు ఇవ్వడం సెషన్‌కు ఎప్పుడూ షరతు కాదు. | మీరు ఇచ్చినా ఇవ్వకపోయినా మీ స్లాట్ హోల్డ్‌లోనే ఉంటుంది. సెషన్ కోసం డబ్బు ఇవ్వాలనే షరతు ఎప్పుడూ ఉండదు.
`jyotish.faq.1.a` (Telugu) | ముందే రాసిపెట్టిన జోస్యం అనే అర్థంలో కాదు. జ్యోతిష్యం జీవితంలో జరుగుతున్నదాని తీరును, సమయాన్ని అర్థం చేసుకుని ఆలోచించుకోవడానికి ఒక ఆధారం — మ | ఇది జరిగి తీరుతుంది అని ముందే చెప్పే జోస్యం కాదు. జీవితంలో ఏ తీరు మళ్లీ మళ్లీ వస్తోంది, ఏ కాలం నడుస్తోంది అని అర్థం చేసుకుని ఆలోచించుకోవడానికి జ్యోతిష్యం ఒక దార
`jyotish.explore.bach.text` (Telugu) | భయం, దుఃఖం, మీపై మీకే సందేహం — ఇలాంటి కాలం నడుస్తుంటే, బాచ్ ఫ్లవర్ సారాలు ఒక సున్నితమైన అదనపు సాయం కావచ్చు. ఈ రెండింటినీ కలిపి ప్రయత్నించడం  | భయం, దుఃఖం, మీ మీద మీకే నమ్మకం తగ్గడం — ఇలాంటి రోజులు నడుస్తుంటే, బాచ్ ఫ్లవర్ రెమెడీలు దీనికి తోడుగా మెల్లగా సాయపడవచ్చు. ఈ రెండూ కలిపి చూసుకోవడం చాలామంది క్లయిం
`bach.seoDescription` (Telugu) | సర్టిఫైడ్ బాచ్ ఫ్లవర్ థెరపిస్ట్‌తో ఆన్‌లైన్‌లో వ్యక్తిగత బాచ్ ఫ్లవర్ రెమెడీ సెషన్. ఒక్కో సెషన్‌కు ₹1,000; రెమెడీ బాటిల్ మీకు కావాలనుకుంటేనే, | సర్టిఫైడ్ బాచ్ ఫ్లవర్ థెరపిస్ట్‌తో ఆన్‌లైన్ సెషన్; మీకు తగ్గ రెమెడీని కలిసి ఎంచుకుంటాం. ఒక్కో సెషన్‌కు ₹1,000; రెమెడీ బాటిల్ కావాలనుకుంటేనే, దానికి విడిగా బిల్ 
`bach.topbar.tail` (Telugu) | · వ్యక్తిగతం · ఆన్‌లైన్ · అదనపు సాయం | · మీకు తగ్గట్టు · ఆన్‌లైన్ · వైద్యానికి తోడుగా
`bach.hero.intro` (Telugu) | బాచ్ ఫ్లవర్ రెమెడీలు సున్నితమైన పూల సారాలు. ఒత్తిడి, భయం, దుఃఖం, తమపై తమకే సందేహం కలిగే సమయాల్లో మనసుకు తోడుగా చాలామంది వీటిని వాడతారు. వీటి | బాచ్ ఫ్లవర్ రెమెడీలు పూల నుంచి తీసిన తేలికపాటి సారాలు. ఒత్తిడి, భయం, దుఃఖం, తమ మీద తమకే నమ్మకం తగ్గిన రోజుల్లో మనసుకు ఆసరాగా చాలామంది వీటిని వాడుతుంటారు. డాక్టర
`bach.whatIs.text` (Telugu) | డాక్టర్ ఎడ్వర్డ్ బాచ్ 38 పూల సారాలను గుర్తించారు — ఒక్కొక్కటి ఒక్కో రకమైన మనసు స్థితికి సంబంధించినది. రెమెడీలు చాలా పలచగా ఉంటాయి, బ్రాందీలో  | డాక్టర్ ఎడ్వర్డ్ బాచ్ 38 పూల సారాలను గుర్తించారు; ఒక్కొక్కటి మనసులో కలిగే ఒక్కో రకమైన భావానికి సంబంధించినది. ఈ రెమెడీలను బాగా పలచన చేసి బ్రాందీలో నిల్వ ఉంచుతారు
`bach.book.intro` (Telugu) | సెషన్ ఫీజు {price}. మీకు రెమెడీ మిశ్రమం సరైనదైతే, బాటిల్‌ను తర్వాత వేరుగా బిల్ చేస్తాం — మీకు కావాలనుకుంటేనే. | సెషన్ ఫీజు {price}. మీకు రెమెడీ మిశ్రమం సరిపోతుందనిపిస్తే, ఆ బాటిల్‌కు తర్వాత విడిగా బిల్ ఉంటుంది — మీకు కావాలంటేనే.
`bach.book.medNote` (Telugu) | బాచ్ ఫ్లవర్ రెమెడీలు వైద్య చికిత్సకు సున్నితమైన అదనపు సాయం మాత్రమే, బదులు కాదు. ఏదైనా ఆరోగ్య సమస్య ఉంటే దయచేసి డాక్టర్‌ను కలుస్తూనే ఉండండి. | బాచ్ ఫ్లవర్ రెమెడీలు వైద్యానికి తోడుగా ఉండే తేలికపాటి సాయం మాత్రమే, వైద్యానికి బదులు కాదు. ఏదైనా ఆరోగ్య సమస్య ఉంటే, మీ డాక్టర్‌కు చూపించుకుంటూనే ఉండండి.
`bach.faq.0.a` (Telugu) | రెమెడీలు చాలా పలచని పూల సారాలు, బ్రాందీలో నిల్వ చేస్తారు, కాబట్టి కొద్దిగా ఆల్కహాల్ ఉంటుంది. వివిధ వయసుల చాలామంది వీటిని వాడతారు. మీరు గర్భవ | ఈ రెమెడీలు బాగా పలచన చేసిన పూల సారాలు; బ్రాందీలో నిల్వ ఉంచుతారు, అందుకే కొద్దిగా ఆల్కహాల్ ఉంటుంది. రకరకాల వయసుల వాళ్లు చాలామంది వీటిని వాడుతుంటారు. మీరు గర్భవతి
`bach.faq.1.a` (Telugu) | అనుభవాలు ఒక్కొక్కరికి ఒక్కోలా ఉంటాయి, ఫలితాలకు హామీ లేదు. కొందరికి మొదట్లోనే మార్పు అనిపిస్తుంది; మళ్లీ మళ్లీ వచ్చే లోతైన భావాలకు చాలామంది 4 | ఇది ఒక్కొక్కరికి ఒక్కోలా ఉంటుంది; ఫలితాలకు హామీ లేదు. కొందరికి మొదట్లోనే మార్పు తెలుస్తుంది. లోతుగా పాతుకుపోయిన భావాలకైతే, చాలామంది 4–6 వారాలు వాడుతుంటారు. ఫాలో
`bach.faq.3.a` (Telugu) | బాచ్ ఫ్లవర్ రెమెడీలు అదనపు సాయం మాత్రమే, వైద్య చికిత్సకు బదులు కావు. డాక్టర్ రాసిచ్చిన మందులు వాడటం కొనసాగించండి, ఈ రెమెడీల గురించి మీ డాక్ట | బాచ్ ఫ్లవర్ రెమెడీలు వైద్యానికి తోడుగా వాడేవి మాత్రమే, వైద్యానికి బదులు కావు. డాక్టర్ రాసిన మందులు మానకుండా వేసుకుంటూ ఉండండి; ఈ రెమెడీలు వాడుతున్నట్టు మీ డాక్టర
`bach.cta.sub` (Telugu) | వ్యక్తిగత సెషన్ · ఆన్‌లైన్ · అదనపు సాయం | మీకు తగ్గట్టు సెషన్ · ఆన్‌లైన్ · వైద్యానికి తోడుగా
`booking.errors.consent` (Telugu) | ఈ బుకింగ్ గురించి శ్రీకాంత్ మిమ్మల్ని సంప్రదించడానికి దయచేసి బాక్స్‌ను టిక్ చేయండి. | ఈ బుకింగ్ గురించి శ్రీకాంత్ మీకు మెసేజ్ చేయాలంటే, దయచేసి బాక్స్ టిక్ చేయండి.
`privacy.sections.1.html` (Telugu) | <ul> <li><strong>ఉచిత చెక్-ఇన్.</strong> చెక్-ఇన్‌లో 25 ప్రశ్నలు ఉంటాయి. ఇది మీ గురించి మీరు ఆలోచించుకునే సాధనం, రోగ నిర్ధారణ కాదు. మీరు మీ  | <ul> <li><strong>ఉచిత చెక్-ఇన్.</strong> చెక్-ఇన్‌లో 25 ప్రశ్నలు ఉంటాయి. ఇది మీ గురించి మీరు ఆలోచించుకునే సాధనం, రోగ నిర్ధారణ కాదు. మీ ఫలితాన్ని సేవ్ చేయాలని మీ
`privacy.sections.2.html` (Telugu) | <p>మీరు ఒక నిర్దిష్ట కారణం కోసం వివరాలు ఇచ్చారు కాబట్టి వాటిని వాడతాం. ఉదాహరణకు చెక్-ఇన్‌లో "సేవ్" నొక్కడం, మాకు మెసేజ్ చేయడం, లేదా సెషన్ బు | <p>మీరు ఒక నిర్దిష్ట పని కోసం మాకు వివరాలు ఇచ్చారు కాబట్టి వాటిని వాడతాం. ఉదాహరణకు, చెక్-ఇన్‌లో "సేవ్" నొక్కినప్పుడు, మాకు మెసేజ్ చేసినప్పుడు, లేదా సెషన్ బుక్ చ
`privacy.sections.3.html` (Telugu) | <ul> <li><strong>శ్రీకాంత్</strong>, సేవలను నడిపేవారు.</li> <li><strong>Razorpay</strong>, బాచ్ ఫ్లవర్ పేమెంట్లను ప్రాసెస్ చేస్తుంది.</li> < | <ul> <li><strong>శ్రీకాంత్</strong>: సేవలను నడిపేది ఆయనే.</li> <li><strong>Razorpay</strong>: బాచ్ ఫ్లవర్ పేమెంట్లను ప్రాసెస్ చేసే సంస్థ.</li> <li><strong>Supab
`privacy.sections.4.html` (Telugu) | <p>సేవ్ చేసిన చెక్-ఇన్ సమాధానాలను 12 నెలల వరకు ఉంచుతాం. మీరు అంతకంటే ముందే తొలగించమని కోరితే తొలగిస్తాం. పేమెంట్ ఆర్డర్, పేమెంట్ రెఫరెన్స్‌ల | <p>సేవ్ చేసిన చెక్-ఇన్ సమాధానాలను 12 నెలల వరకు ఉంచుతాం. అంతకంటే ముందే తొలగించమని మీరు అడిగితే, అప్పుడే తొలగిస్తాం. పేమెంట్ ఆర్డర్, పేమెంట్ రెఫరెన్స్‌లను రీఫండ్‌
`privacy.sections.5.html` (Telugu) | <p>DPDP Act, 2023 ప్రకారం మీరు ఇవి చేయవచ్చు:</p> <ul> <li>మీ ఏ వ్యక్తిగత వివరాలు మా దగ్గర ఉన్నాయో, వాటిని ఎలా వాడుతున్నామో అడగడం;</li> <li>త | <p>DPDP Act, 2023 ప్రకారం మీరు:</p> <ul> <li>మీ వ్యక్తిగత వివరాల్లో ఏవి మా దగ్గర ఉన్నాయో, వాటిని ఎలా వాడుతున్నామో అడగవచ్చు;</li> <li>తప్పుగా లేదా అరకొరగా ఉన్న వ
`privacy.sections.6.html` (Telugu) | <p>ఈ వెబ్‌సైట్ 18 ఏళ్ల లోపు వారి కోసం కాదు. మీ వయసు 18 ఏళ్ల లోపు అయితే, దయచేసి చెక్-ఇన్ వాడకండి, మీ వ్యక్తిగత వివరాలను మీరే మాకు పంపకండి. పి | <p>ఈ వెబ్‌సైట్ 18 ఏళ్లు నిండని వారి కోసం కాదు. మీకు 18 ఏళ్లు నిండకపోతే, దయచేసి చెక్-ఇన్ వాడకండి, మీ వ్యక్తిగత వివరాలను మీరే మాకు పంపకండి. పిల్లల కోసం బాచ్ ఫ్లవర
`terms.intro` (Telugu) | <p>మీరు antarshanti.co.in వాడినప్పుడు, లేదా ఇక్కడ చెప్పిన ఏ సేవనైనా బుక్ చేసుకున్నప్పుడు, హాజరైనప్పుడు ఈ నిబంధనలు వర్తిస్తాయి. ఈ సైట్‌ను వాడ | <p>మీరు antarshanti.co.in వాడినా, ఇక్కడ చెప్పిన ఏ సేవనైనా బుక్ చేసుకున్నా, అందులో పాల్గొన్నా ఈ నిబంధనలు వర్తిస్తాయి. ఈ సైట్‌ను వాడుతున్నారంటే, వీటిని మీరు అంగీక
`terms.sections.0.html` (Telugu) | <p>అంతర్శాంతి హీలింగ్ మనసుకు, శరీరానికి సాయపడే అదనపు వెల్‌నెస్ సేవలను అందిస్తుంది. ఇవి వైద్య, మానసిక, న్యాయ లేదా ఆర్థిక సలహా కావు. డాక్టర్,  | <p>అంతర్శాంతి హీలింగ్ ఇచ్చేవి అదనపు (కాంప్లిమెంటరీ) వెల్‌నెస్ సేవలు. ఇవి వైద్య, మానసిక, న్యాయ లేదా ఆర్థిక సలహా కావు. డాక్టర్, థెరపిస్ట్, లాయర్ లేదా ఆర్థిక సలహాద
`terms.sections.7.html` (Telugu) | <p>సేవలను వీలైనంత శ్రద్ధగా అందించడానికి ప్రయత్నిస్తాం. చట్టం అనుమతించిన మేరకు, ఈ సైట్‌ను వాడటం వల్ల, లేదా సెషన్ లేదా చెక్-ఇన్ ఆధారంగా మీరు త | <p>సేవలను శ్రద్ధగా అందించడానికి మా వంతు ప్రయత్నం చేస్తాం. చట్టం అనుమతించినంత వరకు, ఈ సైట్‌ను వాడటం వల్ల గానీ, సెషన్ లేదా చెక్-ఇన్ ఆధారంగా మీరు తీసుకునే నిర్ణయాల
`terms.sections.10.html` (Telugu) | <p>ఈ నిబంధనలకు భారతదేశ చట్టాలు వర్తిస్తాయి. ఏ వివాదంపైనైనా హైదరాబాద్‌లోని కోర్టులకు విచారణ చేసే అధికారం (పరిధి) ఉంటుంది.</p> | <p>ఈ నిబంధనలకు భారతదేశ చట్టాలు వర్తిస్తాయి. ఏదైనా వివాదం వస్తే, దాన్ని విచారించే అధికారం (పరిధి) హైదరాబాద్‌లోని కోర్టులకు ఉంటుంది.</p>
`refund.sections.0.html` (Telugu) | <ul> <li><strong>మీ స్లాట్‌కు కనీసం 24 గంటల ముందు రద్దు చేస్తే:</strong> పూర్తి రీఫండ్.</li> <li><strong>రీషెడ్యూల్:</strong> మీ బుకింగ్‌ను  | <ul> <li><strong>మీ స్లాట్‌కు కనీసం 24 గంటల ముందు రద్దు చేస్తే:</strong> పూర్తి రీఫండ్.</li> <li><strong>రీషెడ్యూల్:</strong> మీ బుకింగ్‌ను ఒక్కసారి ఉచితంగా వేర
`checkin.seoDescription` (Hindi) | तनाव, मूड, माइंडफुलनेस, आत्म-सम्मान और भावनात्मक संतुलन पर 5 मिनट का मुफ़्त, निजी चेक-इन, जो आपको खुद को समझने में मदद करता है — साथ में एक  | तनाव, मूड, माइंडफुलनेस, आत्म-सम्मान और भावनाओं को सँभालने के बारे में 5 मिनट के कुछ आसान सवाल — मुफ़्त और निजी। आख़िर में एक हल्का-सा सुझाव भी मिलेगा कि क्या मद
`checkin.consent.notices.0` (Hindi) | यह खुद को समझने का ज़रिया है, डायग्नोसिस का नहीं | यह खुद को समझने के लिए है, इससे कोई डायग्नोसिस नहीं होता
`checkin.save.text` (Hindi) | ज़रूरी नहीं — अपना नाम और व्हाट्सऐप नंबर दें, तो वे खुद आपको मैसेज करके हाल पूछेंगे। आपकी जानकारी निजी रहती है और सिर्फ़ आपकी इजाज़त से सेव  | चाहें तो अपना नाम और व्हाट्सऐप नंबर दीजिए, श्रीकांत खुद आपको मैसेज करेंगे। आपकी जानकारी निजी रहती है और आपकी इजाज़त से ही सेव होती है।
`checkin.js.bands.distress.1.note` (Hindi) | कुछ दिन तनाव या उदासी भरे रहे। यह आम बात है और अक्सर बीत जाता है। | कुछ दिन मन में तनाव या उदासी रही। ऐसा होना आम है, और अक्सर यह दौर गुज़र जाता है।
`checkin.js.bands.distress.2.note` (Hindi) | हाल में यह काफ़ी समय आपके साथ रहा है। अपना ख़याल रखना और किसी से बात करना मदद कर सकता है। | हाल में ऐसा काफ़ी बार हुआ है। अपना ख़याल रखना और किसी से खुलकर बात करना मदद कर सकता है।
`checkin.js.bands.distress.3.note` (Hindi) | हाल में यह आप पर काफ़ी भारी रहा है। किसी डॉक्टर या काउंसलर से बात करना एक अच्छा कदम है, और यह सब आपको अकेले नहीं सँभालना है। | हाल में इसका बोझ आप पर काफ़ी रहा है। किसी डॉक्टर या काउंसलर से बात करना अच्छा रहेगा — यह सब आपको अकेले नहीं सँभालना है।
`checkin.js.bands.strength.0.note` (Hindi) | शुरुआत के लिए यह अच्छी जगह है। रोज़ के छोटे अभ्यास इसे बढ़ाने में मदद कर सकते हैं। | यहीं से शुरुआत होती है। रोज़ के छोटे-छोटे अभ्यास से यह धीरे-धीरे बढ़ सकता है।
`checkin.js.snap.attention.label` (Hindi) | यह थोड़ा ध्यान देने लायक है, और बहुत आम भी। यह सब आपको अकेले नहीं सँभालना है: किसी से बात करने पर मन हल्का लग सकता है। | ऐसा बहुत लोगों के साथ होता है, फिर भी इस पर ध्यान देना ठीक रहेगा। यह सब आपको अकेले नहीं सँभालना है — किसी से बात करने से मन हल्का हो सकता है।
`checkin.js.crisis.title` (Hindi) | आपको यह अकेले नहीं उठाना है | यह बोझ आपको अकेले नहीं उठाना है
`checkin.js.crisis.intro` (Hindi) | आपके एक जवाब से लगता है कि अभी आपके लिए समय बहुत मुश्किल हो सकता है। कृपया आज ही किसी से बात कीजिए। टेली-मानस भारत सरकार की मुफ़्त और निजी ह | आपके एक जवाब से लगता है कि शायद अभी आपका समय बहुत मुश्किल चल रहा है। कृपया आज ही किसी से बात कीजिए। टेली-मानस भारत सरकार की मुफ़्त और निजी हेल्पलाइन है।
`checkin.js.crisis.more` (Hindi) | और जानकारी: <a href="https://telemanas.mohfw.gov.in" target="_blank" rel="noopener">telemanas.mohfw.gov.in</a>। अगर आप तुरंत खतरे में हैं, त | और जानकारी: <a href="https://telemanas.mohfw.gov.in" target="_blank" rel="noopener">telemanas.mohfw.gov.in</a>। अगर आप तुरंत ख़तरे में हैं, तो 112 पर कॉल कीजिए 
`checkin.js.crisis.skipped` (Hindi) | अगर कभी सब कुछ बहुत भारी लगे, तो टेली-मानस (<a href="tel:14416">14416</a>) मुफ़्त, निजी और 24 घंटे उपलब्ध है। | अगर कभी सब कुछ बहुत भारी लगे, तो टेली-मानस (<a href="tel:14416">14416</a>) पर फ़ोन कर सकते हैं — यह मुफ़्त और निजी है, और 24 घंटे चालू रहता है।
`checkin.js.crisis.highTitle` (Hindi) | जब भी आप तैयार महसूस करें | जब भी आपका मन करे
`checkin.js.crisis.highBody` (Hindi) | श्रीकांत जी व्हाट्सऐप पर आपकी बात सुनने को तैयार हैं। कृपया डॉक्टर या काउंसलर से भी संपर्क में रहिए। जब आप थोड़ा सँभल जाएँ, तो वे साँस के अभ | श्रीकांत जी व्हाट्सऐप पर ख़ुशी से आपकी बात सुनेंगे। साथ ही, कृपया डॉक्टर या काउंसलर से भी बात करते रहिए। जब मन थोड़ा सँभल जाए, तब वे साँस के अभ्यास या बाख फ्लाव
`checkin.js.next.intro.stress` (Hindi) | आपके जवाबों से लगता है कि कुछ तनाव है और मन में बहुत कुछ चल रहा है। अगर यह भारी बना रहे या रोज़मर्रा की ज़िंदगी पर असर डालने लगे, तो कृपया ड | आपके जवाबों से लगता है कि कुछ तनाव है और मन में बहुत कुछ चल रहा है। अगर यह भारी बना रहे या रोज़ के कामकाज पर असर पड़ने लगे, तो कृपया किसी डॉक्टर या काउंसलर से म
`checkin.js.next.intro.heavy` (Hindi) | आपके जवाबों से लगता है कि मन कुछ भारी है। अगर यह भारीपन बना रहे या रोज़मर्रा की ज़िंदगी पर असर डालने लगे, तो कृपया डॉक्टर या काउंसलर से मिलि | आपके जवाबों से लगता है कि मन कुछ भारी है। अगर यह भारीपन बना रहे या रोज़ के कामकाज पर असर पड़ने लगे, तो कृपया किसी डॉक्टर या काउंसलर से मिलिए। साथ ही, एक नर्म, प
`checkin.js.next.bach.body` (Hindi) | बाख फ्लावर रेमेडीज़ एक नर्म, पर्सनल तरीका हैं, जिसे बहुत-से लोग अपने मन और भावनात्मक संतुलन को सहारा देने के लिए अपनाते हैं। श्रीकांत इन्हें | बाख फ्लावर रेमेडीज़ एक नर्म, पर्सनल तरीका है। बहुत-से लोग मन को सहारा देने और भावनाओं में संतुलन रखने के लिए इन्हें लेते हैं। हाल में आपका मन कैसा रहा है, यह दे

## Rules the editor learned for this audience (use for any future Telugu text)
1. Use a verb where English uses an abstract noun ("lost interest" → "చేయాలనిపించలేదు").
2. Write the thought the person really has ("నా వల్ల కాదనిపించి", "బతకడం ఎందుకని"), not a description from outside.
3. Drop English UI idioms ("a good place to start", "journey", "map", "stay with you") and say the plain point.
4. Use the spoken idiom (సర్దిచెప్పుకోవడం, కుదుటపడటం, అక్కరకు రావడం, మనసొప్పినప్పుడు, టక్కున), not newspaper words.
5. Watch false friends: నష్టం (money loss), ఖాళీగా for a person (idle), సున్నితమైన (delicate), విరాళం for "contribution".
6. Put hedges on verb endings (-వచ్చు, -గలవు) and make sure one hedge covers both claims in a sentence.
7. Write sentences so a placeholder needs no suffix (avoids grammar slips like "రెమెడీలుతో").
8. Turn stacked participles in front of a noun into two short sentences.



---

# Part 8: new strings added on 20 Nov 2026 (please include in the native review)
- **Privacy Policy, "What we collect" and "Who sees your information":** two new bullets saying that booking details (name, WhatsApp number, and for paid sessions the phone and email given at payment) are kept in a private booking record and a private Google Calendar that only Srikanth can open, so he can contact the person easily and prepare. The English is the master; Telugu and Hindi are machine drafts. Keys: `privacy.sections.1.html` and `privacy.sections.3.html`, plus `privacy.updated`. Legal-sensitive: please have the lawyer read the English.
- **Bach page, after payment:** `bach.book.paidTitle`, `paidNext`, `paidLine`, `bookAnother`, `waMsgPaid`, and the name field `nameLabel` / `errName` (Telugu and Hindi drafts, unreviewed).
- **Booking messages from the server** (`booking.errors.*`) and **time labels** (`booking.periods`, `booking.timeFmt`) from earlier in the day are also still unreviewed.

## Home page top section (new wording, 20 Nov 2026) — please check
English: "Pulled in many directions? Begin with one calm step." + "You do not have to work it all out alone…"
- Telugu headline: **అన్నీ ఒకేసారి మీద పడుతున్నాయా? / ప్రశాంతంగా మొదటి అడుగు వేయండి.** — "మీద పడుతున్నాయా" = "is it all landing on you at once". Does that sound natural, or is there a more everyday way to say "pulled in many directions"?
- Telugu line: uses **ఆసరా** (support) and **అలవాటు** (daily habit) instead of bookish words. Check both.
- Hindi headline: **कई तरफ़ खिंचाव महसूस हो रहा है? / एक शांत क़दम से शुरुआत कीजिए।** — "खिंचाव महसूस होना" for "pulled". Is it natural or too literal?
- Hindi line uses **अभ्यास** (daily practice). Fine, or would **आदत** be warmer?
- **Home Telugu rewritten again (20 Nov, native-sounding pass).** Headline now "అన్నివైపుల నుంచీ లాగేస్తున్నట్టు ఉందా? / ప్రశాంతంగా ఒక్క అడుగుతో మొదలుపెడదాం." (idea of "pulled in many directions" and the "-దాం" inclusive ending, same as the existing "మొదలుపెడదామా?"). Intro now uses **ఓదార్పు** (comfort) and **కుదుటగా** (settled). Check both.
- **Home hero now quotes Gurudev (20 Nov).** English: "Purity in heart. Clarity in mind. Sincerity in action." Telugu: **హృదయంలో పవిత్రత. మనసులో స్పష్టత. చేసే పనిలో చిత్తశుద్ధి.** (చిత్తశుద్ధి = sincerity; check it is the word Art of Living Telugu materials use). Hindi: **हृदय में पवित्रता। मन में स्पष्टता। कर्म में निष्ठा।** (please check against the Hindi wording Gurudev's own materials use). Telugu line under it: **మీ మనసుకు నచ్చిన దారితో మొదలుపెట్టండి** ("begin with the path your mind likes"). Hindi: **जो रास्ता आपको अपना लगे, वहीं से शुरू कीजिए**.
- **Please confirm for the Gurudev quote:** the exact wording and word order of the quote in English, and whether you are happy to quote him by name on the site.
- **Home intro line under the quote (20 Nov, reworded):** says each of the three paths touches heart, mind and action, so any one can lead to the others. Telugu uses **తమ తమ తీరులో** (in their own way), **తాకుతాయి** (touch), **తోడవుతాయి** (come along). Hindi uses **अपने-अपने ढंग से**, **छूते हैं**, **साथ चलने लगते हैं**. Please check they read naturally.
- **Quote order changed (20 Nov), as Srikanth prefers: Clarity in mind, purity in heart, sincerity in action.** Telugu: మనసులో స్పష్టత. హృదయంలో పవిత్రత. చేసే పనిలో చిత్తశుద్ధి. Hindi: मन में स्पष्टता। हृदय में पवित्रता। कर्म में निष्ठा। The line under it follows the same order (mind, heart, action).
- **Jyotish FAQ question (Telugu):** "ఖచ్చితంగా" replaced with the lighter "సరిగ్గా" (నా పుట్టిన సమయం సరిగ్గా తెలిసి ఉండాలా?).
