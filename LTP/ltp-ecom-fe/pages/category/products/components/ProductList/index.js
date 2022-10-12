import { Box, Flex, Image, SimpleGrid, Text } from "@chakra-ui/react";
import ItemProductList from "@ltp/components/ItemProduct";
import { useRouter } from "next/router";
import useTranslation from "@ltp/hooks/useTranslation";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { getValidSlug } from "@ltp/utils/index";

export default function ProductList({ productList }) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleProductDetail = (product) => {
    const slug = getValidSlug(product);
    const routePrefix = router.locale === "vi" ? "san-pham" : "en/product";
    window.location.href = addTrailingSlash(`/${routePrefix}/${slug}`);
  };
  if (Array.isArray(productList)) {
    if (productList.length > 0) {
      return (
        <SimpleGrid
          columns={[2, 2, 2, 3, 3, 3, 3]}
          spacingX={["16px", "16px", "20px", "20px", "30px"]}
          spacingY={["15px", "15px", "16px", "20px"]}
          justifyContent="center"
        >
          {productList.map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="flex-end"
              __css={{
                "@media (min-width: 1164px)": {
                  minWidth: "272px",
                  maxWidth: "272px",
                },
                "@media (max-width: 1160px)": {
                  minWidth: "260px",
                  maxWidth: "260px",
                },
                "@media (max-width: 1100px)": {
                  minWidth: "230px",
                  maxWidth: "230px",
                },
                "@media (max-width: 991px)": {
                  minWidth: "272px !important",
                  maxWidth: "272px !important",
                },
                "@media (max-width: 560px)": {
                  minWidth: "252px !important",
                  maxWidth: "252px !important",
                },
                "@media (max-width: 525px)": {
                  minWidth: "235px !important",
                  maxWidth: "235px !important",
                },
                "@media (max-width: 495px)": {
                  minWidth: "195px !important",
                  maxWidth: "195px !important",
                },
                "@media (max-width: 390px)": {
                  minWidth: "100% !important",
                  maxWidth: "100% !important",
                },
              }}
            >
              <ItemProductList
                item={item}
                index={index}
                handleProductDetail={() => handleProductDetail(item)}
                __cssImage={{
                  "@media (min-width: 1164px)": {
                    minWidth: "272px !important",
                    maxWidth: "272px !important",
                    minHeight: "272px !important",
                    maxHeight: "272px !important",
                  },
                  "@media (max-width: 1160px)": {
                    minWidth: "260px !important",
                    maxWidth: "260px !important",
                    minHeight: "260px !important",
                    maxHeight: "260px !important",
                  },
                  "@media (max-width: 1100px)": {
                    minWidth: "230px !important",
                    maxWidth: "230px !important",
                    minHeight: "230px !important",
                    maxHeight: "230px !important",
                  },
                  "@media (max-width: 991px)": {
                    minWidth: "272px !important",
                    maxWidth: "272px !important",
                    minHeight: "272px !important",
                    maxHeight: "272px !important",
                  },
                  "@media (max-width: 560px)": {
                    minWidth: "252px !important",
                    maxWidth: "252px !important",
                    minHeight: "252px !important",
                    maxHeight: "252px !important",
                  },
                  "@media (max-width: 525px)": {
                    minWidth: "235px !important",
                    maxWidth: "235px !important",
                    minHeight: "235px !important",
                    maxHeight: "235px !important",
                  },
                  "@media (max-width: 495px)": {
                    minWidth: "195px !important",
                    maxWidth: "195px !important",
                    minHeight: "195px !important",
                    maxHeight: "195px !important",
                  },
                  "@media (max-width: 390px)": {
                    minWidth: "100% !important",
                    maxWidth: "100% !important",
                    minHeight: "175px !important",
                    maxHeight: "175px !important",
                  },
                  "@media (max-width: 375px)": {
                    minWidth: "100% !important",
                    maxWidth: "100% !important",
                    minHeight: "170px !important",
                    maxHeight: "170px !important",
                  },
                  "@media (max-width: 320px)": {
                    minWidth: "100% !important",
                    maxWidth: "100% !important",
                    minHeight: "150px !important",
                    maxHeight: "150px !important",
                  },
                }}
              />
            </Box>
          ))}
        </SimpleGrid>
      );
    }
    return (
      <Flex
        flexWrap="wrap"
        color="#FEBD17"
        bg="#FFFAEE"
        alignItems="center"
        padding="15px 35px"
        marginTop="35px"
        border="1px solid #FEBD17"
      >
        <Image src="/imgs/mock/products/info.svg" />
        <Text pl="20px">{t("sorryNotFoundProducts")}</Text>
      </Flex>
    );
  }
  return null;
}
