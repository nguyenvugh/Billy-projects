import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// english
import commonEn from "src/common/i18n/en/common.json";

// vietnamese
import commonVi from "src/common/i18n/vi/common.json";

export const resources = {
  en: {
    translation: commonEn,
  },
  vi: {
    translation: commonVi,
  },
} as const;
const lang = localStorage.getItem("i18nextLng");
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    lng: lang ? lang : "vi",
    fallbackLng: "en",
    ns: ["auth"],
    resources,
  });
