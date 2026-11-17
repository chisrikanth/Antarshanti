// Eleventy replaces hand-copying the nav, footer, <head>, CSS and FAQ into every HTML file.
// Pages live in src/*.njk; shared pieces live in src/_includes; content lives in src/_data.
const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ')
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
const plain = (s) => decode(String(s).replace(/<[^>]+>/g, '')).trim();

const translated = require('./src/_data/translated.json');
// Link to the translated version of a page when one exists for the visitor's language.
const lhref = (file, code) => {
  const f = String(file).replace(/^\//, '');
  return code && code !== 'en' && translated.includes(f) ? `/${code}/${f}` : `/${f}`;
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter('lhref', lhref);
  eleventyConfig.addPassthroughCopy({ 'src/assets': 'assets', 'src/data': 'data', 'src/static': '.' });
  eleventyConfig.addFilter('plain', plain);
  // FAQ schema generated from the same data that renders the visible FAQ (always in sync)
  eleventyConfig.addFilter('faqSchema', (items) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: plain(f.q),
      acceptedAnswer: { '@type': 'Answer', text: plain(f.a) },
    })),
  }));
  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
    templateFormats: ['njk'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
