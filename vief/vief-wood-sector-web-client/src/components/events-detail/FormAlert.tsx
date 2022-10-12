import Alert from "@/src/Images/Icons/Alert";
import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FormAlertProps } from "./interface";

export default function FormAlert({ message }: FormAlertProps) {
  return (
    <Flex mt="8px" align="center">
      <Alert />
      <Text fontSize={"12px"} lineHeight="15px" color="orange" ml="4px">
        {message}
      </Text>
    </Flex>
  );
}
