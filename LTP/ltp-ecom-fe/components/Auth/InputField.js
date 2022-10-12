import { Input, Box, Text } from "@chakra-ui/react";
import _ from "lodash";

const InputField = ({ placeholder, required, message, validate, ...rest }) => (
  <Box mb={4}>
    <Input
      placeholder={`${placeholder}${!!required && "*"}`}
      borderWidth="1px"
      borderColor="#BCCCFF"
      borderRadius={4}
      color="#718096"
      fontSize={16}
      autoComplete="false"
      {...rest}
    />
    {_.isArray(validate)
      ? validate.map((item, index) => {
          if (item) {
            return (
              <Text color="#EA403F" fontSize="12px" key={index}>
                {message[index]}
              </Text>
            );
          }
          return null;
        })
      : validate && (
          <Text color="#EA403F" fontSize="12px">
            {message}
          </Text>
        )}
  </Box>
);

export default InputField;
