import { LANG } from 'src/sections/@dashboard/category/constants';

export function getTranslationByLang<Type>(lang: LANG, translates: Array<Type>): Type {
  let translation: Type = {} as Type;
  translates.forEach((translate) => {
    for (const [key, value] of Object.entries(translate as Object)) {
      if (key === 'lang' && value === lang) {
        translation = { ...translate };
      }
    }
  });
  return translation;
}

