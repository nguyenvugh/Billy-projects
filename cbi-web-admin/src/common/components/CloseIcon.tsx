import React, { ComponentPropsWithoutRef } from "react";
import { Box, ChakraProps, Image } from "@chakra-ui/react";
import CloseIconRaw from "src/common/assets/icons/iconClose.svg";

function CloseIcon(props: ChakraProps & ComponentPropsWithoutRef<"div">) {
  return (
    <Box
      w="24px"
      h="24px"
      borderRadius="full"
      bg="#323232"
      p="6px"
      cursor="pointer"
      zIndex="1"
      {...props}
    >
      <Image src={CloseIconRaw} objectFit="contain" h="full" />
    </Box>
  );
}

export default CloseIcon;
