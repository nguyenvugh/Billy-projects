import { Box, BreadcrumbItem, BreadcrumbLink, Grid, GridItem, Text } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { getProductDetailOtherSlug } from "@ltp/services/product/index";
import { ROUTE_PRODUCT, ROUTE_PRODUCT_DETAIL_SLUG } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import Link from "next/link";
import { useRouter } from "next/router";
import Custom404 from "pages/404";
import { useEffect, useState } from "react";
import { MetadataTags } from "SEOs/meta-tag/index";
import Combo from "../../pages/product/components/Combo";
import ComboDetail from "../../pages/product/components/ComboDetail";
import ComboPage from "../../pages/product/components/ComboPage";
import DescriptionDetail from "../../pages/product/components/DescriptionDetail";
import ImageCarousel from "../../pages/product/components/ImageCarousel";
import InfoProductDetail from "../../pages/product/components/ProductDetail";
import ProductRelate from "../../pages/product/components/ProductRelate";
import ProductReivews from "../../pages/product/components/ProductReviews";
import { useAppUserContext } from "../context/auth";

function ProductDetail({ productDetailProps: data, slug, comboId, breadcrumb, statusCode }) {
  const router = useRouter();
  const { setOnLanguageChange } = useAppUserContext();
  const { t, locale } = useTranslation();
  const [product, setProduct] = useState(data);

  useEffect(() => {
    setProduct(data);
  }, [JSON.stringify(data)]);

  async function handleOtherLangProduct(other_lang) {
    const newSlug = await getProductDetailOtherSlug({
      slug,
      other_lang,
    });
    const newRoute = ROUTE_PRODUCT_DETAIL_SLUG(other_lang, newSlug);
    window.location.href = addTrailingSlash(newRoute);
  }

  useEffect(() => {
    setOnLanguageChange(() => handleOtherLangProduct);
  }, []);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  if (statusCode === 404) {
    return <Custom404 />;
  }
  if (router.query.combo === "all") {
    return <ComboPage product={data} />;
  }
  if (router.query.combo && router.query.combo !== "") {
    return <ComboDetail product={data} />;
  }

  function DefaultBreadCrumb() {
    return (
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
        <BreadcrumbItem isCurrentPage>
          <Text>{data?.name}</Text>
        </BreadcrumbItem>
      </Breadcrumb>
    );
  }
  return (
    <div>
      <MetadataTags
        title={product?.title_seo}
        desContent={product?.description_seo}
        notIndex={locale === "en"}
      />
      <main>
        <Container>
          {breadcrumb || <DefaultBreadCrumb />}
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            gap={5}
            gridGap={{
              base: 0,
              md: 5,
              xl: "50px",
              "2xl": "112px",
            }}
            position="relative"
          >
            <GridItem colSpan={[5, 5, 5, 5, 3]} marginBottom={{ base: "32px", lg: "0px" }}>
              <ImageCarousel product={data} />
            </GridItem>
            <GridItem colSpan={[5, 5, 5, 5, 2]}>
              <InfoProductDetail product={product} />
            </GridItem>
          </Grid>
          <Box>
            <DescriptionDetail description={data?.description} />
          </Box>
          <Box>{!comboId && <Combo categoryId={data?.categoryId} product={data} />}</Box>
          <Box>
            {!!data?.categoryId && <ProductRelate categoryId={data?.categoryId} product={data} />}
          </Box>
          <Box>{!!data?.id && <ProductReivews productId={data?.id} product={data} />}</Box>
        </Container>
      </main>
    </div>
  );
}

export { ProductDetail };
