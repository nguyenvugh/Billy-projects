import { Box, HStack, Image, Text } from "@chakra-ui/react";
import { CompanyInfoContext } from "@ltp/components/context/company-info";
import { LANG_VI } from "@ltp/constants/languages";
import useTranslation from "@ltp/hooks/useTranslation";
import Link from "next/link";
import { useContext } from "react";

function OrderSuccess(props) {
  const { t } = useTranslation();
  const { companyInfo } = useContext(CompanyInfoContext);
  const { orderId } = props;

  return (
    <Box
      textAlign="center"
      w={{ base: "500px", md: "700px", xl: "836px" }}
      padding={{ base: "10px", md: "0" }}
    >
      <Image
        src="/imgs/mock/checkout/ic_unsuccess.svg"
        margin="auto"
        boxSize={{ base: "45px", lg: "87px" }}
      />
      <Text
        color="#EA403F"
        fontSize={{ base: "18px", md: "24px", xl: "28px" }}
        fontWeight="bold"
        marginTop={{ base: "12px", md: "14px", xl: "15px" }}
      >
        {t("failOrder")}
      </Text>
      <Box
        fontSize={{ base: "14px", md: "16px", xl: "18px" }}
        marginTop={{ base: "17px", md: "22px", xl: "24px" }}
      >
        <Text color="#EA403F" display="inline-block">
          {t("payOrder")}
          <Text display="inline-block" color="#007BFF" padding="0 5px">
            {`#${orderId}`}
          </Text>
          {t("byVNPayFail")}
        </Text>
      </Box>
      <Box margin={{ base: "17px 0", md: "22px 0", xl: "24px 0" }}>
        <Text fontSize={{ base: "14px", md: "16px", xl: "18px" }}>
          {t("failTransaction")}
          <Text display="inline-block" padding="0 5px" fontWeight="500">
            {t("contact")} {companyInfo?.[`${LANG_VI}.hotline`]}
          </Text>
          {t("retryInMins")}
        </Text>
      </Box>
      <HStack
        spacing={{ base: 0, md: "26px" }}
        fontWeight="500"
        fontSize="16px"
        flexWrap={{ base: "wrap", md: "initial" }}
        justifyContent="center"
      >
        <Link href="/shopping-cart">
          <Box
            width={{ base: "100%", md: "50%" }}
            marginTop={{ base: "15px !important", md: "0 !important" }}
            bg="#2154FF"
            borderRadius="5px"
            padding="11px"
            textAlign="center"
            color="#ffff"
            as="button"
          >
            <Text fontSize={{ base: "14px", md: "15px", xl: "16px" }}>{t("backCart")}</Text>
          </Box>
        </Link>
      </HStack>
    </Box>
  );
}
export default OrderSuccess;
