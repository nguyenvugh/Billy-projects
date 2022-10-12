import ModalStatus from "@/src/common/components/modal/status";
import { formForgotPasswordSuccess } from "@/src/common/constants/formModal.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { FormForgotPassword } from "@/src/components/layout/interfaces";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  UseModalProps,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { schemaForgotPassword } from "../../schema";

export const ForgotPassword = ({ modalForgotPassword }: { modalForgotPassword: UseModalProps }) => {
  const modalForgotPasswordSuccess = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormForgotPassword>({
    resolver: yupResolver(schemaForgotPassword),
  });
  const router = useViefRouter();
  const navigateToHome = () => {
    router.push("/");
  };

  const onSubmitForgotPassword: SubmitHandler<FormForgotPassword> = () => {
    modalForgotPasswordSuccess.onOpen();
    modalForgotPassword.onClose();
  };
  const onErrorForgotPassword: SubmitErrorHandler<FormForgotPassword> = () => {};

  return (
    <>
      <Modal isOpen={modalForgotPassword.isOpen} onClose={modalForgotPassword.onClose} isCentered size={"lg"}>
        <ModalOverlay />
        <ModalContent borderRadius="12px" padding={{ md: "32px", sm: "16px" }} mx="16px">
          <ModalHeader alignSelf="center">
            <VStack spacing="16px">
              <Text variant="text28">Quên mật khẩu</Text>
              <Text variant="text14" textAlign={"center"}>
                Nhập địa chỉ email bạn đã đăng ký và chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại mật khẩu mới.{" "}
              </Text>
            </VStack>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmitForgotPassword, onErrorForgotPassword)}>
              <Stack spacing={"32px"}>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>
                  <Input {...register("email")} type="text" />
                  {errors.email && <Text variant={"textError"}>{errors.email.message}</Text>}
                </FormControl>
                <Center>
                  <Box>
                    <Button type="submit" variant="primary">
                      Xác thực email
                    </Button>
                  </Box>
                </Center>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ModalStatus formModal={formForgotPasswordSuccess} modalStatus={modalForgotPasswordSuccess} />
    </>
  );
};
export default ForgotPassword;
