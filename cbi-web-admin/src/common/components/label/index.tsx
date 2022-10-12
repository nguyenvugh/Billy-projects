import React from "react";
import { ChakraProps, FormLabel, Text } from "@chakra-ui/react";

function Label({
  label,
  isRequired,
  ml,
  mt,
}: { label: string; isRequired?: boolean; ml?: string; mt?: string } & ChakraProps) {
  return (
    <FormLabel mt={mt} ml={ml} fontWeight="normal" fontSize="14px">
      {label}
      {isRequired && (
        <Text display="inline" color="red" ml="1">
          *
        </Text>
      )}
    </FormLabel>
  );
}

export { Label };
