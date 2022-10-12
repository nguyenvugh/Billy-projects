import React from "react";
import { Box, Button, Input } from "@chakra-ui/react";

const Transcribe = () => {
  return (
    <Box w="100%" display="flex" columnGap="30px">
      <Box w="50%">
        <Box w="100%" display="flex" alignItems="center" columnGap="10px">
          <Input placeholder="Keyword" />
          <Button w="100px" color="#999999" fontSize="14px">
            Edit
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="10px"
          bg="#F5F5F5"
          w="100%"
          h="250px"
          color="#1A1A1A"
          fontSize="24px"
          borderRadius="6px"
        >
          Transcipt
        </Box>
      </Box>

      <Box w="50%">
        <Box w="100%" display="flex" alignItems="center" columnGap="10px">
          <Input placeholder="Keyword" />
          <Button w="100px" color="#999999" fontSize="14px">
            Edit
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="10px"
          bg="#F5F5F5"
          w="100%"
          h="250px"
          color="#1A1A1A"
          fontSize="24px"
          borderRadius="6px"
        >
          Paragraph
        </Box>
      </Box>
    </Box>
  );
};

export default Transcribe;
