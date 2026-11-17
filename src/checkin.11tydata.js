// One template, one page per published language: /checkin.html, /te/checkin.html, /hi/checkin.html
module.exports = {
  eleventyComputed: {
    t: (d) => d.i18n[d.lang.code],
    htmlLang: (d) => d.lang.code,
    permalink: (d) => (d.lang.code === 'en' ? '/checkin.html' : `/${d.lang.code}/checkin.html`),
    path: (d) => (d.lang.code === 'en' ? '/checkin' : `/${d.lang.code}/checkin`),
    title: (d) => d.t.checkin.seoTitle,
    description: (d) => d.t.checkin.seoDescription
  }
};
