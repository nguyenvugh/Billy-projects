import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import { orderValidate } from "@ltp/services/checkout";
import { getComboById } from "@ltp/services/product";
import { urlCombo } from "@ltp/services/urlAPI";
import { formatPrice } from "@ltp/utils/price";
import { isCombo, orderValidateData } from "@ltp/utils/validate";
import { useRouter } from "next/router";
import { useCart } from "react-use-cart";
import useSWR from "swr";
import useTranslation from "@ltp/hooks/useTranslation";
import { addToCartHelper } from "@ltp/utils/index";
import { useRef } from "react";
import ModalAddToCartSuccess from "@ltp/components/ModalAddToCartSuccess";

export default function ComboItem({ item, handleDetail, heading = "h2" }) {
  const refModalAddToCart = useRef(null);
  const router = useRouter();
  const { t } = useTranslation();
  const { addItem, items } = useCart();

  const getComboDetail = () => getComboById(item.id);
  const { data } = useSWR(`${urlCombo}/${item.id}`, getComboDetail);
  const detailCombo = data?.data || {};

  const onHandleDetail = () => {
    handleDetail && handleDetail(item);
  };

  const validateQuality = (callBack) => {
    const number = 1;
    let data = [];
    const comboInCart = items.find(
      (element) => element?.idProduct === item?.id && isCombo(element),
    );
    if (comboInCart) {
      data = orderValidateData([{ ...comboInCart, quantity: comboInCart.quantity + number }]);
    } else {
      data = orderValidateData([{ ...detailCombo, quantity: number }]);
    }
    orderValidate({ products: data })
      .then((res) => {
        if (!Object.keys(res?.data?.combos || {}).length > 0) {
          callBack instanceof Function && callBack();
        }
      })
      .catch(() => {});
  };

  const addToCart = () => {
    if (detailCombo?.id) {
      validateQuality(() => {
        detailCombo.price = detailCombo?.total_price;
        detailCombo.comboId = detailCombo?.id;
        addToCartHelper(detailCombo, 1, addItem, items);
        refModalAddToCart.current.openModal();
      });
    }
  };

  const buyCombo = () => {
    if (detailCombo?.id) {
      validateQuality(() => {
        detailCombo.price = detailCombo?.total_price;
        detailCombo.comboId = detailCombo?.id;
        addToCartHelper(detailCombo, 1, addItem, items);
        router.push("/shopping-cart");
      });
    }
  };

  const isDisabled = item?.can_buy !== true;

  const renderViewAdd = () => (
    <Box
      zIndex={1}
      position="absolute"
      bgColor="rgba(7, 17, 51, 0.64)"
      borderRadius="4px"
      overflow="hidden"
      top="0"
      left="0"
      right="0"
      height="0px"
      transition="height 0.2s"
      className="container-action"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100%"
      >
        <Box
          zIndex={1}
          onClick={onHandleDetail}
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
        />
        <Button
          zIndex={10}
          bgColor={isDisabled ? "#A3A3A3" : "#FF0000"}
          isDisabled={isDisabled}
          borderRadius="4px"
          padding="12px 42px"
          maxWidth="90%"
          _hover={{ bgColor: isDisabled ? "#A3A3A3" : "#ff0000a6" }}
          onClick={buyCombo}
        >
          <Text
            color="#FFFFFF"
            textTransform="uppercase"
            fontSize={["12px", "12px", "14px", "16px"]}
          >
            {t("buyNow")}
          </Text>
        </Button>
        <HStack
          zIndex={10}
          spacing={2}
          textAlign="center"
          marginTop={4}
          onClick={addToCart}
          color={isDisabled ? "#969696" : "#FFFFFF"}
          cursor={isDisabled && "not-allowed"}
          _hover={{
            "&>p": {
              borderBottomColor: "#ffffff",
            },
          }}
        >
          <Image
            src={
              isDisabled
                ? "/imgs/mock/products/cart-disabled.svg"
                : "/imgs/mock/products/ic_add_cart.svg"
            }
            alt="cart"
          />
          <Text
            fontWeight="600"
            fontSize={["12px", "12px", "13px", "14px"]}
            borderBottom="1px solid transparent"
          >
            {t("addToCart")}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
  return (
    <Box
      key={item?.id}
      border="1px solid #BCCCFF"
      borderRadius="4px"
      minHeight={["255px", "255px", "350px", "100%", "100%"]}
      position="relative"
      cursor="pointer"
      overflow="hidden"
      _hover={{
        ".container-action": {
          height: "100%",
        },
      }}
    >
      <ModalAddToCartSuccess ref={refModalAddToCart} />
      <Box background="#EDF1FF" display="flex" alignItems="center" justifyContent="center">
        <Image
          borderTopLeftRadius="4px"
          borderTopRightRadius="4px"
          src={item?.images?.[0]?.url}
          minWidth="100%"
          minHeight={["164px", "164px", "200px", "272px"]}
          maxHeight={["164px", "164px", "200px", "272px"]}
          objectFit="cover"
          // eslint-disable-next-line no-return-assign, no-param-reassign
          onError={(i) => (i.target.style.display = "none")}
        />
      </Box>
      <Box margin={["8px 8px 14px 8px", "8px 8px 14px 8px", "8px 16px 16px"]}>
        <Text
          color="#071133"
          fontSize={["14px", "14px", "14px", "16px"]}
          fontWeight="500"
          noOfLines={2}
          as={heading}
        >
          {item?.name}
        </Text>
        <HStack spacing={4} margin="8px 0 10px" flexWrap="wrap">
          <Text color="#2154FF" fontWeight={500} fontSize="16px">
            {formatPrice(item?.total_price)}
          </Text>
        </HStack>
        <HStack spacing="5px">
          <Image
            src={
              item?.is_favourite === true
                ? "/imgs/mock/products/heartFull.svg"
                : "/imgs/mock/products/heart.svg"
            }
            alt="my favourite"
          />
          <Text
            fontSize={["10px", "10px", "12px", "14px"]}
            fontWeight={500}
            color={item?.active ? "#FF0000" : "#A0AEC0"}
          >
            {item?.num_like}
          </Text>
        </HStack>
      </Box>
      {renderViewAdd(item)}
    </Box>
  );
}
