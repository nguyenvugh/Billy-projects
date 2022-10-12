import React from "react";
import PropTypes from "prop-types";
import { Input, Textarea, Box, Text } from "@chakra-ui/react";
interface InputFormI {
  handleChange?: Function;
  value?: any;
  placeholder: string;
  textarea?: boolean;
  type?: string;
  name?: string;
  helperText?: string;
}
const InputForm = ({
  handleChange,
  value,
  placeholder,
  textarea = false,
  type = "text",
  name,
  helperText = "",
}: InputFormI) => {
  if (textarea) {
    <Box mb="16px">
      <Textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => typeof handleChange === "function" && handleChange(e)}
        bg="#EDF2F7"
        _placeholder={{
          color: "#718096",
        }}
        fontSize={{ base: "12px", md: "14px", lg: "16px" }}
        size="sm"
      />
      {helperText && (
        <Text color="red" fontSize="13px">
          {helperText}
        </Text>
      )}
    </Box>;
  }
  return (
    <Box mb="16px">
      <Input
        placeholder={placeholder}
        onChange={(e) => typeof handleChange === "function" && handleChange(e)}
        value={value}
        bg="#EDF2F7"
        _placeholder={{
          color: "#718096",
        }}
        p="18px"
        fontSize={{ base: "12px", md: "14px", lg: "16px" }}
        type={type}
        name={name}
      />
      {helperText && (
        <Text color="red" fontSize="13px">
          {helperText}
        </Text>
      )}
    </Box>
  );
};

InputForm.propTypes = {};

export default InputForm;
