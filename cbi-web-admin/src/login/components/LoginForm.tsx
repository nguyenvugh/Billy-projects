import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
// import { OverSession } from "./modal/OverSession";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ROUTE_PROFILE } from "src/common/constants/routes.constants";
import { setToken } from "src/common/utils/authentication.util";
// import { login } from "../services";
import { useLogin } from "../hooks/useLogin";
import { LoginSuccessResponse } from "../interfaces";
import { LoginError } from "./modal/LoginError";

const LoginForm = () => {
  const login = useLogin();
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onLogin = async (values) => {
    login.mutate(values, {
      onSuccess: (data) => handleLoginSuccess(data.data),
      onError: () => setShowModal(true),
    });
  };

  const handleLoginSuccess = (data: LoginSuccessResponse) => {
    setToken(data.accessToken);
    router(ROUTE_PROFILE);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onLogin)}>
        <FormControl isInvalid={errors.usernameOrEmail || errors.password}>
          <Text ml="278px" mt="150px" fontWeight="600" fontSize="24px">
            Đăng nhập vào Oxfam
          </Text>
          <FormLabel {...TEXT_STYLE} mt="55px" htmlFor="usernameOrEmail">
            Tài khoản
          </FormLabel>
          <Input
            {...INPUT_STYLE}
            id="usernameOrEmail"
            type="text"
            placeholder="Nhập tài khoản"
            {...register("usernameOrEmail", {
              required: "Tài khoản được yêu cầu",
            })}
          />
          <FormErrorMessage {...ERROR_STYLE}>
            {errors.usernameOrEmail && errors.usernameOrEmail.message}
          </FormErrorMessage>
          <FormLabel {...TEXT_STYLE} mt="38px" htmlFor="password">
            Mật khẩu
          </FormLabel>
          <Input
            {...INPUT_STYLE}
            id="password"
            type="password"
            placeholder="Nhập mật khẩu"
            {...register("password", {
              required: "Mật khẩu được yêu cầu",
              minLength: { value: 8, message: "Mật khẩu tối thiểu 8 ký tự" },
            })}
          />
          <FormErrorMessage {...ERROR_STYLE}>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          bg="green.primary"
          color="white"
          mt="58px"
          ml="292px"
          w="280px"
          h="48px"
          type="submit"
        >
          Đăng nhập
        </Button>
        <LoginError isOpen={showModal} onClose={() => setShowModal(false)} />
        {/* <OverSession /> */}
      </form>
    </Box>
  );
};

const INPUT_STYLE = {
  ml: "170px",
  mt: "8px",
  w: "500px",
  h: "48px",
  variant: "filled",
};
const TEXT_STYLE = {
  ml: "170px",
  fontWeight: "500",
  fontSize: "18px",
};
const ERROR_STYLE = {
  ml: "170px",
};
export { LoginForm };
