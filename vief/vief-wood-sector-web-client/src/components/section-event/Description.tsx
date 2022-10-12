import { ChakraProps, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { DescriptionProps } from "./interface";

export default function Description({
  children,
  wrapperStyle,
  content,
}: DescriptionProps) {
  return (
    <Flex
      alignItems={"center"}
      {...wrapperStyle}
      ml={wrapperStyle?.ml}
      mb={wrapperStyle?.mb}
      minW="max-content"
    >
      {children}
      <Text ml={wrapperStyle?.ml || "8px"} height="24px">
        {content}
      </Text>
    </Flex>
  );
}
