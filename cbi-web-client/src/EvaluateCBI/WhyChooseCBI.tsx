import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
const listWhy = [
  "Chỉ số Khí hậu Doanh nghiệp là một hệ thống đăng ký tự nguyện dựa trên web.",
  "Được phát triển bởi Chương trình Phát triển Liên Hợp Quốc.",
  "Chỉ số Khí hậu Doanh nghiệp là một hệ thống đăng ký tự nguyện dựa trên web.",
  "Được phát triển bởi Chương trình Phát triển Liên Hợp Quốc.",
];
const WhyChooseCBI = (props: any) => {
  return (
    <Box>
      <Flex alignItems={"center"} mb="25px">
        <Image src="/img/global/ic_why_CBI.svg" w={{ base: "40px", md: "64px" }} />
        <Text
          pl="14px"
          color="rgba(0, 0, 0, 0.8)"
          fontSize={{ base: "20px", md: "30px", lg: "36px" }}
          fontWeight="bold"
        >
          Tại sao chọn CEBI?
        </Text>
      </Flex>
      <Box>
        {listWhy.map((item) => {
          return (
            <Flex
              key={item}
              alignItems="flex-start"
              height={{ base: "auto", md: "65px" }}
              fontSize={{ base: "14px", lg: "16px" }}
            >
              <Image src="/img/global/ic_check_CBI.svg" />
              <Text mb="10px">{item}</Text>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

WhyChooseCBI.propTypes = {};

export default WhyChooseCBI;
