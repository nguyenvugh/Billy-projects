import { Box, Image, Text, Button, Flex, SimpleGrid, HStack } from "@chakra-ui/react";
import { STEP_3 } from "@ltp/constants/checkout/step";
import { formatPrice } from "@ltp/utils/price";
import Lodash from "lodash";
import useTranslation from "@ltp/hooks/useTranslation";

function StepConfirm({ onChangeStep, step1, step2, step3, addressDefault, userInfo }) {
  const { t } = useTranslation();
  const address = Lodash.get(addressDefault, "address", "");
  const ward = Lodash.get(addressDefault, "ward.name", "");
  const district = Lodash.get(addressDefault, "district.name", "");
  const city = Lodash.get(addressDefault, "city.name", "");
  const country = Lodash.get(addressDefault, "country.name", "");
  const shippingMethod = Lodash.get(step2, "shippingMethod", {});
  const paymentMethod = Lodash.get(step3, "paymentMethod", {});
  const name = Lodash.isEmpty(userInfo) ? step1?.name : addressDefault.name;
  const phone_number = Lodash.isEmpty(userInfo) ? step1?.phone : addressDefault.phone_number;
  return (
    <Box>
      <Text color="#2154FF" fontSize="24px" fontWeight="bold">
        {t("shippingInfo")}
      </Text>
      <Box h="1px" bg="#BCCCFF" margin="16px 0 32px" />
      <SimpleGrid columns={{ base: 1, md: 2 }} border="1px solid #BCCCFF" borderRadius="5px">
        <Flex
          alignItems="flex-start"
          borderRight={{ base: "none", md: "1px solid #BCCCFF" }}
          borderBottom={{ base: "1px solid #BCCCFF", md: "none" }}
          padding={{ base: "20px", md: "37px", xl: "35px" }}
        >
          <Image src="/imgs/mock/checkout/MapPinLine.svg" alt="Map Pin Line" />
          <Box paddingLeft="13px">
            <Text color="#444444" fontWeight="600" fontSize="16px">
              {name}
            </Text>
            <Text color="#444444" fontSize="16px">
              {[address, ward, district, city, country].join(", ")}
            </Text>
            <Text color="#444444" fontWeight="500" fontSize="16px">
              {phone_number}
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="flex-start" padding={{ base: "20px", md: "37px", xl: "35px" }}>
          <Image src="/imgs/mock/checkout/ic_delivery.svg" />
          <Box paddingLeft="13px">
            <HStack spacing="16px" flexWrap="wrap">
              <Text color="#071133" fontSize="16px" fontWeight="500">
                {shippingMethod.name}
              </Text>
              {shippingMethod.price > -1 ? (
                <Text>{formatPrice(shippingMethod.price)}</Text>
              ) : (
                <Text color="#14CC24" fontSize="16px">
                  {t("contactLater")}
                </Text>
              )}
            </HStack>
            {/* <Text>{shippingMethod.description}</Text> */}
          </Box>
        </Flex>
      </SimpleGrid>
      <Text color="#2154FF" fontSize="24px" fontWeight="bold" marginTop="32px">
        {t("paymentMethod")}
      </Text>
      <Box h="1px" bg="#BCCCFF" margin="16px 0 32px" />
      <Flex
        alignItems="flex-start"
        padding={{ base: "20px", md: "37px", xl: "35px" }}
        border="1px solid #BCCCFF"
        borderRadius="5px"
      >
        <Image src="/imgs/mock/checkout/CreditCard.svg" />
        <Box paddingLeft="13px">
          <Text color="#071133" fontSize="16px" fontWeight="500" marginTop="-5px">
            {paymentMethod.name}
          </Text>
          <Text>{paymentMethod.description}</Text>

          {/* <Text
              color="#071133"
              fontSize="16px"
              fontWeight="500"
              marginTop="-5px"
            >
              Thanh toán trực tuyến (Internet Banking, VNPAY-QR, Ví điện tử
              VNPAY)
            </Text>
              <Box color="#071133" fontSize="16px" fontWeight="500">
                <HStack spacing="12px" marginTop="24px">
                  <Image src="/imgs/mock/checkout/banking.svg" alt="" />
                  <Text>Ứng dụng Mobile Banking quét mã VNPAY - QR</Text>
                </HStack>
                <HStack spacing="12px" marginTop="24px">
                  <Image src="/imgs/mock/checkout/vnpay.svg" alt="" />
                  <Text>Ví điện tử VNPAY </Text>
                </HStack>
              </Box> */}
        </Box>
      </Flex>

      <Flex justifyContent="space-between" borderRadius="5px" marginTop="32px">
        <Button
          border="1px solid #BCCCFF"
          padding="16px 0"
          minW={{ base: "150px", md: "176px" }}
          color="#2154FF"
          textAlign="center"
          bg="#ffff"
          onClick={() => {
            onChangeStep(STEP_3);
          }}
        >
          {t("prevPage")}
        </Button>
      </Flex>
    </Box>
  );
}
StepConfirm.defautProps = {
  step1: {},
  addressDefault: {},
  userInfo: {},
};
export default StepConfirm;
