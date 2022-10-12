export const addZeroNumber = (value) => ("0" + value).slice(-2);
export const formatVND = (value = "0", currencySuffix = true) => {
  if (currencySuffix)
    return Number(value)?.toLocaleString("it-IT", {
      style: "currency",
      currency: "VND",
    });
  return String(value).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const isEmail = (email) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(String(email).toLocaleLowerCase());
};

export const isLatitude = (latitude) => {
  const pattern = /^[+-]?(([1-8]?[0-9])(\.[0-9]{1,20})?|90(\.0{1,6})?)$/;
  return pattern.test(latitude);
};

export const isLongitude = (longitude) => {
  const pattern =
    /^(?=.)-?((0?[8-9][0-9])|180|([0-1]?[0-7]?[0-9]))?(?:\.[0-9]{1,20})?$/;
  return pattern.test(longitude);
};

export const isHours = (hours) => {
  const pattern = /^((?:[01]\d|2[0-3]):[0-5]\d$)/;
  return pattern.test(hours);
};

export const unsignText = (text) => {
  try {
    let str = text;
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  } catch (error) {
    return text;
  }
};

export function isNumeric(stringNumber) {
  return !isNaN(parseFloat(stringNumber)) && isFinite(stringNumber);
}

export function numberWithCommas(x = "", separateChar = ".") {
  let validNumber = x || "";
  if (isNaN(validNumber)) validNumber = "";
  return validNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separateChar);
}
