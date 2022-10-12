import React, { useState } from "react";
import { Box, VStack } from "@chakra-ui/react";
import { CbiHeader } from "./components/list/CbiHeader";
import { CbiTable } from "./components/list/CbiTable";

function Cbi() {
  const [numSubmit, setNumSubmit] = useState<number>(0);
  const [delEnabled, setDelEnabled] = useState<boolean>(false);
  return (
    <VStack>
      <CbiHeader setNumSubmit={setNumSubmit} numSubmit={numSubmit} delEnabled={delEnabled} />
      <Box w="full" pt="2">
        <CbiTable setNumSubmit={setNumSubmit} numSubmit={numSubmit} setDelEnabled={setDelEnabled} />
      </Box>
    </VStack>
  );
}

export { Cbi };
