import ToastSuccess from "@cbi/components/ToastSuccess";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Link as LinkUI,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  ModalOverlay,
  ModalCloseButton,
  Button,
  useToast,
  Image,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

type ConfirmPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};
function ConfirmPopup({ isOpen, onClose }: ConfirmPopupProps) {
  const toast = useToast();
  function handleConfirm() {
    toast({
      position: "top",
      status: "success",
      isClosable: true,
      duration: 2000,
      render: () => <ToastSuccess message="Email đã được gửi thành công!" />,
    });
    onClose();
  }
  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={8} px={10}>
        <ModalCloseButton />
        <ModalBody textAlign={"center"}>
          <Image
            src="https://danviet.mediacdn.vn/upload/4-2013/images/2013-10-27/1434788808-4c3oxfam2.jpg"
            h="100px"
            m="auto"
            mb="30px"
          />
          <Text
            color="#2D3748"
            fontSize={{ base: "12px", md: "14px" }}
            fontWeight="medium"
          >
            Chúng tôi rất nghiêm túc trong bảo mật. Chúng tôi không bán hoặc
            chia sẻ dữ liệu của bạn. Chúng tôi sẽ sử dụng nó để nâng cao trải
            nghiệm của bạn với trang web. Để tìm hiểu thêm, vui lòng xem{" "}
            <Link href="/statics/privacy-policy">
              <LinkUI color="#4182ce" onClick={() => onClose()}>
                Chính sách bảo mật
              </LinkUI>
            </Link>{" "}
            &{" "}
            <Link href="/statics/terms-of-service">
              <LinkUI color="#4182ce" onClick={() => onClose()}>
                Điểu khoản dịch vụ
              </LinkUI>
            </Link>{" "}
            của chúng tôi.
          </Text>
          <Text
            color="#718096"
            fontSize={{ base: "12px", md: "14px" }}
            mt="16px"
            fontWeight="medium"
          >
            Bằng việc Đăng ký, bạn đã đồng ý với Oxfam về Điều khoản dịch vụ &
            Chính sách bảo mật
          </Text>
          <Button
            w="full"
            bg="#61A533"
            color="#fff"
            fontSize="18px"
            fontWeight="bold"
            py="10px"
            _hover={{ bg: "#61A533D4" }}
            mt="32px"
            onClick={handleConfirm}
          >
            Tôi đồng ý
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export { ConfirmPopup };
