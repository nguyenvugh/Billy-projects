import { Box, Button, Grid, GridItem, Image, Link } from "@chakra-ui/react";
import Container from "@ltp/components/Container/index";
import { useAppUserContext } from "@ltp/components/context/auth";
import ModalOrderError from "@ltp/components/ModalError";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { getAddressUser } from "@ltp/services/address";
import { HOST } from "@ltp/services/axios";
import { CustomerOrder, orderValidate } from "@ltp/services/checkout";
import { readCache, saveCache } from "@ltp/services/datacache";
import { orderValidateData, productsOrderParams } from "@ltp/utils/validate";
import { useCheckoutContext } from "components/context/checkout";
import Lodash from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";
import ModalError from "./components/ModalError";
import Orders from "./components/orders";
import StepConfirm from "./components/StepConfirm";
import StepDelivery from "./components/StepDelivery";
import StepLogin from "./components/StepLogin";
import StepPay from "./components/StepPay";
import Stepper from "./components/Stepper";

const paymentOnline = "thanh toán trực tuyến";

function Checkout() {
  const refModalError = useRef(null);
  const { t } = useTranslation();
  const { userContext, setUserContext } = useAppUserContext();
  const { checkoutContext } = useCheckoutContext();
  const router = useRouter();
  const { query } = router;
  const stepActiveQuery = query?.stepActive;
  const valueStepQuery = query?.valueStep;
  const ISSERVER = typeof window === "undefined";
  const userIP = !ISSERVER ? sessionStorage.getItem("userIP") : "";
  const { items: datacart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [stepActive, setStepActive] = useState(1);
  const [errorCreateOrder, setErrorCreateOrder] = useState("");
  const [valueStep, setValueStep] = useState({
    step1: {},
    step2: {},
    step3: {},
  });
  const [addressDefault, setaddressDefault] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [orderError, setOrderError] = useState();
  const [orderProductError, setOrderProductError] = useState([]);
  const [errorPopup, setErrorPopup] = useState("");
  const [coupoCode, setCouponCode] = useState({});
  useEffect(() => {
    const res = readCache(keyCache.COUPON_CODE, {});
    setCouponCode(res);
  }, []);
  useEffect(() => {
    const productsParams = productsOrderParams(datacart);
    let step = 1;
    if (+stepActiveQuery) {
      step = +stepActiveQuery;
    } else if (Lodash.isEmpty(userContext)) {
      step = 1;
    } else {
      step = 2;
    }
    setStepActive(step);
    setValueStep(
      !valueStepQuery
        ? {
            step1: { productsOrderParams: productsParams },
            step2: { productsOrderParams: productsParams },
            step3: { productsOrderParams: productsParams },
          }
        : JSON.parse(decodeURIComponent(valueStepQuery)),
    );
  }, [query, userContext, datacart]);

  useEffect(() => {
    if (+stepActive === 4) {
      const user = readCache(keyCache.UserInfo);
      if (Lodash.isEmpty(user)) {
        const dataCache = readCache(keyCache.addressDefault);
        setaddressDefault(dataCache || {});
      } else {
        const getAddress = async () => {
          const data = await getAddressUser();
          const results = Lodash.get(data, "data.results", []);
          const dataDefault =
            (results || []).filter((item) => item.is_default === 1)[0] || results[0] || {};
          setaddressDefault(dataDefault);
        };
        getAddress();
      }
      setUserInfo(user || {});
    }
  }, [stepActive]);
  const onChangeStep = (value) => {
    setStepActive(value);
  };
  const handleValueStep = (step, value) => {
    setValueStep({
      ...valueStep,
      [`step${step}`]: value,
    });
  };

  const getSortedOrderCallback = (orders) => {
    setOrderList(orders);
  };

  const renderSteper = () => {
    switch (+stepActive) {
      case 1:
        return (
          <StepLogin onChangeStep={onChangeStep} handleValueStep={handleValueStep} {...valueStep} />
        );
      case 2:
        return (
          <StepDelivery
            sortedOrderCallback={getSortedOrderCallback}
            onChangeStep={onChangeStep}
            handleValueStep={handleValueStep}
            addressDefault={addressDefault}
            {...valueStep}
          />
        );
      case 3:
        return (
          <StepPay onChangeStep={onChangeStep} handleValueStep={handleValueStep} {...valueStep} />
        );
      case 4:
        return (
          <StepConfirm
            onChangeStep={onChangeStep}
            handleValueStep={handleValueStep}
            userInfo={userInfo}
            addressDefault={addressDefault}
            {...valueStep}
          />
        );
      default:
        return (
          <StepLogin onChangeStep={onChangeStep} handleValueStep={handleValueStep} {...valueStep} />
        );
    }
  };

  const comfirmOrder = () => {
    setIsLoading(true);
    const data = orderValidateData(datacart);
    orderValidate({ products: data })
      .then((res) => {
        if (
          Object.keys(res?.data?.products || {}).length > 0 &&
          Object.keys(res?.data?.combos || {}).length > 0
        ) {
          setOrderError(res?.data);
        } else {
          handleCreateOrder();
        }
      })
      .catch(() => {
        setIsLoading(false);
        setErrorCreateOrder(t("desOrderIncorrect"));
        refModalError.current.openModal();
      });
  };

  const handleCreateOrder = async () => {
    const alias = addressDefault?.alias;
    const address = Lodash.get(addressDefault, "address", "");
    const wardId = Lodash.get(addressDefault, "ward.id", "");
    const districtId = Lodash.get(addressDefault, "district.id", "");
    const cityId = Lodash.get(addressDefault, "city.id", "");
    const countryId = Lodash.get(addressDefault, "country.id", "");
    const shippingMethod = Lodash.get(valueStep, "step2.shippingMethod", {});
    const paymentMethod = Lodash.get(valueStep, "step3.paymentMethod", {});
    const products = productsOrderParams(datacart);
    let nameCustomer = addressDefault?.name;
    let emailCustomer = userContext?.email;
    let phoneCustomer = addressDefault?.phone_number;
    const driverId = Lodash.get(valueStep, "step2.driverId", "");
    const shippingMethodId = String(shippingMethod.id).split("_")[1];
    if (valueStep?.step1?.typeLogin === "2") {
      nameCustomer = valueStep?.step1?.name;
      emailCustomer = valueStep?.step1?.email;
      phoneCustomer = valueStep?.step1?.phone;
    }
    try {
      const params = {
        payment: {
          type: +paymentMethod.id,
          returnUrl: `${HOST}/checkout/success`,
          customerIpAddress: userIP ? `${userIP}` : "",
        },
        shipping: {
          driver: driverId,
          type: +shippingMethodId,
          name: nameCustomer,
          address,
          phone_number: phoneCustomer,
          countryId: +countryId,
          cityId: +cityId,
          districtId: +districtId,
          wardId: +wardId,
          email: emailCustomer,
        },
        products,
      };
      if (alias) {
        params.shipping.alias = alias;
      }
      // if (!Lodash.isEmpty(userContext)) params.customerId = userContext.id;
      if (checkoutContext?.discount?.code) {
        params.coupon_code = checkoutContext.discount.code;
        params.coupon = {
          quantity: coupoCode?.quantity,
          type: coupoCode?.type,
          requirements: coupoCode?.requirements,
        };
      }
      const data = await CustomerOrder(params);
      if (Lodash.get(data, "data.status", 0) === 1) {
        const orderId = Lodash.get(data, "data.order.code", "");
        const paymentLink = Lodash.get(data, "data.order.request_payment_link", "");
        if (paymentMethod.name.toLowerCase().includes(paymentOnline)) {
          router.replace(paymentLink);
        } else {
          router.push({
            pathname: "/checkout/success",
            query: { orderId: orderId || 0 },
          });
        }
      } else {
        setIsLoading(false);
        refModalError.current.openModal();
        setOrderProductError(data?.data);
      }

      // setIsLoading(false);
    } catch (error) {
      if (error?.status === 401) {
        setIsLoading(false);
        setErrorPopup(t("lockedAccountCheckout"));
        refModalError.current.openModal();
      } else {
        setIsLoading(false);
        setErrorCreateOrder(error?.message || t("desOrderIncorrect"));
        refModalError.current.openModal();
      }
    }
  };
  const paymentMethod = Lodash.get(valueStep, "step3.paymentMethod", {});
  const onBackCart = () => {
    if (!errorPopup.includes(t("lockedAccountCheckout"))) {
      saveCache(keyCache.invalidOrder, orderProductError);
      router.push({
        pathname: "/shopping-cart",
        query: {
          validate_cart: true,
        },
      });
      refModalError.current.closeModal();
    } else {
      setUserContext({});
      setStepActive(1);
      setValueStep({
        step1: {},
        step2: {},
        step3: {},
      });
      setErrorPopup("");
      refModalError.current.closeModal();
    }
  };
  return (
    <div>
      <Head>
        <title>{t("payment")}</title>
        <meta name="description" content="LTP-ecommerce" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <ModalError orderError={orderError} />
        <ModalOrderError
          ref={refModalError}
          title={t("titleOrderIncorrect")}
          description={errorPopup || t("desOrderIncorrect")}
          textClose={errorPopup ? t("textBackFastPayment") : t("textBackToCart")}
          handleButton={() => onBackCart()}
        />
        <Container>
          <Box color="#7B8794" margin="32px 0" fontSize="12px" fontWeight="600">
            <Link href="/">{t("homePage")}</Link>
            <Image src="/imgs/arrow-breadcrumb.svg" display="inline-block" padding="0 8px" />
            <Link href="/shopping-cart">{t("cart")}</Link>
            <Image src="/imgs/arrow-breadcrumb.svg" display="inline-block" padding="0 8px" />
            Checkout
          </Box>
          {!!errorCreateOrder && +stepActive === 4 && (
            <Box color="#ef1717" bg="#ff000021" padding="10px" marginBottom={8}>
              {errorCreateOrder}
            </Box>
          )}
        </Container>
        <Box bg="rgba(241, 248, 255, 0.5)" borderRadius={5}>
          <Stepper tabsActivated={stepActive} onChangeStep={onChangeStep} />
        </Box>
        <Container>
          <Box py={8} mt={8}>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              <GridItem
                colSpan={{ base: 1, md: 2 }}
                marginRight={[0, 0, 0, 0, "80px", "80px", "125px"]}
              >
                {renderSteper()}
              </GridItem>
              <GridItem colSpan={1}>
                <Orders stepActive={stepActive} valueStep={valueStep} orders={orderList} />
                {+stepActive === 4 && (
                  <Button
                    w="100%"
                    bg="#2154FF"
                    boxShadow="0px 2px 7px rgba(120, 137, 149, 0.254784)"
                    borderRadius="5px"
                    padding="16px 0"
                    textAlign="center"
                    color="#ffff"
                    marginTop="32px"
                    _hover={{ bg: "#2154FF" }}
                    _active={{ bg: "#2154FF" }}
                    onClick={comfirmOrder}
                    isLoading={isLoading}
                  >
                    {paymentMethod?.name?.toLowerCase().includes(paymentOnline)
                      ? t("proceedPayment")
                      : t("confirm")}
                  </Button>
                )}
              </GridItem>
            </Grid>
          </Box>
        </Container>
      </main>
    </div>
  );
}
export default Checkout;
