import { passInValid, SCREEN_AUTH } from "@cbi/constants/index";
import { register } from "@cbi/services/auth";
import { isPasswordValid, isPhone } from "@cbi/utils/validate";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Image,
  Link as LinkUI,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FormikValues, useFormik } from "formik";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import ToastError from "../ToastError";
import InputForm from "./InputForm";
import Title from "./Title";

export interface RegisterI {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const SCREEN = { signUp: 1, success: 2 };

const SignIn = ({ setScreen }: { setScreen: Function }) => {
  const [termAgreed, setTermAgreed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [screenSignUp, setScreenSignUp] = useState(SCREEN.signUp);
  const toast = useToast();
  const [email, setEmail] = useState("");
  const validate = (values: FormikValues) => {
    const errors = {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      companyCode: "",
    };
    if (!values.fullName) {
      errors.fullName = "Họ tên được yêu cầu";
    } else if (values.fullName.length > 30) {
      errors.fullName = "Họ tên không được quá 30 ký tự";
    }
    if (!values.email) {
      errors.email = "Email được yêu cầu";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email không tồn tại";
    }

    if (!values.companyCode) {
      errors.companyCode = "Mã doanh nghiệp được yêu cầu";
    } else if (
      values.companyCode.length > 13 ||
      values.companyCode.length < 10
    ) {
      errors.companyCode = "Mã doanh nghiệp phải từ 10-13 ký tự";
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = "Số điện thoại được yêu cầu";
    } else if (!isPhone(values.phoneNumber)) {
      errors.phoneNumber = "Số điện thoại sai";
    }
    if (!values.password) {
      errors.password = "Mật khẩu được yêu cầu";
    } else if (!isPasswordValid(values.password)) {
      errors.password = passInValid;
    }
    if (Object.values(errors).some((e) => e)) {
      return errors;
    }
  };
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      companyCode: "",
    },
    validate,
    onSubmit: (values) => {
      setIsLoading(true);
      register(values)
        .then(() => {
          setIsLoading(false);
          setEmail(values.email);
          setScreenSignUp(SCREEN.success);
        })
        .catch((error) => {
          toast({
            position: "top",
            status: "error",
            isClosable: true,
            duration: 2000,
            render: () => (
              <ToastError message={error?.response.data?.message} />
            ),
          });
          setIsLoading(false);
        });
    },
  });

  if (screenSignUp === SCREEN.success) {
    return (
      <Fragment>
        <Image src="/img/confirmEmail.svg" alt="" margin="50px auto 35px" />
        <Box position="relative">
          <Text
            textAlign="center"
            textTransform="uppercase"
            color="#2D3748"
            fontSize="24px"
            fontWeight="700"
            mx={10}
            my={15}
          >
            Xác nhận Email
          </Text>
        </Box>
        <Text textAlign="center" color="#4A5568" fontSize="18px">
          Mã xác minh đã được gửi đến địa chỉ
        </Text>
        <Text textAlign="center" color="#007BFF" fontSize="18px">
          {email}
        </Text>
        <Text textAlign="center" color="#4A5568" mb="24px" fontSize="18px">
          Bạn vui lòng kiểm tra email nhé.
        </Text>
        <Button
          w="100%"
          bg="#61A533"
          borderRadius={4}
          color="#ffffff"
          textTransform="uppercase"
          fontSize={16}
          fontWeight="bold"
          _hover={{ bg: "#61A533" }}
          _active={{ bg: "#61A533" }}
          onClick={() => setScreen()}
        >
          Tôi đã hiểu
        </Button>
      </Fragment>
    );
  }

  return (
    <Box>
      <Box textAlign={"center"}>
        <Image src="/img/global/logo_signIn.svg" m="auto" />
      </Box>
      <Flex fontSize={{ base: "14px" }} justifyContent="center" pt={3}>
        Bạn đã có tài khoản?{" "}
        <Text
          color={"#3182CE"}
          pl="7px"
          fontWeight={500}
          onClick={() => {
            setScreen(SCREEN_AUTH.SIGN_IN);
          }}
        >
          Đăng nhập
        </Text>
      </Flex>
      <form onSubmit={formik.handleSubmit}>
        <Title>Họ tên</Title>
        <InputForm
          placeholder="Nhập họ tên"
          type="text"
          name="fullName"
          value={formik.values.fullName}
          handleChange={formik.handleChange}
          helperText={formik.errors.fullName ? formik.errors.fullName : ""}
        />
        <Title>Số điện thoại</Title>
        <InputForm
          placeholder="Nhập số điện thoại"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          handleChange={formik.handleChange}
          helperText={
            formik.errors.phoneNumber ? formik.errors.phoneNumber : ""
          }
        />
        <Title>Mã doanh nghiệp</Title>
        <InputForm
          placeholder="Nhập mã doanh nghiệp"
          name="companyCode"
          value={formik.values.companyCode}
          handleChange={formik.handleChange}
          helperText={
            formik.errors.companyCode ? formik.errors.companyCode : ""
          }
        />
        <Title>Email</Title>
        <InputForm
          placeholder="Nhập email"
          type="email"
          name="email"
          value={formik.values.email}
          handleChange={formik.handleChange}
          helperText={formik.errors.email ? formik.errors.email : ""}
        />
        <Title>Mật khẩu</Title>
        <InputForm
          placeholder="Nhập mật khẩu"
          type="password"
          name="password"
          value={formik.values.password}
          handleChange={formik.handleChange}
          helperText={formik.errors.password ? formik.errors.password : ""}
        />
        <Text color="#2D3748" fontSize={{ base: "14px" }} my="16px">
          Chúng tôi rất nghiêm túc trong bảo mật. Chúng tôi không bán hoặc chia
          sẻ dữ liệu của bạn. Chúng tôi sẽ sử dụng nó để nâng cao trải nghiệm
          của bạn với trang web. Để tìm hiểu thêm, vui lòng xem{" "}
          <Link href="/statics/privacy-policy">
            <LinkUI color="#4182ce" onClick={() => setScreen()}>
              Chính sách bảo mật
            </LinkUI>
          </Link>{" "}
          &{" "}
          <Link href="/statics/terms-of-service">
            <LinkUI color="#4182ce" onClick={() => setScreen()}>
              Điểu khoản dịch vụ
            </LinkUI>
          </Link>{" "}
          của chúng tôi.
        </Text>
        <Checkbox
          isChecked={termAgreed}
          onChange={() => setTermAgreed(!termAgreed)}
          colorScheme="green"
          color="#2D3748"
          mb="32px"
        >
          <Text fontSize={{ base: "14px" }}>
            Tôi đồng ý với điều khoản của OXFAM
          </Text>
        </Checkbox>
        <Button
          disabled={!termAgreed}
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
          Tạo tài khoản
        </Button>
      </form>
    </Box>
  );
};

SignIn.propTypes = {};

export default SignIn;
