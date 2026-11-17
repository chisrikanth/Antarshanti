# Telugu and Hindi: status and how to get them reviewed

## What exists now
| Part | English | Telugu | Hindi |
|---|---|---|---|
| Check-in (ad landing page): consent, 25 questions, results, safety box, next steps, save form | done | **draft** | **draft** |
| Menu, footer, "talk to Srikanth" strip | done | **draft** | **draft** |
| **Home page** | done | **draft** | **draft** |
| **Happiness Program page** (incl. batch cards, FAQ, video captions) | done | **draft** | **draft** |
| Jyotish, Bach Flower pages, their booking widgets, privacy/terms/refund | done | not yet | not yet |

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
1. Bach Flower and Jyotish pages and the booking widgets (dates, buttons, messages).
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
