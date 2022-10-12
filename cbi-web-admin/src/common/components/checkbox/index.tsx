import React from "react";
import { ChakraProps, Checkbox } from "@chakra-ui/react";

type CheckboxesProps = {
  content: string;
  isChecked?: boolean;
  onChange?: () => void;
  styleProps?: ChakraProps;
} & any;
const Checkboxes = ({ content, isChecked, onChange, ...rest }: CheckboxesProps) => {
  return (
    <Checkbox isChecked={isChecked} onChange={onChange} {...rest}>
      {content}
    </Checkbox>
  );
};
export { Checkboxes };
