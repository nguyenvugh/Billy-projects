import { Box, Text } from "@chakra-ui/react";

function NotifiQuantity({ message }) {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      zIndex="9"
      display="flex"
      justifyContent="center"
    >
      <Box
        bg="rgba(46, 46, 46, 0.85)"
        borderRadius="4px"
        padding={{ base: "18px 32px", md: "22px 34px" }}
        w={{ base: "385px", md: "441px" }}
      >
        <Text color="#FFFFFF" fontSize={{ base: "16px", md: "18px" }}>
          {message}
        </Text>
      </Box>
    </Box>
  );
}

export default NotifiQuantity;
