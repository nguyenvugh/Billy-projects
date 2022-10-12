import React from "react";
import { Box, Button, Image, Text, Link } from "@chakra-ui/react";
import { TAB_ACCOUNT, TITLE_LEVEL_CBI } from "@cbi/constants/index";
const ClimateSuccessWithoutScore = ({ setScreen }: { setScreen: Function }) => {
  return (
    <Box>
      <Box textAlign={"center"}>
        <Image src="/img/global/ic_submitsuccessCBI.png" m="auto" />
      </Box>
      <Box color="#2D3748" textAlign={"center"}>
        <Text
          pb="16px"
          pt="35px"
          fontWeight={"bold"}
          fontSize={{ base: "20px", md: "24px" }}
        >
          Nộp bài thành công!
        </Text>
        <Box fontSize="18px" fontWeight={500} pb={{ base: "25px", md: "32px" }}>
          <Text display={"inline-block"}>
            Cảm ơn bạn đã tham gia vào bài đánh giá CEBI. Câu trả lời của bạn đã
            được gửi về hệ thống của Oxfam . Sau khi hoàn tất đánh giá, Oxfam sẽ
            thông báo kết qủa của bạn. Hoặc bạn có thể kiểm tra kết quả của mình
            ở mục “Kết quả của tôi”.
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

ClimateSuccessWithoutScore.propTypes = {};

export default ClimateSuccessWithoutScore;
