import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Login } from "../layout/header/login";
import { schemaRegister } from "./schema";
import { useViefRouter } from "@/src/common/hooks/useViefRouter";
import { RegisterForm } from "./interface";
import { formModalRegisterError, formModalRegisterSuccess } from "@/src/common/constants/formModal.constant";

import { useState } from "react";
import ModalStatus from "@/src/common/components/modal/status";

export const Register = () => {
  const modalSuccess = useDisclosure();
  const modalError = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: yupResolver(schemaRegister),
  });
  const router = useViefRouter();

  const navigateToHome = () => {
    router.push("/");
  };
  const navigateToHomeAuto = () => {
    setTimeout(() => {
      router.push("/");
      modalSuccess.onClose();
    }, 3000);
  };

  const onSubmit: SubmitHandler<RegisterForm> = () => {
    modalSuccess.onOpen();
    navigateToHomeAuto();
  };

  const onError: SubmitErrorHandler<RegisterForm> = () => {
    modalError.onOpen();
  };

  return (
    <Center
      w="full"
      bg="white"
      h="full"
      bgImg={"/bgHome.png"}
      backgroundSize="cover"
      backgroundPosition={"center"}
      px="16px"
    >
      <Stack w="500px" bg="white" padding={"32px"} borderRadius="12px" spacing="32px">
        <Stack alignItems={"center"} spacing="16px">
          <Text variant={"text28"}>Đăng ký</Text>

          <Stack spacing="2px" direction="row">
            <Text variant="text14">Bạn đã có tài khoản? </Text>
            <Login
              sx={{
                bg: "transparent",
                textColor: "blue.primary",
                _hover: "none",
                _active: "none",
                w: "fit-content",
                h: "fit-content",
                px: "0px",
              }}
            />
          </Stack>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Stack spacing="32px">
            <Stack spacing="16px">
              <FormControl id="name">
                <FormLabel>Họ và tên</FormLabel>
                <Input {...register("name")} type="text" />
                {errors.name && <Text variant={"textError"}>{errors.name?.message}</Text>}
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Số điện thoại</FormLabel>
                <Input {...register("phone")} type="number" />
                {errors.phone && <Text variant={"textError"}>{errors.phone?.message}</Text>}
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input {...register("email")} type="text" />

                {errors.email && <Text variant={"textError"}>{errors.email?.message}</Text>}
              </FormControl>

              <FormControl id="password">
                <FormLabel>Mật khẩu</FormLabel>
                <InputGroup>
                  <Input {...register("password")} type="password" />
                </InputGroup>
                {errors.password && <Text variant={"textError"}>{errors.password?.message}</Text>}
              </FormControl>

              <FormControl id="rePassword">
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <InputGroup>
                  <Input {...register("rePassword")} type="password" />
                </InputGroup>
                {errors.rePassword && <Text variant={"textError"}>{errors.rePassword?.message}</Text>}
              </FormControl>
            </Stack>
            <Center>
              <Button type="submit" variant="primary">
                Đăng ký
              </Button>
              <ModalStatus
                formModal={formModalRegisterSuccess}
                modalStatus={modalSuccess}
                handleClick={navigateToHome}
              />
              <ModalStatus formModal={formModalRegisterError} modalStatus={modalError} />
            </Center>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
};
