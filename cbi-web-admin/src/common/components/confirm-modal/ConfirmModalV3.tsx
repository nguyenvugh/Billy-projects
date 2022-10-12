import React from "react";
import {
  Box,
  Button,
  Center,
  ChakraProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactComponent as WarningIcon } from "src/common/assets/icons/iconWarning.svg";

type ConfirmModalV3Props = {
  title: string;
  content: string;
  icon?: React.ReactNode;
  okText?: string;
  isOpen?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
  onClose?: () => void;
  titleStyleProps?: ChakraProps;
  contentStyleProps?: ChakraProps;
  btnOkStyleProps?: ChakraProps;
  cancelText?: string;
  btnCancelStyleProps?: ChakraProps;
};
function ConfirmModalV3({
  title,
  content,
  okText,
  isOpen,
  onCancel = () => {},
  onOk = () => {},
  onClose = () => {},
  titleStyleProps,
  contentStyleProps,
  btnOkStyleProps,
  icon,
  cancelText,
  btnCancelStyleProps,
}: ConfirmModalV3Props) {
  const { t } = useTranslation();
  return (
    <>
      <Modal isOpen={!!isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent minW="600px" borderRadius="20px">
          {!!onClose && <ModalCloseButton onClick={onClose} />}
          <ModalBody
            pt={6}
            pb={10}
            textAlign="center"
            fontSize="20px"
            fontWeight="400"
            {...contentStyleProps}
          >
            <Box alignItems="center">
              <Center flexDir="column">
                <Box mt="5">{icon || <WarningIcon />}</Box>
                <Box
                  fontWeight="700"
                  fontSize="24px"
                  textAlign="left"
                  color="#000000"
                  marginTop="15px"
                  marginBottom="10px"
                  {...titleStyleProps}
                >
                  {title}
                </Box>
                <Box color="#718096">{content}</Box>
              </Center>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="center" pt="0" pb="10" w="full">
            <Button
              h="48px"
              bg="#718096"
              color="white"
              mr={4}
              onClick={onCancel}
              px="33px"
              fontSize="18px"
              fontWeight="600"
              w="30%"
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
              w="30%"
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

export { ConfirmModalV3 };
