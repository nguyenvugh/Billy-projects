import { Box, ChakraProps } from "@chakra-ui/react";
import React from "react";

function Wrapper({
  children,
  ...styleProps
}: {
  children: React.ReactNode;
} & ChakraProps) {
  return (
    <Box w="full" bg="white" p="6" borderRadius="4px" shadow="wrapper" {...styleProps}>
      {children}
    </Box>
  );
}

export { Wrapper };
