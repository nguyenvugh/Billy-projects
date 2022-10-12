import { Box, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import { LeftMenu } from "./LeftMenu";

interface DashBoardLayoutProps {
  outLet?: React.ReactElement | null;
}
function DashBoardLayout({ outLet }: DashBoardLayoutProps) {
  return (
    <HStack alignItems="start" spacing="0">
      <LeftMenu />
      <VStack flexGrow={1} h="100vh" overflow="auto" spacing="0">
        <Header />
        <Box w="full" flexGrow={1} m="0px" p="6" overflow="auto">
          {outLet}
        </Box>
      </VStack>
    </HStack>
  );
}

export { DashBoardLayout };
