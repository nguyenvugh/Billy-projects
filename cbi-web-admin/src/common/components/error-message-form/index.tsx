import { ChakraProps, Collapse, Text } from "@chakra-ui/react";
import React from "react";

function ErrorMess({ error, ...rest }: { error?: string | boolean } & ChakraProps) {
  return (
    <Collapse in={!!error} animateOpacity>
      <Text color="red.primary" fontSize="14px" {...rest}>
        {error}
      </Text>
    </Collapse>
  );
}

export { ErrorMess };
