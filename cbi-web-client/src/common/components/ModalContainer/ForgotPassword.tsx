import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/checkbox";
import { FormikValues, useFormik } from "formik";
import InputForm from "./InputForm";
import Title from "./Title";
import { passInValid, REGEX_PASSWORD, SCREEN_AUTH } from "@cbi/constants/index";
import { verifyPasswordApi } from "@cbi/services/auth";
import ToastError from "../ToastError";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { isPasswordValid } from "@cbi/utils/validate";
const ForgotPassword = ({
  setScreen,
  token,
}: {
  setScreen: Function;
  token: String;
}) => {
  const router = useRouter();
  const toast = useToast();
  const [isSumited, setIssubmited] = useState(false);
  const validate = (values: FormikValues) => {
    const errors = { password: "", rePassword: "" };
    if (!values.password) {
      errors.password = "Mật khẩu mới được yêu cầu";
    } else if (!isPasswordValid(values.password)) {
      errors.password = passInValid;
    }
    if (!values.rePassword) {
      errors.rePassword = "Nhập lại mật khẩu mới được yêu cầu";
    } else if (values.rePassword !== values.password) {
      errors.rePassword = "Mật khẩu không trùng khớp";
    }
    if (Object.values(errors).some((e) => e)) {
      return errors;
    }
  };
  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validate,
    onSubmit: async (values) => {
      setIssubmited(true);
      try {
        const resVerifyPass = await verifyPasswordApi({
          token,
          password: values.password,
        });
        router.replace("/");
        setScreen(SCREEN_AUTH.NOTI_FORGOT_PASSWORD);
      } catch (error) {
        const err = error as AxiosError;
        setIssubmited(false);
        toast({
          position: "top",
          status: "error",
          isClosable: true,
          duration: 2000,
          render: () => (
            <ToastError
              message={
                err.response?.data?.message || "Khởi tạo mật khẩu thất bại"
              }
            />
          ),
        });
      }
    },
  });
  return (
    <Box>
      <Box textAlign={"center"}>
        <Image src="/img/global/ic_forgot_password.svg" m="auto" />
      </Box>
      <Box color="#2D3748" textAlign={"center"}>
        <Text pb="16px" pt="35px" fontWeight={"bold"} fontSize="24px">
          Khởi tạo mật khẩu
        </Text>
        <Text fontSize="18px" fontWeight={500}>
          Vui lòng nhập mật khẩu mới để hoàn tất.
        </Text>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box pb="32px">
          <Title>Mật khẩu mới</Title>
          <InputForm
            placeholder="Nhập mật khẩu mới"
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
          <Title>Nhập lại mật khẩu mới</Title>
          <InputForm
            placeholder="Nhập lại mật khẩu mới"
            type="password"
            name="rePassword"
            value={formik.values.rePassword}
            handleChange={formik.handleChange}
            helperText={
              formik.touched.rePassword && formik.errors.rePassword
                ? formik.errors.rePassword
                : ""
            }
          />
        </Box>
        <Button
          type={!isSumited ? "submit" : "button"}
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
          disabled={isSumited}
        >
          {isSumited && <Spinner mr={5} />} Đổi mật khẩu
        </Button>
      </form>
    </Box>
  );
};

ForgotPassword.propTypes = {};

export default ForgotPassword;
