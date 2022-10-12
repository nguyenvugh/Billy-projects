import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  Link as LinkUI,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { orderValidate } from "@ltp/services/checkout";
import { readCache, saveCache } from "@ltp/services/datacache";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";
import { formatPrice, pricingProduct } from "@ltp/utils/price";
import { isCombo, orderValidateData } from "@ltp/utils/validate";
import { useCheckoutContext } from "components/context/checkout";
import { debounce } from "lodash";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "react-use-cart";

const PERCENTAGE_TYPE = 2;

const styleTextCode = {
  color: "#071133",
  fontWeight: "500",
  fontSize: "16",
};

const calcDiscountPrice = (price, discountByPercentage, discountByPrice) => {
  let discount;
  let total = price;
  if (discountByPercentage == 0) {
    discount = 0;
    total = price;
  }

  if (discountByPercentage) {
    discount = discountByPercentage / 100;
    total = price - price * discount;
  }

  if (discountByPrice) {
    discount = discountByPrice;
    total = price - discount;
  }
  const reduced = price - total;
  return { originPrice: price, total, reduced };
};
function DiscountCode(props) {
  const { t, locale } = useTranslation();
  const { _, setCheckoutContext } = useCheckoutContext();
  const [userInfo, setUserInfo] = useState({});
  const toastId = "discountID";
  const router = useRouter();
  const { items: datacart } = useCart();
  const {
    couponList = [],
    onItemClick,
    productCouponList,
    setOrderError,
    shouldApplyDiscount,
    loading,
    setLoading,
  } = props;
  const [search, setSearch] = useState("");
  const [discountApplied, setDiscountApplied] = useState();
  const [discount, setDiscount] = useState();
  const [pricing, setPricing] = useState({
    originPrice: 0,
    reducedProduct: 0,
    reduced: 0,
    total: 0,
  });
  const [listDiscountCode, setListDiscountCode] = useState([]);

  // useEffect(() => {

  // }, [discountSelect]);

  useEffect(() => {
    const user = readCache(keyCache.UserInfo);
    setUserInfo(user);
  }, []);

  useEffect(() => {
    initPrice();
    handleClickOrder(true);
  }, [datacart]);

  useEffect(() => {
    // applyDiscount();
  }, [datacart]);

  useEffect(() => {
    applyDiscount();
  }, [shouldApplyDiscount]);

  useEffect(() => {
    if (discountApplied) applyDiscount();
  }, [discountApplied]);

  useEffect(() => {
    setListDiscountCode(couponList);
  }, [couponList]);

  const initPrice = () => {
    const price = calcDiscountPrice(tolalTemporary, 0);
    setPricing((prevState) => ({ ...prevState, ...price }));
    setCheckoutContext({ discount: null });
    // saveCache(keyCache.COUPON_CODE, {})
  };

  const handleItemClick = (coupon) => {
    setDiscount(coupon);
    setSearch(coupon.code);
    onItemClick && onItemClick(coupon);
  };

  const filterCouponList = debounce((search) => {
    setListDiscountCode(couponList.filter((item) => item?.code?.includes(search)));
  }, 800);

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
    filterCouponList(event.target.value);
  };

  const applyDiscount = () => {
    if (!discount) {
      initPrice();
      return;
    }
    discountRule();
  };

  const discountRule = () => {
    const isProductRule = (discount?.requirements || []).every((i) => i.product);
    if (isProductRule) {
      executeProductRule();
      return;
    }

    const isPriceRule = (discount?.requirements || []).every((i) => i.price);
    if (isPriceRule) {
      executePriceRule();
    }
  };

  const executeProductRule = () => {
    const productDiscountIds = discount?.requirements?.map((discount) => discount.product);
    const conditionDiscountAndQuantity = totalDiscountOfProduct(discount?.requirements);
    const productDiscountList = [];
    const productWithoutDiscountList = [];

    const discountMatchRequirements = datacart
      .filter((item) => !isCombo(item))
      .map((product) => {
        if (productDiscountIds?.includes(product.id)) {
          const coupon = { ...conditionDiscountAndQuantity[product.id] };

          const quantities = coupon.quantity.filter((q) => product.quantity >= q);
          const quantity = quantities[quantities.length - 1];

          const percentage = coupon.percentage[quantities.length - 1] || 0;

          const discount = calcDiscountPrice(product.price * product.quantity, percentage, null);
          const { reduced } = calcDiscountPrice(product.price, percentage, null);

          if (product.quantity >= quantity) {
            delete coupon.product_obj;
            const addDiscountParams = {
              ...product,
              coupon: {
                ...coupon,
                discount: {
                  ...discount,
                  discountProduct: product.price - reduced,
                },
              },
            };
            productDiscountList.push(discount);
            return addDiscountParams;
          }
          toast.error(`${t("notEnoughConditionUseDiscount")}`, { toastId });
          const removeDiscountParams = { ...product };
          delete removeDiscountParams.coupon;
          return removeDiscountParams;
        }
        productWithoutDiscountList.push(product);
        return null;
      })
      .filter((discount) => discount);

    const totalReducedDiscount = productDiscountList.reduce((prev, curr) => prev + curr.reduced, 0);
    const totalDiscount = productDiscountList.reduce((prev, curr) => prev + curr.total, 0);
    const totalWithoutDiscount = productWithoutDiscountList.reduce(
      (prev, curr) => prev + curr.price * curr.quantity,
      0,
    );

    setDiscountApplied(discount);
    setPricing((prevPrice) => ({
      ...prevPrice,
      reduced: totalReducedDiscount,
      total: productDiscountList.length > 0 ? totalDiscount + totalWithoutDiscount : tolalTemporary,
    }));
    productCouponList && productCouponList(discountMatchRequirements);
  };

  const totalDiscountOfProduct = (requirements) => {
    const totalDiscount = requirements?.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.product]: {
          ...curr,
          percentage: requirements
            ?.map((item) => item.product === curr.product && item.percentage)
            .filter((item) => item),
          quantity: requirements
            ?.map((item) => item.product === curr.product && item.quantity)
            .filter((item) => item),
        },
      }),
      {},
    );
    return totalDiscount;
  };

  const executePriceRule = () => {
    productCouponList && productCouponList([]);

    const isReduceByPrice = (discount?.requirements || []).every((i) => i.value);
    const isReduceByPercentage = (discount?.requirements || []).every((i) => i.percentage);

    const discountMatchRequirementList = discount?.requirements?.filter(
      (requirement) => pricing.originPrice >= requirement.price,
    );
    const discountMatchRequirement =
      discountMatchRequirementList[discountMatchRequirementList.length - 1];

    let price;
    if (discountMatchRequirement) {
      const totalPrice = datacart
        .filter((item) => !isCombo(item))
        .reduce((prev, curr) => prev + curr.price * curr.quantity, 0);
      if (isReduceByPrice) {
        if (discountMatchRequirement.type == PERCENTAGE_TYPE) {
          price = calcDiscountPrice(totalPrice, discountMatchRequirement.value, null);
        } else {
          price = calcDiscountPrice(totalPrice, null, discountMatchRequirement.value);
        }
      }
      if (isReduceByPercentage) {
        price = calcDiscountPrice(totalPrice, discountMatchRequirement.percentage, null);
      }
      setPricing(price);
      setDiscountApplied(discount);
      setCheckoutContext({ discount });
      saveCache(keyCache.COUPON_CODE, discount);
    } else {
      handleRemoveDiscountClick();
      toast.error(`${t("notEnoughConditionUseDiscount")} ${discount.code}`, { toastId });
    }
  };

  const textRequirements = (requirement) => {
    const isProduct = requirement?.product && requirement?.product_obj;
    const isPrice = requirement?.value;

    const discount = () => {
      if (requirement?.percentage) return `${requirement.percentage}%`;
      if (requirement?.value) {
        if (requirement?.type == PERCENTAGE_TYPE) return `${requirement.value}%`;
        return `${formatPrice(requirement.value)}`;
      }
      return "";
    };

    if (isProduct) {
      return (
        <Text>
          {t("reduce")} <b>{discount()}</b> {t("for")}{" "}
          <b>{requirement?.product_obj?.translates[0].name}</b> {t("buyFrom")}{" "}
          <b>{requirement.quantity}</b> {t("aboveText")}
        </Text>
      );
    }
    if (isPrice) {
      return (
        <Text>
          {t("reduce")} <b>{discount()}</b> {t("forOrderFrom")}{" "}
          <b>{formatPrice(requirement.price)}</b> {t("aboveText")}
        </Text>
      );
    }
    return null;
  };

  const handleClickApply = () => {
    if (discount?.limit <= 0) {
      toast.error(`${t("overuseDiscountCode")} ${discount.code}`, { toastId });
      return;
    }

    const isFlashSale = datacart.some((item) => item.flash_sale);
    const isPromotion = datacart.some((item) => item.promotion);
    const isCharity = datacart.some((item) => item.charity);
    const isCombo = datacart.some((item) => item.comboId);

    if (isFlashSale || isPromotion || isCharity || isCombo) {
      toast.error(`${t("cannotApplyDiscountCode")}`, { toastId });
      handleRemoveDiscountClick();
      return;
    }
    const isMatchProduct = checkProductMatchCoupon();

    if (!isMatchProduct) {
      toast.error(`${t("cannotApplyDiscountCode")}`, { toastId });
      handleRemoveDiscountClick();
      return;
    }
    productCouponList && productCouponList([]);

    applyDiscount();
  };

  const checkProductMatchCoupon = () => {
    const isProductCoupon = discount?.requirements?.[0]?.product;
    if (isProductCoupon) {
      const productIds = datacart.map((p) => p.id);
      const productInCouponIds = discount?.requirements?.map((d) => d.product);
      const isExistsProduct = productInCouponIds?.some((item) => productIds?.includes(item));
      return isExistsProduct;
    }
    return true;
  };

  const handleRemoveDiscountClick = () => {
    initPrice();
    setSearch("");
    setDiscount(null);
    setDiscountApplied(null);
    saveCache(keyCache.COUPON_CODE, {});
    productCouponList && productCouponList([]);
  };

  const handleClickOrder = (initialShopping = false) => {
    setLoading(true);
    if (datacart.length > 0) {
      if (!initialShopping) {
        saveCache(keyCache.invalidOrder, {});
      }
      const products = orderValidateData(datacart);
      orderValidate({ products })
        .then((res) => {
          const { data } = res;
          if (
            Object.keys(res?.data?.products || {}).length > 0 ||
            Object.keys(res?.data?.combos || {}).length > 0
          ) {
            setLoading(false);
            setOrderError(data);
          } else {
            if (discountApplied) {
              setCheckoutContext({
                discount: {
                  code: discountApplied.code,
                  id: discountApplied.id,
                  reduced: pricing.reduced,
                },
                totalPrice: pricing.total,
              });
            } else {
              setCheckoutContext({ totalPrice: pricing.total });
            }
            if (!initialShopping) {
              router.push("/checkout");
            }
          }
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const renderEmpty = () => (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      height="100%"
      padding="0 40px"
    >
      <Text color="#071133" fontSize="16px" fontWeight="600">
        {t("notDiscountCode")}
      </Text>
      <Text color="#718096" fontSize="16px" marginTop="8px" fontWeight="500" textAlign="center">
        {t("enterDiscountCode")}
      </Text>
    </Box>
  );
  const renderDiscountCodeDetail = (coupon) => {
    const groupBy = Object.values(_.groupBy(coupon.requirements, (item) => item.product));
    const requirements = groupBy
      .map((item) => item.sort((a, b) => a.percentage - b.percentage))
      .flat(1);

    return (
      <Box
        width="48vw"
        maxWidth="700px"
        minWidth="350px"
        position="absolute"
        left="97%"
        top="0"
        backgroundColor="#ffffff"
        borderRadius="20px"
        filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
        padding="18px 0"
        display="none"
      >
        <Flex flexDirection="column" flex={1}>
          <Flex flexGrow={1} padding="14px 24px" backgroundColor="#f5f5f5">
            <Text fontWeight={400} fontSize={16} flex={1}>
              {t("discountCode")}
            </Text>
            <Text fontWeight={400} fontSize={16} flex={1}>
              {coupon.code}
            </Text>
          </Flex>
          <Flex flexGrow={1} padding="14px 24px">
            <Text fontWeight={400} fontSize={16} flex={1}>
              {t("expire")}
            </Text>
            <Text fontWeight={400} fontSize={16} flex={1}>
              {moment(`${coupon.end_date} ${coupon.end_time}`).format("DD/MM/YYYY HH:mm")}
            </Text>
          </Flex>
          <Flex flexGrow={1} padding="14px 24px" backgroundColor="#f5f5f5">
            <Text fontWeight={400} fontSize={16} flex={1}>
              {t("limitedUse")}
            </Text>
            <Text fontWeight={400} fontSize={16} flex={1}>
              {coupon.limit}
            </Text>
          </Flex>
          <Flex flexGrow={1} flexDirection="column" padding="14px 24px 24px">
            <Text fontWeight={400} fontSize={16} flex={1}>
              {t("programName")}
            </Text>
            <Text fontWeight={400} fontSize={16} flex={1} marginTop="5px">
              {coupon.translates[0].language_value}
            </Text>
          </Flex>
          <Flex flexGrow={1} flexDirection="column" padding="14px 24px" backgroundColor="#f5f5f5">
            <Text fontWeight={400} fontSize={16} flex={1}>
              {t("condition")}
            </Text>
            <UnorderedList marginLeft="28px" marginTop="5px">
              {requirements?.map((requirement) => (
                <ListItem key={requirement.id}>{textRequirements(requirement)}</ListItem>
              ))}
            </UnorderedList>
          </Flex>
        </Flex>
      </Box>
    );
  };
  const renderListDiscountCode = () => (
    <Box height="100%" overflowY="scroll" overflowX="hidden">
      {listDiscountCode.map((item, index) => {
        const isChecked = item.id == discountApplied?.id;
        return (
          <Box
            onClick={() => handleItemClick(item)}
            cursor="pointer"
            padding="16px 25px"
            display="flex"
            alignItems="center"
            key={item.id}
            borderBottom={index + 1 === listDiscountCode.length ? "" : "1px solid #CBD5E0"}
          >
            {isChecked && (
              <Image
                width="16px"
                src="/icons/ic-checked.svg"
                alt="Icon Checked"
                marginRight="16px"
                marginTop="8px"
                alignSelf="start"
              />
            )}
            <Text
              display="flex"
              flex="1"
              marginRight="1em"
              marginLeft={isChecked ? "0" : "1.8em"}
              fontWeight="600"
              fontSize="16px"
              color={isChecked ? "#007BFF" : '"#071133"'}
            >
              {item.code} -{item.translates[0].language_value}
            </Text>

            <Box
              justifyContent="flex-end"
              display="flex"
              width={20}
              height={21}
              position="relative"
              _hover={{
                "& + div": {
                  display: "flex",
                },
                "& > div": {
                  display: "flex",
                },
              }}
            >
              <Box
                display="none"
                position="absolute"
                right="-24px"
                width={0}
                height={0}
                borderTop="10px solid transparent"
                borderBottom="10px solid transparent"
                borderRight="20px solid #ffffff"
                filter="drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
              />
              <Image src="/icons/ic-more-info.svg" alt="discount detail" cursor="pointer" />
            </Box>

            {renderDiscountCodeDetail(item)}
          </Box>
        );
      })}
    </Box>
  );
  const ModalDiscountCode = () => (
    <Box
      position="relative"
      border="1px solid #CBD5E0"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      backgroundColor="#FFFFFF"
      borderRadius="4px"
      width="489px"
    >
      <Box display="flex" backgroundColor="#F8F8F8" padding="24px">
        <HStack
          spacing="10px"
          backgroundColor="#FFFFFF"
          borderRadius="4px"
          border="1px solid #CBD5E0"
          padding="5px 15px"
          flex="auto"
        >
          <Image src="/imgs/mock/shopping-cart/ic_discountcode.svg" alt="Icon Discount Code" />
          <Input
            onChange={handleChangeSearch}
            value={search}
            placeholder="Nhập mã khuyến mãi"
            border="none"
            _focus={{ border: "none" }}
            padding="0"
            _placeholder={{
              color: "#718096",
              fontSize: "14px",
              fontWeight: "500",
            }}
          />
        </HStack>
        <Box
          onClick={handleClickApply}
          cursor="pointer"
          backgroundColor="#2154FF"
          padding="13px 18px"
          borderRadius="4px"
          color="#ffff"
          fontSize="18px"
          fontWeight="bold"
          height="auto"
          marginLeft="16px"
          _hover={{ bg: "#2154FF" }}
          _focus={{ bg: "#2154FF" }}
        >
          {t("apply")}
        </Box>
      </Box>
      <Box height="210px">
        {listDiscountCode.length > 0 ? renderListDiscountCode() : renderEmpty()}
      </Box>
    </Box>
  );
  let tolalTemporary = datacart.reduce(
    (value, item) => (pricingProduct(item) || 0) * item.quantity + value,
    0,
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" margin="24px 0 34px">
        <Box position="relative">
          <Menu closeOnSelect={false}>
            <Flex>
              <MenuButton
                as={Button}
                bg="transparent"
                color="#ffffff"
                cursor="pointer"
                padding="0"
                _hover={{
                  bg: "transparent",
                  boxShadow: "transparent",
                }}
                _focus={{
                  bg: "transparent",
                  boxShadow: "transparent",
                }}
                _active={{
                  bg: "transparent",
                  boxShadow: "transparent",
                }}
              >
                {userInfo && (
                  <HStack spacing="9px">
                    <Text style={styleTextCode}>{t("discountCode")}</Text>
                    <Text color="#007BFF" fontWeight={600}>
                      {discountApplied?.code}
                    </Text>
                    <Image
                      src="/imgs/mock/shopping-cart/arrowDownCode.svg"
                      alt="Arrow Down Code"
                      cursor="pointer"
                    />
                  </HStack>
                )}
              </MenuButton>

              <MenuList padding="0">{ModalDiscountCode()}</MenuList>

              {discountApplied && (
                <Image
                  marginLeft="10px"
                  w="10px"
                  src="/imgs/mock/shopping-cart/ic_delete_cart.svg"
                  alt="Icon Delete Cart"
                  cursor="pointer"
                  onClick={handleRemoveDiscountClick}
                />
              )}
            </Flex>
          </Menu>
        </Box>
        <Box>
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem
              colSpan={1}
              fontSize="14px"
              color="#718096"
              width="100px"
              textAlign="right"
              marginRight="8px"
            >
              {t("provisionalPrice")}:
            </GridItem>
            <GridItem style={styleTextCode} colSpan={1} textAlign="right">
              {formatPrice(tolalTemporary)}
            </GridItem>
            <GridItem
              colSpan={1}
              fontSize="14px"
              color="#718096"
              width="100px"
              textAlign="right"
              marginRight="8px"
              padding="19px 0 35px"
            >
              {t("discountv1")}:
            </GridItem>
            <GridItem style={styleTextCode} textAlign="right" colSpan={1} padding="19px 0 35px">
              {formatPrice(pricing.reduced)}
            </GridItem>
            <GridItem
              borderTop="1px solid #BCCCFF"
              paddingTop="10px"
              fontSize="18px"
              color="#2154FF"
              fontWeight="500"
              colSpan={1}
            >
              {t("totalMoney")}:
            </GridItem>
            <GridItem
              borderTop="1px solid #BCCCFF"
              paddingTop="10px"
              fontWeight="bold"
              paddingLeft="7px"
              colSpan={1}
              textAlign="right"
              fontSize="18px"
              color="#2154FF"
            >
              {formatPrice(pricing.total)}
            </GridItem>
          </Grid>
        </Box>
      </Box>
      <Flex alignItems="center" position="relative" justifyContent="flex-end">
        <Link passHref shallow href={ROUTE_PRODUCT(locale)}>
          <Button
            as={LinkUI}
            border="1px solid #2154FF"
            backgroundColor="#ffff"
            padding="13px 50px"
            height="auto"
            color="#2154FF"
            minWidth={{ base: "50%", md: "272px" }}
            _hover={{ bg: "#ffff" }}
            _focus={{ bg: "#ffff" }}
            marginRight={{ base: "15px", lg: "28px" }}
          >
            {t("continueShopping")}
          </Button>
        </Link>
        <Button
          padding="13px 50px"
          height="auto"
          backgroundColor="#2154FF"
          _hover={{ bg: "#2154FF" }}
          _focus={{ bg: "#2154FF" }}
          boxShadow="0px 2px 7px rgba(120, 137, 149, 0.254784)"
          color="#ffff"
          minWidth={{ base: "50%", md: "272px" }}
          marginLeft={{ base: "8px", lg: "0" }}
          textDecoration="none"
          isLoading={loading}
          onClick={() => handleClickOrder()}
        >
          {t("placeOrder")}
        </Button>
      </Flex>
    </Box>
  );
}
DiscountCode.defaultProps = {
  datacart: [],
};
export default DiscountCode;
