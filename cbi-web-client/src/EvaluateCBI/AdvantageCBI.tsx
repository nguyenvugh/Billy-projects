import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
const advantage = [
  "Nhận được chứng nhận từ OXFAM sau khi hoàn thành",
  "Nhiều cơ hội hơn trong mạng lưới với chính phủ và các nhà đầu tư, cả trong nước và quốc tế.",
  "Tài nguyên kiến ​​thức và bộ công cụ được đề xuất; mẫu báo cáo; và gắn kết chặt chẽ hơn với OXFAM Việt Nam.",
];
const AdvantageCBI = (props: any) => {
  return (
    <Box>
      <Flex alignItems={"center"} mb="25px">
        <Image src="/img/global/ic_advantage_CBI.svg" w={{ base: "40px", md: "64px" }} />
        <Text
          pl="14px"
          color="rgba(0, 0, 0, 0.8)"
          fontSize={{ base: "20px", md: "30px", lg: "36px" }}
          fontWeight="bold"
        >
          Lợi ích từ CEBI?
        </Text>
      </Flex>
      {advantage.map((item) => {
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
  );
};

AdvantageCBI.propTypes = {};

export default AdvantageCBI;
