import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
const listProcess = [
  { date: "06/2022", name: "Lễ công bố Chỉ số khí hậu doanh nghiệp" },
  {
    date: "09/2022",
    name: "Doanh nghiệp tham gia trả lời bộ câu hỏi theo cấp độ",
  },
  {
    date: "12/2022",
    name: "Công bố báo cáo chỉ số và các Doanh nghiệp tiên phong ",
  },
  { date: "04/2023", name: "CEBI 2023 bắt đầu" },
];
const ProcessCBI = (props: any) => {
  return (
    <Box mt={{ base: "40px", md: 0 }}>
      <Flex alignItems={"center"} mb="25px">
        <Image src="/img/global/ic_hotrococheCBI.png" w={{ base: "40px", md: "64px" }} />
        <Text
          pl="14px"
          color="rgba(0, 0, 0, 0.8)"
          fontSize={{ base: "20px", md: "30px", lg: "36px" }}
          fontWeight="bold"
        >
          Tiến độ CEBI
        </Text>
      </Flex>
      <Box>
        {listProcess.map((item: ProcessItemCBI) => {
          return (
            <Flex
              key={item.name}
              alignItems="center"
              fontSize={{ base: "14px", lg: "16px" }}
              mb="32px"
            >
              <Text
                bg="#61A533"
                boxShadow="0px 2px 4px rgba(180, 218, 189, 0.2)"
                borderRadius={"8px"}
                color="#ffff"
                fontWeight={"bold"}
                fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                px="16px"
                py="8px"
                minW="109px"
                textAlign={"center"}
              >
                {item.date}
              </Text>
              <Text fontSize={{ base: "14px", lg: "16px" }} ml="16px" fontWeight={400}>
                {item.name}
              </Text>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};
interface ProcessItemCBI {
  date: string;
  name: string;
}
ProcessCBI.propTypes = {};

export default ProcessCBI;
