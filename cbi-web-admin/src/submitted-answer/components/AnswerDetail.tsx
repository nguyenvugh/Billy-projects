import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CbiQuestionOptionTypeEnum } from "src/cbi/constants";
import { ConfirmModalV2 } from "src/common/components/confirm-modal/ConfirmModalV2";
import { LoadingPage } from "src/common/components/loading-page";
import { useImmer } from "use-immer";
import { useGetDetailSubmittedAnswer } from "../hooks/useGetDetailSubmittedAnswer";
import {
  AnswerCheck,
  SubmittedAnswerResponse,
  SubmittedAnswerType,
  SubmittedScreen,
} from "../interfaces";
import _ from "lodash";
import {
  calNumOfAnswers,
  calTotalScore,
  checkExistAnswer,
  formatDate,
} from "src/common/utils/common.util";
import { RenderBreadcrumb } from "src/common/components/render-breadcrumb";
import { BREAD_CRUMB_QUIZ_DETAIL } from "src/common/constants/breadcrumb.config";
import { FilePreviewModal } from "src/common/components/file-loader-preview-modal/inedx";
import { ReactComponent as UploadIcon } from "src/common/assets/icons/iconUploadFile.svg";

function AnswerDetail({
  id,
  dataCbi,
  setScreen,
}: {
  id: string;
  dataCbi: SubmittedAnswerResponse;
  setScreen: (screen: SubmittedScreen) => void;
}) {
  const { data, isLoading } = useGetDetailSubmittedAnswer(id || "", SubmittedAnswerType.CHECKED);
  const results = data?.data.results || [];
  const [answers, setAnswers] = useImmer<AnswerCheck[]>([]);
  const { isOpen, onClose } = useDisclosure();
  const [doneState, setDoneState] = useState({ done: 0, notDone: 0 });
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);
  const [previewPath, setPreviewPath] = useState<string>("");

  useEffect(() => {
    if (results.length > 0) {
      const newAnswers: AnswerCheck[] = [];
      results.forEach((result) => {
        result.questions.forEach((question) => {
          question.options.forEach((option) => {
            const answers = _.get(option, "answers", []);
            answers.forEach((answer) => {
              newAnswers.push({
                id: answer.id,
                score: answer.score,
              });
            });
          });
        });
      });
      setAnswers(() => newAnswers);
      setDoneState(calNumOfAnswers(results));
    }
  }, [results]);

  const handleClose = () => {
    onClose();
  };

  function handleUpdateAnswer(id: string, value: string) {
    if (answers.length > 0) {
      setAnswers((old) => {
        const current = old.find((as) => as.id === id);
        if (current) current.score = +value;
      });
    }
  }

  return (
    <LoadingPage isLoading={isLoading}>
      <VStack w="full" spacing="5">
        <Text
          w="full"
          onClick={() => setScreen(SubmittedScreen.LIST)}
          textDecorationLine="underline"
        >
          <RenderBreadcrumb breadcrumbConfigs={BREAD_CRUMB_QUIZ_DETAIL} />
        </Text>
        <Text color="#4A5568" fontSize="16px" w="full">
          Điểm số của bài đánh giá:{" "}
          <span style={{ color: "#61A533" }}>{calTotalScore(results)}</span>
        </Text>
        <Text color="#4A5568" fontSize="16px" w="full">
          Ngày nộp bài:{" "}
          <span style={{ fontWeight: 500 }}>
            {formatDate(_.get(dataCbi, "created_at", ""), "DD/MM/YYYY")}
          </span>
        </Text>
        <Text variant="page-title" py="10px" w="full" fontFamily="700" fontSize="24px">
          {_.get(dataCbi, "cbi_user.cbi.name", "")}
        </Text>
        <Text w="full" color="#4A5568">
          {_.get(dataCbi, "cbi_user.cbi.description", "")}
        </Text>
        <Stack w="full">
          <Flex justifyContent="flex-start">
            <Text>Đã trả lời:</Text>
            <Text ml="5px" color="#61A533" fontWeight="bold">
              {doneState.done}
            </Text>
            <Text ml="100px">Chưa trả lời:</Text>
            <Text ml="5px" color="#2D3748" fontWeight="bold">
              {doneState.notDone}
            </Text>
          </Flex>
        </Stack>
        {results.map((result) => (
          <>
            <Box w="full" p="20px">
              <Text color="#3182CE" fontWeight="semibold" mb="10px">
                {result.name}
              </Text>
              <Text>{result.description}</Text>
            </Box>

            <Stack w="full" spacing="10px" border="1px solid #E2E8F0" bg="white">
              <Flex justifyContent="space-between">
                <Box
                  border="1px solid #"
                  w="85%"
                  px="20px"
                  py="10px"
                  style={{ color: "black", fontWeight: "bold" }}
                >
                  Câu hỏi
                </Box>
                <Box w="12%" py="10px" style={{ color: "black", fontWeight: "bold" }}>
                  <Center>Điểm số</Center>
                </Box>
              </Flex>
              {(result.questions || []).map((item, index) => {
                return (
                  <Flex
                    key={item.id}
                    justifyContent="space-between"
                    alignItems="center"
                    borderTop="1px solid #E2E8F0"
                    padding="20px 0"
                  >
                    <Box w="full">
                      <Flex>
                        <Box w="50%" px="20px">
                          <Text>
                            <span style={{ color: "#61A533", fontSize: "24px" }}>
                              {index + 1}.{" "}
                            </span>
                            {item.title}
                          </Text>
                        </Box>
                        <Box w="50%" px="20px">
                          {item.options.map((option) => {
                            if (option.type === CbiQuestionOptionTypeEnum.SINGLE_CHOICE) {
                              return option.values.map((value) => {
                                const enabled = checkExistAnswer(answers, option.answers, value);
                                return (
                                  <Flex alignItems="center">
                                    <RadioGroup w="85%">
                                      <Radio isChecked={!_.isEmpty(enabled)} isReadOnly my="1">
                                        <Text ml="2" fontSize="14px">
                                          {value.title}
                                        </Text>
                                      </Radio>
                                    </RadioGroup>
                                    <Box w="15%" my="1" id={value.id}>
                                      <Input
                                        disabled={!enabled}
                                        onChange={(e) =>
                                          handleUpdateAnswer(
                                            enabled ? enabled.id : "",
                                            e.target.value,
                                          )
                                        }
                                        value={enabled ? enabled.score : value.score}
                                        textAlign="center"
                                      />
                                    </Box>
                                  </Flex>
                                );
                              });
                            } else if (option.type === CbiQuestionOptionTypeEnum.MULTI_CHOICE) {
                              return option.values.map((value) => {
                                const enabled = checkExistAnswer(answers, option.answers, value);
                                return (
                                  <Flex alignItems="center">
                                    <Flex w="85%" alignItems="flex-start" my="1">
                                      <Checkbox
                                        isChecked={
                                          value.status_right_option_value === 1 &&
                                          !_.isEmpty(enabled)
                                        }
                                        isReadOnly
                                      />
                                      <Text ml="4">{value.title}</Text>
                                    </Flex>
                                    <Box w="15%" my="1" id={value.id}>
                                      <Input
                                        disabled={!enabled}
                                        onChange={(e) =>
                                          handleUpdateAnswer(
                                            enabled ? enabled.id : "",
                                            e.target.value,
                                          )
                                        }
                                        value={enabled ? enabled.score : value.score}
                                        textAlign="center"
                                      />
                                    </Box>
                                  </Flex>
                                );
                              });
                            } else if (option.type === CbiQuestionOptionTypeEnum.UPLOAD_FILE) {
                              return option.values.map((value) => {
                                const enabled = checkExistAnswer(answers, option.answers, value);
                                const path = _.get(option, "answers.0.content_answer", "");
                                return (
                                  <Flex alignItems="center" justifyContent="space-between">
                                    <Box w="80%" my="5">
                                      <Button
                                        bg="#61A53326"
                                        onClick={() => {
                                          if (enabled) {
                                            setIsOpenPreview(true);
                                            setPreviewPath(path);
                                          }
                                        }}
                                        leftIcon={<UploadIcon fill="primary" />}
                                        w="100%"
                                        color="#61A533"
                                        fontWeight="600"
                                      >
                                        Xem tài liệu
                                      </Button>
                                    </Box>
                                    <Box w="15%" my="1" id={value.id}>
                                      <Input
                                        disabled={!enabled}
                                        onChange={(e) =>
                                          handleUpdateAnswer(
                                            enabled ? enabled.id : "",
                                            e.target.value,
                                          )
                                        }
                                        value={enabled ? enabled.score : value.score}
                                        textAlign="center"
                                      />
                                    </Box>
                                  </Flex>
                                );
                              });
                            }
                            return option.values.map((value) => {
                              const enabled = checkExistAnswer(answers, option.answers, value);
                              return (
                                <Flex alignItems="center" justifyContent="space-between">
                                  <Box w="80%" my="5">
                                    <Text>{value.title}</Text>
                                    <Textarea
                                      isReadOnly
                                      value={option.answers ? option.answers[0].content_answer : ""}
                                    />
                                  </Box>
                                  <Box w="15%" my="1" id={value.id}>
                                    <Input
                                      disabled={!enabled}
                                      onChange={(e) =>
                                        handleUpdateAnswer(
                                          enabled ? enabled.id : "",
                                          e.target.value,
                                        )
                                      }
                                      value={enabled ? enabled.score : value.score}
                                      textAlign="center"
                                    />
                                  </Box>
                                </Flex>
                              );
                            });
                          })}
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                );
              })}
            </Stack>
          </>
        ))}
        <ConfirmModalV2
          title="Thông báo"
          content="Bạn có chắc chắn công bố điểm số bài CEBI này?"
          isOpen={isOpen}
          onClose={onClose}
          onOk={handleClose}
          onCancel={onClose}
          okText="Đồng ý"
          cancelText="Huỷ"
        />
        <FilePreviewModal
          title="Xem tài liệu"
          path={previewPath}
          isOpen={isOpenPreview}
          onClose={() => setIsOpenPreview(false)}
        />
        ƒ
      </VStack>
    </LoadingPage>
  );
}

export { AnswerDetail };
