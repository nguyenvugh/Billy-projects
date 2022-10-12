import { Box, ChakraProps, Collapse, Text } from "@chakra-ui/react";
import React from "react";

function ErrorMess({ error, ...rest }: { error?: string | boolean } & ChakraProps) {
  return (
    <Box h="40px">
      <Collapse in={!!error} animateOpacity>
        <Text color="red.primary" fontSize="14px" {...rest}>
          {error}
        </Text>
      </Collapse>
    </Box>
  );
}

export { ErrorMess };
