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
} from "@chakra-ui/react";

type LoginErrorProps = {
  isOpen: boolean;
  onClose?: () => void;
};
const LoginError = ({ isOpen, onClose = () => {} }: LoginErrorProps) => {
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
          <Text ml="40px">Bạn đã nhập sai tên tài khoản hoặc mật khẩu.</Text>
          <Text ml="70px">Vui lòng thử lại hoặc liên hệ super-admin</Text>
          <Text ml="140px">để reset lại mật khẩu</Text>
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

export { LoginError };
