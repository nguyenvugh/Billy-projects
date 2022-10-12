import { Box, Radio, RadioGroup, Text } from "@chakra-ui/react";
import { useState } from "react";
import useTranslation from "@ltp/hooks/useTranslation";
import FastPayment from "./fast-payment";
import Login from "./login";

export default function Checkout({ onChangeStep, handleValueStep, step1 }) {
  const { t } = useTranslation();
  const [value, setValue] = useState(step1.typeLogin || "1");

  return (
    <Box>
      <Box>
        <RadioGroup onChange={setValue} value={value} defaultChecked={value}>
          <Radio value="1" mb={2} borderColor={value === "2" ? "#2154ff7a" : "#2154FF"}>
            <Text
              color="#2154FF"
              textTransform="uppercase"
              fontSize={18}
              fontWeight="bold"
              opacity={value === "2" ? "0.5" : "1"}
            >
              {t("logIn")}
            </Text>
          </Radio>
          <Text fontSize={14} color="#718096" opacity={value === "2" ? "0.5" : "1"}>
            {t("easiestPayment")}
          </Text>
          {value === "1" && (
            <Login onChangeStep={onChangeStep} handleValueStep={handleValueStep} step1={step1} />
          )}
          <Box h="1px" bg="#BCCCFF" mt={8} mb={8} />
          <Radio value="2" borderColor={value === "1" ? "#2154ff7a" : "#2154FF"}>
            <Text
              color="#2154FF"
              textTransform="uppercase"
              fontSize={18}
              fontWeight="bold"
              opacity={value === "1" ? "0.5" : "1"}
            >
              {t("fastPayment")}
            </Text>
          </Radio>
          <Text
            fontSize={16}
            color="#718096"
            padding="19px 0"
            opacity={value === "1" ? "0.5" : "1"}
          >
            Không yêu cầu đăng nhập đối với khách hàng
          </Text>
          {value === "2" && (
            <FastPayment
              onChangeStep={onChangeStep}
              handleValueStep={handleValueStep}
              step1={step1}
            />
          )}
        </RadioGroup>
      </Box>
    </Box>
  );
}
Checkout.defaultProps = {
  step1: {
    name: "",
    email: "",
    phone: "",
    typeLogin: "",
  },
};
