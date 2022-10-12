import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Form } from "src/common/components/form";
import { schema } from "./category.schema";

type CategoryModalProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: string) => void;
  defaultCateName?: string;
};
function CategoryModal({
  title,
  isOpen,
  onClose,
  onSave,
  defaultCateName = "",
}: CategoryModalProps) {
  const { t } = useTranslation();
  const formMethods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      categoryName: defaultCateName,
    },
  });

  useEffect(() => {
    formMethods.setValue("categoryName", defaultCateName);
  }, [defaultCateName]);
  const category = formMethods.watch("categoryName");
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt="40">
          <ModalHeader borderBottom="1px solid #EEEEEE" fontWeight="600" fontSize="18px">
            {title}
          </ModalHeader>

          <ModalBody pb={6}>
            <Form methodsHookForm={formMethods} onSubmit={(data) => console.log(data)}>
              <Form.Item name="categoryName" label={t("category-name")} isRequired>
                <Input placeholder={t("enter-category-name")} />
              </Form.Item>
            </Form>
          </ModalBody>

          <ModalFooter justifyContent="center" pt="0">
            <Button
              bg="white"
              color="black"
              border="1px solid #CBCBCB"
              mr={4}
              onClick={onClose}
              w="120px"
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={formMethods.handleSubmit((data) => {
                onSave(data.categoryName);
              })}
              bg="#144AFF"
              color="white"
              w="120px"
              isDisabled={!category}
            >
              {t("save")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { CategoryModal };
