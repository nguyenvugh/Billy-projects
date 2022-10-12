import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useState, useImperativeHandle, forwardRef } from "react";

const ModalError = ({ title, description, handleButton, textClose }, ref) => {
  const [isOpen, setOpenModal] = useState(false);
  const onClose = () => {
    if (handleButton && typeof handleButton === "function") {
      handleButton();
      return;
    }
    if (typeof setOpenModal === "function") {
      setOpenModal(false);
    }
  };
  useImperativeHandle(
    ref,
    () => ({
      openModal: () => {
        setOpenModal(true);
      },
      closeModal: () => {
        setOpenModal(false);
      },
    }),
    [],
  );
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <Box padding="32px" textAlign="center" color="#EA403F">
          <Image boxSize="64px" margin="auto" src="/icons/error-info.svg" alt="error-info" />
          <Box mt="20px" fontSize="20px" fontWeight="bold">
            {title}
          </Box>
          <Box mt="16px" fontSize="14px" color="#718096">
            {description}
          </Box>
          <Button
            onClick={onClose}
            mt="24px"
            bgColor="#007BFF"
            color="#ffffff"
            height="46px"
            width="100%"
            fontSize="16px"
            fontWeight="bold"
            _hover={{
              backgroundColor: "#007BFF",
            }}
          >
            {textClose || "OK"}
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};
export default forwardRef(ModalError);
