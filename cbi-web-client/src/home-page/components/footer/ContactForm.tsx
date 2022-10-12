import Container from "@cbi/components/container";
import {
  Box,
  Button,
  Link as LinkUI,
  SimpleGrid,
  Text,
  Checkbox,
  useToast,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import { FormikValues, useFormik } from "formik";
import React, { useRef } from "react";
import InputForm from "./InputForm";
import { ConfirmContactForm } from "./ConfirmContactForm";
import { isPhone } from "@cbi/utils/validate";
import { postConactServices } from "@cbi/services/contact";
import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import ToastError from "@cbi/components/ToastError";

const TEXT_NOTICE =
  "Chúng tôi đang tìm kiếm những doanh nghiệp quan tâm đến môi trường giống như bạn! Để lại thông tin để nhận những thông báo mới nhất từ OXFAM.";
const ContactForm = () => {
  const toast = useToast();
  const refContfirmForm = useRef<ContfirmFormRefI>();
  const validate = (values: FormikValues) => {
    const errors = {
      name: "",
      email: "",
      phone: "",
      content: "",
      isCheckRules: "",
    };
    if (!values.name) {
      errors.name = "Vui lòng nhập họ & Tên";
    } else if (!/[a-zA-Z]/.test(values.name)) {
      errors.name = "Họ & Tên không bao gồm kí tự số hoặc kí tự đặc biệt";
    }
    if (!values.email) {
      errors.email = "Vui lòng nhập email.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Email không chính xác";
    }
    if (!values.phone) {
      errors.phone = "Vui lòng nhập số điện thoại.";
    } else if (!isPhone(values.phone)) {
      errors.phone = "Số điện thoại không chính xác";
    }
    if (!values.isCheckRules) {
      errors.isCheckRules = "Nhấn chọn để tiếp tục";
    }
    if (Object.values(errors).some((e) => e)) {
      return errors;
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      content: "",
      isCheckRules: false,
    },
    validate,
    onSubmit: (values) => {
      const { isCheckRules, ...rest } = values;
      postConactServices(rest)
        .then(() => {
          typeof refContfirmForm.current?.openModal === "function" &&
            refContfirmForm.current.openModal();
          formik.resetForm();
        })
        .catch(() => {
          toast({
            position: "top",
            status: "error",
            isClosable: true,
            duration: 2000,
            render: () => (
              <ToastError message="Gửi liên hệ không thành công!" />
            ),
          });
        });

      // console.log("values", values);
    },
  });
  return (
    <Box
      position={"relative"}
      bgImage="/img/global/bg_contact_form.svg"
      bgRepeat={"no-repeat"}
      bgSize="cover"
      py="30px"
    >
      <Container>
        <SimpleGrid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          alignItems="center"
        >
          <Box color="#FFFFFF" mr={{ base: "5%", md: "15%" }} pb={8}>
            <Text
              fontSize={{ base: "12px", md: "17px", lg: "20px" }}
              fontWeight="bold"
            >
              LIÊN HỆ
            </Text>
            <Text
              fontSize={{ base: "25px", md: "35px", lg: "44px" }}
              fontWeight="bold"
              py="12px"
            >
              Kết nối ngay!
            </Text>
            <Text fontSize={{ base: "12px", md: "16px" }}>{TEXT_NOTICE}</Text>
            {/* <Text
              fontSize={{ base: "18px", md: "24px", lg: "28px" }}
              fontWeight="bold"
              py="20px"
            >
              10+
            </Text>
            <Text
              fontSize={{ base: "12px", md: "16px" }}
              dangerouslySetInnerHTML={{
                __html: `<b>Software modules</b> for detailed monitoring and real-time
                analytics`,
              }}
            />
            <Text
              fontSize={{ base: "18px", md: "24px", lg: "28px" }}
              fontWeight="bold"
              py="20px"
            >
              13%
            </Text>
            <Text
              fontSize={{ base: "12px", md: "16px" }}
              dangerouslySetInnerHTML={{
                __html: `<b>Farms</b> in North America has chosen NewLife™ as their management solution`,
              }}
            /> */}
          </Box>

          <Box
            bg="#F7FAFC"
            borderRadius={"16px"}
            p={{ base: "18px", md: "22px", lg: "30px", xl: "40px" }}
            maxW="520px"
            marginLeft={"auto"}
          >
            <form onSubmit={formik.handleSubmit}>
              <Text
                color="#718096"
                fontSize={{ base: "13px", md: "15px" }}
                my="3"
              >
                {TEXT_NOTICE}
              </Text>
              <InputForm
                placeholder="Họ & Tên"
                type="text"
                name="name"
                value={formik.values.name}
                handleChange={formik.handleChange}
                helperText={formik.errors.name ? formik.errors.name : ""}
              />
              <InputForm
                placeholder="Email"
                type="email"
                name="email"
                value={formik.values.email}
                handleChange={formik.handleChange}
                helperText={formik.errors.email ? formik.errors.email : ""}
              />
              <InputForm
                placeholder="Số điện thoại"
                name="phone"
                value={formik.values.phone}
                handleChange={formik.handleChange}
                helperText={formik.errors.phone ? formik.errors.phone : ""}
              />
              <InputForm
                placeholder="Nội dung liên hệ"
                textarea={true}
                name="content"
                value={formik.values.content}
                handleChange={formik.handleChange}
                helperText={formik.errors.content ? formik.errors.content : ""}
              />
              <Text
                color="#2D3748"
                fontSize={{ base: "12px", md: "14px" }}
                my="16px"
              >
                Chúng tôi rất nghiêm túc trong bảo mật. Chúng tôi không bán hoặc
                chia sẻ dữ liệu của bạn. Chúng tôi sẽ sử dụng nó để nâng cao
                trải nghiệm của bạn với trang web. Để tìm hiểu thêm, vui lòng
                xem{" "}
                <Link href="/statics/privacy-policy">
                  <LinkUI color="#4182ce">Chính sách bảo mật</LinkUI>
                </Link>{" "}
                &{" "}
                <Link href="/statics/terms-of-service">
                  <LinkUI color="#4182ce">Điểu khoản dịch vụ</LinkUI>
                </Link>{" "}
                của chúng tôi.
              </Text>
              <Checkbox
                color="#2D3748"
                name="isCheckRules"
                onChange={formik.handleChange}
                isChecked={formik.values.isCheckRules}
              >
                <Text fontSize={{ base: "12px", md: "14px" }}>
                  Tôi đồng ý với điều khoản của OXFAM
                </Text>
              </Checkbox>
              <Text color="red" fontSize="13px" mb="32px">
                {formik.errors.isCheckRules ? formik.errors.isCheckRules : ""}
              </Text>
              <Button
                type="submit"
                bg="#61A533"
                borderRadius="6px"
                fontSize={{
                  base: "11px",
                  sm: "13px",
                  md: "15px",
                  lg: "16px",
                  xl: "18px",
                }}
                color="#FFFFFF"
                height={"auto"}
                py={{ base: "7px", lg: "10px" }}
                px={{ base: "15px", md: "20px", lg: "32px" }}
                _hover={{
                  bg: "#61A533",
                }}
                w="100%"
                _active={{
                  bg: "#61A533",
                }}
              >
                Gửi thông tin
              </Button>
            </form>
          </Box>
        </SimpleGrid>
      </Container>
      <ConfirmContactForm ref={refContfirmForm} />
    </Box>
  );
};

export default ContactForm;

interface ContfirmFormRefI {
  openModal: Function;
}

export interface ContactFormI {
  name: string;
  email: string;
  phone: string;
  content: string;
}
