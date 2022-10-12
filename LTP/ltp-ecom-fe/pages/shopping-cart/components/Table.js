import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import NotifiQuantity from "@ltp/components/NotifiQuantity";
import useTranslation from "@ltp/hooks/useTranslation";
import { orderValidate } from "@ltp/services/checkout";
import { convertToDate } from "@ltp/utils/date";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { isCombo, orderValidateData } from "@ltp/utils/validate";
import { useCallback, useEffect, useState } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { RiAddCircleLine } from "react-icons/ri";

function ShoppingCart(props) {
  const { t } = useTranslation();
  const { removeItem, updateItemQuantity, datacart, orderError, loading } = props;
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [updateError, setUpdateError] = useState(false);
  const [productError, setProductError] = useState({});
  const [remain, setRemain] = useState();
  useEffect(() => {
    let timer;
    if (updateError) {
      timer = setTimeout(() => {
        setUpdateError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [updateError]);

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

  const styleHead = {
    fontWeight: 500,
    color: "#2154FF",
    fontSize: "16px",
    textAlign: "center",
    textTransform: "initial",
  };
  const dataHeader = [
    { name: "Sản phẩm", width: "40%" },
    { name: "Đơn giá", width: "20%" },
    { name: "Số lượng", width: "20%" },
    { name: "Số tiền", width: "15%" },
  ];
  const validateQuality = (callBack, product) => {
    const number = 1;
    let data = [];
    let IndexProduct = -1;
    let quantity = 0;
    datacart.forEach((item, index) => {
      if (item.idProduct === product?.idProduct && !isCombo(item)) {
        quantity += +item.quantity;
        if (IndexProduct === -1) {
          IndexProduct = index;
        }
      }
    });
    const productInCart = IndexProduct !== -1 ? { ...datacart[IndexProduct], quantity } : null;
    setProductError(productInCart);
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
          setRemain(remain > 0 ? remain : 0);
          setUpdateError(true);
        } else {
          callBack instanceof Function && callBack();
        }
      })
      .catch(() => {});
  };
  const updateQuantity = (item) => {
    validateQuality(() => {
      const number = parseInt(item.quantity) + 1;
      updateItemQuantity(item.id, number);
      if (remain) {
        setRemain(remain - number);
      }
    }, item);
  };
  return (
    <Box>
      {updateError && (
        <NotifiQuantity
          message={
            <>
              Sản phẩm {productError?.name} hiện chỉ còn {remain} sản phẩm
            </>
          }
        />
      )}
      <Flex display={{ base: "none", lg: "flex" }}>
        {dataHeader.map((item, index) => (
          <Box
            style={styleHead}
            key={index}
            borderBottom="1px solid #BCCCFF"
            width={item.width}
            paddingBottom="8px"
          >
            {item.name}
          </Box>
        ))}
      </Flex>
      <Box>
        {datacart?.length &&
          datacart.map((item, index) => {
            const discount = pricingProduct(item);
            const isCoupon = item?.coupon && Object.keys(item?.coupon).length > 0;
            return (
              <Flex
                key={index}
                borderBottom="1px solid #BCCCFF"
                borderTop={{ base: "1px solid #BCCCFF", lg: "none" }}
                borderLeft={{ base: "1px solid #BCCCFF", lg: "none" }}
                borderRight={{ base: "1px solid #BCCCFF", lg: "none" }}
                marginBottom={{ base: "16px", lg: "0" }}
                borderRadius={{ base: "4px", lg: "0" }}
                padding={{ base: "8px", lg: "24px 0" }}
                alignItems="center"
                display={{ base: "grid", lg: "flex" }}
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                position="relative"
              >
                <Box width={{ base: "auto", lg: "40%" }} order={{ base: "1" }} fontSize="16px">
                  <HStack>
                    <Box boxSize="80px" flexShrink={0}>
                      <Image
                        objectFit="cover"
                        width="100%"
                        height="100%"
                        alt={item?.name}
                        src={item?.images?.[0]?.url}
                        // eslint-disable-next-line no-return-assign, no-param-reassign
                        onError={(i) => (i.target.style.display = "none")}
                      />
                    </Box>
                    <Box>
                      <Text as="h2" color="#071133" fontWeight="500" textAlign="left">
                        {item.name}
                      </Text>
                      <Text color="#718096" marginTop="10px" textAlign="left">
                        {`Mã sản phẩm: ${item.code}`}
                      </Text>
                    </Box>
                  </HStack>
                  {isCombo(item)
                    ? orderError?.combos?.[item?.id] && (
                        <Text color="#EA403F">
                          {t("nowOnlyHasUpper")}{" "}
                          <strong>{orderError.combos[item?.id].replace(/[^0-9]/g, "")}</strong>{" "}
                          {t("items")}
                        </Text>
                      )
                    : orderError?.products?.[item?.id] && (
                        <Text color="#EA403F">
                          {t("nowOnlyHasUpper")}{" "}
                          <strong>{orderError.products[item?.id].replace(/[^0-9]/g, "")}</strong>{" "}
                          {t("items")}
                        </Text>
                      )}
                </Box>
                <Box
                  width="20%"
                  order={{ base: "3", lg: "2" }}
                  marginLeft={{ base: "90px", lg: "0" }}
                >
                  <Box textAlign={{ base: "initial", lg: "center" }}>
                    {discount !== item?.price ? (
                      <Box>
                        <Text color="#FF0000" fontWeight="600" fontSize="16px">
                          {formatPrice(discount)}
                        </Text>
                        <Text
                          color="#718096"
                          fontWeight="500"
                          fontSize="14px"
                          marginTop="8px"
                          textDecoration="line-through"
                        >
                          {formatPrice(item?.price)}
                        </Text>
                      </Box>
                    ) : (
                      <Text color="#071133" fontWeight="600" fontSize="16px">
                        {formatPrice(discount)}
                      </Text>
                    )}
                  </Box>
                </Box>
                <Box
                  width="20%"
                  order={{ base: "2", lg: "3" }}
                  marginLeft={{ base: "80px", lg: "0" }}
                  padding={{ base: "10px 0", lg: "0" }}
                >
                  <Flex justifyContent={{ base: "initial", lg: "center" }}>
                    <Button
                      style={buttonCouter}
                      disabled={item.quantity <= 1}
                      onClick={() => {
                        if (loading) return;
                        if (item.quantity - 1 === 0) {
                          removeItem(item.id);
                        } else {
                          updateItemQuantity(item.id, item.quantity - 1);
                        }
                      }}
                    >
                      <FiMinusCircle color="#2154FF" fontSize="23px" />
                    </Button>
                    <Text
                      color="#2154FF"
                      type="number"
                      padding="0"
                      border="none"
                      height="20px"
                      textAlign="center"
                      maxW="44px"
                      w="auto"
                    >
                      {item.quantity}
                    </Text>
                    <Button
                      style={buttonCouter}
                      onClick={() => {
                        if (loading) return;
                        updateQuantity(item);
                      }}
                      disabled={
                        discount != item.price && item.flash_sale?.quantity <= item.quantity
                      }
                    >
                      <RiAddCircleLine color="#2154FF" fontSize="25px" />
                    </Button>
                  </Flex>
                </Box>
                <Box
                  width={{ base: "auto", lg: "15%" }}
                  order={{ base: "4", lg: "4" }}
                  position={{ base: "absolute", lg: "initial" }}
                  bottom="8px"
                  right="8px"
                >
                  <Text
                    display={{ base: "block", lg: "none" }}
                    fontSize="14px"
                    fontWeight="500"
                    color="#071133"
                  >
                    {t("totalPrice")}
                  </Text>
                  <Box
                    textAlign={{ base: "initial", lg: "center" }}
                    color={{ base: "#FF0000", lg: "#071133" }}
                    fontWeight="600"
                    fontSize="16px"
                  >
                    {isCoupon
                      ? formatPrice(item.coupon?.discount?.total)
                      : formatPrice(item?.quantity * discount)}
                  </Box>
                </Box>
                <Box
                  width="5%"
                  position={{ base: "absolute", lg: "initial" }}
                  order={{ base: "5", lg: "5" }}
                  top="10px"
                  right="5px"
                  onClick={() => {
                    if (loading) return;
                    removeItem(item.id);
                  }}
                  cursor="pointer"
                >
                  <Image src="/imgs/mock/shopping-cart/ic_delete_cart.svg" alt="Icon Delete Cart" />
                </Box>
              </Flex>
            );
          })}
      </Box>
    </Box>
  );
}

const buttonCouter = {
  background: "transparent",
  boxShadow: "none",
  padding: 0,
  height: "fit-content",
};
ShoppingCart.defaultProps = {
  datacart: [],
};
export default ShoppingCart;
