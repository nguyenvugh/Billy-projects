import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";

const ToastSuccess = ({ message }: { message: string }) => {
  return (
    <Box
      p={4}
      bg="#F6FFED"
      borderRadius="5px"
      display="flex"
      alignItems="center"
      border="1px solid #B7EB8F"
    >
      <Image src="/img/global/ic_toast_success.svg" />
      <Text fontSize="16px" ml="2" color="#2D3748">
        {message}
      </Text>
    </Box>
  );
};

ToastSuccess.propTypes = {};

export default ToastSuccess;
