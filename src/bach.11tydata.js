const base = require('../lib/i18nPage')('bach.html', 'bach');
// the FAQ lives in the language files, so the visible FAQ and its Google markup always match
base.eleventyComputed.faqItems = (d) => d.t.bach.faq;
module.exports = base;
