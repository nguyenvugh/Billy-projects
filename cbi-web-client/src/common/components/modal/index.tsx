import {
  Box,
  Button,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

export type IconType = "email" | "success" | "warning";
const ICON: Record<IconType, string> = {
  warning: "/img/global/logo_signIn.svg",
  success: "/img/global/ic_forgot_password_success.svg",
  email: "/img/global/ic_reset_password.svg",
};

type ModalConfirmProps = {
  isOpen: boolean;
  iconType?: IconType;
  title: string;
  content: string;
  textBtn: string;
  onConfirm: () => void;
  onClose: () => void;
};
function ModalConfirm({
  isOpen,
  iconType = "success",
  title,
  content,
  textBtn,
  onConfirm = () => {},
  onClose = () => {},
}: ModalConfirmProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} closeOnEsc={false}>
      <ModalOverlay />
      <ModalContent>
        <Box p={6} py={10} position="relative">
          <ModalCloseButton onClick={onClose} />

          <Box>
            <Box textAlign={"center"}>
              <Image src={ICON[iconType]} m="auto" />
            </Box>
            <Box color="#2D3748" textAlign={"center"}>
              <Text pb="16px" pt="35px" fontWeight={"bold"} fontSize={{ base: "20px", md: "24px" }}>
                {title}
              </Text>
              <Box fontSize="18px" fontWeight={500} pb={{ base: "25px", md: "32px" }}>
                <Text>{content}</Text>
              </Box>
            </Box>
            <Button
              onClick={onConfirm}
              bg="#61A533"
              borderRadius="6px"
              fontSize={{
                base: "15px",
                lg: "16px",
                xl: "18px",
              }}
              color="#FFFFFF"
              height={"auto"}
              py={"10px"}
              _hover={{
                bg: "#61A533",
              }}
              w="100%"
              _active={{
                bg: "#61A533",
              }}
            >
              {textBtn}
            </Button>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  );
}

export { ModalConfirm };
