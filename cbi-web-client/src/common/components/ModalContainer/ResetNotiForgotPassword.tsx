import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
const ResetNotiForgotPassword = ({
  setScreen,
  emailResetPass,
}: {
  setScreen: Function;
  emailResetPass: string;
}) => {
  return (
    <Box>
      <Box textAlign={"center"}>
        <Image src="/img/global/ic_reset_password.svg" m="auto" />
      </Box>
      <Box color="#2D3748" textAlign={"center"}>
        <Text
          pb="16px"
          pt="35px"
          fontWeight={"bold"}
          fontSize={{ base: "20px", md: "24px" }}
        >
          Khôi phục mật khẩu
        </Text>
        <Box fontSize="18px" fontWeight={500} pb={{ base: "25px", md: "32px" }}>
          <Text>Mã xác minh đã được gửi đến địa chỉ</Text>
          <Text color="#3182CE">
            <Link href={`mailto:${emailResetPass}`}>{emailResetPass}</Link>
          </Text>
          <Text>Bạn vui lòng kiểm tra email nhé.</Text>
        </Box>
      </Box>
      <Button
        onClick={() => {
          setScreen("");
        }}
        bg="#61A533"
        borderRadius="6px"
        fontSize={{
          base: "15px",
          lg: "16px",
          xl: "18px",
        }}
        color="#FFFFFF"
        height={"auto"}
        py={"10px"}
        _hover={{
          bg: "#61A533",
        }}
        w="100%"
        _active={{
          bg: "#61A533",
        }}
      >
        Tôi đã hiểu
      </Button>
    </Box>
  );
};

ResetNotiForgotPassword.propTypes = {};

export default ResetNotiForgotPassword;
