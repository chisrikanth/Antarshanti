const base = require('../lib/i18nPage')('happiness.html', 'happiness');
// the FAQ lives in the language files, so the visible FAQ and its Google markup always match
base.eleventyComputed.faqItems = (d) => d.t.happiness.faq;
module.exports = base;
