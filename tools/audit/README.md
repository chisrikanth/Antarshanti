# Site audit scripts (Awwwards-style, real browser)

Re-run these after any visual or layout change. They need Playwright (Chromium) and a local copy of the built site:

```bash
npm run build                                  # writes _site/
(cd _site && python3 -m http.server 8099 &)     # serves it on http://127.0.0.1:8099
node tools/audit/audit_all.js ./audit-out       # every page: console, widths, keyboard, reduced motion, structure, metadata, text
node tools/audit/gaps.js NOW                    # empty space between sections, every page, desktop and phone
node tools/audit/fps2.js                        # scroll smoothness with the CPU slowed 4x
node tools/audit/walk.js ./walk-out             # photographs every screen as a visitor scrolls (then look at them)
node tools/audit/orb2.js                        # the breathing curve: normal -> largest -> normal, stillness on the holds
node tools/audit/snap.js                        # scroll-snap experiment (kept to show why snapping was rejected)
```

Lighthouse: `npx lighthouse http://127.0.0.1:8099/ --only-categories=performance,accessibility,best-practices,seo`.
The scripts print what they find and never change the site. Pages that call Netlify functions will show a 404 for
`/.netlify/functions/slots` on a plain static server; that is expected locally.
