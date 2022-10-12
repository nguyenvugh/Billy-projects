import React from "react";
import {
  Box,
  Button,
  ChakraProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactComponent as WarningIcon } from "src/common/assets/icons/iconWarning.svg";

type ConfirmModalV2Props = {
  title: string;
  content: string;
  icon?: React.ReactNode;
  cancelText?: string;
  okText?: string;
  isOpen?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  onClose?: () => void;
  titleStyleProps?: ChakraProps;
  contentStyleProps?: ChakraProps;
  btnCancelStyleProps?: ChakraProps;
  btnOkStyleProps?: ChakraProps;
};
function ConfirmModalV2({
  title,
  content,
  cancelText,
  okText,
  isOpen,
  onCancel = () => {},
  onOk = () => {},
  onClose = () => {},
  titleStyleProps,
  contentStyleProps,
  btnCancelStyleProps,
  btnOkStyleProps,
  icon,
}: ConfirmModalV2Props) {
  const { t } = useTranslation();
  return (
    <>
      <Modal isOpen={!!isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent minW="600px">
          {!!onClose && <ModalCloseButton onClick={onClose} />}
          <ModalHeader
            fontWeight="700"
            fontSize="24px"
            textAlign="left"
            color="#000000"
            {...titleStyleProps}
          >
            {title}
          </ModalHeader>
          <ModalBody
            pt={6}
            pb={10}
            textAlign="center"
            fontSize="20px"
            fontWeight="400"
            {...contentStyleProps}
          >
            <Box display="flex" alignItems="center">
              {icon || <WarningIcon />}
              <Box>{content}</Box>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="center" pt="0" pb="10">
            <Button
              h="48px"
              bg="#718096"
              color="white"
              mr={4}
              onClick={onCancel}
              px="33px"
              fontSize="18px"
              fontWeight="600"
              {...btnCancelStyleProps}
            >
              {cancelText || t("cancel")}
            </Button>
            <Button
              h="48px"
              onClick={() => {
                onOk();
              }}
              bg="green.primary"
              color="white"
              px="33px"
              fontSize="18px"
              fontWeight="600"
              {...btnOkStyleProps}
            >
              {okText || t("delete")}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { ConfirmModalV2 };
