import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
import { FormikValues, useFormik } from "formik";
import InputForm from "./InputForm";
import Title from "./Title";
import { REGEX_PASSWORD, SCREEN_AUTH } from "@cbi/constants/index";
import { useUserContext } from "@cbi/context/AuthContext";
import { login } from "@cbi/services/auth";
import { saveCache } from "@cbi/utils/dataCache";
import { keyCache } from "@cbi/constants/data";
import { decodeJwt } from "@cbi/utils/index";
import { getProfile } from "@cbi/services/profile";
import ToastError from "../ToastError";

export interface LoginI {
  usernameOrEmail: string;
  password: string;
}

const SignIn = ({ setScreen }: { setScreen: Function }) => {
  const toast = useToast();
  const { setUserContext } = useUserContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validate = (values: FormikValues) => {
    const errors = { usernameOrEmail: "", password: "" };
    if (!values.usernameOrEmail) {
      errors.usernameOrEmail = "Email được yêu cầu";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.usernameOrEmail)
    ) {
      errors.usernameOrEmail = "Email không tồn tại";
    }
    if (!values.password) {
      errors.password = "Mật khẩu được yêu cầu";
    } else if (!REGEX_PASSWORD.test(values.password)) {
      errors.password = "Mật khẩu không hợp lệ";
    }
    if (Object.values(errors).some((e) => e)) {
      return errors;
    }
  };
  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: "",
    },
    validate,
    onSubmit: (values: LoginI) => {
      setIsLoading(true);
      login(values)
        .then(async (res: any) => {
          await saveCache(keyCache.UserInfo, res);
          const user = await getProfile();
          setUserContext({
            ...res,
            email: decodeJwt(res?.accessToken).usernameOrEmail,
            avatarUrl: user?.avatar?.url,
          });
          setIsLoading(false);
          setScreen();
        })
        .catch((err) => {
          toast({
            position: "top",
            status: "error",
            isClosable: true,
            duration: 2000,
            render: () => (
              <ToastError message="Email hoặc mật khẩu không chính xác!" />
            ),
          });
          setIsLoading(false);
        });
    },
  });
  return (
    <Box>
      <Box textAlign={"center"}>
        <Image src="/img/global/logo_signIn.svg" m="auto" />
      </Box>
      <Flex fontSize={{ base: "14px" }} justifyContent="center" pt={3}>
        Bạn chưa có tài khoản?{" "}
        <Text
          color={"#3182CE"}
          pl="7px"
          fontWeight={500}
          onClick={() => {
            setScreen(SCREEN_AUTH.SIGN_UP);
          }}
        >
          Tạo tài khoản
        </Text>
      </Flex>
      <form onSubmit={formik.handleSubmit}>
        <Title>Email</Title>
        <InputForm
          placeholder="Nhập email"
          type="email"
          name="usernameOrEmail"
          value={formik.values.usernameOrEmail}
          handleChange={formik.handleChange}
          helperText={
            formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
              ? formik.errors.usernameOrEmail
              : ""
          }
        />
        <Title>Mật khẩu</Title>
        <InputForm
          placeholder="Nhập mật khẩu"
          type="password"
          name="password"
          value={formik.values.password}
          handleChange={formik.handleChange}
          helperText={
            formik.touched.password && formik.errors.password
              ? formik.errors.password
              : ""
          }
        />
        <Box mb={4} mt={4}>
          <Checkbox colorScheme="green">
            <Text fontSize={{ base: "14px" }}>Lưu tài khoản</Text>
          </Checkbox>
          <Text
            as="a"
            color="#3182CE"
            cursor="pointer"
            fontSize={14}
            float="right"
            fontWeight={500}
            onClick={() => setScreen(SCREEN_AUTH.RESET_PASSWORD)}
          >
            Quên mật khẩu?
          </Text>
        </Box>
        <Button
          type="submit"
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
          isLoading={isLoading}
        >
          Đăng nhập
        </Button>
      </form>
    </Box>
  );
};

SignIn.propTypes = {};

export default SignIn;
