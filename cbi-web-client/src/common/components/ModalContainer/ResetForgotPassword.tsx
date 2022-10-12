import { SCREEN_AUTH } from "@cbi/constants/index";
import { resetForgotPasswordApi } from "@cbi/services/auth";
import { Box, Button, Image, Spinner, Text, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { FormikValues, useFormik } from "formik";
import React, { useState } from "react";
import ToastError from "../ToastError";
import InputForm from "./InputForm";
const ResetForgotPassword = ({
  setScreen,
  setEmailResetPass,
}: {
  setScreen: Function;
  setEmailResetPass: Function;
}) => {
  const toast = useToast();
  const [isSumited, setIssubmited] = useState(false);
  const validate = (values: FormikValues) => {
    const errors = { email: "" };
    if (!values.email) {
      errors.email = "Email được yêu cầu";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email không hợp lệ";
    }
    if (Object.values(errors).some((e) => e)) {
      return errors;
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: async (values) => {
      setIssubmited(true);
      try {
        const resSubmit = await resetForgotPasswordApi(values.email);
        setEmailResetPass(values.email);
        setScreen(SCREEN_AUTH.NOTI_RESET_PASSWORD);
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
                err.response?.data?.message || "Khôi phục mât khẩu thất bại"
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
        <Image src="/img/global/ic_reset_password.svg" m="auto" />
      </Box>
      <Box color="#2D3748" textAlign={"center"}>
        <Text pb="16px" pt="35px" fontWeight={"bold"} fontSize="24px">
          Khôi phục mật khẩu
        </Text>
        <Text fontSize="18px" fontWeight={500}>
          Nhập Email để khôi phục mật khẩu nhé.
        </Text>
      </Box>

      <form onSubmit={formik.handleSubmit}>
        <Box py="32px">
          <InputForm
            placeholder="Nhập Email của bạn"
            type="email"
            name="email"
            value={formik.values.email}
            handleChange={formik.handleChange}
            helperText={formik.errors.email ? formik.errors.email : ""}
          />
        </Box>
        <Button
          type={"submit"}
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
          {isSumited && <Spinner mr={5} />}
          Xác thực email
        </Button>
      </form>
    </Box>
  );
};

ResetForgotPassword.propTypes = {};

export default ResetForgotPassword;
