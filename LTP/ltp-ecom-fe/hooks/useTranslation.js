import { useContext } from "react";

import { LanguageContext, defaultLocale, locales } from "@ltp/components/context/lan";
import { LangStrings } from "../intl/Strings";

export default function useTranslation() {
  const [locale, setLocale] = useContext(LanguageContext);

  function t(key) {
    return LangStrings[locale][key] || LangStrings[defaultLocale][key] || "";
  }

  return {
    t,
    locale,
    setLocale,
    locales,
  };
}
