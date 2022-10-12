/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import CryptoJS from "crypto-js";

export function saveCache(key, value) {
  try {
    const data = {
      value,
    };
    const data2 = CryptoJS.AES.encrypt(JSON.stringify(data), "TESO");
    localStorage.setItem(key, data2.toString());
  } catch (error) {
    throw new Error(error);
  }
}
export function readCache(key, defaultValue) {
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-prototype-builtins
    if (localStorage && localStorage?.hasOwnProperty(key)) {
      var item = localStorage.getItem(key);
      // eslint-disable-next-line no-redeclare
      var item = CryptoJS.AES.decrypt(item, "TESO");
      if (item) {
        try {
          const itemUtf8 = item.toString(CryptoJS.enc.Utf8);
          const data = JSON.parse(itemUtf8);
          if (data && data.value) {
            return data.value;
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    }
  }
  return defaultValue;
}

export function clearCache() {
  if (typeof window !== "undefined") {
    let values = [];
    values = Object.keys(localStorage);
    values.forEach((element) => {
      if (!element.includes("react-use-cart")) {
        localStorage.removeItem(element);
      }
    });
  }
}
