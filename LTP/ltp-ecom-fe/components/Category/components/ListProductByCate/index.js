import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Accordion,
  Box,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import CategoryFilter from "@ltp/components/Category/components/CategoryFilter";
import Container from "@ltp/components/Container";
import { useAppUserContext } from "@ltp/components/context/auth";
import Pagination from "@ltp/components/Pagination";
import { SORT_ASC } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { getMenuProducts } from "@ltp/services/home";
import { getProductsAxiosByLang } from "@ltp/services/product";
import { getCategoriesOtherLang, getProductsCategoryAxios } from "@ltp/services/product-category";
import {
  PAGE_SIZE_UNLIMIT,
  ROUTE_CATEGORY,
  ROUTE_CATEGORY_SLUG,
  WEB_DOMAIN,
} from "@ltp/utils/constant";
import { addTrailingSlash, concatUrls } from "@ltp/utils/validate-url";
import Link from "next/link";
import { useRouter } from "next/router";
import ListSort from "pages/category/products/components/ListSort";
import WrapperPopover from "pages/category/products/components/Popover";
import ProductList from "pages/category/products/components/ProductList";
import DescriptionDetail from "pages/product/components/DescriptionDetail";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 12;

export function ListProductByCate({ category, slugSelected }) {
  const { setOnLanguageChange, searchProductKey, setSearchProductKey } = useAppUserContext();
  const router = useRouter();
  const { t, locale } = useTranslation();
  const refScroll = useRef();
  const [categoryList, setCategoryList] = useState(null);
  const [productParams, setProductParams] = useState({
    search: router.query.keyword || searchProductKey,
    page: router.query.page || 1,
    limit: PAGE_SIZE,
    sort_value: SORT_ASC,
  });
  const [productData, setProductData] = useState({
    results: [],
    total: 0,
  });

  useEffect(() => {
    if (slugSelected) {
      setOnLanguageChange(() => handleGetCategoryOtherLang);
      handleGetProduct(productParams);
    }
  }, [slugSelected]);

  useEffect(() => {
    if (!slugSelected) {
      setProductParams({
        ...productParams,
        search: router.query.keyword || "",
      });
    }
  }, [router.query.keyword, slugSelected]);
  useEffect(() => {
    if (router?.query?.page || router?.query?.keyword) {
      setProductParams({
        ...productParams,
        page: parseInt(router.query.page) || 1,
        search: router.query.keyword || "",
      });
    }
  }, [router?.query?.page, router?.query?.keyword]);

  useEffect(() => {
    Promise.all([
      getProductsCategoryAxios({ page: 1, limit: PAGE_SIZE_UNLIMIT }),
      getMenuProducts(),
    ]).then((res) => {
      const categoryList = res?.[0]?.data?.results;
      setCategoryList(categoryList);
    });
  }, [locale]);

  useEffect(() => {
    handleGetProduct(productParams);
  }, [JSON.stringify(productParams), locale]);

  // useEffect(() => {
  //   handleGetProduct(productParams);
  // }, [locale]);

  async function handleGetProduct(params) {
    const paramsData = { ...params };
    if (slugSelected) {
      paramsData.category_slug = router.query?.cateSlug;
    }
    const data = await getProductsAxiosByLang(paramsData, locale);
    if (Array.isArray(data?.data?.results)) {
      setProductData({ results: data.data.results, total: data.data.total });
    }
  }

  const onChangeSort = (data) => {
    setProductParams({
      ...productParams,
      sort_value: data,
      page: 1,
    });
  };

  async function handleGetCategoryOtherLang(other_lang) {
    const categoryOtherLang = await getCategoriesOtherLang({
      slug: slugSelected,
      other_lang,
    });
    const newRoute = ROUTE_CATEGORY_SLUG(other_lang, categoryOtherLang);
    window.location.href = addTrailingSlash(newRoute);
  }

  const onChangePage = (page) => {
    // setProductParams({
    //   ...productParams,
    //   page,
    // });
    let href = `${ROUTE_CATEGORY(locale)}/`;
    if (router.query?.cateSlug) {
      href += `${router.query?.cateSlug}/`;
    }

    if (productParams.search) href += `?keyword=${productParams.search}`;
    if (page > 1 && productParams.search) href += `&page=${page}`;
    if (page > 1 && !productParams.search) href += `?page=${page}`;
    window.location.href = href;

    // refScroll?.current?.scrollIntoView({ behavior: "smooth" });
  };
  function getLabelSearch() {
    if (category?.name) {
      return (
        <Text as="h1" mr="3" fontSize={18} fontWeight="bold">
          {category.name}
        </Text>
      );
    }
    if (router.query?.keyword) {
      return (
        <Box mr="3" display="flex" alignItems="center">
          <Text as="h1" mr="1" fontSize={18} fontWeight="bold">
            {router.query?.keyword}
          </Text>
          <SmallCloseIcon
            cursor="pointer"
            onClick={() => {
              window.location.href = ROUTE_CATEGORY(locale);
            }}
          />
        </Box>
      );
    }
    return (
      <Text as="h1" fontSize={18} fontWeight="bold" mr="3">
        {`${t("allProducts")}: `}
      </Text>
    );
  }
  return (
    <div>
      <main>
        <Container>
          <Breadcrumb>
            <BreadcrumbItem
              itemprop="itemListElement"
              itemscope=""
              itemtype="http://schema.org/ListItem"
            >
              <a href={concatUrls(WEB_DOMAIN, "/")}>
                <BreadcrumbLink itemscope="" itemtype="http://schema.org/Thing" itemprop="item">
                  <span itemprop={t("homePage")}>{t("homePage")}</span>
                  <meta itemprop="url" content={concatUrls(WEB_DOMAIN, "/")}></meta>
                </BreadcrumbLink>
              </a>
              <meta itemprop="position" content="1"></meta>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <a href={addTrailingSlash(ROUTE_CATEGORY(locale))}>
                <BreadcrumbLink>{t("category")}</BreadcrumbLink>
              </a>
            </BreadcrumbItem>
            {category?.name && (
              <BreadcrumbItem
                itemprop="itemListElement"
                itemscope=""
                itemtype="http://schema.org/ListItem"
                isCurrentPage
              >
                <Link
                  href={`${
                    locale === "en"
                      ? concatUrls(WEB_DOMAIN, `/en/${router.asPath}`)
                      : concatUrls(WEB_DOMAIN, router.asPath)
                  }`}
                  passHref
                  shallow
                >
                  <BreadcrumbLink itemscope="" itemtype="http://schema.org/Thing" itemprop="item">
                    <span itemprop={category.name}>{category.name}</span>
                  </BreadcrumbLink>
                </Link>
                <meta itemprop="position" content="2"></meta>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
          <Box display={{ base: "block", lg: "none" }} marginBottom="16px">
            <SimpleGrid columns={2} spacing="16px" justifyContent="center">
              <WrapperPopover title="Bộ lọc" icon placement="bottom-start">
                <Accordion
                  allowMultiple
                  allowToggle
                  defaultIndex={[0, 1, 2]}
                  p="12px"
                  border="1px solid #BCCCFF"
                  borderRadius={4}
                >
                  <CategoryFilter categoryList={categoryList} />
                </Accordion>
              </WrapperPopover>
              <WrapperPopover title={t("arrange")} placement="bottom-end">
                <ListSort value={productParams.sort_value} onChange={onChangeSort} />
              </WrapperPopover>
            </SimpleGrid>
          </Box>
          <Grid
            mb={8}
            templateColumns={["repeat(none)", "repeat(none)", "repeat(8, 1fr)"]}
            gap={{ base: 8 }}
            gridGap="30px"
          >
            <GridItem colSpan={{ base: 0, md: 2 }} display={{ base: "none", md: "block" }}>
              <Accordion
                allowMultiple
                allowToggle
                defaultIndex={[0, 1, 2]}
                p="12px"
                border="1px solid #BCCCFF"
                borderRadius={4}
              >
                <CategoryFilter categoryList={categoryList} slugSelected={slugSelected} />
              </Accordion>
            </GridItem>
            <GridItem colSpan={{ base: 8, md: 6 }}>
              {category?.detail_description && (
                <DescriptionDetail
                  description={category?.detail_description}
                  isHiddenTitle
                  boxStyle={{
                    bg: "none",
                    border: "1px solid #BCCCFF",
                    borderRadius: "4px",
                    marginTop: "0px",
                    marginBottom: "24px",
                  }}
                />
              )}
              <Box
                display={["block", "block", "block", "flex", "flex"]}
                justifyContent="space-between"
                mb="20px"
              >
                <Box display="flex" alignItems="center">
                  {getLabelSearch()}
                  <Text fontSize={["14px", "14px", "14px", "16px"]} ref={refScroll}>
                    ({productData.total} {t("items")})
                  </Text>
                </Box>
                <HStack spacing="7px" display={{ base: "none", lg: "flex" }}>
                  <Text>{t("sortBy")}: </Text>
                  <ListSort value={productParams.sort_value} onChange={onChangeSort} />
                </HStack>
              </Box>
              <ProductList productList={productData.results} />
              <Pagination
                current={productParams.page}
                total={productData.total}
                onChangePage={onChangePage}
                size={PAGE_SIZE}
              />
            </GridItem>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
