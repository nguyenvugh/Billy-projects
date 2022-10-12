import { Box, Button, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import Container from "@ltp/components/Container";
import { useAppUserContext } from "@ltp/components/context/auth";
import { CompanyInfoContext } from "@ltp/components/context/company-info";
import useTranslation from "@ltp/hooks/useTranslation";
import instance from "@ltp/services/axios";
import { getCompanyInfo, getStaticPageSlug } from "@ltp/services/page";
import { urlCompanyInfo } from "@ltp/services/urlAPI";
import Image from "next/image";

import {
  LOCALIZE_ROUTES_PAGE,
  ROUTES_BLACK_LIST,
  ROUTE_ABOUT_US,
  ROUTE_CATEGORY,
  ROUTE_CATEGORY_NEW,
  ROUTE_PRIVACY,
  ROUTE_QUESTION,
  ROUTE_SHOP,
  ROUTE_STORE_PAGE,
} from "@ltp/utils/constant";
import { convertTranslatesList } from "@ltp/utils/validate";
import { addTrailingSlash, concatUrls } from "@ltp/utils/validate-url";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import useSWR from "swr";
import MessageChat, { idMessenger } from "./messager-chat";
import SubcriptionEmail from "./subscription-email";

const facebookLink =
  process.env.NEXT_PUBLIC_FACEBOOK_LINK || "https://www.facebook.com/longthanhplastic/";
const shopeeLink =
  process.env.NEXT_PUBLIC_SHOPEE_LINK || "https://shopee.vn/nhualongthanh_official";
const zaloLink = process.env.NEXT_PUBLIC_ZALO_LINK || "https://zalo.me/589673439383195103";

const ListHeader = ({ children }) => {
  const router = useRouter();
  const nameHeadingPage = () => {
    const routeInfo = router.asPath.split("/");
    if (
      (routeInfo.includes("danh-muc") || routeInfo.includes("category")) &&
      (routeInfo.includes("san-pham") || routeInfo.includes("products"))
    ) {
      return "h4";
    }
    if (
      !(
        routeInfo.includes("profile") ||
        routeInfo.includes("product") ||
        routeInfo.includes("san-pham") ||
        routeInfo.includes("danh-muc") ||
        routeInfo.includes("category")
      )
    ) {
      return "h4";
    }
  };
  return (
    <Text
      as={nameHeadingPage()}
      // as="h4"
      fontWeight="bold"
      fontSize={16}
      textTransform="uppercase"
      mt={{ base: 4, lg: 0 }}
      mb={2}
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "15px",
        borderBottom: "2px",
        borderBottomColor: "#2154FF",
      }}
    >
      {children}
    </Text>
  );
};

export default function Footer() {
  const router = useRouter();
  const { onLanguageChange } = useAppUserContext();
  const { t, locale, setLocale } = useTranslation();
  const { companyInfo, setCompanyInfo } = useContext(CompanyInfoContext);
  const { data, mutate } = useSWR(urlCompanyInfo, getCompanyInfo);
  const [, setShow] = useState(false);

  useEffect(() => {
    mutate(urlCompanyInfo);
  }, [locale]);

  useEffect(() => {
    const companyInfo = data?.data?.data;
    convertTranslatesList(companyInfo);
    setCompanyInfo(companyInfo);
  }, [data]);

  useEffect(() => {
    setShow(true);
  }, []);

  const handleChangeLan = async (lan) => {
    if (!window) {
      return;
    }
    localStorage.setItem("lang", lan);
    setLocale(lan);
    instance.defaults.headers.lang = lan;
    const prefixLang = lan === "vi" ? "" : lan;
    const data_languaue = LOCALIZE_ROUTES_PAGE[lan] || {};
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
          other_lang: lan,
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
        onLanguageChange && onLanguageChange(lan);
        return;
      }

      window.location.href = addTrailingSlash(data_route);
    }
  };

  const nameHeading = () => {
    const routeInfo = router.asPath.split("/");
    if (["/blog/[slug]"].includes(router.pathname)) {
      return "";
    }
    if (
      routeInfo.includes("news") ||
      routeInfo.includes("tin-tuc") ||
      routeInfo.includes("tin-moi") ||
      routeInfo.includes("blog") ||
      (routeInfo[0] === "" && routeInfo[1] === "")
    ) {
      return "h1";
    }
  };

  const nameHeadingPageInfo = () => {
    const routeInfo = router.asPath.split("/");
    if (
      (routeInfo.includes("danh-muc") || routeInfo.includes("category")) &&
      (routeInfo.includes("san-pham") || routeInfo.includes("products"))
    ) {
      return "";
    }
    if (
      routeInfo.includes("profile") ||
      routeInfo.includes("product") ||
      routeInfo.includes("san-pham") ||
      routeInfo.includes("danh-muc") ||
      routeInfo.includes("category")
    ) {
      return "h4";
    }
  };

  return (
    <footer>
      <ToastContainer position="bottom-center" autoClose={2500} pauseOnHover={false} limit={1} />
      <SubcriptionEmail />
      <Box fontSize={{ base: 14, md: 16 }}>
        <Container>
          <Stack
            sx={{
              "a:hover": { textDecor: "underline" },
            }}
            direction={{ base: "column", sm: "row" }}
            flexWrap="wrap"
            spacing={{ base: 0, lg: 8 }}
            color="#2154FF"
            pt={{ base: "32px", md: "40px" }}
            pb="16px"
          >
            <Stack
              spacing={2}
              fontSize={12}
              w={{
                base: "100%",
                sm: "50%",
                lg: "40%",
                xl: "45%",
              }}
            >
              <Box
                margin={{ base: "auto", md: "unset" }}
                maxWidth="100%"
                maxHeight={["111px", "97px"]}
                mb={{ base: "24px", md: "8px" }}
              >
                <Image src="/imgs/footer-logo.png" alt="LTP" height="111px" width="185px" />
              </Box>
              <Text as={nameHeading()} fontWeight="bold" textTransform="uppercase">
                {companyInfo?.[`${locale}.company_name`]}
              </Text>
              <Text as="p">
                {t("address")}: {companyInfo?.[`${locale}.address`]}
              </Text>
              <Text as="p">
                {t("email")}: {companyInfo?.[`${locale}.email`]}
              </Text>
              <Text as="p">
                {t("hotline")}: {companyInfo?.[`${locale}.hotline`]}
              </Text>
            </Stack>
            <Stack fontSize={14} w={{ base: "100%", sm: "50%", lg: "auto" }}>
              <ListHeader>{t("aboutCompany")}</ListHeader>
              <a href={addTrailingSlash(ROUTE_ABOUT_US(locale))}>{t("aboutLT")}</a>
              <a href={addTrailingSlash(ROUTE_CATEGORY(locale))}>{t("product")}</a>
              <a href={addTrailingSlash(ROUTE_CATEGORY_NEW(locale))}>{t("news")}</a>
            </Stack>
            <Stack fontSize={14} w={{ base: "100%", sm: "50%", lg: "auto" }}>
              <ListHeader>{t("customerSupport")}</ListHeader>
              <a href={addTrailingSlash(ROUTE_QUESTION(locale))}>{t("FAQ")}</a>
              <a href={addTrailingSlash(ROUTE_PRIVACY(locale))}>{t("policy")}</a>
            </Stack>
            <Stack fontSize={14} w={{ base: "100%", sm: "50%", lg: "auto" }}>
              <ListHeader>{t("directLinks")}</ListHeader>
              <a href={addTrailingSlash(ROUTE_SHOP(locale))}>{t("storeSystem")}</a>
              <a href={addTrailingSlash(ROUTE_STORE_PAGE(locale))}>{t("representativeOffice")}</a>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box bgColor="#E9EEFF" fontSize={{ base: 14, md: 16 }}>
        <Container>
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="space-between"
            spacing="0"
            color="#2154FF"
          >
            <Stack direction="row" alignItems="center" py="8px" spacing={{ base: 0, md: 2, lg: 4 }}>
              <Text flexShrink={0} w={{ base: "40%", sm: "50%", md: "auto" }}>
                {t("payment")}
              </Text>
              <Stack direction="row" spacing="8px">
                <Image src="/imgs/payments/visa.svg" alt="Visa" height="24px" width="76px" />
                <Image
                  src="/imgs/payments/mastercard.svg"
                  alt="MasterCard"
                  height="24px"
                  width="40px"
                />
                <Image src="/imgs/payments/onepay.png" alt="Paypal" height="24px" width="53px" />
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              py="8px"
              spacing={{ base: 0, md: 2, lg: 4 }}
              justifyContent={{ base: "initial", md: "center" }}
            >
              <Text flexShrink={0} w={{ base: "40%", sm: "50%", md: "auto" }}>
                {t("follow")}
              </Text>
              <Stack direction="row" spacing={{ base: "16px", md: "8px" }}>
                <a href={facebookLink} title={t("followOnFacebook")} target="_blank">
                  <Image
                    boxSize="24px"
                    src="/icons/socials/fb.svg"
                    alt="facebook"
                    width="24px"
                    height="24px"
                  />
                </a>
                <a href={shopeeLink} title={t("followOnShopee")} target="_blank">
                  <Image
                    boxSize="24px"
                    src="/icons/socials/shopee.png"
                    alt="shopee"
                    width="24px"
                    height="24px"
                  />
                </a>
                <a href={zaloLink} title={t("followOnZalo")} target="_blank">
                  <Image
                    boxSize="24px"
                    src="/icons/socials/zalo.png"
                    alt="zalo"
                    width="24px"
                    height="24px"
                  />
                </a>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              py="8px"
              spacing={{ base: 0, md: 2, lg: 4 }}
              justifyContent={{ base: "initial", md: "flex-end" }}
            >
              <Text flexShrink={0} w={{ base: "40%", sm: "50%", md: "auto" }}>
                {t("certification")}
              </Text>
            </Stack>
          </Stack>
        </Container>
      </Box>
      <Box fontSize={12}>
        <Container>
          <Flex spacing={8} color="#2154FF" alignItems="center" p="12px 0 12px 0">
            <Stack direction="row" alignItems="center" spacing={4}>
              <Text fontWeight="600" whiteSpace="nowrap" marginRight="10px">
                © 2021 Long Thanh LTP
              </Text>
              <Image width="62px" height="21px" src="/imgs/footer-logo-standalone.png" alt="LTP" />
            </Stack>
            <Spacer />
            <Stack direction="row" spacing={2}>
              <Button
                bg="transparent"
                fontWeight="600"
                fontSize={12}
                p={0}
                m={0}
                h="fit-content"
                onClick={() => handleChangeLan("vi")}
              >
                <Text>Tiếng Việt</Text>
              </Button>
              <Text> / </Text>
              <Button
                bg="transparent"
                fontWeight="normal"
                fontSize={12}
                p={0}
                m={0}
                h="fit-content"
                onClick={() => handleChangeLan("en")}
              >
                <Text>English</Text>
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Box>
      <Box position="fixed" bottom={0} right={0} id={idMessenger} />
      <MessageChat />
    </footer>
  );
}
