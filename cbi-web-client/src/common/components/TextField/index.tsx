import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { RiEyeLine } from "react-icons/ri";

const TextField = ({
  children,
  renderInputLeft,
  renderInputRight,
  defaultValue,
  value,
  onChange,
  label,
  required,
  type = "text",
  placeholder,
  disabled,
  autoComplete,
  name,
  error,
  helperText,
  labelWidth,
  ...rest
}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const onChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box color={error ? "#EA403F" : "#071133"}>
      {label && (
        <Text flexShrink={0} fontSize={16} fontWeight={500} pb="8px">
          {label}
          {required && (
            <Text color="red" as="span">
              {" "}
              *
            </Text>
          )}
        </Text>
      )}
      <Box flexGrow={1}>
        {children ? (
          children
        ) : (
          <InputGroup>
            {renderInputLeft instanceof Function && renderInputLeft()}
            <Input
              name={name}
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              type={type === "password" && showPassword ? "text" : type}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={autoComplete}
              borderColor="#E2E8F0"
              focusBorderColor={error && "#EA403F"}
              isInvalid={error}
              errorBorderColor="#EA403F"
              borderWidth={1}
              borderRadius={6}
              width="100%"
              _hover={{
                borderColor: "initial",
              }}
              {...rest}
            />
            {type === "password" ? (
              <InputRightElement
                onClick={onChangeShowPassword}
                cursor="pointer"
              >
                {/* <RiEyeLine
                  size={16}
                  fill={showPassword ? "#000000" : "#00000080"}
                /> */}
                <Image
                  width="24px"
                  height="24px"
                  src={
                    !showPassword
                      ? "/img/showpassword.svg"
                      : "/img/hidepassword.svg"
                  }
                />
              </InputRightElement>
            ) : (
              renderInputRight instanceof Function && renderInputRight()
            )}
          </InputGroup>
        )}
      </Box>
      <Text
        pl={labelWidth}
        fontSize={14}
        lineHeight={1.5}
        mt={1}
        mb={2}
        minHeight={6}
      >
        {error && helperText}
      </Text>
    </Box>
  );
};

export default TextField;
