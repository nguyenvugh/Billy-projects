import { BreadcrumbItem, BreadcrumbLink, Flex, Text, HStack, Box, Image } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import Pagination from "@ltp/components/Pagination";
import ComboItem from "@ltp/components/ComboItem";
import { SORT_ASC } from "@ltp/constants/data";
import { urlCombo } from "@ltp/services/urlAPI";
import { getComboList } from "@ltp/services/product";
import { combineUrlParams } from "@ltp/utils/index";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import useSWR from "swr";
import ListSort from "pages/category/products/components/ListSort";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";

const PAGE_SIZE = 12;

export default function ComboPage({ product }) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const [sort_value, setSortValue] = useState(SORT_ASC);
  const [page, setPage] = useState(1);

  const onChangeSort = (data) => {
    setSortValue(data);
    setPage(1);
  };

  const params = {
    page: 1,
    limit: PAGE_SIZE,
    product: product?.id,
    sort_field: "total_price",
    sort_value,
  };
  const getCombo = () => getComboList(params);
  const { data, mutate } = useSWR(combineUrlParams(`${urlCombo}/${product?.id}`, params), getCombo);
  const comboList = data?.data?.results;
  const total = data?.data?.total || 0;

  useEffect(() => {
    mutate(combineUrlParams(`${urlCombo}/${product?.id}`, params));
  }, [locale]);

  const handleDetail = (combo) => {
    router.push({ query: { combo: combo?.id } });
  };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Head>
        <title>Combo</title>
        <meta name="description" content="LTP-ecommerce" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Container>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link passHref shallow href="/">
                <BreadcrumbLink>{t("homePage")}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link passHref shallow href={ROUTE_PRODUCT(locale)}>
                <BreadcrumbLink>{t("product")}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link passHref shallow href={`/product/${product.slug}`}>
                <BreadcrumbLink>{product?.name}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text>Combo</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex mb={8}>
            <Text color="#071133" fontSize={16} flexGrow={1}>
              {`${t("allComboBelongsTo")} "${product?.name}"`}
            </Text>
            <HStack spacing="7px" display={{ base: "none", lg: "flex" }}>
              <Text>{t("sortBy")}: </Text>
              <ListSort value={sort_value} onChange={onChangeSort} />
            </HStack>
          </Flex>
          {page === 1 && comboList?.length === 0 && (
            <HStack
              flexWrap="wrap"
              color="#FEBD17"
              bgColor="#FFFAEE"
              border="1px solid #FEBD17"
              px={4}
              py={2}
              spacing={4}
            >
              <Image
                src="/imgs/mock/products/info.svg"
                alt="Info Of Product"
                title="Info Of Product"
              />
              <Text>{t("sorryCombo")}</Text>
            </HStack>
          )}
          {comboList?.length > 0 && (
            <Box
              __css={{
                display: "flex",
                flexWrap: "wrap",
                margin: -2,
                "&>div": {
                  padding: 2,
                },
              }}
            >
              {Array.isArray(comboList) &&
                comboList.map((item) => (
                  <Box
                    key={item?.id}
                    flexGrow={0}
                    flexBasis={{ base: "50%", md: "25%" }}
                    maxWidth={{ base: "50%", md: "25%" }}
                  >
                    <ComboItem
                      item={item}
                      handleDetail={() => {
                        handleDetail(item);
                      }}
                    />
                  </Box>
                ))}
            </Box>
          )}
          <Pagination current={page} total={total} onChangePage={setPage} size={PAGE_SIZE} />
        </Container>
      </main>
    </div>
  );
}
