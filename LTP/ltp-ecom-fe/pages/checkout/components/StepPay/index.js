import { Box, Button, HStack, Radio, Text } from "@chakra-ui/react";
import { STEP_2, STEP_3, STEP_4 } from "@ltp/constants/checkout/step";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { getOrderPayment } from "@ltp/services/checkout";
import { readCache } from "@ltp/services/datacache";
import { productsOrderParams } from "@ltp/utils/validate";
import { useAppUserContext } from "components/context/auth";
import { useCheckoutContext } from "components/context/checkout";
import Lodash from "lodash";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

function StepDelivery({ onChangeStep, handleValueStep, step3, step2 }) {
  const { t } = useTranslation();
  const { items: datacart } = useCart();
  const { userContext } = useAppUserContext();
  const { checkoutContext } = useCheckoutContext();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [dataPayment, setDataPayment] = useState([]);

  const params = {
    // ...step2.address,
    products: productsOrderParams(datacart),
    driver: step2.driverId,
  };

  const user = readCache(keyCache.UserInfo);
  if (checkoutContext?.discount?.code) params.coupon_code = checkoutContext.discount.code;
  if (!Lodash.isEmpty(user)) params.customerId = userContext.id;
  const [isNextStep, setIsNextStep] = useState(false);
  // const { results, error } = getOrderPayment(params);
  // console.log(data);
  // const dataPayment = data?.results;
  useEffect(() => {
    const isCheck = Lodash.get(step3, "paymentMethod.id", "");
    setIsNextStep(!!isCheck);
    getPayment();
  }, []);
  useEffect(() => {
    if (paymentMethod?.id) {
      setIsNextStep(true);
      handleValueStep(STEP_3, { paymentMethod });
    }
  }, [paymentMethod]);

  const getPayment = async () => {
    try {
      const request = await getOrderPayment(params);
      const response = request.data;
      setDataPayment(response.results);
    } catch (error) {
      // throw new Error(error);
      console.log(error);
    }
  };
  return (
    <Box>
      <Text color="#2154FF" fontSize="24px" fontWeight="bold">
        {t("paymentMethod")}
      </Text>
      <Box h="1px" bg="#BCCCFF" margin="16px 0 32px" />
      {(dataPayment || []).map((item, index) => {
        const isCheck = Lodash.get(step3, "paymentMethod.id", "");

        return (
          <Box
            key={index}
            border="1px solid #BCCCFF"
            borderRadius="5px"
            padding="32px"
            marginBottom="24px"
          >
            <Radio
              isDisabled={item.disabled}
              borderColor="#2154ff70"
              isChecked={item.disabled ? false : isCheck === item.id}
              value={item.id}
              onChange={() => {
                setPaymentMethod(item);
              }}
            >
              <Text color="#071133" fontSize="16px" fontWeight="500">
                {item.name}
              </Text>
              <Text>{item.description}</Text>
            </Radio>
          </Box>
        );
      })}
      <HStack justifyContent="space-between" borderRadius="5px" marginTop="32px" spacing="12px">
        <Button
          border="1px solid #BCCCFF"
          padding="16px 0"
          minW={{ base: "150px", md: "176px" }}
          color="#2154FF"
          textAlign="center"
          bg="#ffff"
          onClick={() => {
            onChangeStep(STEP_2);
          }}
        >
          {t("prevPage")}
        </Button>
        <Button
          padding="16px 0"
          minW={{ base: "150px", md: "176px" }}
          bg="#2154FF"
          _hover={{ bg: "#2154FF" }}
          _active={{ bg: "#2154FF" }}
          color="#ffff"
          textAlign="center"
          onClick={() => {
            onChangeStep(STEP_4);
          }}
          disabled={!isNextStep}
        >
          {t("next")}
        </Button>
      </HStack>
    </Box>
  );
}
StepDelivery.defaultProps = {
  handleValueStep: () => {},
};
export default StepDelivery;
