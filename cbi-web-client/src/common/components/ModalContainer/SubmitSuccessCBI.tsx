import React from "react";
import { Box, Button, Image, Text, Link } from "@chakra-ui/react";
const SubmitSuccessCBI = ({
  setScreen,
  pointEvaluate,
}: {
  setScreen: Function;
  pointEvaluate: number;
}) => {
  return (
    <Box>
      <Box textAlign={"center"}>
        <Image src="/img/global/ic_submitsuccessCBI.png" m="auto" />
      </Box>
      <Box color="#2D3748" textAlign={"center"}>
        <Text
          pb="16px"
          fontWeight={"bold"}
          pt="35px"
          fontSize={{ base: "20px", md: "24px" }}
        >
          Nộp bài thành công!
        </Text>
        <Box fontSize="18px" fontWeight={500} pb={{ base: "25px", md: "32px" }}>
          <Text display={"inline-block"}>
            Chúc mừng bạn đã đạt được <span>{pointEvaluate}</span> điểm. Bạn có
            thể kiểm tra kết quả của mình ở mục “Kết quả của tôi”.
          </Text>
        </Box>
      </Box>
      <Button
        onClick={() => {
          setScreen("");
        }}
        as={Link}
        href="/"
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
        Trở về Trang chủ
      </Button>
    </Box>
  );
};

SubmitSuccessCBI.propTypes = {};

export default SubmitSuccessCBI;
