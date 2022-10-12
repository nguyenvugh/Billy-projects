import { Box, Flex, Text } from "@chakra-ui/react";
import React, { memo } from "react";
import { ITranscript } from "../../interface";

function Transcript({
  transcript,
  color,
  setSentences,
  setSentencesEdit,
  time,
  playerRef,
}: {
  transcript?: ITranscript;
  color?: string;
  setSentencesEdit?: any;
  setSentences?: any;
  time?: string;
  playerRef?: any;
}) {
  console.log("rerender");
  return (
    <Flex
      key={transcript?.offset}
      cursor="pointer"
      color={color}
      onClick={() => {
        setSentences(transcript?.text);
        setSentencesEdit(transcript);
        playerRef.current?.seekTo(
          Math.floor((transcript?.offset as number) / 1000),
          "seconds"
        );
      }}
    >
      <Text mr="20px">{time}</Text>
      <Box>{transcript?.text}</Box>
    </Flex>
  );
}

export default memo(Transcript);
