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
  useDisclosure,
} from "@chakra-ui/react";
import { removeToken } from "src/common/utils/authentication.util";
import { useNavigate } from "react-router-dom";
import Alert from "src/common/components/confirm-modal/images/alert.png";

const LogOut = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleLogOut = () => {
    removeToken();
    navigate("/login");
  };
  return (
    <>
      <Button
        bg="green.primary"
        border={"1px solid green.primary"}
        mr="10px"
        ml="40px"
        mt={"60px"}
        w="119px"
        onClick={onOpen}
      >
        Đăng xuất
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader ml={"170px"} textAlign="center">
            <Img src={Alert} />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} textAlign="center" fontSize="16px" fontWeight="normal">
            <Text color={"#000000"} fontSize="24px" fontWeight={700}>
              Thông báo
            </Text>
            <Text fontWeight={400} fontSize="14px" color={"#718096"}>
              Bạn có chắc muốn đăng xuất tài khoản ?
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center" pt="0">
            <Button bg="#718096" border="1px solid #CBCBCB" mr={4} w="138px" onClick={onClose}>
              Huỷ bỏ
            </Button>
            <Button bg="green.primary" color="white" w="138px" onClick={handleLogOut}>
              Đăng xuất
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export { LogOut };
