# Telugu and Hindi: status and how to get them reviewed

## What exists now
| Part | English | Telugu | Hindi |
|---|---|---|---|
| Check-in (ad landing page): consent, 25 questions, results, safety box, next steps, save form | done | **draft** | **draft** |
| Menu, footer, "talk to Srikanth" strip | done | **draft** | **draft** |
| Home, Jyotish, Bach Flower, Happiness pages, booking widgets, privacy/terms/refund | done | not yet | not yet |

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

## Next translation steps (after the check-in is approved)
1. Home page (hero, three paths, check-in band), then the Happiness Program page (the page the ads lead to).
2. Bach Flower and Jyotish pages and the booking widgets (dates, buttons, messages).
3. Privacy, terms and refund pages (these need a careful, ideally professional translation).
4. WhatsApp pre-filled messages on those pages.
