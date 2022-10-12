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
import Alert from "src/common/components/confirm-modal/images/alert.png";

type AlertModalProps = {
  title: string;
  content: string;
  cancelText?: string;
  deleteText?: string;
  isOpen: boolean;
  onCancel: () => void;
  onDelete: () => void;
};
function AlertModal({ title, content, isOpen, onCancel, onDelete }: AlertModalProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onCancel}>
        <ModalOverlay />
        <ModalContent mt="40" w="368px">
          <ModalHeader ml={"130px"}>
            <Img src={Alert} />
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
            <Button bg="#718096" border="1px solid #CBCBCB" mr={4} onClick={onCancel} w="138px">
              Hủy
            </Button>
            <Button
              onClick={() => {
                onDelete();
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

export { AlertModal };
