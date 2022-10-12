import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "src/common/hooks/useAppSelector";

const UserInfo = () => {
  const newUser = useAppSelector((state) => state.newUserReducer.newUserData);
  return (
    <Box
      margin={"100px auto"}
      bg="gray.line"
      textAlign="center"
      width="400px"
      padding="30px"
      borderRadius="10px"
    >
      <Text>Your Information is: </Text>
      <Text>name: {newUser.name}</Text>
      <Text>age: {newUser.age}</Text>
      <Text>address: {newUser.address}</Text>
    </Box>
  );
};
export default UserInfo;
