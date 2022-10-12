import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";

const buttonStyles = {
  border: "3px solid #BCCCFF",
  w: { base: "36px", md: "48px" },
  h: { base: "36px", md: "48px" },
  borderRadius: "50%",
};

const buttonIconStyles = {
  w: { base: "20px", md: "42px" },
  maxW: { base: "20px", md: "42px" },
};

const titleStyles = {
  // mt: 2,
  fontSize: { base: 12, md: 16 },
  textAlign: "center",
  maxW: { base: "78px", md: "initial" },
  marginRight: { base: "auto", md: "initial" },
  marginLeft: { base: "auto", md: "initial" },
  position: "absolute",
  top: { base: "43px", md: "53px" },
  right: 0,
  left: 0,
};

const StepConnecter = ({ isActive }) => (
  <Box
    as="span"
    display="inline-block"
    bg={`rgba(33, 84, 255, ${isActive ? "1" : "0.2"})`}
    w={["14px", "25px", "35px", 10, 20]}
    h={{ base: "8px" }}
  />
);

export default function Stepper({ tabsActivated }) {
  const { t } = useTranslation();
  const isActive = (id) => id <= tabsActivated;

  return (
    <Flex justifyContent="center" padding={["16px 0 57px", "32px 0 70px", "32px 0 58px"]}>
      <Box display="inline-block" position="relative">
        <Button
          bg="#2154FF"
          {...buttonStyles}
          ml={["23px", "30px", "35px", 15, 20]}
          as={Box}
          _hover="not(.active)"
          _active="not(.active)"
        >
          <Image
            src="/icons/checkout/check.svg"
            w={{ base: "20px", md: "40px" }}
            {...buttonIconStyles}
          />
        </Button>
        <StepConnecter isActive={isActive(2)} />
        <Text
          {...titleStyles}
          color={isActive(1) ? "#2154FF" : "#BCCCFF"}
          fontWeight={isActive(1) ? "bold" : "initial"}
        >
          {/* Đăng nhập */}
          {t("shippingInfo")}
        </Text>
      </Box>
      <Box display="inline-block" position="relative">
        <StepConnecter isActive={isActive(2)} />
        <Button
          {...buttonStyles}
          bg={isActive(2) ? "#2154FF" : "#ffffff"}
          as={Box}
          _hover="not(.active)"
          _active="not(.active)"
        >
          <Image
            src={`/icons/checkout/${isActive(2) ? "location.svg" : "location-disabled.svg"}`}
            {...buttonIconStyles}
          />
        </Button>
        <StepConnecter isActive={isActive(3)} />
        <Text
          {...titleStyles}
          color={isActive(2) ? "#2154FF" : "#BCCCFF"}
          fontWeight={isActive(2) ? "bold" : "initial"}
        >
          {t("delivery")}
        </Text>
      </Box>
      <Box display="inline-block" position="relative">
        <StepConnecter isActive={isActive(3)} />
        <Button
          {...buttonStyles}
          bg={isActive(3) ? "#2154FF" : "#ffffff"}
          as={Box}
          _hover="not(.active)"
          _active="not(.active)"
        >
          <Image
            src={`/icons/checkout/${isActive(3) ? "payment.svg" : "payment-disabled.svg"}`}
            {...buttonIconStyles}
          />
        </Button>
        <StepConnecter isActive={isActive(4)} />
        <Text
          {...titleStyles}
          color={isActive(3) ? "#2154FF" : "#BCCCFF"}
          fontWeight={isActive(3) ? "bold" : "initial"}
        >
          {/* Thanh toán */}
          {t("paymentMethod")}
        </Text>
      </Box>
      <Box display="inline-block" position="relative">
        <StepConnecter isActive={isActive(4)} />
        <Button
          {...buttonStyles}
          bg={isActive(4) ? "#2154FF" : "#ffffff"}
          mr={["23px", "30px", "35px", 10, 20]}
          as={Box}
          _hover="not(.active)"
          _active="not(.active)"
        >
          <Image
            src={`/icons/checkout/${isActive(4) ? "confirm.svg" : "confirm-disabled.svg"}`}
            {...buttonIconStyles}
          />
        </Button>
        <Text
          {...titleStyles}
          color={isActive(4) ? "#2154FF" : "#BCCCFF"}
          fontWeight={isActive(4) ? "bold" : "initial"}
        >
          {t("confirm")}
        </Text>
      </Box>
    </Flex>
  );
}
