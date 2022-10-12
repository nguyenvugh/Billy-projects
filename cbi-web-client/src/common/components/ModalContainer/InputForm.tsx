import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input, Textarea, Box, Text, Image, Icon } from "@chakra-ui/react";
import { RiEyeLine } from "react-icons/ri";
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
  const [typePassword, setTypePassword] = useState(true);
  if (textarea) {
    <Box>
      <Textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => typeof handleChange === "function" && handleChange(e)}
        bg="#EDF2F7"
        _placeholder={{
          color: "#718096",
        }}
        mb="16px"
        fontSize={{ base: "14px", lg: "16px" }}
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
    <Box>
      <Box position={"relative"}>
        <Input
          placeholder={placeholder}
          onChange={(e) =>
            typeof handleChange === "function" && handleChange(e)
          }
          value={value}
          bg="#FFFFFF"
          _placeholder={{
            color: "#2D3748",
            fontWeight: "initial",
          }}
          p="18px"
          fontSize={{ base: "14px", lg: "16px" }}
          type={type !== "password" ? type : typePassword ? "password" : "text"}
          name={name}
          fontWeight={500}
        />
        {type === "password" && (
          <Box
            onClick={() => {
              setTypePassword(!typePassword);
            }}
            position={"absolute"}
            right={"12px"}
            top={"10px"}
          >
            <Icon
              as={RiEyeLine}
              mr={2}
              color={typePassword ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.7)"}
            />
          </Box>
        )}
      </Box>
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
