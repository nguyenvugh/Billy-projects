import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { RiHeart3Fill } from "react-icons/ri";
import HoverBuyButton from "./HoverBuyButton";
import PopularLabel from "./PopularLabel";

const Product4 = ({ product }) => {
  const isPromotion = product?.promotion;
  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgImage={product?.images?.[0]?.url}
      overflow="hidden"
      borderRadius="4px"
      _hover={{
        ".hover-buy-button-container": {
          height: "100%",
        },
      }}
    >
      <PopularLabel top="24px" left="12px" />
      <HoverBuyButton product={product} />
      <Box
        color="#ffffff"
        bg="rgba(7, 17, 51, 0.64)"
        p={4}
        position="absolute"
        bottom={0}
        left={0}
        right={0}
      >
        <Text fontSize={{ base: 12, md: 14 }} noOfLines={1}>
          {product?.category?.name}
        </Text>
        <Text as="h3" fontSize={{ base: 14, md: 32 }} mt={2} mb={2} noOfLines={2}>
          {product?.name}
        </Text>
        <Text fontSize={12} noOfLines={3}>
          {product?.short_desc}
        </Text>
        <Box mt={3}>
          <Flex alignItems="center">
            <Text
              fontSize={{ base: 14, md: 16 }}
              fontWeight={500}
              color="#FF0000"
              as="span"
              mr={{ base: 1, md: 4 }}
            >
              {isPromotion ? formatPrice(pricingProduct(product)) : formatPrice(product?.price)}
            </Text>
            {isPromotion && (
              <Text fontWeight="500" color="#A0AEC0" textDecoration="line-through">
                {formatPrice(product?.price)}
              </Text>
            )}
          </Flex>
          {/* <Text
            fontSize={{ base: 12, md: 14 }}
            color="#A0AEC0"
            textDecoration="line-through"
            as="span"
            mr={{ base: 1, md: 4 }}
          >
            { }
          </Text>
          <Text
            fontSize={{ base: 12, md: 14 }}
            color="#FF0000"
            as="span"
          >
            { }
          </Text> */}
        </Box>
        <Flex alignItems="center" mt={1}>
          <Icon as={RiHeart3Fill} fill="#A0AEC0" mr={1} />
          <Text fontSize={12} color="#A0AEC0">
            {product?.num_like}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Product4;
