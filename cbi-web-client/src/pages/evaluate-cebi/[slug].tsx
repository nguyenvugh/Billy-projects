import Container from "@cbi/components/container";
import ModalContainer from "@cbi/components/ModalContainer";
import { SCREEN_CBI, TYPE_QUESTION } from "@cbi/constants/index";
import { getListQuizLevel, postListQuizLevel } from "@cbi/services/cbi";
import { QuestionsQuizLevelI, requestQuestionSubmit } from "@cbi/services/cbi/cbi.interface";
import { customOptionQuestion } from "@cbi/utils/cbiHelper";
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Text } from "@chakra-ui/react";
import Lodash from "lodash";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useCheckUserProfile } from "src/common/hooks/useCheckUserProfile";
import { ListQuiz } from "src/EvaluateCBI/ListQuiz";
import ModalDraftCBI from "src/EvaluateCBI/ModalDraftCBI ";
import ModalSubmitCBI from "src/EvaluateCBI/ModalSubmitCBI";
const EvaluateCBISlug = () => {
  const router = useRouter();
  const slug: any = router?.query?.slug || "";
  const routerFormat = Lodash.split(slug, "_");
  const titlePage = "";
  const descriptionPage = "";
  const slugGroup = routerFormat[0];
  const slugLevel = routerFormat[1];
  const [data, setData] = useState<QuestionsQuizLevelI[]>([]);
  useCheckUserProfile(handleCallBack);
  useEffect(() => {
    (async () => {
      if (slugGroup && slugLevel) {
        try {
          let listAnswerCustom: QuestionsQuizLevelI[] = [];
          const resListQuiz = await getListQuizLevel(slugGroup, slugLevel);
          const listQuiz = resListQuiz.results.reduce((arr: any, cur: any) => {
            const question = cur.questions.map((e: QuestionsQuizLevelI, index: Number) => {
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
            });
            return [...arr, ...question];
          }, []);
          setAnswered(listAnswerCustom);
          setData(listQuiz);
        } catch (error) {}
      }
    })();
  }, [slug]);

  function handleCallBack(isCan: boolean) {
    !isCan && router.push("/evaluate-cebi");
  }

  const refModalContainer = useRef<{ openModal: Function }>(null);
  const refModalSubmit = useRef<{ openModal: Function }>(null);
  const refModalDraft = useRef<{ openModal: Function }>(null);
  const [isSubmit, setIssubmit] = useState<Boolean>(false);
  const [listAnswer, setAnswered] = useState<QuestionsQuizLevelI[]>([]);
  const onSubmit = async (isFinish = -1) => {
    if (
      listAnswer.filter((el) => el.status_answer_mandatory === 1).length !==
      data.filter((el) => el.status_answer_mandatory === 1).length
    ) {
      setTimeout(() => {
        setIssubmit(true);
      }, 100);
      return;
    }
    setIssubmit(false);
    let total: number = 0;
    let questions: requestQuestionSubmit[] = [];
    listAnswer.map((item: QuestionsQuizLevelI) => {
      item.options.map((item_option) => {
        if (
          item_option.type === TYPE_QUESTION.SINGLE_CHOICE ||
          item_option.type === TYPE_QUESTION.MULTI_CHOICE
        ) {
          item_option.values.map((item_values) => {
            if (item_values.status_right_option_value === 1)
              questions.push({
                cbi_question_id: item.id,
                cbi_question_option_id: item_option.id,
                cbi_question_option_value_id: item_values.id,
                score: Number(item_values.score),
              });
            total += Number(item_values.score);
          });
        } else {
          item_option.values.map((item_values) => {
            if (!!item_values.status_right_option_value) {
              total += Number(item_values.score);
              questions.push({
                cbi_question_id: item.id,
                cbi_question_option_id: item_option.id,
                cbi_question_option_value_id: item_values.id,
                score: Number(item_values.score),
                content_answer: item_values.status_right_option_value || "",
              });
            }
          });
        }
      });
    });
    try {
      const resPostQuestion = await postListQuizLevel(slugGroup, slugLevel, {
        status_finish: isFinish,
        questions,
      });
      if (isFinish === -1) {
        refModalDraft.current?.openModal();
        return;
      }
      total = Lodash.get(resPostQuestion, "result.total_scores", 0);
      if (Lodash.get(resPostQuestion, "status", 0) === -1) {
        refModalSubmit.current?.openModal(Number(total).toFixed(2));
        return;
      }
      const result = Lodash.get(resPostQuestion, "result", {});
      const status_pass = Lodash.get(resPostQuestion, "result.status_pass", 0);
      if (Lodash.isEmpty(result)) {
        refModalContainer.current?.openModal(SCREEN_CBI.ClimateSuccessWithoutScore);
      } else if (status_pass === 0) {
        refModalContainer.current?.openModal(SCREEN_CBI.SubmitSuccessCBI, Number(total).toFixed(2));
      } else {
        if (total > 80) {
          refModalContainer.current?.openModal(SCREEN_CBI.ClimateLevel1, Number(total).toFixed(2));
        } else if (total >= 40 && total <= 80) {
          refModalContainer.current?.openModal(SCREEN_CBI.ClimateLevel2, Number(total).toFixed(2));
        } else if (total < 40) {
          refModalContainer.current?.openModal(SCREEN_CBI.ClimateLevel3, Number(total).toFixed(2));
        }
      }

      //  else {
      //   refModalContainer.current.openModal(SCREEN_AUTH.SubmitSuccessCBI, -1);
      // }

      // const dataSetCBI = JSON.stringify([
      //   {
      //     title: data.length,
      //     content: dataEvaluate.length,
      //     total: Number(total).toFixed(2),
      //     quiz: answered,
      //   },
      // ]);
      // localStorage.setItem(TAB_ACCOUNT.RESULT_EVALUATE, dataSetCBI);
    } catch (error) {
      refModalSubmit.current?.openModal(0);
      // toast({
      //   position: "top",
      //   status: "error",
      //   isClosable: true,
      //   duration: 2000,
      //   render: () => (
      //     <ToastError message={`Đánh giá ${titlePage} không thành công`} />
      //   ),
      // });
    }
  };
  return (
    <div>
      <Head>
        <title>{titlePage}</title>
        <meta name="description" content="CEBI-web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Breadcrumb
            pt={{ base: "25px", md: "33px" }}
            color="#2D3748"
            fontSize={{ base: "13px", md: "14px", lg: "16px" }}
          >
            <BreadcrumbItem>
              <Link href="/evaluate-cebi" passHref shallow>
                <BreadcrumbLink>Đánh giá CEBI</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage fontWeight={"bold"}>
              <Text>Đánh giá CEBI</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <ListQuiz
            titlePage={titlePage}
            listAnswer={listAnswer}
            setAnswered={setAnswered}
            data={data}
            isSubmit={isSubmit}
            descriptionPage={descriptionPage}
            isDisable={false}
          />
          <Box textAlign={"center"} mb="100px">
            <Button
              border="1px solid #61A533"
              bg="#FFFFFF"
              color="#61A533"
              py={"10px"}
              px={"24px"}
              fontSize={{ base: "15px", md: "16px", lg: "18px" }}
              mr={"8px"}
              onClick={() => {
                onSubmit(-1);
              }}
            >
              Lưu bản nháp
            </Button>
            <Button
              bg="#61A533"
              _focus={{
                bg: "#61A533",
              }}
              _active={{
                bg: "#61A533",
              }}
              _hover={{
                bg: "#61A533",
              }}
              color="#FFFFFF"
              py={"10px"}
              px={"24px"}
              fontSize={{ base: "15px", md: "16px", lg: "18px" }}
              ml={"8px"}
              onClick={() => {
                onSubmit(1);
              }}
            >
              Nộp bài ngay
            </Button>
          </Box>
        </Container>
        <ModalContainer ref={refModalContainer} />
        <ModalSubmitCBI ref={refModalSubmit} />
        <ModalDraftCBI ref={refModalDraft} />
      </main>
    </div>
  );
};

EvaluateCBISlug.defaultProps = {
  data: {},
};

export default EvaluateCBISlug;
export interface EvaluateCBISlugI {
  title: string;
  content: string;
  quiz: Array<EvaluateItemCBII>;
}
export interface EvaluateItemCBII {
  title: string;
  data: Array<AnswerItemI>;
  point?: number;
  index?: number;
  uploadfile?: string;
  essay?: string;
  multiple?: string[];
  "upload-file"?: File;
}

export interface AnswerItemI {
  name: string;
  point: number;
  title?: string;
  type?: string[];
  data_multiple?: string[];
}
