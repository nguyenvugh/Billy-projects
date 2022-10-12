import React from "react";
import { Box } from "@chakra-ui/react";
import Attribute from "./Attribute";
import Transcribe from "./Transcribe";

export const AddPodcast = () => {
  return (
    <Box>
      <Attribute />
      <Box mt="20px">
        <Transcribe />
      </Box>
    </Box>
  );
};
