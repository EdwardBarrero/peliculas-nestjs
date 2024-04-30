import * as path from 'path';

export const i18nConfig = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: path.join(__dirname, '/i18n/'),
    watch: true,
  },
};
