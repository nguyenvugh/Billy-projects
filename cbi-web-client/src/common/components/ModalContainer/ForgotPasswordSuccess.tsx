import React from "react";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { SCREEN_AUTH } from "@cbi/constants/index";
const ResetNotiForgotPassword = ({ setScreen }: { setScreen: Function }) => {
  return (
    <Box>
      <Box textAlign={"center"}>
        <Image src="/img/global/ic_forgot_password_success.svg" m="auto" />
      </Box>
      <Box color="#2D3748" textAlign={"center"}>
        <Text
          pb="16px"
          pt="35px"
          fontWeight={"bold"}
          fontSize={{ base: "20px", md: "24px" }}
        >
          Cập nhật thành công!
        </Text>
        <Box fontSize="18px" fontWeight={500} pb={{ base: "25px", md: "32px" }}>
          <Text>
            Đổi mật khẩu thành công. Vui lòng đăng nhập vào tài khoản bằng mật
            khẩu mới.
          </Text>
        </Box>
      </Box>
      <Button
        onClick={() => {
          setScreen(SCREEN_AUTH.SIGN_IN);
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
        Đăng nhập ngay
      </Button>
    </Box>
  );
};

ResetNotiForgotPassword.propTypes = {};

export default ResetNotiForgotPassword;
