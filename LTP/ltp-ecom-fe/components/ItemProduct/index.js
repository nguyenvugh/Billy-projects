import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import ModalAddToCartSuccess from "@ltp/components/ModalAddToCartSuccess";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { orderValidate } from "@ltp/services/checkout";
import { readCache } from "@ltp/services/datacache";
import { addToCartHelper } from "@ltp/utils/index";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { isCombo, orderValidateData } from "@ltp/utils/validate";
import Lodash from "lodash";
import { useRouter } from "next/router";
import ModalContact from "pages/product/components/ModalContact";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";

export default function ItemProduct({
  item,
  handleProductDetail,
  minWidth,
  maxWidth,
  maxHeight,
  minHeight,
  __cssImage = {},
  heading = "h2",
}) {
  const toastId = "productToCart";
  const refModalAddToCart = useRef(null);
  const router = useRouter();
  const { t } = useTranslation();
  const { addItem, items } = useCart();
  const UserInfo = readCache(keyCache.UserInfo, {});
  const [openContactModal, setOpenContactModal] = useState(false);

  const discount = pricingProduct(item);
  const onHandleDetail = () => {
    handleProductDetail && handleProductDetail(item);
  };

  const validateQuality = (callBack) => {
    const number = 1;
    let data = [];
    let IndexProduct = -1;
    let quantity = 0;
    items.forEach((el, index) => {
      if (el.idProduct === item?.id && !isCombo(el)) {
        quantity += +el.quantity;
        if (IndexProduct === -1) {
          IndexProduct = index;
        }
      }
    });
    const productInCart = IndexProduct !== -1 ? { ...items[IndexProduct], quantity } : null;
    if (productInCart) {
      data = orderValidateData([{ ...productInCart, quantity: productInCart.quantity + number }]);
    } else {
      data = orderValidateData([{ ...item, quantity: number }]);
    }
    orderValidate({ products: data })
      .then((res) => {
        if (Object.keys(res?.data?.products || {}).length > 0) {
          const number = parseInt(res?.data?.products?.[item?.id]?.replace(/[^0-9]/g, "")) || 0;
          const remain = number - (productInCart?.quantity || 0);
          const errorMessage = `${t("product")} ${item?.name} ${t("nowOnlyHas")} ${
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

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    validateQuality(() => {
      addToCartHelper(item, 1, addItem, items);
      refModalAddToCart.current.openModal();
    });
  };

  const buyProduct = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (item.contact_nlt === 1) setOpenContactModal(true);
    else
      validateQuality(() => {
        addToCartHelper(item, 1, addItem, items);
        router.push("/shopping-cart");
      });
  };

  const disabled = item?.can_buy !== true;

  const renderViewAdd = () => (
    <Box
      position="absolute"
      background="rgba(7, 17, 51, 0.64)"
      borderRadius="4px"
      overflow="hidden"
      top="0"
      left="0"
      right="0"
      height="0px"
      transition="height 0.2s"
      className="container-View-Add"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100%"
      >
        <Button
          background="#FF0000"
          borderRadius="4px"
          padding="12px 42px"
          maxWidth="90%"
          _hover={{ bg: "#ff0000a6" }}
          _focus={{ boxShadow: "#FF0000" }}
          onClick={buyProduct}
          disabled={disabled}
        >
          <Text
            color="#FFFFFF"
            textTransform="uppercase"
            fontSize={["12px", "12px", "14px", "16px"]}
          >
            {item.contact_nlt === 1 ? t("contactLongThanh") : t("buyNow")}
          </Text>
        </Button>
        {item.contact_nlt !== 1 && <Box onClick={addToCart} maxWidth="100%">
          <HStack
            spacing="7px"
            maxWidth="100%"
            textAlign="center"
            marginTop={4}
            color={disabled ? "#969696" : "#FFFFFF"}
            cursor={disabled && "not-allowed"}
            _hover={{
              "&>p": {
                borderBottomColor: "#ffffff",
              },
            }}
          >
            <Image src="/imgs/mock/products/ic_add_cart.svg" alt="cart" />
            <Text
              color="#FFFFFF"
              fontWeight="600"
              fontSize={["12px", "12px", "13px", "14px"]}
              borderBottom="1px solid transparent"
            >
              {t("addToCart")}
            </Text>
          </HStack>
        </Box>}
      </Box>
      {openContactModal && (
        <ModalContact isOpen={openContactModal} onClose={() => setOpenContactModal(false)} />
      )}
    </Box>
  );
  return (
    <Box
      key={item?.id}
      border="1px solid #BCCCFF"
      borderRadius="4px"
      // minHeight={["255px", "255px", "350px", "100%", "100%"]}
      width="100%"
      position="relative"
      cursor="pointer"
      overflow="hidden"
      _hover={{
        ".container-View-Add": {
          height: "100%",
        },
      }}
      onClick={() => {
        onHandleDetail();
      }}
    >
      <ModalAddToCartSuccess ref={refModalAddToCart} />
      <Box
        background="#EDF1FF"
        // height="272px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          borderTopLeftRadius="4px"
          borderTopRightRadius="4px"
          src={Lodash.get(item, "images[0].url", "")}
          minWidth={minWidth || "100%"}
          maxW={maxWidth || "100%"}
          minHeight={minHeight || ["163px", "250px", "272px", "252px", "252px", "272px"]}
          maxHeight={maxHeight || ["163px", "250px", "272px", "252px", "252px", "272px"]}
          objectFit="cover"
          // onError={i => (i.target.style.display = "none")}
          __css={__cssImage}
        />
      </Box>
      <Box margin={["8px 8px 14px 8px", "8px 8px 14px 8px", "8px 16px 16px"]}>
        <Text
          as={heading}
          color="#071133"
          fontSize={["14px", "14px", "14px", "16px"]}
          fontWeight="500"
          noOfLines={2}
        >
          {item.name}
        </Text>
        <HStack spacing={4} margin="8px 0 10px" flexWrap="wrap">
          {item.contact_nlt === 1 ? (
            <Text color="#2154FF" fontWeight={500} fontSize="16px">
              {t("contactLongThanh")}
            </Text>
          ) : (
            <>
              <Text color="#2154FF" fontWeight={500} fontSize="16px">
                {formatPrice(discount)}
              </Text>
              {discount !== item?.price && (
                <Text
                  color="#718096"
                  textDecoration="line-through"
                  fontSize="14px"
                  fontWeight={500}
                >
                  {formatPrice(item.price)}
                </Text>
              )}
            </>
          )}
        </HStack>
        {!Lodash.isEmpty(UserInfo) && (
          <HStack spacing="5px">
            <Image
              src={
                item.is_favourite
                  ? "/imgs/mock/products/heartFull.svg"
                  : "/imgs/mock/products/heart.svg"
              }
              alt="yêu thích"
            />
            <Text
              fontSize={["10px", "10px", "12px", "14px"]}
              fontWeight={500}
              color={item.active ? "#FF0000" : "#A0AEC0"}
            >
              {item.num_like || 0}
            </Text>
          </HStack>
        )}
        <HStack mt={2} minHeight="29px">
          {item?.is_feature === 1 && (
            <Text
              background="#2154FF"
              color="#ffff"
              px={2}
              py={1}
              borderRadius="4px"
              fontWeight="bold"
              fontSize="10px"
            >
              {t("feature")}
            </Text>
          )}
          {item?.flash_sale?.id && item?.flash_sale?.quantity > 0 && (
            <Text
              background="#E12B38"
              color="#ffff"
              px={2}
              py={1}
              borderRadius="4px"
              fontWeight="bold"
              fontSize="10px"
            >
              Flashsale
            </Text>
          )}

          {item?.charity?.id && (
            <Text
              background="#FF006B"
              color="#ffff"
              px={2}
              py={1}
              borderRadius="4px"
              fontWeight="bold"
              fontSize="10px"
            >
              {t("callOnLowercase")}
            </Text>
          )}
          {item?.promotion?.id && discount !== item?.price && (
            <Text
              background="#E12B38"
              color="#ffff"
              px={2}
              py={1}
              borderRadius="4px"
              fontWeight="bold"
              fontSize="10px"
            >
              -{item?.promotion?.percentage}%
            </Text>
          )}
        </HStack>
      </Box>
      {renderViewAdd(item)}
    </Box>
  );
}
ItemProduct.defaultProps = {
  item: { images: [] },
};
