import { Box, Button, Flex, HStack, IconButton, Image, Input, Text } from "@chakra-ui/react";
import Auth, { SCREEN_AUTH } from "@ltp/components/Auth";
import { useAppUserContext } from "@ltp/components/context/auth";
import ModalAddToCartSuccess from "@ltp/components/ModalAddToCartSuccess";
import { orderValidate } from "@ltp/services/checkout";
import { favoriteCombo } from "@ltp/services/product";
import { addToCartHelper } from "@ltp/utils/index";
import { formatPrice } from "@ltp/utils/price";
import { isCombo, orderValidateData } from "@ltp/utils/validate";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { FacebookShareButton, InstapaperShareButton, TwitterShareButton } from "react-share";
import { toast } from "react-toastify";
import { useCart } from "react-use-cart";
import RenderStar from "../Star";
import NotifiQuantity from "./NotifiQuantity";

export default function ComboInfo({ combo: dataCombo }) {
  const [combo, setDataCombo] = useState({});
  const { userContext } = useAppUserContext();
  const router = useRouter();
  const { addItem, items } = useCart();
  const [count, setCount] = useState(1);
  const [screen, setScreen] = useState();
  const currentLocationAddress = typeof window !== "undefined" ? window.location.href : "";
  const [orderError, setOrderError] = useState(false);
  const [comboInCart, setComboInCart] = useState();
  const [remain, setRemain] = useState();
  const refModalAddToCart = useRef(null);
  useEffect(() => {
    setDataCombo(dataCombo);
  }, [dataCombo]);
  useEffect(() => {
    let timer;
    if (orderError) {
      timer = setTimeout(() => {
        setOrderError();
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [orderError]);

  useEffect(() => {
    const comboInCart = items.find((item) => item.idProduct === combo?.id && isCombo(item));
    setComboInCart(comboInCart);
    if (!comboInCart) {
      setRemain();
    }
  }, [items]);

  const handleFavorite = () => {
    if (userContext?.id) {
      favoriteCombo({ product_combo: combo?.id })
        .then(() => {
          setDataCombo((prevState) => ({
            ...prevState,
            num_like: prevState.is_favourite ? prevState.num_like - 1 : prevState.num_like + 1,
            is_favourite: !prevState.is_favourite,
          }));
        })
        .catch(() => {
          toast.error("Thao tác thất bại. Vui lòng thử lại", { toastId: "favoriteCombo" });
        });
    } else {
      setScreen(SCREEN_AUTH.signIn);
    }
  };

  const countUp = () => {
    setCount(count + 1);
  };

  const countDown = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const onChangeCount = (e) => {
    setCount(e.target.value.replace(/[^0-9]/g, "").replace(/^0+/, ""));
  };

  const onBlur = () => {
    setCount(parseInt(count) || 1);
  };

  const validateQuality = (callBack) => {
    const number = parseInt(count) || 1;
    let data = [];
    if (comboInCart) {
      data = orderValidateData([{ ...comboInCart, quantity: comboInCart.quantity + number }]);
    } else {
      data = orderValidateData([{ ...combo, quantity: number }]);
    }
    orderValidate({ products: data })
      .then((res) => {
        if (Object.keys(res?.data?.combos || {}).length > 0) {
          const number = parseInt(res?.data?.combos?.[combo?.id]?.replace(/[^0-9]/g, "")) || 0;
          const remain = number - (comboInCart?.quantity || 0);
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
      combo.price = combo.total_price;
      combo.comboId = combo.id;
      const number = parseInt(count) || 1;
      addToCartHelper(combo, number, addItem, items);
      if (remain) {
        setRemain(remain - number);
      }
      refModalAddToCart.current.openModal();
    });
  };

  const buyCombo = () => {
    validateQuality(() => {
      combo.price = combo.total_price;
      combo.comboId = combo.id;
      addToCartHelper(combo, parseInt(count) || 1, addItem, items);
      router.push("/shopping-cart/");
    });
  };

  return (
    <Box>
      <ModalAddToCartSuccess ref={refModalAddToCart} />
      {orderError && (
        <NotifiQuantity
          message={
            <>
              Sản phẩm {combo?.name} hiện chỉ còn {remain} sản phẩm
            </>
          }
        />
      )}
      <Auth screen={screen} setScreen={setScreen} />
      <Text color="#071133" fontSize={{ base: "23px", md: "28px" }} fontWeight="bold">
        {combo?.name}
      </Text>
      <Box display="flex" padding="17px 0 25px" fontSize="14px" alignItems="center">
        <RenderStar width="14px" num_rating={combo?.avg_rating} />
        <Text padding="0 8px" color="#071133">
          {combo?.avg_rating}
        </Text>
        <Text>0 đánh giá</Text>
        <Text fontSize="15px" fontWeight="500" paddingLeft="8px">
          Đã bán {combo?.num_sold}
        </Text>
      </Box>
      <Flex
        fontSize={{ base: "14px", md: "16px" }}
        fontWeight="300"
        color="#071133"
        flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
      >
        <Flex flexWrap="wrap">
          <Text whiteSpace="nowrap">Mã combo:</Text>
          <Text color="#2154FF" paddingLeft="6px">
            {combo?.code}
          </Text>
        </Flex>
        <Box width="1px" margin={{ base: "0 18px", md: "0 25px" }} background="#BCCCFF" />
        <Flex>
          <Text whiteSpace="nowrap">Tình trạng:</Text>
          {combo?.can_buy === true && (remain === undefined || remain > 0) ? (
            <Text whiteSpace="nowrap" color="#5EAC17" paddingLeft="6px">
              Còn hàng
            </Text>
          ) : (
            <Text whiteSpace="nowrap" color="#FF0000" paddingLeft="6px">
              Hết hàng
            </Text>
          )}
        </Flex>
      </Flex>
      <Text color="#718096" fontSize={{ base: "12px", md: "16px" }} marginTop="25px">
        {combo?.short_desc}
      </Text>
      <Flex
        alignItems="center"
        borderTop="1px solid #BCCCFF"
        borderBottom="1px solid #BCCCFF"
        py={4}
        my={6}
      >
        <Text
          color="#2154FF"
          fontSize={{ base: "18px", md: "24px" }}
          fontWeight="600"
          minWidth="50%"
        >
          {formatPrice(combo?.total_price)}
        </Text>

        <Flex justifyContent="center">
          <IconButton
            icon={<FiMinusCircle fontSize="20px" />}
            bgColor="#ffffff"
            padding={0}
            minWidth="auto"
            boxSize="20px"
            color="#2154FF"
            borderRadius="50%"
            disabled={count <= 1}
            onClick={countDown}
          />
          <Input
            value={count}
            onChange={onChangeCount}
            onBlur={onBlur}
            color="#2154FF"
            padding="0"
            border="none"
            height="20px"
            textAlign="center"
            maxW="44px"
            w="auto"
          />
          <IconButton
            icon={<FiPlusCircle fontSize="20px" />}
            bgColor="#ffffff"
            padding={0}
            minWidth="auto"
            boxSize="20px"
            color="#2154FF"
            borderRadius="50%"
            onClick={countUp}
          />
        </Flex>
      </Flex>
      <HStack spacing={{ base: "8px", md: "14px" }}>
        <Button
          color="#2154FF"
          style={addCart}
          background="#FFFFFF"
          _hover={{ bg: "#FFFFFF" }}
          _focus={{ bg: "#FFFFFF" }}
          border="1px solid #2154FF"
          fontSize={{ base: "14px", md: "16px" }}
          disabled={combo?.can_buy !== true}
          onClick={addToCart}
        >
          Thêm vào giỏ hàng
        </Button>
        <Button
          color="#FFFFFF"
          background="#2154FF"
          _hover={{ bg: "#2154FF" }}
          _focus={{ bg: "#2154FF" }}
          style={addCart}
          fontSize={{ base: "14px", md: "16px" }}
          disabled={combo?.can_buy !== true}
          onClick={buyCombo}
        >
          Mua hàng
        </Button>
      </HStack>
      <HStack
        spacing={{ base: "20px", md: "30px" }}
        justifyContent="space-between"
        marginTop="24px"
      >
        <HStack spacing="8px" flexWrap="wrap">
          <Text paddingRight={{ base: "4px", md: "6px" }} fontSize={{ base: "14px", md: "16px" }}>
            Chia sẻ:
          </Text>
          <InstapaperShareButton title={combo?.name} url={currentLocationAddress}>
            <Image
              src="/imgs/mock/productDetail/instagram.svg"
              alt=" instagram"
              title=" instagram"
            />
          </InstapaperShareButton>
          <TwitterShareButton title={combo?.name} url={currentLocationAddress}>
            <Image src="/imgs/mock/productDetail/Twitter.svg" alt=" Twitter" title=" Twitter" />
          </TwitterShareButton>
          <FacebookShareButton url={currentLocationAddress}>
            <Image src="/imgs/mock/productDetail/Facebook.svg" alt=" Facebook" title=" Facebook" />
          </FacebookShareButton>
        </HStack>
        <Flex alignItems="center">
          <FaHeart
            cursor="pointer"
            color={combo?.is_favourite ? "#FF0000" : "#A0AEC0"}
            onClick={handleFavorite}
          />
          <Text padding="0 5px 0 14px" fontSize={{ base: "14px", md: "15px", xl: "16px" }}>
            Yêu thích ({combo?.num_like})
          </Text>
        </Flex>
      </HStack>
    </Box>
  );
}

const addCart = {
  padding: "16px 0",
  textAlign: "center",
  borderRadius: "5px",
  minWidth: "50%",
  maxWidth: "50%",
  fontWeight: "500",
};
