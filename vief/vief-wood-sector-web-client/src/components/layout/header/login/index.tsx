import { ROUTE_HOME, ROUTE_REGISTER } from "@/src/common/constants/routes.constant";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";

import {
  Box,
  Button,
  Center,
  ChakraProps,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form/dist/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormLogin } from "../../interfaces";
import { schemaLogin } from "./schema";

import ForgotPassword from "./modal/forgot-password";
import { formModalLoginError, formModalLoginSuccess } from "@/src/common/constants/formModal.constant";

import ModalStatus from "@/src/common/components/modal/status";

export const Login = ({ ...styleProps }: ChakraProps) => {
  const modalLoginSuccess = useDisclosure();
  const modalLoginError = useDisclosure();
  const modalLogin = useDisclosure();
  const modalForgotPassword = useDisclosure();

  const router = useViefRouter();
  const navigateToHome = () => {
    router.push("/");
  };
  const navigateToHomeAuto = () => {
    setTimeout(() => {
      router.push("/");
      modalLoginSuccess.onClose();
    }, 3000);
  };

  const navigateToRegister = () => {
    router.push(ROUTE_REGISTER["en"]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    resolver: yupResolver(schemaLogin),
  });
  const onSubmit: SubmitHandler<FormLogin> = () => {
    modalLogin.onClose();
    modalLoginSuccess.onOpen();
    navigateToHomeAuto();
  };
  const onError: SubmitErrorHandler<FormLogin> = () => {
    modalLoginError.onOpen();
  };

  return (
    <Box>
      <Button onClick={modalLogin.onOpen} variant="primary" w="128px" overflow={"hidden"} {...styleProps}>
        Đăng nhập
      </Button>
      <Modal
        isOpen={modalLogin.isOpen}
        onClose={modalLogin.onClose}
        isCentered
        size={{ md: "lg", sm: "md" }}
        id="login"
      >
        <ModalOverlay />
        <ModalContent borderRadius="12px" padding={{ md: "32px", sm: "16px" }} mx="16px">
          <ModalHeader alignSelf="center">
            <VStack spacing="16px">
              <Text variant="text28">Đăng nhập</Text>
              <Stack spacing="2px" direction="row">
                <Text variant="text14">Bạn chưa có tài khoản? </Text>
                <Text
                  variant="text14"
                  fontWeight="600"
                  textColor="blue.primary"
                  cursor="pointer"
                  onClick={() => {
                    navigateToRegister();
                    modalLogin.onClose();
                  }}
                >
                  Đăng kí ngay
                </Text>
              </Stack>
            </VStack>
          </ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Stack>
                <FormControl id="email">
                  <FormLabel>Email</FormLabel>

                  <Input {...register("email")} type="text" />
                  {errors.email && <Text variant={"textError"}>{errors.email?.message}</Text>}
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Mật khẩu</FormLabel>
                  <Input {...register("password")} type="password" />
                  {errors && <Text variant={"textError"}>{errors.password?.message}</Text>}
                </FormControl>
                <Text
                  w="fit-content"
                  alignSelf="flex-end"
                  variant="text14"
                  fontWeight="600"
                  textColor="blue.primary"
                  cursor="pointer"
                  onClick={() => {
                    modalForgotPassword.onOpen();
                    modalLogin.onClose();
                  }}
                >
                  Quên mật khẩu?
                </Text>
                <Center>
                  <Box>
                    <Button type="submit" variant="primary">
                      Đăng nhập
                    </Button>
                  </Box>
                </Center>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <ModalStatus formModal={formModalLoginSuccess} modalStatus={modalLoginSuccess} handleClick={navigateToHome} />
      <ModalStatus formModal={formModalLoginError} modalStatus={modalLoginError} />

      <ForgotPassword modalForgotPassword={modalForgotPassword} />
    </Box>
  );
};
