import { Box, Flex } from "@chakra-ui/react";
import ItemProductList from "@ltp/components/ItemProduct";
import TitlePanel from "@ltp/components/TitlePanel";
import useTranslation from "@ltp/hooks/useTranslation";
import { getProductRelate } from "@ltp/services/product";
import { ROUTE_CATEGORY_SLUG, ROUTE_PRODUCT_SLUG } from "@ltp/utils/constant";
import { getValidSlug } from "@ltp/utils/index";
import { addTrailingSlash } from "@ltp/utils/validate-url";

function ProductRelate({ categoryId, product }) {
  const { t, locale } = useTranslation();
  const {
    data: { results: items },
    error,
  } = getProductRelate({
    category: categoryId,
    lang: locale,
  });
  const handleProductDetail = (product) => {
    const slug = getValidSlug(product);
    window.location.href = addTrailingSlash(ROUTE_PRODUCT_SLUG(locale, slug));
  };

  return (
    <Box>
      <TitlePanel
        title={t("relatedProducts")}
        viewAll={t("viewAll")}
        product={product}
        href={addTrailingSlash(ROUTE_CATEGORY_SLUG(locale, getValidSlug(product.category)))}
        heading="h3"
      />

      <Flex flexWrap={{ base: "wrap", md: "nowrap" }}>
        {!error &&
          (items || []).map((item, index) => (
            <Box
              key={index}
              marginRight="16px"
              marginBottom="16px"
              __css={{
                "@media (max-width: 1163px) and (min-width: 940px)": {
                  display: [3].includes(index) && "none",
                  marginRight: [3].includes(index) ? 0 : "16px",
                },
                "@media (max-width: 939px)": {
                  display: (index === 2 || index === 3) && "none",
                  marginRight: [1, 2, 3].includes(index) ? 0 : "16px",
                },
              }}
            >
              <ItemProductList
                item={item}
                index={index}
                key={index}
                handleProductDetail={handleProductDetail}
                minWidth={["163px", "250px", "272px", "252px", "272px"]}
                maxWidth={["163px", "250px", "272px", "252px", "272px"]}
                minHeight={["163px", "250px", "272px", "252px", "272px"]}
                maxHeight={["163px", "250px", "272px", "252px", "272px"]}
                heading="h4"
              />
            </Box>
          ))}
      </Flex>
    </Box>
  );
}

ProductRelate.defaultProps = {
  results: [],
};
export default ProductRelate;
