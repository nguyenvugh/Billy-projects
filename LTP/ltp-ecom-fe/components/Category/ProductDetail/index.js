import { BreadcrumbItem, BreadcrumbLink, Link, Text } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import { ProductDetail } from "@ltp/components/product/Product";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_TOP_CATEGORY } from "@ltp/utils/constant";
import { useRouter } from "next/router";
import Custom404 from "pages/404";
import React, { useEffect } from "react";
import { getCategoriesOtherLang, getProductOtherLang } from "../services";

function index({ productDetailProps, comboId, slug, statusCode }) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  if (statusCode === 404) return <Custom404 />;

  useEffect(() => {
    handleLocalChange();
  }, [locale]);

  async function handleLocalChange() {
    const { topSlug, childSlug, productSlug } = getSlugs();

    const topSlugOtherLang = await getCategoriesOtherLang(getOtherSlugParams(topSlug));
    const subSlugOtherLang = await getCategoriesOtherLang(getOtherSlugParams(childSlug));
    const productSlugOtherLang = await getProductOtherLang(getOtherSlugParams(productSlug));

    const newRoute = `${ROUTE_TOP_CATEGORY(
      locale,
    )}/${topSlugOtherLang}/${subSlugOtherLang}/${productSlugOtherLang}`;

    router.push({ pathname: newRoute }, newRoute, {
      locale,
    });
  }

  function getSlugs() {
    const topSlug = router.query?.topCateSlug;
    const childSlug = router.query?.subCateSlug;
    const productSlug = router.query?.slug;

    return { topSlug, childSlug, productSlug };
  }

  function getOtherSlugParams(newSlug) {
    return {
      slug: newSlug,
      other_lang: locale,
    };
  }

  const { topSlug, childSlug, productSlug } = getSlugs();
  return (
    <ProductDetail
      productDetailProps={productDetailProps}
      comboId={comboId}
      slug={slug}
      isPreventLocalChange
      breadcrumb={
        <Breadcrumb>
          <BreadcrumbItem>
            <Link passHref shallow href="/">
              <BreadcrumbLink>{t("homePage")}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Link passHref shallow href={ROUTE_TOP_CATEGORY(locale)}>
              <BreadcrumbLink>{t("category")}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Link passHref shallow href={`${ROUTE_TOP_CATEGORY(locale)}/${topSlug}`}>
              <BreadcrumbLink>{topSlug}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Link passHref shallow href={`${ROUTE_TOP_CATEGORY(locale)}/${topSlug}/${childSlug}`}>
              <BreadcrumbLink>{childSlug}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <Text>{productSlug}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
      }
    />
  );
}

export default index;
