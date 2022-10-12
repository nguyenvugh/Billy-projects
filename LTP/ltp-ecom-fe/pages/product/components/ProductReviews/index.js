import { Box, Flex } from "@chakra-ui/react";
import Pageination from "@ltp/components/Pagination";
import TitlePanel from "@ltp/components/TitlePanel";
import useTranslation from "@ltp/hooks/useTranslation";
import { getProductReview } from "@ltp/services/product";
import { urlProduct } from "@ltp/services/urlAPI";
import { combineUrlParams } from "@ltp/utils/index";
import { useEffect, useState } from "react";
import RenderViewCustomer from "./ViewCustomer";
import RenderViewRating from "./ViewRating";

export default function ProductReivews({ productId, product }) {
  const { t, locale } = useTranslation();
  const onChangePage = (currentPage) => {
    setPage(currentPage);
  };
  const limit = 5;
  const [page, setPage] = useState(1);
  const { data, mutate } = getProductReview({
    id: productId,
    page,
    limit,
  });
  useEffect(() => {
    mutate(
      combineUrlParams(`${urlProduct}/${productId}/review`, {
        id: productId,
        page,
        limit,
      }),
    );
  }, [locale]);

  const review = data?.results || [];
  const total = data?.total || 0;
  if (!productId) return null;
  return (
    <Box>
      <TitlePanel title={t("productReview")} heading="h3" />
      <Flex flexWrap={{ base: "wrap", lg: "nowrap" }}>
        <Box
          w={{ base: "100%", lg: "303px" }}
          borderRight={{ base: "none", lg: "3px solid #BCCCFF" }}
        >
          <RenderViewRating product={product} total={total} />
        </Box>
        <Box paddingLeft={{ base: "0", lg: "100px" }} paddingTop={{ base: "16px", lg: "0" }}>
          {review.length > 0 &&
            review.map((item, index) => (
              <Box key={index} marginBottom={(index === review.length - 1 && "0") || "24px"}>
                <RenderViewCustomer item={item} />
              </Box>
            ))}
        </Box>
      </Flex>
      <Box marginTop={{ base: "32px", lg: "78px" }}>
        <Pageination current={page} total={total} onChangePage={onChangePage} size={limit} />
      </Box>
    </Box>
  );
}
ProductReivews.defaultProps = {
  productId: null,
};
