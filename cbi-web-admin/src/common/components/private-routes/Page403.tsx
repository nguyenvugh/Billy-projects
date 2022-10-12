import React from "react";
import { Box, Text } from "@chakra-ui/react";

function Page403() {
  return (
    <Box display="flex" flexDir="column" alignItems="center">
      <Text fontSize="100px" fontWeight="bold">
        403
      </Text>
      <Text fontSize="30px" fontWeight="bold">
        Bạn không có quyền truy cập trang này!
      </Text>
    </Box>
  );
}

export { Page403 };
