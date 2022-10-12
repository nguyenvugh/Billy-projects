import { Box, Stack, Text } from "@chakra-ui/react";
import { formatPrice } from "@ltp/utils/validate";
import { useRouter } from "next/router";
import useTranslation from "@ltp/hooks/useTranslation";

const CharityProduct = (item) => {
  const router = useRouter();
  const price = item.product_price;
  const { thumbnail } = item.product;
  const { quantity } = item;
  const sold = item.charity_sold_amount;

  const handleClickItem = () => {
    router.push({
      pathname: "/[categoryId]/[productId]",
      query: { productId: item.product.id, categoryId: item.product.category_id || 0 },
    });
  };

  return (
    <Stack
      cursor="pointer"
      onClick={handleClickItem}
      position="relative"
      p={4}
      width={{ base: "50%", md: "25%" }}
    >
      <Box
        bgImg={thumbnail}
        bgPosition="center"
        bgSize="cover"
        bgRepeat="no-repeat"
        overflow="hidden"
        w="100%"
        pb="100%"
        m="16px"
      />
      <Text color="#FF0000" textAlign="center" fontWeight={600} fontSize={{ base: 16, md: 24 }}>
        {formatPrice(price)}đ
      </Text>
      <ProgressBar sold={sold} quantity={quantity} isShowIcon={false} />
    </Stack>
  );
};

export default CharityProduct;

const ProgressBar = ({ quantity, sold, isShowIcon }) => {
  const { t } = useTranslation();
  const percent = (sold / quantity) * 100;
  return (
    <Box
      bg="#FFB3B3"
      borderRadius={{ base: "24px", md: "32px" }}
      h={{ base: "24px", md: "32px" }}
      w="100%"
      position="relative"
      overflow="hidden"
    >
      {isShowIcon && (
        <Box
          bgImg="/imgs/fire.svg"
          w={{ base: "25px", md: "40px" }}
          h={{ base: "30px", md: "48px" }}
          position="absolute"
          display="inline-block!important"
          bottom={0}
          left={0}
          zIndex={1000}
        />
      )}
      <Box
        w={`${percent}%`}
        borderRadius={{ base: "24px", md: "32px" }}
        h="100%"
        bg="linear-gradient(#FD2F31, #FD25C1)"
        position="absolute"
        top={0}
        left={0}
      />
      <Box
        w="100%"
        position="absolute"
        top={0}
        left={0}
        h="100%"
        align="center"
        lineHeight={{ base: "24px", md: "32px" }}
      >
        <Text as="span" color="#ffffff" fontWeight={600} fontSize={{ base: 14, md: 16 }}>
          {t("sold")} {parseInt(sold)}
        </Text>
      </Box>
    </Box>
  );
};
