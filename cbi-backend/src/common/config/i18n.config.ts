import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nOptions,
  QueryResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { KEY_LANG_HEADER, LangEnum } from '../constants/global.constant';

const i18nConfigOptions: I18nOptions = {
  fallbackLanguage: LangEnum.Vi, // Not work if change to vi
  fallbacks: {
    // 'en-CA': 'fr',
    // vi: 'vi',
    'en-*': 'en',
    // 'fr-*': 'fr',
    // pt: 'pt-BR',
  },
  parser: I18nJsonParser,
  parserOptions: {},
  // Path not work here
  // parserOptions: {
  //   path: '../../i18n/', //path.join(__dirname, '/i18n/'),
  //   watch: true,
  // },
  resolvers: [
    { use: QueryResolver, options: [KEY_LANG_HEADER] },
    new HeaderResolver([KEY_LANG_HEADER]),
    AcceptLanguageResolver,
    // new CookieResolver(['lang', 'locale', 'l']),
  ],
};

export default i18nConfigOptions;
