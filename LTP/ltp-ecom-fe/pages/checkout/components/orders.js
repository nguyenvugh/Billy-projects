import { Box, Flex, Image, Link as LinkUI, Spacer, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { convertToDate } from "@ltp/utils/date";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { formatPriceReturnZero } from "@ltp/utils/validate";
import { useCheckoutContext } from "components/context/checkout";
import { isEmpty } from "lodash";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useCart } from "react-use-cart";

export default function Checkout({ orders }) {
  const { t } = useTranslation();
  const { items: datacart } = useCart();
  const { checkoutContext } = useCheckoutContext();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const shippingPrice = Object.values(orders).find(
    (item) => item.totalShippingPrice,
  )?.totalShippingPrice;
  const tolalTemporary = datacart.reduce(
    (value, item) => (pricingProduct(item) || 0) * item.quantity + value,
    0,
  );

  const priceShipping = 0;
  const calculatorPrice =
    tolalTemporary + priceShipping - (checkoutContext?.discount?.reduced || 0);
  const totalPrice = shippingPrice
    ? formatPrice(shippingPrice + calculatorPrice)
    : formatPrice(calculatorPrice);
  useEffect(() => {
    const now = new Date();
    let timerFlashSale;
    let timerPromotion;
    const products = datacart;
    if (Array.isArray(products)) {
      let product = products.find((item) => item?.flash_sale?.id);
      if (product) {
        const endFlashSale = convertToDate(product?.flash_sale?.end_date);
        const isFlashSale = product?.flash_sale?.id && endFlashSale > now && product?.quantity > 0;
        if (isFlashSale) {
          timerFlashSale = setTimeout(() => {
            forceUpdate();
          }, endFlashSale - now);
        }
      }
      product = products.find((item) => item?.promotion?.id);
      if (product) {
        const endPromotion = convertToDate(
          `${product?.promotion?.end_date} ${product?.promotion?.end_time}`,
        );
        const isPromotion = product?.promotion?.id && endPromotion > now;
        if (isPromotion) {
          timerPromotion = setTimeout(() => {
            forceUpdate();
          }, endPromotion - now);
        }
      }
    }
    return () => {
      clearTimeout(timerFlashSale);
      clearTimeout(timerPromotion);
    };
  }, [datacart]);

  const renderProductHasWareHouse = () =>
    orders.map((warehouse, idx) => (
      <div key={idx}>
        {!!warehouse?.productsInWarehouse?.length &&
          warehouse?.productsInWarehouse?.map((product) => {
            const isCoupon = isEmpty(product.coupon);
            return (
              <Flex mb={4} key={idx}>
                <Box mr={2} w="20%" boxSize="64px" flexShrink={0}>
                  <Image
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    src={product?.images?.[0]?.url}
                  />
                </Box>
                <Box pos="relative" w="80%" mb={8}>
                  <Text fontSize={16} fontWeight="400">
                    {product.name}
                  </Text>
                  <Text fontSize={14} fontWeight="400">
                    {t("price")}:{" "}
                    {!isCoupon
                      ? formatPrice(product.coupon.discount.discountProduct)
                      : formatPrice(pricingProduct(product))}
                  </Text>
                  <Text fontSize={14} fontWeight="400" paddingRight="40px">
                    {!product?.isHiddenWarehouse &&
                      warehouse.warehouseName &&
                      `${t("warehouse")}: ${warehouse.warehouseName}`}
                  </Text>
                  <Text fontSize={14} pos="absolute" bottom={0} right={2} color="#718096">
                    x{product.quantity}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        {!!warehouse?.productsInWarehouse?.length && shippingPrice && (
          <>
            <Box h="1px" bg="#BCCCFF" mt={4} mb={4} />
            <Text fontSize={14} fontWeight="400" marginBottom={25} textAlign="right">
              {t("shipFee")}:{formatPrice(warehouse.warehouseShippingPrice)}
            </Text>
          </>
        )}
      </div>
    ));

  return (
    <Box border="1px solid #BCCCFF" borderRadius={4} p={8}>
      <Flex alignItems="center">
        <Text color="#2154FF" fontSize={24} fontWeight="bold">
          {t("order")}
        </Text>
        <Spacer />
        <Link passHref shallow href="/shopping-cart">
          <LinkUI color="#2154FF" fontSize={18}>
            {t("editShort")}
          </LinkUI>
        </Link>
      </Flex>
      <Box h="1px" bg="#BCCCFF" mt={2} mb={4} />
      <Box pos="relative">
        {orders.length
          ? renderProductHasWareHouse()
          : datacart.map((item, index) => {
              const isCoupon = isEmpty(item.coupon);
              return (
                <Flex mb={4} key={index}>
                  <Box mr={2} w="20%" boxSize="64px" flexShrink={0}>
                    <Image
                      objectFit="cover"
                      width="100%"
                      height="100%"
                      src={item?.images?.[0]?.url}
                      alt={item?.name}
                    />
                  </Box>
                  <Box pos="relative" w="80%" mb={8}>
                    <Text fontSize={16}>{item.name}</Text>
                    <Text fontSize={14}>
                      {!isCoupon
                        ? formatPrice(item.coupon.discount.discountProduct)
                        : formatPrice(pricingProduct(item))}
                    </Text>
                    <Text fontSize={14} pos="absolute" bottom={0} right={2} color="#718096">
                      x{item.quantity}
                    </Text>
                  </Box>
                </Flex>
              );
            })}
      </Box>
      <Box h="1px" bg="#BCCCFF" mt={4} mb={4} />
      <Flex>
        <Text color="#718096" fontSize={14}>
          {t("provisionalPrice")}
        </Text>
        <Spacer />
        <Text color="#071133" fontSize={18}>
          {formatPrice(tolalTemporary)}
        </Text>
      </Flex>
      <Flex>
        <Text color="#718096" fontSize={14}>
          {t("shipFee")}
        </Text>
        <Spacer />
        <Text color="#071133" fontSize={18}>
          {shippingPrice
            ? formatPrice(
                Object.values(orders).find((item) => item.totalShippingPrice)?.totalShippingPrice,
              )
            : "Liên hệ sau"}
        </Text>
      </Flex>
      <Flex>
        <Text color="#071133" fontSize={14} fontWeight={500}>
          {t("discountCode")} :{checkoutContext?.discount?.code}
        </Text>
        <Spacer />
        <Text color="#071133" fontSize={18}>
          {formatPriceReturnZero(checkoutContext?.discount?.reduced)}đ
        </Text>
      </Flex>
      <Box h="1px" bg="#BCCCFF" mt={4} mb={4} />
      <Flex>
        <Text color="#2154FF" fontSize={20}>
          {t("totalPrice")}
        </Text>
        <Spacer />
        <Text color="#2154FF" fontSize={20} fontWeight="bold">
          {totalPrice}
        </Text>
      </Flex>
    </Box>
  );
}
