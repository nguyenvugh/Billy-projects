import { Box, Flex, Icon, Spacer, Text } from "@chakra-ui/react";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { RiHeart3Fill } from "react-icons/ri";
import HoverBuyButton from "./HoverBuyButton";
import PopularLabel from "./PopularLabel";

const Product1 = ({ product }) => {
  const isPromotion = product?.promotion;

  return (
    <Flex
      p={3}
      bgColor="#ffffff"
      borderWidth="1px"
      borderColor="#A0AEC0"
      borderRadius="4px"
      position="relative"
      height="100%"
      overflow="hidden"
      _hover={{
        ".hover-buy-button-container": {
          height: "100%",
        },
      }}
    >
      <HoverBuyButton product={product} />
      <Box
        flexBasis="50%"
        position="relative"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        bgImage={product?.images?.[0]?.url}
      >
        <PopularLabel />
      </Box>
      <Box flexBasis="50%" pl={4} pr={4}>
        <Flex flexDirection="column" height="100%">
          <Text fontSize={{ base: 12, md: 14 }} noOfLines={1}>
            {product?.category?.name}
          </Text>
          <Text as="h3" fontSize={{ base: 14, md: 24 }} mt={4} mb={4} noOfLines={1}>
            {product?.name}
          </Text>
          <Text fontSize={{ base: 12, md: 12 }} noOfLines={3}>
            {product?.short_desc}
          </Text>
          <Spacer />
          <Box>
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
          </Box>
          <Flex alignItems="center" mt={2}>
            <Icon as={RiHeart3Fill} fill="#A0AEC0" mr={1} />
            <Text fontSize={12} color="#A0AEC0">
              {product?.num_like}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Product1;
