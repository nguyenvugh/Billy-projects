import { Box, Button, Flex, Icon, Link as LinkUI, Text } from "@chakra-ui/react";
import { orderValidate } from "@ltp/services/checkout";
import { addToCartHelper, getValidSlug } from "@ltp/utils/index";
import { isCombo, orderValidateData } from "@ltp/utils/validate";
import Link from "next/link";
import { useRouter } from "next/router";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";
import useTranslation from "@ltp/hooks/useTranslation";
import { useRef } from "react";
import ModalAddToCartSuccess from "@ltp/components/ModalAddToCartSuccess";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { ROUTE_PRODUCT_DETAIL_SLUG } from "@ltp/utils/constant";

const HoverBuyButton = ({ product }) => {
  const { t, locale } = useTranslation();
  const refModalAddToCart = useRef(null);
  const toastId = "product_feature";
  const router = useRouter();
  const { addItem, items } = useCart();

  const validateQuality = (callBack) => {
    const number = 1;
    let data = [];
    let IndexProduct = -1;
    let quantity = 0;
    items.forEach((item, index) => {
      if (item.idProduct === product?.id && !isCombo(item)) {
        quantity += +item.quantity;
        if (IndexProduct === -1) {
          IndexProduct = index;
        }
      }
    });
    const productInCart = IndexProduct !== -1 ? { ...items[IndexProduct], quantity } : null;
    if (productInCart) {
      data = orderValidateData([{ ...productInCart, quantity: productInCart.quantity + number }]);
    } else {
      data = orderValidateData([{ ...product, quantity: number }]);
    }
    orderValidate({ products: data })
      .then((res) => {
        if (Object.keys(res?.data?.products || {}).length > 0) {
          const number = parseInt(res?.data?.products?.[product?.id]?.replace(/[^0-9]/g, "")) || 0;
          const remain = number - (productInCart?.quantity || 0);
          const errorMessage = `${t("product")} ${product?.name} ${t("nowOnlyHas")} ${
            remain > 0 ? remain : 0
          } ${t("items")}`;
          toast.update(toastId, { render: errorMessage, type: toast.TYPE.ERROR });
          toast.error(errorMessage, { toastId });
        } else {
          callBack instanceof Function && callBack();
        }
      })
      .catch(() => {});
  };

  const addToCard = () => {
    validateQuality(() => {
      addToCartHelper(product, 1, addItem, items);
      refModalAddToCart.current.openModal();
    });
  };
  const buyNow = () => {
    validateQuality(() => {
      addToCartHelper(product, 1, addItem, items);
      router.push("/shopping-cart");
    });
  };
  return (
    <Flex
      zIndex="100"
      justifyContent="center"
      alignItems="center"
      className="hover-buy-button-container"
      overflow="hidden"
      position="absolute"
      top="0"
      left="0"
      right="0"
      height="0px"
      transition="height 0.2s"
      background="rgba(7, 17, 51, 0.64)"
    >
      <ModalAddToCartSuccess ref={refModalAddToCart} />
      <a href={addTrailingSlash(ROUTE_PRODUCT_DETAIL_SLUG(locale, getValidSlug(product)))}>
        <Box position="absolute" top="0" left="0" right="0" height="100%" zIndex={-1} as={LinkUI} />
      </a>
      <Flex flexDirection="column" justifyContent="center">
        <Button
          background="#FF0000"
          borderRadius="4px"
          padding={{ base: "12px", md: "12px 42px" }}
          m="auto"
          _hover={{ bg: "#FF0000" }}
          _expanded={{ bg: "#FF0000" }}
          _focus={{ boxShadow: "#FF0000" }}
          onClick={buyNow}
        >
          <Text color="#FFFFFF" textTransform="uppercase" fontSize="16px">
            {t("buyNow")}
          </Text>
        </Button>
        <Flex mt={4}>
          <Flex
            cursor="pointer"
            alignItems="center"
            ml="auto"
            mr="auto"
            onClick={addToCard}
            _hover={{
              "&>p": {
                borderBottomColor: "#ffffff",
              },
            }}
          >
            <Icon as={RiShoppingCart2Fill} fill="#ffffff" mr={2} display="block" />
            <Text
              color="#FFFFFF"
              fontSize="14px"
              fontWeight="600"
              borderBottom="1px solid transparent"
            >
              {t("addToCart")}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default HoverBuyButton;
