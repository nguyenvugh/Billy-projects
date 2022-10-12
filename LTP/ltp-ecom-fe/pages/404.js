import { Box, Button, Flex, Input, SimpleGrid, Text } from "@chakra-ui/react";
import { getCategoriesByParent } from "@ltp/components/Category/services";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_PRODUCT, ROUTE_TOP_CATEGORY, WEB_DOMAIN } from "@ltp/utils/constant";
import { concatUrls } from "@ltp/utils/validate-url";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Custom404() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [listCategory, setListCategory] = useState([]);

  const { t, locale } = useTranslation();

  useEffect(() => {
    (async function () {
      const category = await getCategoriesByParent(
        {
          is_feature: 1,
        },
        locale,
      );
      setListCategory(category.data.results);
    })();
  }, []);

  const pageInfo = () => {
    switch (router.locale) {
      case "en":
        return {
          title: "Error 404 page not found | Longthanhplastic.com.vn",
          description: "Error 404 page not found on LongThanhplastic",
        };
      case "vi":
        return {
          title: "Lỗi 404 không tìm thấy trang | Longthanhplastic.com.vn",
          description: "Lỗi 404 không tìm thấy trang trên LongThanhplastic",
        };
      default:
        return {
          title: "Longthanhplastic.com.vn",
          content: "Longthanhplastic",
        };
    }
  };
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: ROUTE_PRODUCT(locale),
      query: { keyword: search },
      option: { shallow: true },
    });
  };
  function handleClickCategory(category) {
    router.push(`${ROUTE_TOP_CATEGORY(router.locale)}/${category.slug}`);
  }

  function handleClickBack() {
    router.back();
  }

  function handleClickContinue() {
    router.push({
      pathname: ROUTE_PRODUCT(locale),
      option: { shallow: true },
    });
  }
  const canonicalForVi =
    locale === "vi" ? concatUrls(WEB_DOMAIN, "/404/") : concatUrls(WEB_DOMAIN, `/${locale}/404/`);

  return (
    <>
      <Head>
        <title>{pageInfo().title}</title>
        <meta name="description" content={pageInfo().description} />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={canonicalForVi} />
      </Head>
      <Box
        w="100%"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        display="flex"
        flexDirection="column"
        bg="white"
        pb="26px"
      >
        <Box mt="16px" w="100vw" bg="white" justifyContent="center">
          <Box display="flex" alignItems="center" justifyContent="center">
            <Text fontSize="140px" fontWeight="bold" bg="#469bdb" bgClip="text" textAlign="center">
              4
            </Text>
            <Text fontSize="140px" fontWeight="bold" bg="#6f8fc9" bgClip="text" textAlign="center">
              0
            </Text>
            <Text fontSize="140px" fontWeight="bold" bg="#469bdb" bgClip="text" textAlign="center">
              4
            </Text>
          </Box>
          <Box p="4px" alignItems="center">
            <Text fontSize="18px" textAlign="center" fontWeight="bold" color="#566e73">
              {t("pageNotFound")}
            </Text>
          </Box>
        </Box>
        <Box w="100vw" bg="white" pt="30px" pb="30px" display="flex" justifyContent="center">
          <Flex as="form" onSubmit={onSubmit} p={2} w="50%" minWidth="250px">
            <Box flexGrow={1} fontSize="14px">
              <Input
                color="gray"
                value={search}
                onChange={onChange}
                placeholder={t("findPlaceholder")}
              />
            </Box>
            <Box fontSize="14px" ml="4px">
              <Button type="submit" bg="transparent" color="#4D76FF">
                {t("find")}
              </Button>
            </Box>
          </Flex>
        </Box>
        <Box w="100vw">
          <Text textAlign="center">{t("useTheFollowingKeywords")}</Text>
          <Flex maxWidth="80%" marginX="auto" justifyContent="center">
            <SimpleGrid
              justifyContent="center"
              mt="16px"
              columns={[2, 3, 4]}
              w={{
                base: "100%",
                sm: "80%",
              }}
              spacing="8px"
            >
              {listCategory.map((category) => (
                <Box
                  key={category.id}
                  p="8px"
                  border="1px solid #CCCCCC"
                  borderRadius="4px"
                  m="4px"
                  cursor="pointer"
                  _hover={{
                    bg: "#ccc",
                  }}
                  w="100%"
                  onClick={() => {
                    handleClickCategory(category);
                  }}
                >
                  <Text textAlign="center" noOfLines={1}>
                    {category.name}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Flex>
          <Box
            display={{
              base: "inline",
              sm: "flex",
            }}
            justifyContent="center"
            mt="26px"
            pb="20px"
          >
            <Box
              mt={{
                base: "26px",
                sm: "0px",
              }}
              p="4px"
              bg="#469bdb"
              mr="16px"
              borderRadius="4px"
              w={{
                base: "80%",
                sm: "160px",
              }}
              mx={{
                base: "auto",
                sm: "4px",
              }}
              mb={{
                base: "8px",
                sm: "0px",
              }}
              _hover={{ bg: "#3286c7" }}
              onClick={() => {
                handleClickBack();
              }}
            >
              <Text p="4px" color="white" fontWeight="bold" cursor="pointer" textAlign="center">
                {t("back")}
              </Text>
            </Box>
            <Box
              p="4px"
              bg="#6f8fc9"
              borderRadius="4px"
              mx={{
                base: "auto",
                sm: "4px",
              }}
              w={{
                base: "80%",
                sm: "160px",
              }}
              _hover={{ bg: "#3e5f9c" }}
              onClick={() => {
                handleClickContinue();
              }}
            >
              <Text p="4px" color="white" fontWeight="bold" cursor="pointer" textAlign="center">
                {t("continueShopping")}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
