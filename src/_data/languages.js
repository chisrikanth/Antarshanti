// Languages the site can be shown in.
// SAFETY: Telugu and Hindi are built on staging and previews, but NOT on the live site until a native
// speaker has reviewed them and you flip the flag in src/_data/i18n/review.json to true.
const env = require('./env');
const review = require('./i18n/review.json');
const ALL = [
  { code: 'en', native: 'English', short: 'EN', name: 'English', banner: '' },
  { code: 'te', native: 'తెలుగు', short: 'తె', name: 'Telugu', banner: 'ఈ పేజీని తెలుగులో చూడండి', bannerNo: 'వద్దు' },
  { code: 'hi', native: 'हिन्दी', short: 'हि', name: 'Hindi', banner: 'यह पेज हिन्दी में देखें', bannerNo: 'नहीं' }
];
module.exports = ALL.filter((l) => l.code === 'en' || review[l.code] === true || !env.isProduction);
