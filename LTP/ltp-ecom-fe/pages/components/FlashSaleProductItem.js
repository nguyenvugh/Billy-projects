import { Box, Stack, Text } from "@chakra-ui/react";
import { getValidSlug } from "@ltp/utils/index";
import { ROUTE_PRODUCT_SLUG } from "@ltp/utils/constant";
import { formatPrice } from "@ltp/utils/validate";
import { useRouter } from "next/router";

const ProgressBar = ({ percent, isShowIcon, progressName }) => (
  <Box
    bg="#FFB3B3"
    borderRadius={{ base: "24px", md: "32px" }}
    h={{ base: "24px", md: "32px" }}
    w="100%"
    position="relative"
    // overflow='hidden'
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
      bg="#FFB3B3"
      borderRadius={{ base: "24px", md: "32px" }}
      h={{ base: "24px", md: "32px" }}
      w="100%"
      position="relative"
      overflow="hidden"
    >
      <Box
        w={`${percent}%`}
        borderRadius={{ base: "24px", md: "32px" }}
        h={{ base: "24px", md: "32px" }}
        bg="linear-gradient(342.78deg, #FD6525 -86.35%, #FD2F31 191.15%)"
        position="absolute"
        top={0}
        left={0}
      />
      <Box
        w="100%"
        position="absolute"
        top={0}
        left={0}
        h={{ base: "24px", md: "32px" }}
        align="center"
        lineHeight={{ base: "24px", md: "32px" }}
      >
        <Text as="span" color="#ffffff" fontWeight={600} fontSize={{ base: 14, md: 16 }}>
          {progressName}
        </Text>
      </Box>
    </Box>
  </Box>
);

export default function FlashSaleProductList({ flashSale, status }) {
  const router = useRouter();
  const sale = Number(flashSale.percentage);
  const thumbnail = flashSale.product.images[0].url;
  const price = formatPrice((flashSale?.product?.price * (100 - sale)) / 100);
  const type = flashSale.status;
  const sold = type == 1 ? 10 : type == 2 ? 25 : type == 3 ? 80 : 95;
  const getProgressName = status.filter((i) => i.id == type)[0].label;
  const handleClickItem = () => {
    window.location.href = ROUTE_PRODUCT_SLUG(router.locale, getValidSlug(flashSale?.product));
  };

  return (
    <Stack
      position="relative"
      align="center"
      p={4}
      onClick={handleClickItem}
      cursor="pointer"
      maxWidth={{ base: "50%", md: "25%" }}
      flexBasis={{ base: "50%", md: "25%" }}
    >
      <Text
        as="span"
        position="absolute"
        top={0}
        left={0}
        bg="#FF0000"
        color="#ffffff"
        px={{ base: 4, md: 6 }}
        py={{ base: 1, md: 2 }}
        borderBottomRightRadius="50px"
        fontSize={16}
        fontWeight={600}
      >
        {sale}%
      </Text>
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
        {price}đ
      </Text>
      <ProgressBar
        progressName={getProgressName}
        percent={sold * 1}
        isShowIcon={type == 3 || type == 4}
      />
    </Stack>
  );
}
