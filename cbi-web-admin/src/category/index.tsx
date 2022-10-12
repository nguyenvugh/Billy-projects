import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import { CategoryHeader } from "./components/CategoryHeader";
import { CategoryTable } from "./components/CategoryTable";

function Category() {
  return (
    <VStack>
      <CategoryHeader />
      <Box w="full" pt="2">
        <CategoryTable />
      </Box>
    </VStack>
  );
}

export { Category };
