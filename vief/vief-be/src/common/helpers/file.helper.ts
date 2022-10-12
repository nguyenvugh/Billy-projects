import { LangEnum } from '../constants/global.constant';
import { validateTranslateLang } from './translate.helper';
import { AdminUpdateImageTranslateFieldsDto } from '../../file/admin/dto/req/admin-update-image-translate.dto';

export const validateDataCreateImageTranslate = (
  data: AdminUpdateImageTranslateFieldsDto[],
) => {
  // Only allow create one translate
  if (!data.length || data.length != 1) {
    return false;
  }
  const item = data[0];
  // Must have vi translate
  if (!item.lang || item.lang != LangEnum.Vi) {
    return false;
  }

  return true;
};

export const validateDataUpdateImageTranslate = (
  data: AdminUpdateImageTranslateFieldsDto[],
) => {
  // Only allow update one translate
  if (!data.length || data.length != 1) {
    return false;
  }
  const item = data[0];
  // Must have lang translate
  if (!item.lang) {
    return false;
  }
  // Validate trans lang
  if (!validateTranslateLang(item.lang)) {
    return false;
  }

  return true;
};
