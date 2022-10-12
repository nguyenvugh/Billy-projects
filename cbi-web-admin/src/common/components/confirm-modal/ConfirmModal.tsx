import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type ConfirmModalProps = {
  title: string;
  content: string;
  cancelText?: string;
  deleteText?: string;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
};
function ConfirmModal({
  title,
  content,
  cancelText,
  deleteText,
  isOpen,
  onCancel,
  onDelete,
}: ConfirmModalProps) {
  const { t } = useTranslation();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent mt="40" w="368px">
          <ModalHeader
            borderBottom="1px solid #EEEEEE"
            fontWeight="600"
            fontSize="18px"
            textAlign="center"
            color="#FF2B2B"
            textTransform="uppercase"
          >
            {title}
          </ModalHeader>
          <ModalBody pb={6} textAlign="center" fontSize="16px" fontWeight="normal">
            {content}
          </ModalBody>

          <ModalFooter justifyContent="center" pt="0">
            <Button
              bg="white"
              color="black"
              border="1px solid #CBCBCB"
              mr={4}
              onClick={onCancel}
              w="138px"
            >
              {cancelText || t("cancel")}
            </Button>
            <Button
              onClick={() => {
                onDelete();
              }}
              bg="#E21818"
              color="white"
              w="138px"
            >
              {deleteText || t("delete")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ConfirmModal };
