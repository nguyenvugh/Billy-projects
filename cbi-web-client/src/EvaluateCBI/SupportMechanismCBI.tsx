import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Grid, Image, Progress, Text } from "@chakra-ui/react";
const RenderItemStep = ({ name }: { name: string }) => (
  <Box
    bg="#0CBC8B"
    border="3px solid #32D3A7"
    boxSize={"48px"}
    color="#FFFFFF"
    textAlign={"center"}
    fontSize="12px"
    borderRadius={50}
    p="7px"
    lineHeight={"14px"}
  >
    {name}
  </Box>
);
const progress = [
  { number: 5, name: "Kiến thức và bộ công cụ hiện có" },
  { number: 3.5, name: "Biểu mẫu báo cáo" },
  { number: 3.5, name: "Hợp tác với OXFAM" },
  { number: 3.5, name: "Tiếp cận đầu tư" },
  { number: 5, name: "Chứng nhận từ OXFAM" },
  { number: 5, name: "Content & ảnh OXFAM cung cấp" },
];
const SupportMechanismCBI = (props: any) => {
  return (
    <Box>
      <Flex alignItems={"center"} mb="25px">
        <Image src="/img/global/ic_hotrococheCBI.png" w={{ base: "40px", md: "64px" }} />
        <Text
          pl="14px"
          color="rgba(0, 0, 0, 0.8)"
          fontSize={{ base: "20px", md: "30px", lg: "36px" }}
          fontWeight="bold"
        >
          Cơ chế hỗ trợ CEBI
        </Text>
      </Flex>
      <Box mt="32px">
        <Flex position={"relative"} w="250px" justifyContent={"space-between"}>
          <RenderItemStep name="Cấp 1" />
          <RenderItemStep name="Cấp 2" />
          <RenderItemStep name="Cấp 3" />
          <Box
            h="2px"
            border={"2px dashed #0CBC8B"}
            w="190px"
            position={"absolute"}
            top="48%"
            zIndex={-1}
            left="20px"
          />
        </Flex>
      </Box>
      <Box>
        {progress.map((item) => (
          <Box mt="24px" alignItems={"center"} display={{ base: "block", sm: "flex" }}>
            <Progress
              bg="#B7E19A"
              value={(item.number / 5) * 100}
              borderRadius="8px"
              h="12px"
              minW="250px"
              __css={{
                ">div": {
                  bg: "#61A533",
                  marginLeft: "auto",
                },
              }}
            />
            <Text
              fontSize={{ base: "14px", lg: "16px" }}
              ml={{ base: 0, sm: "16px" }}
              mt={{ base: "8px", sm: 0 }}
              fontWeight={400}
            >
              {item.name}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

SupportMechanismCBI.propTypes = {};

export default SupportMechanismCBI;
