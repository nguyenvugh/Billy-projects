import { Box, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { BREAD_CRUMB_USER_ACC_DETAIL } from "src/common/constants/breadcrumb.config";
import { ListAnswers } from "./ListAnswers";

const getListReview = () => {
  const res = require("../evaluateCBI.json");
  return res;
};

const ListAnswer = () => {
  const data = getListReview();
  const questions = data.quiz.filter((item) => item.isAnswered);

  const point = questions.map((item) => {
    const answersFilter = item.data.filter((element) => {
      return element.isAnswered === true;
    });
    const point = answersFilter.find((item) => {
      return item.point >= 0;
    });
    return point;
  });
  const totalPoint = point.reduce((accumulator, item) => {
    return accumulator + item.point;
  }, 0);

  const questionsDone = data.quiz.filter((item) => item.isAnswered);
  const questionsNotDone = data.quiz.filter((item) => !item.isAnswered);
  return (
    <Box>
      <Flex alignItems={"flex-end"}>
        <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_USER_ACC_DETAIL} />
        <Flex align="center" fontWeight="600" fontSize="18px" ml={"10px"}>
          <Icon as={IoIosArrowForward} />
          <Text>Kết quả đánh giá</Text>
        </Flex>
      </Flex>
      <Heading mt={"56px"}>{data.title}</Heading>
      <Text mt="24px" fontWeight={500} color="#4A5568">
        {data.content}
      </Text>
      <Flex mt={"30px"} color="#2D3748" fontWeight={500}>
        <Text>Đã trả lời: {questionsDone.length}</Text>
        <Text ml={"113px"}>Chưa trả lời: {questionsNotDone.length}</Text>
      </Flex>
      <Text mt="75px" ml={"136px"} fontWeight={700} fontSize="28px">
        {totalPoint} Điểm
      </Text>
      <Text ml={"136px"} fontWeight={700} fontSize="28px">
        TIÊN PHONG VỀ KHÍ HẬU
      </Text>
      <Table mt="144px">
        <Thead>
          <Tr>
            <Th w={"255px"}>DANH MỤC</Th>
            <Th w={"255px"}>MÔ TẢ</Th>
            <Th w={"50px"}>STT</Th>
            <Th w={"255px"}>CÂU HỎI</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.quiz.map((element, index) => {
            return (
              <Tr key={index} cursor="pointer">
                <Td>{element.title}</Td>
                <Td>{element.title}</Td>
                <Td>{index + 1}</Td>
                <Td>
                  <Text fontWeight={600} color="#2D3748" fontSize={"16px"} mb="32px">
                    Anh/chị có thể thấy được được các rủi ro do khí thải nhà kính và/hoặc cơ hội nhờ
                    giảm khí thải nhà kính trong vận hành doanh nghiệp không?
                  </Text>
                  <ListAnswers data={element.data} />
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
export { ListAnswer };
