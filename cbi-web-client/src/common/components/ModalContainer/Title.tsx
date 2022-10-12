import React from "react";
import { Text } from "@chakra-ui/react";

const Title = ({ children }: { children: any }) => {
  return (
    <Text
      fontWeight={500}
      pb={"8px"}
      pt={"24px"}
      color="#2D3748"
      fontSize={{ base: "14px", lg: "16px" }}
    >
      {children}
    </Text>
  );
};

export default Title;
