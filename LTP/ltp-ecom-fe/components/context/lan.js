import instance from "@ltp/services/axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const defaultLocale = "vi";
export const locales = ["en", "vi"];
export const LanguageContext = createContext([]);

export const LanguageProvider = ({ children }) => {
  const router = useRouter();
  const [locale, setLocale] = useState(router.defaultLocale);

  useEffect(() => {
    if (!window) {
      return;
    }
    setLocale(router.locale);
    const language = router.locale;
    setLocale(language);
    instance.defaults.headers.common.lang = language;
  }, [router.locale]);

  return (
    <LanguageContext.Provider value={[locale, setLocale]}>{children}</LanguageContext.Provider>
  );
};
