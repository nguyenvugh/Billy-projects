import moment from "moment";

export const validateStatus = (status) => {
  return 200 <= status && status < 500;
};

export const isEmpty = (string) => {
  if (typeof string === "string") {
    return string.trim() === "";
  }
  return true;
};

export const formatDate = (ISOString) => {
  if (isEmpty(ISOString)) return "";
  return moment(ISOString).format("DD/MM/YYYY") || "";
};

export const formatDateTime = (ISOString, isDDMMYYYY = true) => {
  if (isEmpty(ISOString)) return "";

  return isDDMMYYYY ? moment(ISOString).format("DD/MM/YYYY HH:mm") || "" : moment(ISOString).format("YYYY/MM/DD HH:mm") || "";
};

export const formatDateTimeInput = (ISOString) => {
  if (isEmpty(ISOString)) return "";
  return moment(ISOString).format("YYYY-MM-DDTHH:mm") || "";
};

export const convertDateTimeInput = (DDMMYYYYTHHmm) => {
  if (isEmpty(DDMMYYYYTHHmm)) return "";
  return moment(DDMMYYYYTHHmm, "YYYY-MM-DDTHH:mm").toISOString() || "";
};

export const convertDate = (DDMMYYYY) => {
  if (isEmpty(DDMMYYYY)) return "";
  return moment(DDMMYYYY, "DD/MM/YYYY").toISOString() || "";
};

export const getTranslates = (translates, { language_code, language_field }) => {
  if (Array.isArray(translates)) {
    return translates.find(item => item?.language_code === language_code && item?.language_field === language_field);
  }
  return {};
};

export const convertTranslates = (object) => {
  if (Array.isArray(object?.translates)) {
    object.translates.forEach(item => {
      object[item?.language_code] = item;
    });
  }
  return object;
};

export const convertTranslatesList = (object) => {
  if (Array.isArray(object?.translates)) {
    object.translates.forEach(item => {
      object[`${item?.language_code}.${item?.language_field}`] = item?.language_value;
    });
  }
  return object;
};

export const isFloat = (number) => {
  const re = /^[-]?\d+(\.\d+)?$/;
  return re.test(number?.toString());
};

export function formatPrice(price) {
  if (parseInt(price) === 0) return "0";
  return price?.toString().replace(/[^0-9]/g, '').replace(/^0+/, '').replace(/\d(?=(\d{3})+$)/g, '$&.')
}

const B = /^(08|09)[0-9]{8}$/;
const L = /^(03[2-9]|07[06-9]|08[1-5]|05[2689])[0-9]{7}$/;
const F = /^(02)[0-9]{9}$/;
export const isPhoneNumber = (string) => {
  return B.test(string) || L.test(string) || F.test(string);
}

export const MIN_LENGTH_PHONE = 8;
export const REGEX_PHONE = /[^-0-9()+,.; ]/g;
export const ERROR_PHONE = `Số điện thoại phải có ít nhất ${MIN_LENGTH_PHONE} kí tự`;
export const ERROR_FAX = `Số fax phải có ít nhất ${MIN_LENGTH_PHONE} kí tự`;

export const isFax = (string) => {
  const re = /^[0-9]{10,11}$/;
  return re.test(string?.toString());
}

export const ERROR_LAT = "Vĩ độ không hợp lệ";
export const isLat = (string) => {
  const re = /^-?([1-8]?\d(?:\.\d{1,})?|90(?:\.0{1,6})?)$/;
  return re.test(string?.toString());
}

export const ERROR_LNG = "Kinh độ không hợp lệ";
export const isLng = (string) => {
  const re = /^-?((?:1[0-7]|[1-9])?\d(?:\.\d{1,})?|180(?:\.0{1,})?)$/;
  return re.test(string?.toString());
}

export const isValidUrlSlug = (string) => {
  const re = /^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/;
  return re.test(string?.toString());
}