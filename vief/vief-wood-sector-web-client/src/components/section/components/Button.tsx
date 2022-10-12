import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { ButtonComponentProps } from "../interface";
import ArrowForward from "../../../Images/Icons/ArrowForward";

export default function ButtonComponent({
  wrapperStyle,
  btnTitle = "Xem thêm",
  isArrowForward = true,
  textHeight,
}: ButtonComponentProps) {
  return (
    <Button
      size={"md"}
      {...wrapperStyle}
      mt={wrapperStyle?.mt || "32px"}
      backgroundColor={"blue.primary"}
      colorScheme="blue.primary"
      p={wrapperStyle?.p || "8px"}
    >
      <Text
        fontSize={"14px"}
        fontWeight="500"
        color={"white.primary"}
        mr={isArrowForward ? "8px" : 0}
        h={textHeight}
      >
        {btnTitle}
      </Text>
      {isArrowForward && <ArrowForward />}
    </Button>
  );
}
