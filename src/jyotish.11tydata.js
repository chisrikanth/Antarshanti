const base = require('../lib/i18nPage')('jyotish.html', 'jyotish');
// the FAQ lives in the language files, so the visible FAQ and its Google markup always match
base.eleventyComputed.faqItems = (d) => d.t.jyotish.faq;
module.exports = base;
