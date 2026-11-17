# Telugu and Hindi: status and how to get them reviewed

## Where each page's notes are (start here)
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

