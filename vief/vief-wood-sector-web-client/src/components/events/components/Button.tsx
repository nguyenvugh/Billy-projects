import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { ButtonComponentProps } from "../../section/interface";

export default function ButtonEventComponent({
  wrapperStyle,
  btnTitle,
  textHeight,
  isDisabled,
  onHandleSubmit,
}: ButtonComponentProps) {
  return (
    <Button
      size={"md"}
      {...wrapperStyle}
      mt={wrapperStyle?.mt || 0}
      backgroundColor={isDisabled ? "white.100" : "blue.primary"}
      colorScheme="blue.primary"
      py={wrapperStyle?.p || "8px"}
      w={wrapperStyle?.w || "140px"}
      h={wrapperStyle?.h || "40px"}
      mr={wrapperStyle?.mr || "32px"}
      onClick={onHandleSubmit}
    >
      <Text
        fontSize={"14px"}
        fontWeight="500"
        color={isDisabled ? "text" : "white.primary"}
        h={textHeight}
        w="fit-content"
      >
        {btnTitle}
      </Text>
    </Button>
  );
}
