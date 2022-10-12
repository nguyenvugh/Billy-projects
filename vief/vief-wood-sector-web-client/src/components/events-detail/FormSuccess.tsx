import Success from "@/src/Images/Icons/Success";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

interface FormSuccessProps {
  onClose?: () => void;
}

export default function FormSuccess({ onClose }: FormSuccessProps) {
  return (
    <Flex
      width="280px"
      flexDirection={"column"}
      alignItems="center"
      textAlign={"center"}
      boxShadow="0px 0px 16px rgba(0, 0, 0, 0.1)"
      borderRadius="12px"
      p="32px 8px"
    >
      <Success />
      <Text variant={"text16"} my="16px">
        Đăng ký thành công
      </Text>
      <Text mb="16px">
        Vui lòng kiểm tra Hộp thư email để nhận thông tin chi tiết về sự kiện.
        Vui lòng mang theo mã QR khi đến tham gia sự kiện
      </Text>
      <Button
        bg="blue.primary"
        color={"white"}
        p="8px 15px"
        colorScheme={"blue.primary"}
        fontWeight="600"
        onClick={onClose}
      >
        Quay lại trang
      </Button>
    </Flex>
  );
}
