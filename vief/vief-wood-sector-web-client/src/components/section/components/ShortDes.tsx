import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { ShortDesProps } from "../interface";
import ButtonComponent from "./Button";

export default function ShortDes({
  shortDes,
  wrapperStyle,
  textWidth,
  textHeight,
  btnTitle,
  haveButton = true,
  textAlign = "justify",
}: ShortDesProps) {
  return (
    <Box {...wrapperStyle}>
      <Text w={textWidth} h={textHeight} textAlign={textAlign} color={"text"}>
        {shortDes}
      </Text>
      {haveButton && <ButtonComponent btnTitle={btnTitle} />}
    </Box>
  );
}
