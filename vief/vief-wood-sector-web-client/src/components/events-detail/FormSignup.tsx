import Success from "@/src/Images/Icons/Success";
import {
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FormSignupProps } from "./interface";

export default function FormSignup({ isExpired }: FormSignupProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex
      w={{ base: "448px", sm: "100%" }}
      p="32px"
      boxShadow="0px 0px 16px rgba(0, 0, 0, 0.1)"
      borderRadius={"12px"}
      flexDirection={"column"}
      h="446px"
      justifyContent={"space-between"}
    >
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent w="fit-content">
          <Flex
            width="280px"
            flexDirection={"column"}
            alignItems="center"
            textAlign={"center"}
            boxShadow="0px 0px 16px rgba(0, 0, 0, 0.1)"
            borderRadius="12px"
            p="32px 8px"
          >
            <Success />
            <Text variant={"text16"} my="16px">
              Đăng ký thành công
            </Text>
            <Text mb="16px" userSelect={"none"}>
              Vui lòng kiểm tra Hộp thư email để nhận thông tin chi tiết về sự kiện. Vui lòng mang theo mã QR khi đến
              tham gia sự kiện
            </Text>
            <Button
              bg="blue.primary"
              color={"white"}
              p="8px 15px"
              colorScheme={"blue.primary"}
              fontWeight="600"
              onClick={onClose}
            >
              Quay lại trang
            </Button>
          </Flex>
        </ModalContent>
      </Modal>
      <Text variant={"text28"} textAlign="center">
        Đăng ký
      </Text>
      <FormLabel fontSize="14px" lineHeight={"20px"} fontWeight="600" mb="0" mt="32px">
        Họ và tên
      </FormLabel>
      <Input type={"text"} mt="8px" bg={"white.secondary"} disabled={isExpired ? true : false} />
      <FormLabel fontSize="14px" lineHeight={"20px"} fontWeight="600" mb="0" mt="16px">
        Số điện thoại
      </FormLabel>
      <Input type={"number"} mt="8px" bg={"white.secondary"} disabled={isExpired ? true : false} />
      <FormLabel fontSize="14px" lineHeight={"20px"} fontWeight="600" mb="0" mt="16px">
        Email
      </FormLabel>
      <Input type={"email"} mt="8px" bg={"white.secondary"} disabled={isExpired ? true : false} />

      <Button
        disabled={isExpired}
        w="fit-content"
        m="0 auto"
        onClick={onOpen}
        fontWeight="600"
        p="0"
        bg="blue.primary"
        colorScheme={"blue.primary"}
        mt="32px"
      >
        <Text mx="36px">Đăng ký</Text>
      </Button>
    </Flex>
  );
}
