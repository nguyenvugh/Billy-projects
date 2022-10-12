import {
  Box,
  Button,
  Checkbox,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useAddQuizGroup } from "src/cbi/hooks/useAddQuizGroup";
import { useEditQuizGroup } from "src/cbi/hooks/useEditQuizGroup";
import { QuestionList, QuizGroup, QuizGroupParam } from "src/cbi/interfaces";
import { ReactComponent as CloseIcon } from "src/common/assets/icons/iconCloseModal.svg";
import { Form } from "src/common/components/form";
import { useToast } from "src/common/hooks/useToast";
import { QUIZ_GROUP_SCHEMA } from "../cbi.schema";

type CbiModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<QuestionList>) => void;
  editItem?: QuizGroup;
};

function CbiModal({ title, isOpen, onClose, onSave, editItem }: CbiModalProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const addQuizGroup = useAddQuizGroup();
  const editQuizGroup = useEditQuizGroup();
  const search = useParams();
  const formMethods = useForm<QuizGroupParam>({
    resolver: yupResolver(QUIZ_GROUP_SCHEMA),
    defaultValues: {
      name: editItem?.name || "",
      auto_calculate_score: editItem?.auto_calculate_score || -1,
    },
  });
  const name = formMethods.watch("name");
  const isValidForm = name;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      formMethods.setValue("auto_calculate_score", 1);
    } else {
      formMethods.setValue("auto_calculate_score", -1);
    }
  };

  const handleSubmit = (quizGroupParams: QuizGroupParam) => {
    if (editItem) {
      const mutatedQuizGroupParams: QuizGroupParam = {
        ...quizGroupParams,
        auto_calculate_score:
          quizGroupParams.auto_calculate_score === true ||
          quizGroupParams.auto_calculate_score === 1
            ? 1
            : -1,
        status_publish: editItem.status_publish,
      };
      editQuizGroup.mutate(
        {
          id: search?.questionId || "",
          level_id: editItem?.id,
          quizGroupParams: mutatedQuizGroupParams,
        },
        {
          onSuccess: () => {
            onClose();
            editQuizGroup.invalidate();
            toast({
              position: "top",
              title: "Giai đoạn được sửa thành công!",
            });
          },
          onError: (err: any) => {
            toast({
              position: "top",
              title: err.data?.message,
              status: "error",
            });
          },
        },
      );
    } else {
      addQuizGroup.mutate(
        {
          id: search?.questionId || "",
          quizGroupParams: { ...quizGroupParams, status_publish: -1 },
        },
        {
          onSuccess: () => {
            onClose();
            addQuizGroup.invalidate();
            toast({
              position: "top",
              title: "Giai đoạn được thêm thành công!",
            });
          },
          onError: (err: any) => {
            toast({
              position: "top",
              title: err.data?.message,
              status: "error",
            });
          },
        },
      );
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt="40">
          <ModalHeader borderBottom="1px solid #EEEEEE" fontWeight="600" fontSize="18px">
            <Flex>
              {title}
              <Spacer />
              <CloseIcon fill="#979797" cursor="pointer" onClick={onClose} />
            </Flex>
          </ModalHeader>

          <ModalBody pb={6}>
            <Form methodsHookForm={formMethods}>
              <Form.Item
                name="name"
                label={editItem ? "Tên giai đoạn" : "Nhập tên giai đoạn"}
                isRequired
              >
                <Textarea
                  placeholder="Nhập tên ..."
                  size="lg"
                  rows={10}
                  height="auto"
                  fontSize="14px"
                />
              </Form.Item>
              <Form.Item name="auto_calculate_score">
                <Flex>
                  <Checkbox
                    defaultChecked={formMethods.getValues("auto_calculate_score") === 1}
                    mt="2"
                    onChange={onChange}
                  />
                  <Box mt="2" ml="2">
                    <Text fontSize="14px">Chấm điểm tự động</Text>
                  </Box>
                </Flex>
              </Form.Item>
            </Form>
          </ModalBody>

          <ModalFooter justifyContent="flex-end" pt="0">
            <Button
              bg="#718096"
              color="white"
              border="1px solid #CBCBCB"
              mr={4}
              onClick={onClose}
              w="120px"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={formMethods.handleSubmit((data) => {
                onSave(data);
                handleSubmit(data);
              })}
              bg="green.primary"
              color="white"
              w="120px"
              isDisabled={!isValidForm}
            >
              {t("save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { CbiModal };
