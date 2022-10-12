import React from "react";
import { Text } from "@chakra-ui/react";

interface LabelTextPropstype {
  content: string;
}

export const LabelText = ({ content }: LabelTextPropstype) => {
  return (
    <Text color="#000000" fontWeight="700" fontSize="18px">
      {content}
    </Text>
  );
};
