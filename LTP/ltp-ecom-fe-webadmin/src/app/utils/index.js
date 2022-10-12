import { vsprintf } from "sprintf-js";
import Lodash from "lodash";
import { LANG_VI } from "./constant";

export const replaceStrUrl = (baseUrl, arrStr) => {
  var path = vsprintf(baseUrl, arrStr);
  return path;
};

export const getSafeValue = (object, keyItem, defaultValue) => {
  var safeValue = Lodash.get(object, keyItem, defaultValue);
  if (safeValue === null) {
    safeValue = defaultValue;
  }

  if (safeValue === "") {
    safeValue = defaultValue;
  }

  if (
    safeValue !== null &&
    defaultValue !== null &&
    (typeof safeValue !== typeof defaultValue ||
      safeValue.constructor !== defaultValue.constructor)
  ) {
    safeValue = defaultValue;
  }

  // console.log("safeValue", safeValue);

  return safeValue;
};

export const getField = (translates, language_code, language_field) => {
  const resObj = Lodash.find(translates, {
    language_code,
    language_field,
  });
  const res = getSafeValue(resObj, "language_value", "");
  return res;
};

export const getObjByLanguage = (translates, language_code, field) => {
  const resObj = Lodash.find(translates, { language_code });
  const res = getSafeValue(resObj, field, "");
  return res;
};

export const removeTags = (str) => {
  if (str === null || str === "") return str;
  else str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
};

export const safeParseFloat = (strNumber) => {
  var numParse = 0;
  if (strNumber === "" || strNumber === null || strNumber === undefined) {
    return numParse;
  }

  numParse = parseFloat(strNumber);
  if (numParse === null) {
    numParse = 0;
  }

  return numParse;
};

export const getTranslateField = (listTrans, lang = LANG_VI) => {
  let arrTrans = Lodash.filter(listTrans, (obj) => obj.language_code === lang);
  let objTrans = getObjTrans(arrTrans);
  return objTrans;
};
export const getObjTrans = (arrayTrans, lang) => {
  const objTrans = arrayTrans.reduce((obj, item) => {
    return {
      ...obj,
      [item.language_field]: item.language_value,
    };
  }, {});
  return objTrans;
};
