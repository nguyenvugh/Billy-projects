import { HStack, Image, Text } from "@chakra-ui/react";
import { useAppUserContext } from "@ltp/components/context/auth";
import MenuHover from "@ltp/components/MenuHover";
import { LANG_DROPDOWN_LIST } from "@ltp/constants/languages";
import useTranslation from "@ltp/hooks/useTranslation";
import instance from "@ltp/services/axios";
import { getStaticPageSlug } from "@ltp/services/page";
import { LOCALIZE_ROUTES_PAGE, ROUTES_BLACK_LIST } from "@ltp/utils/constant";
import { addTrailingSlash, concatUrls } from "@ltp/utils/validate-url";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RiArrowDownSFill } from "react-icons/ri";

export default function LanguageSelection() {
  const router = useRouter();
  const [selectedLanguage, setSelectLanguage] = useState("");
  const { setLocale, locale, t } = useTranslation();
  const { onLanguageChange } = useAppUserContext();
  useEffect(() => {
    if (window) {
      const curLan = localStorage.getItem("lang");
      const selectedLanguageDefault = LANG_DROPDOWN_LIST.filter((item) => item.key === curLan);
      setSelectLanguage(selectedLanguageDefault[0]);
    } else {
      const selectedLanguageDefault = LANG_DROPDOWN_LIST.filter((item) => item.default === true);
      setSelectLanguage(selectedLanguageDefault[0]);
    }
  }, []);

  useEffect(() => {
    const selectedLanguageDefault = LANG_DROPDOWN_LIST.filter((item) => item.key === locale);
    setSelectLanguage(selectedLanguageDefault[0]);
  }, [locale]);

  const handleLocaleChange = async (item) => {
    setSelectLanguage(item);

    if (!window) {
      return;
    }
    localStorage.setItem("lang", item.key);
    setLocale(item.key);
    instance.defaults.headers.lang = item.key;
    const prefixLang = item.key === "vi" ? "" : item.key;
    const data_languaue = LOCALIZE_ROUTES_PAGE[item.key] || {};
    const data_route =
      data_languaue[router.route] ||
      (item.key !== "vi" ? "/" : "") + concatUrls(prefixLang, router.asPath);
    let { query } = router;

    /**
     * Chuyển API sang page tĩnh slug
     * Ignore some API like page tĩnh /slug, product detail, article detail, news detail
     */
    if (router.route === "/[slug]") {
      // Call API check slug change here
      const currentSlug = router.query?.slug;
      try {
        const reponse = await getStaticPageSlug({
          slug: currentSlug,
          other_lang: item?.key,
        });
        query = { slug: reponse.data?.data || "" };
        window.location.href = addTrailingSlash(data_route.replace("[slug]", query.slug));
      } catch (err) {
        // throw new Error(err);
        console.log(err);
      }
    } else {
      // Handle redirect them will be in their pages, not here.
      if (ROUTES_BLACK_LIST.includes(router.route)) {
        onLanguageChange && onLanguageChange(item.key);
        return;
      }
      console.log(data_route);
      window.location.href = addTrailingSlash(data_route);
    }
  };

  return (
    <MenuHover
      renderTrigger={() => (
        <HStack spacing={0}>
          <Text fontSize={14} display="inline-block" mr={3}>
            {t("language")}
          </Text>
          <Image
            w="20px"
            h="16px"
            src={`/icons/flags/${selectedLanguage?.key}.svg`}
            alt={selectedLanguage?.name}
          />
          <RiArrowDownSFill />
        </HStack>
      )}
    >
      {LANG_DROPDOWN_LIST.map((item) => (
        <HStack
          key={item.key}
          onClick={() => handleLocaleChange(item)}
          p="12px 15px"
          cursor="pointer"
        >
          <Image w="20px" h="16px" src={`/icons/flags/${item.key}.svg`} alt={item.name} />
          <Text color="gray" fontSize={14}>
            {item.name}
          </Text>
        </HStack>
      ))}
    </MenuHover>
  );
}
