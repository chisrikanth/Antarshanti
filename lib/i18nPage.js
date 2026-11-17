// Shared data for any page that exists in several languages (see src/*.11tydata.js).
//   file: the page's file name, e.g. 'index.html'   section: key in the language files, e.g. 'home'
module.exports = (file, section) => {
  const base = file === 'index.html' ? '/' : '/' + file.replace('.html', '');
  return {
    eleventyComputed: {
      t: (d) => d.i18n[d.lang.code],
      htmlLang: (d) => d.lang.code,
      permalink: (d) => (d.lang.code === 'en' ? '/' + file : `/${d.lang.code}/${file}`),
      path: (d) => (d.lang.code === 'en' ? base : `/${d.lang.code}${base === '/' ? '/' : base}`),
      title: (d) => d.t[section].seoTitle,
      description: (d) => d.t[section].seoDescription
    }
  };
};
