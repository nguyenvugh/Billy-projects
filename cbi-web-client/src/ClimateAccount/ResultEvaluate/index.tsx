import React, { useState, useEffect } from "react";
import ListResultEvaluate from "./ListResultEvaluate";
import { ListQuiz } from "src/EvaluateCBI/ListQuiz";
import { Box, Flex, Image, Link, Text, VStack } from "@chakra-ui/react";
import { getCbiUserApi, getQuestionCbiUserApi } from "@cbi/services/auth";
import { DefaultCbiUser, LimitCbiUser } from "./constatns";
import { ItemCbiUser } from "@cbi/services/auth/auth.interface";
import { QuestionsQuizLevelI } from "@cbi/services/cbi/cbi.interface";
import { customOptionQuestion } from "@cbi/utils/cbiHelper";
import { formatDate } from "@cbi/utils/date";

const ResultEvaluate = (props: any) => {
  const [activeResult, setActiveResult] = useState(SCREEN_RESULT.SCREEN_LIST);
  const [CbiGroup, setCbiGroup] = useState<ItemCbiUser>(DefaultCbiUser);
  const currentPage = 1;
  const [listCbiUser, setListCbiUser] = useState<ItemCbiUser[]>([]);
  const [listAnswer, setListAnswer] = useState<QuestionsQuizLevelI[]>([]);
  const [listQuestionCbiUser, setListQuestionCbiUser] = useState<
    QuestionsQuizLevelI[]
  >([]);
  useEffect(() => {
    (async () => {
      try {
        const resList = await getCbiUserApi({
          page: currentPage,
          limit: LimitCbiUser,
        });
        setListCbiUser(resList.results);
      } catch (error) {}
    })();
  }, []);

  const getDataQuestionCbi = async (CbiLevelId: string) => {
    let listAnswerCustom: QuestionsQuizLevelI[] = [];
    const resList = await getQuestionCbiUserApi(CbiGroup.id, CbiLevelId);
    const listQuiz = resList.results.reduce((arr: any, cur: any) => {
      const question = cur.questions.map(
        (e: QuestionsQuizLevelI, index: Number) => {
          let isHasAnswer = false;
          const options = customOptionQuestion(e, isHasAnswer);
          let custom_question: QuestionsQuizLevelI = {
            id: e.id,
            title: e.title,
            order_display: e.order_display,
            total_scores: e.total_scores,
            status_answer_mandatory: e.status_answer_mandatory,
            options: options.options,
            index,
            itemQuizLevel:
              index === 0
                ? {
                    id: cur.id,
                    name: cur.name,
                    description: cur.description,
                    order_display: cur.order_display,
                  }
                : {
                    id: "",
                    name: "",
                    description: "",
                    order_display: "",
                  },
          };
          if (options.isHasAnswer) {
            listAnswerCustom.push(custom_question);
          }
          return custom_question;
        }
      );
      return [...arr, ...question];
    }, []);
    setListAnswer(listAnswerCustom);
    setListQuestionCbiUser(listQuiz);
  };

  if (activeResult === SCREEN_RESULT.SCREEN_LIST) {
    return (
      <ListResultEvaluate
        setActiveResult={setActiveResult}
        listCbiUser={listCbiUser}
        getDataQuestionCbi={getDataQuestionCbi}
        setCbiGroup={setCbiGroup}
      />
    );
  }
  return (
    <Box position={"relative"}>
      <Link
        href={"#"}
        onClick={() => {
          setActiveResult(SCREEN_RESULT.SCREEN_LIST);
        }}
        position="absolute"
        top="20px"
        left="60px"
      >
        <Flex
          alignItems={"center"}
          fontSize={{ base: "13px", md: "15px", lg: "16px" }}
          fontWeight={600}
          color="#61A533"
        >
          <Image
            src="/img/global/ic_arrow_evaluate.png"
            transform={"rotate(180deg)"}
          />
          <Text pl="12px">Trở về kết quả của tôi</Text>
        </Flex>
      </Link>
      <Box pt="25px">
        <VStack my={{ base: "40px", md: "60px" }} px={90}>
          <Text color="#4A5568" fontSize="16px" w="full">
            Điểm số của bài đánh giá:{" "}
            <span style={{ color: "#61A533" }}>{CbiGroup.total_scores}</span>
          </Text>
          <Text color="#4A5568" fontSize="16px" w="full">
            Ngày nộp bài:{" "}
            <span style={{ fontWeight: "500" }}>
              {formatDate(CbiGroup.created_at || "", "DD/MM/YYYY")}
            </span>
          </Text>
          <Text
            variant="page-title"
            py="10px"
            pt="25px"
            w="full"
            fontWeight="700"
            fontSize="24px"
          >
            {CbiGroup.cbi.name}
          </Text>
          <Text w="full" color="#4A5568">
            {CbiGroup.cbi.description}
          </Text>
        </VStack>
        <ListQuiz
          titlePage={""}
          data={listQuestionCbiUser}
          isSubmit={false}
          descriptionPage={""}
          listAnswer={listAnswer}
          isDisable={true}
        />
      </Box>
    </Box>
  );
};

ResultEvaluate.propTypes = {};

export default ResultEvaluate;

export const SCREEN_RESULT = {
  SCREEN_DETAIL: "SCREEN_DETAIL",
  SCREEN_LIST: "SCREEN_LIST",
};
