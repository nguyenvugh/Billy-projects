import React from "react";
import { Text } from "@chakra-ui/react";

type TextFieldProps = {
  marginLeft?: string;
  color?: string;
  content: string;
};

const TextField = ({ content, marginLeft, color }: TextFieldProps) => {
  return (
    <Text ml={marginLeft} color={color}>
      {content}
    </Text>
  );
};
export { TextField };
