import { REGEX_PASSWORD } from "../constants";

export const convertTranslatesList = (object: any) => {
  if (Array.isArray(object?.translates)) {
    object.translates.forEach((item: any) => {
      object[`${item?.language_code}.${item?.language_field}`] =
        item?.language_value;
    });
  }
  return object;
};

export function isPhone(value: string) {
  const B = /^(08|09)[0-9]{8}$/;
  const L = /^(03[2-9]|07[06-9]|08[1-5]|05[2689])[0-9]{7}$/;
  const F = /^(02)[0-9]{9}$/;
  return B.test(value) || L.test(value) || F.test(value);
}

export function isEmail(email: string) {
  return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
}

export function isPasswordValid(pass: string = "") {
  return REGEX_PASSWORD.test(pass);
}
