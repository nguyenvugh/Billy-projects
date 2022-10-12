import {
  Button,
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
import { useAddQuizLevel } from "src/cbi/hooks/useAddQuizLevel";
import { useEditQuizLevel } from "src/cbi/hooks/useEditQuizLevel";
import { QuestionList, QuizCategoryParam, QuizLevel } from "src/cbi/interfaces";
import { ReactComponent as CloseIcon } from "src/common/assets/icons/iconCloseModal.svg";
import { Form } from "src/common/components/form";
import { useToast } from "src/common/hooks/useToast";
import { QUIZ_CATEGORY_SCHEMA } from "../cbi.schema";

type CbiModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<QuestionList>) => void;
  editItem?: QuizLevel;
};

function CbiModal({ title, isOpen, onClose, onSave, editItem }: CbiModalProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const addQuizLevel = useAddQuizLevel();
  const editQuizLevel = useEditQuizLevel();
  const search = useParams();
  const formMethods = useForm<QuizCategoryParam>({
    resolver: yupResolver(QUIZ_CATEGORY_SCHEMA),
    defaultValues: {
      name: editItem?.name || "",
      description: editItem?.description || "",
    },
  });
  const name = formMethods.watch("name");
  const isValidForm = name;

  const handleSubmit = (quizCategoryParams: QuizCategoryParam) => {
    if (editItem) {
      editQuizLevel.mutate(
        {
          id: search?.questionId || "",
          level_id: search?.level || "",
          group_id: editItem?.id,
          quizCategoryParams,
        },
        {
          onSuccess: () => {
            onClose();
            editQuizLevel.invalidate();
            toast({
              position: "top",
              title: "Danh mục được sửa thành công!",
            });
          },
          onError: (err: any) => {
            formMethods.setError("name", err.data?.message);
          },
        },
      );
    } else {
      addQuizLevel.mutate(
        { id: search?.questionId || "", level_id: search?.level || "", quizCategoryParams },
        {
          onSuccess: () => {
            onClose();
            addQuizLevel.invalidate();
            toast({
              position: "top",
              title: "Danh mục được thêm thành công!",
            });
          },
          onError: (err: any) => {
            formMethods.setError("name", { message: err?.data?.message });
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
          <ModalHeader fontWeight="600" fontSize="18px" paddingBottom="0">
            <Flex>
              <Text style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</Text>
              <Spacer />
              <CloseIcon fill="#979797" cursor="pointer" onClick={onClose} />
            </Flex>
          </ModalHeader>

          <ModalBody pb={6}>
            <Form methodsHookForm={formMethods}>
              <Form.Item styleErrors={{ fontSize: "9px" }} name="name" label="Nhập tên danh mục">
                <Textarea
                  placeholder="Nhập tên ..."
                  size="lg"
                  rows={4}
                  height="auto"
                  fontSize="14px"
                />
              </Form.Item>
              <Form.Item styleErrors={{ fontSize: "9px" }} name="description" label="Mô tả:">
                <Textarea
                  placeholder="Nhập mô tả ..."
                  size="lg"
                  rows={6}
                  height="auto"
                  fontSize="14px"
                />
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
