/* eslint-disable no-param-reassign */
import {
  Box,
  Image,
  Link as LinkUI,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { useRouter } from "next/router";
import PropType from "prop-types";
import { useCart } from "react-use-cart";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { convertToDate } from "@ltp/utils/date";
import useTranslation from "@ltp/hooks/useTranslation";

export default function Cart({ children }) {
  const { t } = useTranslation();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const router = useRouter();
  const { isEmpty, totalUniqueItems, items: products, removeItem } = useCart();

  useEffect(() => {
    const now = new Date();
    let timerFlashSale;
    let timerPromotion;
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
  }, [products]);

  const handleRemoveItem = (id) => {
    removeItem(id);
    if (products.length === 1 && router?.pathname === "/checkout") {
      router.push("/shopping-cart");
    }
  };
  const tolalPrice = products.reduce(
    (value, item) => (pricingProduct(item) || 0) * item.quantity + value,
    0,
  );
  return (
    <Popover isLazy trigger="hover" placement="bottom-end">
      <PopoverTrigger>
        <Box position="relative" cursor="pointer">
          <Link passHref shallow href="/shopping-cart">
            <LinkUI>
              <Text
                position="absolute"
                top="-3px"
                right="2px"
                bg="#FF0000"
                fontSize="10px"
                padding="2px 4px"
                borderRadius="100px"
                height="16px"
                lineHeight={1.2}
                marginRight="-9px"
              >
                {isEmpty ? "0" : totalUniqueItems}
              </Text>
              {children}
            </LinkUI>
          </Link>
        </Box>
      </PopoverTrigger>
      <PopoverContent width="initial !important">
        <PopoverBody padding="20px 16px">
          <Box bg="transparent" fontSize="xl" color="#ffffff" cursor="pointer">
            {products?.length ? (
              products.map((item, index) => (
                <Box
                  key={item.id}
                  border={index === 0 ? "0px" : "1px"}
                  borderTopColor="#BCCCFF"
                  margin="7px 0"
                >
                  <Box marginTop={{ base: "1", sm: "1" }} display="flex" w="100%">
                    <Box boxSize="64px">
                      <Image
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        src={item?.images?.[0]?.url}
                        alt={item?.name}
                        onError={(i) => (i.target.style.display = "none")}
                      />
                    </Box>
                    <Box justifyContent="center" fontSize="12px" w="155px" padding="0 16px">
                      <Text as="p" color="#071133" textAlign="left">
                        {item.name}
                      </Text>
                      <Text as="p" color="#071133" textAlign="left">
                        {formatPrice(pricingProduct(item))}
                      </Text>
                      <Text as="p" color="#788995" textAlign="left">
                        x{item.quantity}
                      </Text>
                    </Box>
                    <Box alignItems="center" display="flex">
                      <Box>
                        <Image
                          onClick={() => handleRemoveItem(item.id)}
                          src="/icons/x-circle.svg"
                          alt="delete product"
                          objectFit="contain"
                          boxSize="18px"
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box textAlign="center">
                <Image
                  src="/imgs/mock/checkout/ic_cart_empty.png"
                  alt="Cart Is Empty"
                  title="Cart Is Empty"
                  margin="0 auto"
                  padding="0 40px"
                  height="145px"
                  minW="145px"
                />
                <Text fontSize="12px" color="#000" paddingBottom="20px">
                  {t("noProducts")}
                </Text>
              </Box>
            )}
            {!!products.length && (
              <Box border="1px" borderTopColor="#BCCCFF" paddingTop="17px">
                <Box display="flex" justifyContent="space-between">
                  <Box fontSize="14px" paddingRight="24px">
                    <Text as="p" color="#718096" textAlign="left">
                      {t("totalPrice")}
                    </Text>
                    <Text as="p" color="#2154FF" textAlign="left" fontWeight={500}>
                      {formatPrice(tolalPrice)}
                    </Text>
                  </Box>
                  <Box fontSize="14px">
                    <Link passHref shallow href="/checkout">
                      <LinkUI>
                        <Box
                          bg="#2154FF"
                          color="white"
                          padding="9px 30px"
                          borderRadius={4}
                          align="center"
                          fontWeight={600}
                        >
                          {t("payment")}
                        </Box>
                      </LinkUI>
                    </Link>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

Cart.propTypes = {
  children: PropType.element,
};

Cart.defaultProps = {
  children: "",
};
