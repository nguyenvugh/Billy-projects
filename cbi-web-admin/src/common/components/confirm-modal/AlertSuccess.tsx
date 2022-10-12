import React from "react";
import {
  Button,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import confirmIcon from "src/profile/image/confirm icon modal.png";

type AlertSuccessProps = {
  title: string;
  content: string;
  cancelText?: string;
  deleteText?: string;
  isOpen: boolean;
  onSuccess: () => void;
};
function AlertSuccess({ title, content, isOpen, onSuccess }: AlertSuccessProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onSuccess}>
        <ModalOverlay />
        <ModalContent mt="40" w="368px">
          <ModalHeader ml={"130px"}>
            <Img src={confirmIcon} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} textAlign="center" fontSize="16px" fontWeight="normal">
            <Text color={"#000000"} fontSize="24px" fontWeight={700}>
              {title}
            </Text>
            <Text fontWeight={400} fontSize="14px" color={"#718096"}>
              {content}
            </Text>
          </ModalBody>

          <ModalFooter justifyContent="center" pt="0">
            <Button
              onClick={() => {
                onSuccess();
              }}
              bg="green.primary"
              color="white"
              w="138px"
            >
              Đồng Ý
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { AlertSuccess };
