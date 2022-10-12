import CryptoJS from "crypto-js";
import _ from "lodash";
export function saveCache(key: string, value: string) {
  try {
    var data = {
      value,
    };
    let data2 = CryptoJS.AES.encrypt(JSON.stringify(data), "CBI");
    localStorage.setItem(key, data2.toString());
  } catch (error) {}
}
export function readCache(key: string, defaultValue: any) {
  if (typeof window !== "undefined") {
    if (localStorage && localStorage?.hasOwnProperty(key)) {
      var item = localStorage.getItem(key);
      var item = item && CryptoJS.AES.decrypt(item, "CBI").toString(CryptoJS.enc.Utf8);
      if (item)
        try {
          var data = JSON.parse(item);
          if (data && data.value) {
            return data.value;
          }
        } catch (error) {}
    }
  }
  return defaultValue;
}

export function clearCache() {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
}
