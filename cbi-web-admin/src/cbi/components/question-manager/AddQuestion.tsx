import {
  Box,
  Button,
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
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAddQuizDetail } from "src/cbi/hooks/useAddQuizDetail";
import { useEditQuizDetail } from "src/cbi/hooks/useEditQuizDetail";
import {
  QuizDetailNavigationParams,
  QuizDetailParams,
  QuizOptionCreate,
  QuizValueCreate,
} from "src/cbi/interfaces";
import { ReactComponent as TrashIcon } from "src/common/assets/icons/iconTrash.svg";
import { Checkboxes } from "src/common/components/checkbox";
import { WarningModal } from "src/common/components/confirm-modal/WarningModal";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
const QUESTION_TYPE = [
  {
    label: "Trắc nghiệm (Chọn 1 đáp án)",
    value: 1,
  },
  {
    label: "Trắc nghiệm (Chọn nhiều đáp án)",
    value: 2,
  },
  {
    label: "Tự luận",
    value: 3,
  },
  {
    label: "Tải tải liệu lên hệ thống",
    value: 4,
  },
];

interface IAnswer {
  id: string;
  type: number;
  isSelected: boolean;
  title: string;
  score: string;
}

const newAnswer = (type: number, id = uuidv4(), isSelected = false, title = "", score = "") => ({
  id,
  type,
  isSelected,
  title,
  score,
});
function AddQuestion() {
  const search = useParams();
  const [idOneSelect, setIdOneSelect] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [errTitle, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as QuizDetailNavigationParams;
  const { quizCategory, selectedQuiz } = state;
  const [answer, setAnswer] = useImmer<any[]>(selectedQuiz ? [] : []);
  const [validateError, setValidateError] = useState<string>("");
  const [optionalCheck, setOptionalCheck] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (selectedQuiz) {
      setTitle(selectedQuiz.title);
      setOptionalCheck(selectedQuiz.status_answer_mandatory === 1);
      selectedQuiz.options.length > 0 &&
        selectedQuiz.options.forEach((option) => {
          option.values.length > 0 &&
            option.values.forEach((value) => {
              if (value.status_right_option_value === 1 && option.type === 1) {
                setIdOneSelect(value.id);
              }
              setAnswer((draft) => {
                draft.push(
                  newAnswer(
                    option.type,
                    value.id,
                    value.status_right_option_value === 1,
                    value.title,
                    value.score,
                  ),
                );
              });
            });
        });
    }
  }, [selectedQuiz]);

  const addQuizDetail = useAddQuizDetail();
  const editQuizDetail = useEditQuizDetail();

  const validateHasRightOption = (arr: IAnswer[]) => {
    const hasRightOption = arr.filter((item) => item.isSelected);
    return hasRightOption.length > 0;
  };

  const validateScoreIsNumber = (arr: IAnswer[]) => {
    return arr.every((item) => !isNaN(Number(item.score)));
  };

  const validateHasTitle = (arr: IAnswer[]) => {
    return arr.every((item) => (item.type !== 4 && item.title.length > 0) || item.type === 4);
  };

  const handleSave = () => {
    if (answer.length === 0) return;
    if (title === "") {
      setError("Vui lòng nhập câu hỏi");
      return;
    }
    if (!validateScoreIsNumber(answer)) {
      setValidateError("Điểm phải là số!");
      onOpen();
      return;
    }
    if (!validateHasTitle(answer)) {
      setValidateError("Không được để trống đáp án");
      onOpen();
      return;
    }
    const arr1 = answer.filter((item) => item.type === 1);
    const arr2 = answer.filter((item) => item.type === 2);
    if (arr1.length > 0) {
      if (!validateHasRightOption(arr1)) {
        setValidateError("Vui lòng chọn đáp án đúng");
        onOpen();
        return;
      }
    }
    if (arr2.length > 0) {
      if (!validateHasRightOption(arr2)) {
        setValidateError("Vui lòng chọn đáp án đúng");
        onOpen();
        return;
      }
    }
    const value1s: QuizValueCreate[] = [],
      value2s: QuizValueCreate[] = [];
    arr1.length > 0 &&
      arr1.forEach((item) => {
        const newValue: QuizValueCreate = {
          title: item.title,
          score: Number(item.score),
          status_right_option_value: item.id === idOneSelect ? 1 : -1,
        };
        if (selectedQuiz) newValue.id = item.id;
        value1s.push(newValue);
      });
    arr2.length > 0 &&
      arr2.forEach((item) => {
        const newValue: QuizValueCreate = {
          title: item.title,
          score: Number(item.score),
          status_right_option_value: item.isSelected ? 1 : -1,
        };
        if (selectedQuiz) newValue.id = item.id;
        value2s.push(newValue);
      });
    const options: QuizOptionCreate[] = [];
    for (let i = 0; i < answer.length; i++) {
      if (answer[i].type === 3 || answer[i].type === 4) {
        const newValue: QuizValueCreate = {
          title: answer[i].type === 3 ? answer[i].title : "Tải tài liệu",
          score: Number(answer[i].score),
        };
        if (selectedQuiz) newValue.id = answer[i].id;
        const newOption: QuizOptionCreate = {
          type: answer[i].type,
          values: [newValue],
        };
        if (selectedQuiz) {
          const optionObj = selectedQuiz.options.find((item) => item.type === answer[i].type);
          if (optionObj) {
            newOption.id = optionObj.id;
          }
        }
        options.push(newOption);
      } else if (i === 0 || (i > 0 && answer[i - 1].type !== answer[i].type)) {
        const newOption: QuizOptionCreate = {
          type: answer[i].type,
          values: answer[i].type === 1 ? value1s : value2s,
        };
        if (selectedQuiz) {
          const optionObj = selectedQuiz.options.find((item) => item.type === answer[i].type);
          if (optionObj) {
            newOption.id = optionObj.id;
          }
        }
        options.push(newOption);
      }
    }
    const params: QuizDetailParams = {
      title,
      options,
      status_answer_mandatory: optionalCheck ? 1 : -1,
    };
    if (selectedQuiz) {
      params.id = selectedQuiz.id;
    }
    if (selectedQuiz) {
      editQuizDetail.mutate(
        {
          id: search?.questionId || "",
          level_id: search?.level || "",
          group_id: quizCategory.id,
          question_id: selectedQuiz.id,
          quizDetailParams: params,
        },
        {
          onSuccess: () => {
            addQuizDetail.invalidate();
            navigate(-1);
          },
          onError: (err: any) => {
            setError(err.data?.message);
          },
        },
      );
    } else {
      addQuizDetail.mutate(
        {
          id: search?.questionId || "",
          level_id: search?.level || "",
          group_id: quizCategory.id,
          quizDetailParams: params,
        },
        {
          onSuccess: () => {
            addQuizDetail.invalidate();
            navigate(-1);
          },
          onError: (err: any) => {
            setError(err.data?.message);
          },
        },
      );
    }
  };

  const handleClose = () => {
    onClose();
    setValidateError("");
  };

  const handleAddAnswer = useCallback((type: number) => {
    setAnswer((draft) => {
      const idx = _.findLastIndex(
        draft,
        (item) => item.type === type && item.type !== 3 && item.type !== 4,
      );
      if (idx > -1) {
        draft.splice(idx + 1, 0, newAnswer(type));
      } else {
        draft.push(newAnswer(type));
      }
    });
  }, []);

  function handleUpdateAnswer(id: string, key: string, value: string | number | boolean) {
    if (answer.length > 0) {
      setAnswer((old) => {
        const current = old.find((as) => as.id === id);
        if (current) current[key] = value;
      });
    }
  }
  function handleRemoveAnswer(id: string) {
    setAnswer((old) => {
      const index = old.findIndex((it) => it.id === id);
      old.splice(index, 1);
    });
  }

  const checkListAnswer = (value: number) => {
    let valid = true;
    if (answer.length > 0) {
      answer.forEach((a) => {
        if ((a.type === 1 && value === 2) || (a.type === 2 && value === 1)) {
          valid = false;
        }
      });
    }
    return valid;
  };

  const handleOptionalCheck = () => {
    setOptionalCheck(!optionalCheck);
  };

  return (
    <VStack w="full" spacing="5">
      <Text variant="page-title" py="20px" w="full" fontFamily="700" fontSize="24px">
        THÊM CÂU HỎI
      </Text>
      <Box w="full" bg="white" p="25px" boxShadow="0px 4px 4px rgba(0, 0, 0, 0.04)">
        <Text fontSize="20px" fontWeight="semibold">
          {quizCategory.name}
        </Text>
      </Box>

      <Stack w="full" spacing="10px">
        <Box>
          <Flex>
            <Text py="1" mr="5">
              Câu hỏi
            </Text>
            <Checkboxes
              isChecked={optionalCheck}
              content="Bắt buộc"
              onChange={handleOptionalCheck}
            />
          </Flex>
          <Textarea
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (e.target.value !== "") {
                setError("");
              }
            }}
            placeholder="Nhập câu hỏi"
            bg="white"
          />
          {errTitle && (
            <Text py="1" color="red" fontSize="12px">
              {errTitle}
            </Text>
          )}
        </Box>

        <Text py="1">Câu trả lời</Text>
        <Flex border="1px solid #E2E8F0" bg="white">
          <Box w="28%">
            <Box w="full" p="3">
              <Text fontSize="18px" fontWeight="700" py="1">
                Chọn loại câu trả lời
              </Text>
              <Text color="#2D3748">
                Chọn những lựa chọn phía dưới để tạo danh sách câu trả lời (1 lựa chọn có thể chọn
                nhiều lần)
              </Text>
              {QUESTION_TYPE.map((item) => (
                <Button
                  justifyContent="flex-start"
                  border="1px solid #61A533"
                  bg="#61A53326"
                  key={item.value}
                  mt="5"
                  onClick={() => handleAddAnswer(item.value)}
                  color="black"
                  fontWeight="medium"
                  w="full"
                  disabled={!checkListAnswer(item.value)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          </Box>
          <Box borderLeft="1px solid #E2E8F0" w="full">
            <Box p="3">
              <Text fontSize="18px" fontWeight="700" py="1">
                Danh sách đáp án
              </Text>
            </Box>
            <Box>
              <RadioGroup value={idOneSelect} onChange={(val) => setIdOneSelect(val)}>
                {answer.map(({ id, type, title, score, isSelected }) => {
                  if (type === 1) {
                    return (
                      <Flex
                        key={id}
                        justifyContent="space-between"
                        alignItems="center"
                        my="4"
                        px="4"
                      >
                        <Box w="20px">
                          <Radio
                            value={id}
                            onChange={() => handleUpdateAnswer(id, "isSelected", true)}
                          />
                        </Box>
                        <Box w="65%">
                          <Input
                            placeholder="Câu trả lời"
                            defaultValue={title}
                            onChange={(e) => handleUpdateAnswer(id, "title", e.target.value)}
                          />
                        </Box>
                        <Box w="20%">
                          <Input
                            placeholder="Điểm"
                            w="135px"
                            defaultValue={score}
                            onChange={(e) => handleUpdateAnswer(id, "score", e.target.value)}
                          />
                        </Box>
                        <Box w="5%">
                          <TrashIcon cursor="pointer" onClick={() => handleRemoveAnswer(id)} />
                        </Box>
                      </Flex>
                    );
                  } else if (type === 2) {
                    return (
                      <Flex
                        key={id}
                        justifyContent="space-between"
                        alignItems="center"
                        my="4"
                        px="4"
                      >
                        <Box w="20px">
                          <Checkbox
                            defaultChecked={isSelected}
                            onChange={(e) => handleUpdateAnswer(id, "isSelected", e.target.checked)}
                          />
                        </Box>
                        <Box w="65%">
                          <Input
                            placeholder="Câu trả lời"
                            defaultValue={title}
                            onChange={(e) => handleUpdateAnswer(id, "title", e.target.value)}
                          />
                        </Box>
                        <Box w="20%">
                          <Input
                            placeholder="Điểm"
                            w="135px"
                            value={score}
                            onChange={(e) => handleUpdateAnswer(id, "score", e.target.value)}
                          />
                        </Box>
                        <Box w="5%">
                          <TrashIcon cursor="pointer" onClick={() => handleRemoveAnswer(id)} />
                        </Box>
                      </Flex>
                    );
                  } else if (type === 3) {
                    return (
                      <Flex
                        key={id}
                        justifyContent="space-between"
                        alignItems="center"
                        my="4"
                        px="4"
                      >
                        <Box w="70%">
                          <Input
                            placeholder="Nhập tiêu đề tự luận"
                            defaultValue={title}
                            onChange={(e) => handleUpdateAnswer(id, "title", e.target.value)}
                          />
                        </Box>
                        <Box w="20%">
                          <Input
                            placeholder="Điểm"
                            w="135px"
                            value={score}
                            onChange={(e) => handleUpdateAnswer(id, "score", e.target.value)}
                          />
                        </Box>
                        <Box w="5%">
                          <TrashIcon cursor="pointer" onClick={() => handleRemoveAnswer(id)} />
                        </Box>
                      </Flex>
                    );
                  }
                  return (
                    <Flex key={id} justifyContent="space-between" alignItems="center" my="4" px="4">
                      <Box w="70%">
                        <Text fontSize="16px" fontWeight="semibold">
                          Tải tài liệu lên hệ thống
                        </Text>
                      </Box>
                      <Box w="20%">
                        <Input
                          placeholder="Điểm"
                          w="135px"
                          value={score}
                          onChange={(e) => handleUpdateAnswer(id, "score", e.target.value)}
                        />
                      </Box>
                      <Box w="5%">
                        <TrashIcon cursor="pointer" onClick={() => handleRemoveAnswer(id)} />
                      </Box>
                    </Flex>
                  );
                })}
              </RadioGroup>
            </Box>
          </Box>
        </Flex>
      </Stack>
      <Stack direction="row" spacing={4} mt="20">
        <Button bg="#C4C4C4" w="190px" onClick={() => navigate(-1)}>
          Hủy
        </Button>
        <Button bg="green.primary" w="190px" onClick={handleSave}>
          Thêm câu hỏi
        </Button>
      </Stack>
      <WarningModal
        title="Thông báo"
        content={validateError}
        isOpen={isOpen}
        onClose={handleClose}
        onOk={handleClose}
        okText="Đồng ý"
      />
    </VStack>
  );
}

export { AddQuestion };
