import React from "react";
import { Box, Button, Image, Text, Link } from "@chakra-ui/react";
import { TAB_ACCOUNT, TITLE_LEVEL_CBI } from "@cbi/constants/index";
const ClimateLeve1 = ({
  setScreen,
  pointEvaluate,
}: {
  setScreen: Function;
  pointEvaluate: number;
}) => {
  return (
    <Box>
      <Box textAlign={"center"}>
        <Image src="/img/global/ic_ythuckhihau.png" m="auto" />
      </Box>
      <Box color="#2D3748" textAlign={"center"}>
        <Text fontSize="18px" fontWeight={500} pt="35px">
          Chúc mừng bạn đã đạt danh hiệu
        </Text>
        <Text
          pb="16px"
          fontWeight={"bold"}
          fontSize={{ base: "20px", md: "24px" }}
        >
          {TITLE_LEVEL_CBI.level1}
        </Text>
        <Box fontSize="18px" fontWeight={500} pb={{ base: "25px", md: "32px" }}>
          <Text display={"inline-block"}>
            Cảm ơn sự cố gắng của bạn, kết quả bài thi của bạn đạt{" "}
            <span style={{ fontWeight: "bold" }}>{pointEvaluate} điểm</span>.
            Bạn có thể kiểm tra kết quả của mình ở mục “
            <Link
              display={"inline-block"}
              color="#3182CE"
              textDecoration={"underline"}
              href={`/climate-account?activeMenu=${TAB_ACCOUNT.RESULT_EVALUATE}`}
            >
              Kết quả của tôi
            </Link>
            ”.
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

ClimateLeve1.propTypes = {};

export default ClimateLeve1;
