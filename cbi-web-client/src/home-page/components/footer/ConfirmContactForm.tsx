import React, {
  useState,
  useImperativeHandle,
  ComponentRef,
  ComponentProps,
  ComponentPropsWithRef,
  ComponentElement,
} from "react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Link as LinkUI,
  Modal,
  ModalBody,
  ModalContent,
  Text,
  ModalOverlay,
  Button,
  useToast,
  Image,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";

export const ConfirmContactForm = React.forwardRef((props, ref) => {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  useImperativeHandle(ref, () => ({
    closeModal() {
      setIsOpen(false);
    },
    openModal() {
      setIsOpen(true);
    },
  }));
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody p={8} px={10}>
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
            textAlign={"center"}
          >
            Chúng tôi rất nghiêm túc trong bảo mật. Chúng tôi không bán hoặc
            chia sẻ dữ liệu của bạn. Chúng tôi sẽ sử dụng nó để nâng cao trải
            nghiệm của bạn với trang web. Để tìm hiểu thêm, vui lòng xem{" "}
            <Link href="/statics/privacy-policy">
              <LinkUI color="#4182ce" onClick={() => setIsOpen(false)}>
                Chính sách bảo mật
              </LinkUI>
            </Link>{" "}
            &{" "}
            <Link href="/statics/terms-of-service">
              <LinkUI color="#4182ce" onClick={() => setIsOpen(false)}>
                Điểu khoản dịch vụ
              </LinkUI>
            </Link>{" "}
            . Bằng việc Đăng ký, bạn đã đồng ý với Oxfam về Điều khoản dịch vụ &
            Chính sách bảo mật.
          </Text>
          <Button
            w="full"
            bg="#61A533"
            color="#fff"
            fontSize="18px"
            fontWeight="bold"
            py="1-px"
            _hover={{ bg: "#61A533D4" }}
            mt="32px"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Tôi đồng ý
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});
