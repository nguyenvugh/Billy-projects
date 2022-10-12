import { useRouter } from "next/router";
import { EN } from "public/lang/en";
import { VI } from "public/lang/vi";
import { Lang } from "../interfaces/common.interface";

type Props = {
  t: (key: string) => string;
  locale: Lang;
};
const useTranslation = (): Props => {
  const { locale } = useRouter();

  function t(key: string) {
    const dataByLocale = getLangTranslate(locale as Lang);
    // @ts-ignore
    return dataByLocale[key] || "";
  }

  function getLangTranslate(locale: Lang) {
    switch (locale) {
      case "vi":
        return VI;
      case "en":
        return EN;
      default:
        return EN;
    }
  }
  return { t, locale: (locale || "vi") as Lang };
};

export { useTranslation };
