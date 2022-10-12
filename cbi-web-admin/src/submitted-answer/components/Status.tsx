import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";

export enum EStatus {
  CHECKED = 1,
  UNCHECKED = -1,
}

export default function Status({ type }: { type: EStatus }) {
  return (
    <Box
      bg={type === EStatus.UNCHECKED ? "#E53E3E" : "#61A533"}
      py="4px"
      px="12px"
      borderRadius="15px"
    >
      <Center>
        <Text color="white">{type === EStatus.CHECKED ? "Đã chấm" : "Chưa chấm"}</Text>
      </Center>
    </Box>
  );
}
