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
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactComponent as WarningIcon } from "src/common/assets/icons/iconWarning.svg";

type WarningModalProps = {
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
};
function WarningModal({
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
}: WarningModalProps) {
  const { t } = useTranslation();
  return (
    <>
      <Modal isOpen={!!isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent minW="600px" borderRadius="20px">
          {!!onClose && <ModalCloseButton onClick={onClose} />}
          <ModalHeader
            fontWeight="700"
            fontSize="24px"
            textAlign="left"
            color="#000000"
            {...titleStyleProps}
          >
            {/* {title} */}
          </ModalHeader>
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
                <Box>{icon || <WarningIcon />}</Box>
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

          <ModalFooter justifyContent="center" pt="0" pb="10">
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

export { WarningModal };
