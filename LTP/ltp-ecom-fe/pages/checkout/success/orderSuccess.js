import { Box, HStack, Image, Link, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_PRODUCT } from "@ltp/utils/constant";
import Lodash from "lodash";

function OrderSuccess(props) {
  const { t, locale } = useTranslation();
  const { orderId, userInfo, setOpenAuthModal } = props;
  return (
    <Box textAlign="center" w={{ base: "350px", md: "470px", xl: "550px" }}>
      <Image
        src="/imgs/mock/checkout/ic_success.svg"
        margin="auto"
        boxSize={{ base: "45px", lg: "87px" }}
      />
      <Text
        color="#2154FF"
        fontSize={{ base: "18px", md: "24px", xl: "28px" }}
        fontWeight="bold"
        marginTop={{ base: "12px", md: "14px", xl: "15px" }}
      >
        {t("orderSuccess")}
      </Text>
      <Box
        fontSize={{ base: "14px", md: "16px", xl: "18px" }}
        marginTop={{ base: "17px", md: "22px", xl: "24px" }}
      >
        <Text display="inline-block" paddingRight="8px">
          {t("yourOrderIdIs")}{" "}
        </Text>
        <Text color="#007BFF" display="inline-block">
          {`#${orderId}`}
        </Text>
      </Box>
      <Box margin={{ base: "17px 0", md: "22px 0", xl: "24px 0" }}>
        {Lodash.isEmpty(userInfo) ? (
          <Text fontSize={{ base: "14px", md: "16px", xl: "18px" }}>{t("youCanFollow")}</Text>
        ) : (
          <Text fontSize={{ base: "14px", md: "16px", xl: "18px" }}>
            {t("youGoTo")}
            <Text display="inline-block" padding="0 5px" fontWeight="600">
              {`“${t("orderManagement")}”`}
            </Text>
            {t("toFollowAndUpdate")}
          </Text>
        )}
      </Box>
      {Lodash.isEmpty(userInfo) ? (
        <HStack
          spacing={{ base: 0, md: "26px" }}
          fontWeight="500"
          fontSize="16px"
          flexWrap={{ base: "wrap", md: "initial" }}
        >
          <Link
            width={{ base: "100%", md: "50%" }}
            border="1px solid #BCCCFF"
            borderRadius="5px"
            padding="11px"
            color="#2154FF"
            textAlign="center"
            _hover={{ textDecoration: "none" }}
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
            href={ROUTE_PRODUCT(locale)}
          >
            {t("continueShopping")}
          </Link>
          <Box
            width={{ base: "100%", md: "50%" }}
            marginTop={{ base: "15px !important", md: "0 !important" }}
            bg="#2154FF"
            borderRadius="5px"
            padding="11px"
            textAlign="center"
            color="#ffff"
            as="button"
            onClick={setOpenAuthModal}
          >
            <Text fontSize={{ base: "14px", md: "15px", xl: "16px" }}>{t("createAccount")}</Text>
          </Box>
        </HStack>
      ) : (
        <HStack
          spacing={{ base: 0, md: "26px" }}
          fontWeight="500"
          fontSize="16px"
          flexWrap={{ base: "wrap", md: "initial" }}
        >
          <Link
            width={{ base: "100%", md: "50%" }}
            border="1px solid #BCCCFF"
            _hover={{ textDecoration: "none" }}
            borderRadius="5px"
            padding="11px"
            color="#2154FF"
            textAlign="center"
            href={ROUTE_PRODUCT(locale)}
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
          >
            {t("continueShopping")}
          </Link>
          <Link
            width={{ base: "100%", md: "50%" }}
            marginTop={{ base: "15px !important", md: "0 !important" }}
            _hover={{ textDecoration: "none" }}
            bg="#2154FF"
            borderRadius="5px"
            padding="11px"
            textAlign="center"
            color="#ffff"
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
            href="/profile?activeMenu=ORDERS"
          >
            {t("orderManagement")}
          </Link>
        </HStack>
      )}
    </Box>
  );
}
export default OrderSuccess;
