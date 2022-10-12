import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const ToastError = ({ message }: { message: string }) => {
  return (
    <Box
      p={"13px"}
      border="1px solid #FFA39E"
      bg="#FFF1F0"
      borderRadius="5px"
      display="flex"
      alignItems="center"
    >
      <Image src="/img/global/ic_toast_error.svg" />
      <Text fontSize="16px" fontWeight="medium" ml="2" color="#2D3748">
        {message}
      </Text>
    </Box>
  );
};

export default ToastError;
