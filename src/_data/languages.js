// Languages the site can be shown in.
// SAFETY: Telugu and Hindi are built on staging and previews, but NOT on the live site until a native
// speaker has reviewed them and you flip the flag in src/_data/i18n/review.json to true.
const env = require('./env');
const review = require('./i18n/review.json');
const ALL = [
  { code: 'en', native: 'English', name: 'English', banner: '', fontsHref: '' },
  { code: 'te', native: 'తెలుగు', name: 'Telugu', banner: 'ఈ పేజీని తెలుగులో చూడండి', bannerNo: 'వద్దు',
    fontsHref: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Telugu:wght@400;500;600;700&display=swap' },
  { code: 'hi', native: 'हिन्दी', name: 'Hindi', banner: 'यह पेज हिन्दी में देखें', bannerNo: 'नहीं',
    fontsHref: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap' }
];
module.exports = ALL.filter((l) => l.code === 'en' || review[l.code] === true || !env.isProduction);
