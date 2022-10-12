import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const ListAnswers = ({ data }) => {
  return (
    <Box>
      {data
        .filter((item) => {
          return item.isAnswered === true;
        })
        .map((item, index) => {
          return <Text key={index}>{item.name}</Text>;
        })}
    </Box>
  );
};
