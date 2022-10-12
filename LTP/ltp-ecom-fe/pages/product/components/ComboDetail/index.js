import { Box, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { getComboById } from "@ltp/services/product";
import { urlCombo } from "@ltp/services/urlAPI";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import DescriptionDetail from "../DescriptionDetail";
import ProductReivews from "../ProductReviews";
import ComboCarousel from "./ComboCarousel";
import ComboInfo from "./ComboInfo";
import ProductRelate from "./ProductRelate";

export default function ComboDetail({ product }) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const getCombo = () => getComboById(router.query.combo);
  const { data, error, mutate } = useSWR(`${urlCombo}/${router.query.combo}`, getCombo);
  const combo = data?.data || [];

  useEffect(() => {
    mutate && mutate(`${urlCombo}/${router.query.combo}`);
  }, [locale]);

  if (error) {
    router.replace(`/product/${product.slug}`);
  } else if (combo?.id && Array.isArray(combo?.details)) {
    if (combo.details.every((item) => item?.product?.id !== product?.id)) {
      router.replace(`/product/${product.slug}`);
    }
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{combo?.name}</title>
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
              <Text>{combo?.name}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box
            __css={{
              display: "flex",
              flexWrap: "wrap",
              margin: -12,
              position: "relative",
              "&>div": {
                padding: 12,
              },
            }}
          >
            <Box
              flexGrow={0}
              flexBasis={{ base: "100%", md: "60%" }}
              maxWidth={{ base: "100%", md: "60%" }}
            >
              <ComboCarousel images={combo?.images} />
            </Box>
            <Box
              flexGrow={0}
              flexBasis={{ base: "100%", md: "40%" }}
              maxWidth={{ base: "100%", md: "40%" }}
            >
              <ComboInfo combo={combo} />
            </Box>
          </Box>
          <DescriptionDetail description={combo?.description} />
          <Box mb={12}>
            <ProductRelate combo={combo} />
            <ProductReivews productId={product.id} product={combo} />
          </Box>
        </Container>
      </main>
    </div>
  );
}
