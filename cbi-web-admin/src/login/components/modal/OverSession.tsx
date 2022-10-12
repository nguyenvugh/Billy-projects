import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

// phiên hết hạn
const OverSession = () => {
  const { isOpen, onClose } = useDisclosure();
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          borderBottom="2px solid #EEEEEE"
          fontSize="18px"
          fontWeight="600"
          color="red.secondary"
        >
          Lỗi đăng nhập
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="20px" borderBottom="2px solid #EEEEEE">
          <Text ml="24px">Phiên của bạn đã hết hạn. Vui lòng đăng nhập lại !</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            color="black"
            bg="white"
            border="1px solid #CBCBCB"
            w="119px"
            h="40px"
            onClick={onClose}
          >
            Đóng
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export { OverSession };
