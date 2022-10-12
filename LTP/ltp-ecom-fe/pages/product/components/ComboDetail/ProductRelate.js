import { Box } from "@chakra-ui/react";
import ItemProductList from "@ltp/components/ItemProduct";
import TitlePanel from "@ltp/components/TitlePanel";
import { SORT_ASC } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { getProductsAxios } from "@ltp/services/product";
import { urlProduct } from "@ltp/services/urlAPI";
import { ROUTE_CATEGORY_SLUG, ROUTE_PRODUCT_SLUG } from "@ltp/utils/constant";
import { combineUrlParams, getValidSlug } from "@ltp/utils/index";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

function ProductRelate({ combo }) {
  const router = useRouter();
  const { t, locale } = useTranslation();
  let categoryList = [];
  if (Array.isArray(combo?.details)) {
    categoryList = combo.details.map((item) => item?.product?.categoryId);
  }
  const params = {
    page: 1,
    limit: 4,
    sort_value: SORT_ASC,
    category: categoryList,
  };
  const getProducts = () => getProductsAxios(params);
  const { data, mutate } = useSWR(combineUrlParams(urlProduct, params), getProducts);
  let productList = [];
  if (Array.isArray(data?.data?.results)) {
    productList = data.data.results;
  }

  useEffect(() => {
    mutate(combineUrlParams(urlProduct, params));
  }, [locale]);

  const handleProductDetail = (product) => {
    window.location.href = addTrailingSlash(ROUTE_PRODUCT_SLUG(locale, getValidSlug(product)));
  };

  if (combo?.id && productList.length > 0) {
    return (
      <div>
        <TitlePanel
          title={t("relatedProducts")}
          viewAll={t("viewAll")}
          href={addTrailingSlash(ROUTE_CATEGORY_SLUG(locale, categoryList[0]))}
          heading="h3"
        />
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
          {productList.map((item, index) => (
            <Box
              key={index}
              flexGrow={0}
              flexBasis={{ base: "50%", md: "25%" }}
              maxWidth={{ base: "50%", md: "25%" }}
            >
              <ItemProductList
                item={item}
                index={index}
                handleProductDetail={handleProductDetail}
              />
            </Box>
          ))}
        </Box>
      </div>
    );
  }
  return null;
}

export default ProductRelate;
