import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, HStack, Text, Grid, Flex, Image } from "@chakra-ui/react";
import { AnswerCBI } from "./AnswerCBI";
import {
  ItemQuizLevelI,
  QuestionsQuizLevelI,
} from "@cbi/services/cbi/cbi.interface";

const ListQuiz = ({
  listAnswer,
  data,
  setAnswered,
  isSubmit = false,
  titlePage = "",
  descriptionPage = "",
  isDisable = false,
}: {
  listAnswer?: QuestionsQuizLevelI[];
  data: QuestionsQuizLevelI[];
  setAnswered?: Function;
  isSubmit?: Boolean;
  titlePage: String;
  descriptionPage?: String;
  isDisable?: boolean;
}) => {
  useEffect(() => {
    if (isSubmit) {
      const indexElement = data.findIndex(
        (el: QuestionsQuizLevelI) =>
          listAnswer?.findIndex(
            (e: QuestionsQuizLevelI) =>
              e.id === el.id && el.status_answer_mandatory === 1
          ) === -1
      );
      const elementRoot = document.getElementById(`quiz-${indexElement}`);
      elementRoot?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isSubmit]);
  return (
    <Box>
      {titlePage && descriptionPage && (
        <Box>
          <Text
            fontSize={{ base: "25px", md: "30px", lg: "36px" }}
            fontWeight="bold"
            pt={{ base: "40px", md: "55px", lg: "63px" }}
            pb={{ base: "24px", md: "27px", lg: "33px" }}
          >
            {titlePage}
          </Text>
          <Text
            fontWeight={500}
            fontSize={{ base: "13px", md: "14px", lg: "16px" }}
            color="#4A5568"
          >
            {descriptionPage}
          </Text>
        </Box>
      )}
      <Box my={{ base: "40px", md: "60px" }} px={90}>
        {!!listAnswer && (
          <Box>
            <HStack spacing={"60px"}>
              <Text
                color="#4A5568"
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={500}
              >
                Đã trả lời:{" "}
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                  display="inline-block"
                  color="#61A533"
                >
                  {listAnswer?.length}
                </Text>
              </Text>
              <Text>
                <Text
                  display="inline-block"
                  color="#4A5568 !important"
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={500}
                  pr="5px"
                >
                  Chưa trả lời:
                </Text>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "16px", md: "18px", lg: "20px" }}
                  display="inline-block"
                >
                  <span style={{ color: "#4A5568" }}>
                    {data?.length - (listAnswer?.length || 0)}
                  </span>{" "}
                </Text>
              </Text>
            </HStack>
          </Box>
        )}
        {(data || []).map((item: QuestionsQuizLevelI, index: number) => {
          const isCheckAnwser =
            listAnswer?.findIndex((e) => e.id === item.id) === -1 &&
            item.status_answer_mandatory === 1;
          return (
            <Fragment key={item.title}>
              {item.itemQuizLevel?.id && (
                <Box
                  my={{ base: "17px", md: "21px" }}
                  key={item.title}
                  bg="#F7FAFC"
                  p="16px"
                  borderRadius={"8px 8px 0px 0px"}
                  fontWeight={500}
                  fontSize={{ base: "13px", md: "15px", lg: "16px" }}
                >
                  <Text color="#3182CE" fontWeight={600}>
                    {item.itemQuizLevel.name}
                  </Text>
                  <Text>{item.itemQuizLevel.description}</Text>
                </Box>
              )}
              <Box
                borderTopWidth={index !== 0 ? "1px" : 0}
                borderColor="#E2E8F0"
                pt="32px"
                id={`quiz-${index}`}
              >
                <Grid
                  templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                  fontWeight={500}
                  gap="30px"
                  mb={"32px"}
                >
                  <Box>
                    <Text fontSize={{ base: "13px", md: "14px", lg: "16px" }}>
                      <Text
                        display={"inline-block"}
                        color="#61A533"
                        pr="5px"
                        fontSize={{ base: "18px", md: "20px", lg: "24px" }}
                        marginTop="-7px"
                      >
                        {index + 1}.
                      </Text>
                      {item.title}
                    </Text>
                  </Box>
                  <AnswerCBI
                    ItemAnswerCBI={item}
                    data={item.options}
                    setAnswered={setAnswered}
                    listAnswer={listAnswer}
                    isDisable={isDisable}
                  />
                </Grid>
                {isSubmit && isCheckAnwser && (
                  <HStack gap={"14px"} alignItems="center" pb="32px">
                    <Image src="/img/global/ic_warning-error.svg" />
                    <Text
                      fontWeight={500}
                      fontSize={{ base: "13px", md: "16px" }}
                      color="#E53E3E"
                    >
                      Đây là câu hỏi bắt buộc. Vui lòng chọn câu trả lời
                    </Text>
                  </HStack>
                )}
              </Box>
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

ListQuiz.propTypes = {};

export { ListQuiz };
