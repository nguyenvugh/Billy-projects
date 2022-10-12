import { REGEX_VALIDATE_NAME } from '../constants/validate.constant';
import { convertVietnameseCharsToEnglishChars } from '../utils';

export const validateNameChars = (name: string) => {
  name = convertVietnameseCharsToEnglishChars(name);
  if (!name) {
    return false;
  }

  return REGEX_VALIDATE_NAME.test(name);
};
