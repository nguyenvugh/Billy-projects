import { Box, Button, Flex, HStack, Image, Input, Text } from "@chakra-ui/react";
import Auth, { SCREEN_AUTH } from "@ltp/components/Auth";
import { useAppUserContext } from "@ltp/components/context/auth";
import CountDown from "@ltp/components/CountDown";
import ModalAddToCartSuccess from "@ltp/components/ModalAddToCartSuccess";
import NotifiQuantity from "@ltp/components/NotifiQuantity";
import useTranslation from "@ltp/hooks/useTranslation";
import { orderValidate } from "@ltp/services/checkout";
import { createFavoriteProduct } from "@ltp/services/profile";
import { convertToDate } from "@ltp/utils/date";
import { addToCartHelper } from "@ltp/utils/index";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { isCombo, orderValidateData } from "@ltp/utils/validate";
import { useRouter } from "next/router";
import PropsType from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import {
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { useCart } from "react-use-cart";
import ModalContact from "./ModalContact";
import RenderStar from "./Star";

export default function InfoProductDetail({ product }) {
  const { t } = useTranslation();
  const { userContext } = useAppUserContext();
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const router = useRouter();
  const { addItem, items } = useCart();
  const [counter, setCounter] = useState(1);
  const [screen, setScreen] = useState();
  const [orderError, setOrderError] = useState(false);
  const [productInCart, setProductInCart] = useState();
  const [remain, setRemain] = useState();
  const [openContactModal, setOpenContactModal] = useState(false);
  const refModalAddToCart = useRef(null);
  const min = 1;

  const [productDetail, setProductDetail] = useState(product);
  const currentLocationAddress = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    setProductDetail(product);
  }, [product]);

  useEffect(() => {
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
    setProductInCart(productInCart);
    if (!productInCart) {
      setRemain();
    }
  }, [items, product]);

  useEffect(() => {
    let timer;
    if (orderError) {
      timer = setTimeout(() => {
        setOrderError(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [orderError]);

  const handleFavoriteProduct = () => {
    if (userContext?.id) {
      postFavoriteProduct();
    } else {
      setScreen(SCREEN_AUTH.signIn);
    }
  };

  const postFavoriteProduct = async () => {
    try {
      await createFavoriteProduct({ product: +product.id });
      setProductDetail((prevState) => ({
        ...prevState,
        num_like: prevState.is_favourite ? prevState.num_like - 1 : prevState.num_like + 1,
        is_favourite: !prevState.is_favourite,
      }));
    } catch (error) {
      // throw new Error(error);
      console.log({ error });
    }
  };

  const now = new Date();
  const discount = pricingProduct(product);
  let isFlashSale = false;
  let isPromotion = false;
  let isCharity = false;
  let endDate;
  let haveEndDate = false;
  if (product?.flash_sale?.id) {
    endDate = convertToDate(product?.flash_sale?.end_date);
    isFlashSale = endDate > now && product?.flash_sale?.quantity > 0;
  } else if (product?.promotion?.id) {
    endDate = convertToDate(`${product?.promotion?.end_date} ${product?.promotion?.end_time}`);
    isPromotion = endDate > now;
  } else if (product?.charity?.id) {
    if (product?.charity?.end_date) {
      endDate = new Date(product?.charity?.end_date);
      isCharity = endDate > now;
      haveEndDate = true;
    } else {
      isCharity = true;
    }
  }

  const onChange = (e) => {
    setCounter(e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, ""));
  };

  const onBlur = () => {
    setCounter(parseInt(counter) || 1);
  };

  const validateQuality = (callBack) => {
    const number = parseInt(counter) || 1;
    let data = [];
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
          setOrderError(true);
        } else {
          callBack instanceof Function && callBack();
        }
      })
      .catch(() => {});
  };

  const addToCart = () => {
    validateQuality(() => {
      const number = parseInt(counter) || 1;
      addToCartHelper(product, number, addItem, items);
      if (remain) {
        setRemain(remain - number);
      }
      refModalAddToCart.current.openModal();
    });
  };

  const buyProduct = () => {
    validateQuality(() => {
      addToCartHelper(product, parseInt(counter) || 1, addItem, items);
      router.push("/shopping-cart/");
    });
  };

  const isInStock = product?.can_buy === true && (remain === undefined || remain > 0);
  return (
    <Box>
      <ModalAddToCartSuccess ref={refModalAddToCart} />
      {orderError && (
        <NotifiQuantity
          message={
            <>
              Sản phẩm {product?.name} hiện chỉ còn {remain} sản phẩm
            </>
          }
        />
      )}
      <Auth screen={screen} setScreen={setScreen} />
      <HStack flexWrap="wrap">
        {product?.is_feature === 1 && (
          <Text color="#004DFF" fontSize="16px" fontWeight="bold" mr="5px">
            {t("feature")}
          </Text>
        )}
        {isFlashSale && (
          <Text color="#FF0000" fontSize="16px" fontWeight="500">
            <Text as="span" fontWeight="bold">
              FLASH SALE
            </Text>{" "}
            {t("discount")} {parseFloat(product?.flash_sale?.percentage)}% {t("expireOn")}
            &nbsp;
            <CountDown endDate={endDate} productId={product?.id} onFinish={forceUpdate} />
          </Text>
        )}
        {isPromotion && (
          <Text color="#FF0000" fontSize="16px" fontWeight="500">
            {t("discount")} {product?.promotion?.percentage}% {t("expireOn")}
            &nbsp;
            <CountDown endDate={endDate} productId={product?.id} onFinish={forceUpdate} />
          </Text>
        )}
        {isCharity && (
          <Text color="#FF227F" fontSize="16px" fontWeight="500">
            <Box as="span" fontWeight="bold">
              {t("callOn")}
            </Box>{" "}
            {t("donate")} {product?.charity?.percentage}
            %&nbsp;
            {haveEndDate && (
              <>
                {t("expireOn")}{" "}
                <CountDown endDate={endDate} productId={product?.id} onFinish={forceUpdate} />
              </>
            )}
          </Text>
        )}
      </HStack>
      <Text
        as="h1"
        color="#071133"
        fontSize={{ base: "23px", md: "25px", xl: "28px" }}
        fontWeight="bold"
      >
        {product.name}
      </Text>
      <Box display="flex" padding="17px 0 25px" fontSize="14px" alignItems="center">
        <RenderStar width="14px" height="13.5px" num_rating={product.avg_rating} />
        <Text padding="0 8px" color="#071133">{`${product.avg_rating || 0}`}</Text>
        <Text>{`${product.view || 0} ${t("review")}`}</Text>
        <Text fontSize="15px" fontWeight="500" paddingLeft="8px">
          {t("sold")} {` ${product.num_sold}`}
        </Text>
      </Box>
      <Flex
        fontSize={{ base: "14px", lg: "16px", xl: "17px" }}
        fontWeight="300"
        color="#071133"
        flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
      >
        <Flex flexWrap="wrap">
          <Text whiteSpace="nowrap"> {t("code")}:</Text>
          <Text color="#2154FF" paddingLeft="6px">
            {product.code}
          </Text>
        </Flex>
        <Box
          width="1px"
          margin={["0 18px", "0 15px", "0 15px", "0 15px", "0 15px", "0 20px", "0 25px"]}
          background="#BCCCFF"
        />
        <Flex>
          <Text whiteSpace="nowrap">{t("status")}:</Text>
          <Text
            whiteSpace="nowrap"
            color={product.contact_nlt === 1 ? "#2154FF" : isInStock ? "#5EAC17" : "#FF0000"}
            paddingLeft="6px"
          >
            {product.contact_nlt === 1
              ? t("contactLongThanh")
              : isInStock
              ? t("inStock")
              : t("outOfStock")}
          </Text>
        </Flex>
      </Flex>
      <Text color="#718096" fontSize={["12px", "12px", "14px", "15px", "16px"]} marginTop="25px">
        {product.short_desc}
      </Text>
      <Flex
        alignItems="center"
        borderTop="1px solid #BCCCFF"
        borderBottom="1px solid #BCCCFF"
        padding="24px 0"
        margin="16px 0 24px"
      >
        {product.contact_nlt === 1 ? (
          <Box display="flex" alignItems="flex-end">
            <Text mr="3">{`${t("priceContact")}: `}</Text>
            <Text
              color="#2154FF"
              fontSize={{ base: "18px", md: "20px", xl: "24px" }}
              fontWeight="600"
              lineHeight="none"
              borderBottom="1px solid #2154FF"
              cursor="pointer"
              onClick={() => setOpenContactModal(true)}
            >
              {t("contactLongThanh")}
            </Text>
          </Box>
        ) : (
          <>
            <Text
              color="#2154FF"
              fontSize={{ base: "18px", md: "20px", xl: "24px" }}
              fontWeight="600"
            >
              {formatPrice(isFlashSale || isPromotion ? discount : product?.price)}
            </Text>
            {(isFlashSale || isPromotion) && (
              <Text
                color="#718096"
                fontSize={{ base: "14px", md: "15px", xl: "16px" }}
                fontWeight="500"
                padding="0 60px 0 16px"
                textDecoration="line-through"
              >
                {formatPrice(product.price) || ""}
              </Text>
            )}
          </>
        )}
        {product.contact_nlt === -1 && (
          <Flex justifyContent="center">
            <Button
              onClick={() => {
                setCounter(+counter - 1);
              }}
              style={buttonCouter}
              disabled={+counter <= min}
            >
              <Flex
                w="20px"
                h="20px"
                border={`2px solid ${counter <= min ? "#A0AEC0" : "#2154FF"}`}
                borderRadius="100px"
                alignItems="center"
                justifyContent="center"
              >
                <Box bg={counter <= min ? "#A0AEC0" : "#2154FF"} h="2px" w="9.5px" />
              </Flex>
            </Button>
            <Input
              value={counter}
              onChange={onChange}
              onBlur={onBlur}
              color="#2154FF"
              padding="0"
              border="none"
              height="20px"
              textAlign="center"
              maxW="44px"
              w="auto"
            />
            <Button
              onClick={() => {
                setCounter(+counter + 1);
              }}
              style={buttonCouter}
              // disabled={+counter >= max}
            >
              <Flex
                w="20px"
                h="20px"
                // border={`2px solid ${counter >= max ? "#A0AEC0" : "#2154FF"}`}
                border="2px solid #2154FF"
                borderRadius="100px"
                alignItems="center"
                justifyContent="center"
                position="relative"
              >
                <Box
                  // bg={counter >= max ? "#A0AEC0" : "#2154FF"}
                  bg="#2154FF"
                  h="2px"
                  w="9.5px"
                />
                <Box
                  // bg={counter >= max ? "#A0AEC0" : "#2154FF"}
                  bg="#2154FF"
                  w="2px"
                  h="9.5px"
                  position="absolute"
                  right="45%"
                />
              </Flex>
            </Button>
          </Flex>
        )}
      </Flex>
      <HStack spacing={{ base: "8px", md: "14px", xl: "16px" }}>
        {product.contact_nlt !== 1 && (
          <Button
            color="#2154FF"
            style={addCart}
            background="#FFFFFF"
            _hover={{ bg: "#FFFFFF" }}
            _focus={{ bg: "#FFFFFF" }}
            border="1px solid #2154FF"
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
            disabled={product?.can_buy !== true}
            onClick={addToCart}
          >
            {t("addToCart")}
          </Button>
        )}
        <Button
          color="#FFFFFF"
          // background={product.amount > 0 ? "#2154FF" : "#718096"}
          background="#2154FF"
          _hover={{ bg: "#2154FF" }}
          _focus={{ bg: "#2154FF" }}
          style={addCart}
          fontSize={{ base: "14px", md: "15px", xl: "16px" }}
          disabled={product.contact_nlt === 1 ? false : product?.can_buy !== true}
          onClick={product.contact_nlt === 1 ? () => setOpenContactModal(true) : buyProduct}
        >
          {product.contact_nlt === 1 ? t("contactLongThanh") : t("buy")}
        </Button>
      </HStack>
      <HStack
        spacing={["20px", "20px", "20px", "20px", "30px", "73px"]}
        justifyContent="space-between"
        marginTop="24px"
      >
        <HStack spacing="8px" flexWrap="wrap">
          <Text
            paddingRight={{ base: "4px", md: "6px", xl: "8px" }}
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
          >
            {t("share")}:
          </Text>
          <InstapaperShareButton title={product.name} url={currentLocationAddress}>
            <Image
              src="/imgs/mock/productDetail/instagram.svg"
              alt=" instagram"
              title="Instagram"
            />
          </InstapaperShareButton>
          <TwitterShareButton title={product.name} url={currentLocationAddress}>
            <Image
              src="/imgs/mock/productDetail/Twitter.svg"
              alt=" Twitter"
              capion="Twitter"
              title=" Twitter"
            />
          </TwitterShareButton>
          <FacebookShareButton url={currentLocationAddress}>
            <Image src="/imgs/mock/productDetail/Facebook.svg" alt=" Facebook" title=" Facebook" />
          </FacebookShareButton>
          <LinkedinShareButton url={currentLocationAddress}>
            <Image
              src="/imgs/mock/productDetail/Linkedin.png"
              alt=" Linkedin"
              title=" Linkedin"
              backgroundColor="#fff"
              w="24px"
              objectFit="contain"
            />
          </LinkedinShareButton>
        </HStack>
        <Flex alignItems="center">
          {/* <Image
                src="/imgs/mock/productDetail/heart_icn.svg"
                alt=" heart_icn"
              />  */}
          <FaHeart
            cursor="pointer"
            color={`${productDetail.is_favourite ? "#FF0000" : "#A0AEC0"}`}
            onClick={handleFavoriteProduct}
          />
          <Text padding="0 5px 0 14px" fontSize={{ base: "14px", md: "15px", xl: "16px" }}>
            {t("favourite")} ({productDetail.num_like < -1 ? 0 : productDetail.num_like})
          </Text>
        </Flex>
      </HStack>
      {openContactModal && (
        <ModalContact isOpen={openContactModal} onClose={() => setOpenContactModal(false)} />
      )}
    </Box>
  );
}
InfoProductDetail.propsType = {
  product: PropsType.object,
};

InfoProductDetail.defaultProps = {
  product: {},
};

const buttonCouter = {
  background: "transparent",
  boxShadow: "none",
  padding: 0,
  height: "fit-content",
};
const addCart = {
  padding: "16px 0",
  textAlign: "center",
  borderRadius: "5px",
  width: "50%",
  fontWeight: "500",
};
