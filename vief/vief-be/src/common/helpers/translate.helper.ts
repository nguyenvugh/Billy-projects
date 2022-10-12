import { LangEnum } from '../constants/global.constant';
import { validateValueInEnum } from '../utils';

export const validateTranslateLang = (lang: string) => {
  return validateValueInEnum(LangEnum, lang);
};
