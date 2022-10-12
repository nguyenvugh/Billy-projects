import { Box, VStack } from "@chakra-ui/react";
import Header from "./components/Header";
import Table from "./components/Table";
function FooterConfig() {
  return (
    <VStack>
      <Header />
      <Box w="full" pt="2">
        <Table />
      </Box>
    </VStack>
  );
}

export { FooterConfig };
