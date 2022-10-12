import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dropzone } from "src/common/components/dropzone";
import { Form } from "src/common/components/form";
import { Label } from "src/common/components/label";
import { usePresignImg } from "src/common/hooks/usePresignImg";
import { useToast } from "src/common/hooks/useToast";
import { CBIS } from "../../interfaces";
import { QUESTION_TABLE_SCHEMA } from "../cbi.schema";

type CbiModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: CBIS) => void;
  selectedCbi?: (CBIS & { img: string }) | null;
};
function CbiModal({ title, isOpen, onClose, onSave, selectedCbi }: CbiModalProps) {
  const { t } = useTranslation();
  const toast = useToast();
  const { handleUpload, isUploading } = usePresignImg();
  const [thumbKey, setThumbKey] = useState("");
  const [defaultImg, setDefaultImg] = useState("");

  const formMethods = useForm({
    resolver: yupResolver(QUESTION_TABLE_SCHEMA),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (selectedCbi) {
      formMethods.setValue("name", selectedCbi.name);
      formMethods.setValue("description", selectedCbi.description);
      setThumbKey(selectedCbi.thumbnail_id);
      setDefaultImg(selectedCbi.img);
    }
  }, [selectedCbi]);
  const name = formMethods.watch("name");
  const description = formMethods.watch("description");
  const isValidForm = name && description;

  async function handleFileChange(file?: File) {
    const thumbKey = await handleUpload(file);
    setThumbKey(thumbKey.id || "");
  }

  function handleSave(data: CBIS) {
    if (isUploading) {
      toast({ title: "Đang trong quá tình tải ảnh!", status: "warning" });
      return;
    }
    onSave({ ...data, thumbnail_id: thumbKey });
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt="40">
          <ModalHeader fontWeight="700" fontSize="24px" color={"black"}>
            {title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Form methodsHookForm={formMethods} onSubmit={(data) => console.log(data)}>
              <Form.Item name="name" label="Tên bảng câu hỏi (VN)" isRequired>
                <Input placeholder="Tên bảng câu hỏi" />
              </Form.Item>
              <Form.Item name="description" label="Thêm mô tả (VN)" isRequired>
                <Textarea placeholder="Thêm mô tả" />
              </Form.Item>

              <Label label="Tải hình ảnh đại diện" mt="4" />
              <Box h="152px">
                <Dropzone
                  onChange={handleFileChange}
                  defaultImg={defaultImg}
                  downTitle="Hình ảnh hiển thị tối ưu nhất ở kích thước 350x205px
                  (Định dạng: PNG, JPG)"
                  minDimension={[350, 205]}
                  bgColor="#718096"
                />
              </Box>
            </Form>
          </ModalBody>

          <ModalFooter justifyContent="flex-end" pt="0">
            <Button bg="#718096" color="white" mr={4} onClick={onClose} w="120px">
              {t("cancel")}
            </Button>
            <Button
              onClick={formMethods.handleSubmit((data) => {
                handleSave(data as CBIS);
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
