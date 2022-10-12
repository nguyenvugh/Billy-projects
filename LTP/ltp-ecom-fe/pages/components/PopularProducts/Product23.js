import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { RiHeart3Fill } from "react-icons/ri";
import HoverBuyButton from "./HoverBuyButton";
import PopularLabel from "./PopularLabel";

const Product23 = ({ product }) => {
  const isPromotion = product?.promotion;
  return (
    <Flex
      bgColor="#ffffff"
      flexDirection="column"
      height="100%"
      borderWidth="1px"
      borderColor="#A0AEC0"
      borderRadius={4}
      p={3}
      position="relative"
      overflow="hidden"
      _hover={{
        ".hover-buy-button-container": {
          height: "100%",
        },
      }}
    >
      <HoverBuyButton product={product} />
      <Box
        flexGrow="1"
        bgSize="cover"
        bgRepeat="no-repeat"
        bgPosition="center"
        position="relative"
        bgImage={product?.images?.[0]?.url}
      >
        <PopularLabel />
      </Box>
      <Box mt={{ base: 2, md: 4 }}>
        <Text as="h3" fontSize={{ base: 14, md: 18 }} color="#071133" noOfLines={1}>
          {product?.name}
        </Text>
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
      <Flex alignItems="center" mt={2}>
        <Icon as={RiHeart3Fill} fill="#A0AEC0" mr={1} />
        <Text fontSize={12} color="#A0AEC0">
          {product?.num_like}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Product23;
