import { Box, Flex, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
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
  error,
  helperText,
  labelWidth,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const onChangeShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box color={error ? "#EA403F" : "#071133"}>
      <Flex alignItems="center">
        {label && (
          <Text flexShrink={0} width={labelWidth} fontSize={14} pr={4}>
            {label}
            {required && " *"}
          </Text>
        )}
        <Box flexGrow={1}>
          {children || (
            <InputGroup>
              {renderInputLeft instanceof Function && renderInputLeft()}
              <Input
                defaultValue={defaultValue}
                value={value}
                onChange={onChange}
                type={type === "password" && showPassword ? "text" : type}
                placeholder={placeholder}
                disabled={disabled}
                autoComplete={autoComplete}
                borderColor="#BCCCFF"
                focusBorderColor={error && "#EA403F"}
                isInvalid={error}
                errorBorderColor="#EA403F"
                borderWidth={1}
                borderRadius={4}
                bg="#E9EEFF"
                width="100%"
                _hover={{
                  borderColor: "initial",
                }}
                {...rest}
              />
              {type === "password" ? (
                <InputRightElement onClick={onChangeShowPassword} cursor="pointer">
                  <RiEyeLine size={16} fill={showPassword ? "#000000" : "#00000080"} />
                </InputRightElement>
              ) : (
                renderInputRight instanceof Function && renderInputRight()
              )}
            </InputGroup>
          )}
        </Box>
      </Flex>
      <Text pl={labelWidth} fontSize={14} lineHeight={1.5} mt={1} mb={2} minHeight={6}>
        {error && helperText}
      </Text>
    </Box>
  );
};

export default TextField;
