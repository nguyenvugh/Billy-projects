import {
  Box,
  Center,
  Checkbox,
  Flex,
  Radio,
  RadioGroup,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CbiQuestionOptionTypeEnum } from "src/cbi/constants";
import { useDeleteQuizDetail } from "src/cbi/hooks/useDeleteQuizDetail";
import { useDeleteQuizLevel } from "src/cbi/hooks/useDeleteQuizLevel";
import { QuizLevel } from "src/cbi/interfaces";
// import { ReactComponent as EditIcon } from "src/common/assets/icons/iconEditV2.svg";
// import { ReactComponent as TrashIcon } from "src/common/assets/icons/iconTrash.svg";
// import { ReactComponent as PlusIcon } from "src/common/assets/icons/iconPlus.svg";
import { ReactComponent as ArrowDownIcon } from "src/common/assets/icons/iconArrowDown.svg";
import { ReactComponent as ArrowRightIcon } from "src/common/assets/icons/iconArrowRight.svg";
import { ConfirmModal } from "src/common/components/confirm-modal/ConfirmModal";
// import { replacePathParams } from "src/common/lib/common.lib";
// import { ROUTE_QUESTIONS_DETAILS_LEVEL_ADD } from "src/common/constants/routes.constants";
import { WarningModal } from "src/common/components/confirm-modal/WarningModal";
import { useToast } from "src/common/hooks/useToast";
import { CbiModal } from "./CbiModal";
import { Dropzone } from "./DropZone";

function QuizCategoryItem({ quizCategory }: { quizCategory: QuizLevel }) {
  const toast = useToast();
  const search = useParams();
  // const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [quizIdToDelete, setQuizIdToDelete] = useState<string>("");
  const {
    isOpen,
    //  onOpen,
    onClose,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    // onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteDetail,
    // onOpen: onOpenDeleteDetail,
    onClose: onCloseDeleteDetail,
  } = useDisclosure();

  const deleteQuizLevel = useDeleteQuizLevel();
  const deleteQuizDetail = useDeleteQuizDetail();

  const handleConfirmDelete = () => {
    deleteQuizLevel.mutate(
      { id: search?.questionId || "", level_id: search?.level || "", group_id: quizCategory.id },
      {
        onSuccess: () => {
          onCloseDelete();
          deleteQuizLevel.invalidate();
          toast({
            position: "top",
            title: "Xoá thành công!",
          });
        },
        onError: (err: any) => {
          onCloseDelete();
          toast({
            position: "top",
            title: err.data?.message,
            status: "error",
          });
        },
      },
    );
  };

  const handleConfirmDeleteDetail = () => {
    deleteQuizDetail.mutate(
      {
        id: search?.questionId || "",
        level_id: search?.level || "",
        group_id: quizCategory.id,
        question_id: quizIdToDelete,
      },
      {
        onSuccess: () => {
          onCloseDeleteDetail();
          deleteQuizDetail.invalidate();
          toast({
            position: "top",
            title: "Xoá thành công!",
          });
          setQuizIdToDelete("");
        },
        onError: (err: any) => {
          onCloseDeleteDetail();
          toast({
            position: "top",
            title: err.data?.message,
            status: "error",
          });
          setQuizIdToDelete("");
        },
      },
    );
  };

  return (
    <Stack bg="white" w="full">
      <Flex alignItems="center" py="5" px="2">
        <Flex>
          {collapsed ? (
            <ArrowRightIcon
              fill="#979797"
              cursor="pointer"
              onClick={() => setCollapsed(!collapsed)}
            />
          ) : (
            <ArrowDownIcon
              fill="#979797"
              cursor="pointer"
              onClick={() => setCollapsed(!collapsed)}
            />
          )}
          <Text ml="2" fontWeight="semibold">
            {quizCategory.name}
          </Text>
        </Flex>

        <Spacer />
        {/* <Flex alignItems="center">
          <Box mr="4">
            <EditIcon fill="#979797" cursor="pointer" onClick={onOpen} />
          </Box>
          <Box mr="4">
            <TrashIcon fill="#979797" cursor="pointer" onClick={onOpenDelete} />
          </Box>
          <Button
            bg="green.primary"
            leftIcon={<PlusIcon />}
            onClick={() =>
              navigate(
                replacePathParams(ROUTE_QUESTIONS_DETAILS_LEVEL_ADD, {
                  questionId: search?.questionId,
                  level: search?.level,
                }),
                {
                  state: {
                    quizCategory,
                  },
                },
              )
            }
          >
            Thêm câu hỏi
          </Button>
        </Flex> */}
      </Flex>
      {!collapsed && (
        <Table>
          <Thead bg="#EBEFF2">
            <Tr>
              <Th color="#2D3748">Câu hỏi</Th>
              <Th color="#2D3748">Đáp án</Th>
              <Th color="#2D3748">
                <Center>Số điểm</Center>
              </Th>
              {/* <Th color="#2D3748">
                <Center>Hành động</Center>
              </Th> */}
            </Tr>
          </Thead>

          <Tbody>
            {quizCategory &&
              quizCategory.questions.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td w="50%" style={{ verticalAlign: "top" }}>
                      <Text fontWeight="medium" fontSize="16px">
                        {item.title}
                      </Text>
                    </Td>
                    <Td w="25%" style={{ verticalAlign: "top" }}>
                      {item.options.map((option, index) => {
                        const val = option.values.filter(
                          (value) => value.status_right_option_value === 1,
                        )[0]?.id;
                        if (option.type === CbiQuestionOptionTypeEnum.SINGLE_CHOICE) {
                          return option.values.map((value) => {
                            return (
                              <RadioGroup>
                                <Radio isChecked={value.id === val} isReadOnly my="1">
                                  <Text ml="2" fontSize="16px">
                                    {value.title}
                                  </Text>
                                </Radio>
                              </RadioGroup>
                            );
                          });
                        } else if (option.type === CbiQuestionOptionTypeEnum.MULTI_CHOICE) {
                          return option.values.map((value) => {
                            return (
                              <Flex alignItems="flex-start" my="1">
                                <Checkbox
                                  isChecked={value.status_right_option_value === 1}
                                  isReadOnly
                                />
                                <Text ml="4" fontSize="16px">
                                  {value.title}
                                </Text>
                              </Flex>
                            );
                          });
                        } else if (option.type === CbiQuestionOptionTypeEnum.UPLOAD_FILE) {
                          return option.values.map(() => {
                            return (
                              <Box mb="5" mt={index === 0 ? "0" : "5"}>
                                <Dropzone disabled onChange={() => {}} />
                              </Box>
                            );
                          });
                        }
                        return option.values.map((value) => {
                          return (
                            <Box mb="5" mt={index === 0 ? "0" : "5"}>
                              <Text fontSize="16px" mb="8px">
                                {value.title}
                              </Text>
                              <Textarea isReadOnly />
                            </Box>
                          );
                        });
                      })}
                    </Td>
                    <Td style={{ verticalAlign: "top" }}>
                      <Center>
                        <Text fontSize="24px" fontWeight="semibold">
                          {item?.total_scores}
                        </Text>
                      </Center>
                    </Td>
                    {/* <Td style={{ verticalAlign: "top" }}>
                      <Center>
                        <Flex>
                          <Box mr="2">
                            <EditIcon
                              fill="#979797"
                              cursor="pointer"
                              onClick={() =>
                                navigate(
                                  replacePathParams(ROUTE_QUESTIONS_DETAILS_LEVEL_ADD, {
                                    questionId: search?.questionId,
                                    level: search?.level,
                                  }),
                                  {
                                    state: {
                                      quizCategory,
                                      selectedQuiz: item,
                                    },
                                  },
                                )
                              }
                            />
                          </Box>
                          <Box>
                            <TrashIcon
                              fill="#979797"
                              cursor="pointer"
                              onClick={() => {
                                setQuizIdToDelete(item.id);
                                onOpenDeleteDetail();
                              }}
                            />
                          </Box>
                        </Flex>
                      </Center>
                    </Td> */}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      )}
      <CbiModal
        title="Sửa thông tin"
        onSave={() => {}}
        isOpen={isOpen}
        onClose={onClose}
        editItem={quizCategory}
      />
      <WarningModal
        title="Thông báo"
        content="Bạn có chắc chắn muốn xóa danh mục này?"
        isOpen={isOpenDelete}
        onCancel={onCloseDelete}
        onOk={handleConfirmDelete}
        okText="Đồng ý"
      />
      <ConfirmModal
        title="Thông báo"
        content="Bạn có chắc chắn muốn xóa câu hỏi này?"
        isOpen={isOpenDeleteDetail}
        onCancel={onCloseDeleteDetail}
        onDelete={handleConfirmDeleteDetail}
      />
    </Stack>
  );
}

export default QuizCategoryItem;
