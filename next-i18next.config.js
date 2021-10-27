const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    // locales: ['en', 'fr', 'es', 'de', 'zh', 'ja', 'ko'],
    locales: ['en', 'fr'],
    localePath: path.resolve('./public/locales'),
  },
};
