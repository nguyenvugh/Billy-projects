import { Box, Button, Flex, FormControl, Input, Text } from "@chakra-ui/react";
import { STEP_1, STEP_2 } from "@ltp/constants/checkout/step";
import useTranslation from "@ltp/hooks/useTranslation";
import { emailValidation, isPhone } from "@ltp/utils/validate";
import { Field, Form, Formik } from "formik";

export default function Checkout({ onChangeStep, handleValueStep, step1 }) {
  const { t } = useTranslation();
  const stylesFlexForm = {
    alignItems: "center",
    marginBottom: "24px",
    flexFlow: "wrap",
  };

  const styleError = {
    fontSize: "12px",
    color: "#FF424F",
  };

  const styleInput = {
    border: "1px solid #BCCCFF",
    fontSize: "16px",
    _placeholder: { fontSize: "16px" },
  };
  const validateName = (value) => {
    let error;
    if (!(value || "").trim()) {
      error = t("fullNameRequired");
    }
    return error;
  };
  const validateEmail = (value) => {
    let error;
    if (!(value || "").trim()) {
      error = t("emailIsRequired");
    } else if (emailValidation(value)) {
      error = t("emailIsInvalid");
    }
    return error;
  };
  const validatePhone = (value) => {
    let error;
    if (!(value || "").trim()) {
      error = t("phoneIsRequired");
    } else if (!isPhone(value)) {
      error = t("phoneIsInvalid");
    }
    return error;
  };
  return (
    <Box>
      <Formik
        initialValues={{
          name: step1?.name || "",
          email: step1?.email || "",
          phone: step1?.phone || "",
        }}
        onSubmit={(values) => {
          handleValueStep(STEP_1, { ...values, typeLogin: "2" });
          onChangeStep(STEP_2);
        }}
      >
        {(props) => (
          <Form>
            <Field name="email" validate={validateEmail}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.email && form.touched.email}>
                  <Flex {...stylesFlexForm} display={{ base: "block", md: "flex" }}>
                    <Text>Email*</Text>
                    <Input
                      placeholder={`${t("enterEmailToConfirmOrder")}*`}
                      {...styleInput}
                      name="email"
                      {...field}
                    />
                    <Text {...styleError}>{form.errors.email}</Text>
                  </Flex>
                </FormControl>
              )}
            </Field>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <Flex {...stylesFlexForm} display={{ base: "block", md: "flex" }}>
                    <Text>{t("fullName")}*</Text>
                    <Input
                      placeholder={`${t("enterFullNameCheckout")}*`}
                      name="name"
                      {...styleInput}
                      {...field}
                      w={{ base: "100%" }}
                    />
                    <Text {...styleError}>{form.errors.name}</Text>
                  </Flex>
                </FormControl>
              )}
            </Field>
            <Field name="phone" validate={validatePhone}>
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.phone && form.touched.phone}>
                  <Flex {...stylesFlexForm} display={{ base: "block", md: "flex" }}>
                    <Text>{t("phoneNum")}*</Text>
                    <Input
                      placeholder={`${t("enterPhoneNum")}*`}
                      {...styleInput}
                      {...field}
                      w={{ base: "100%" }}
                      // type="number"
                    />
                    <Text {...styleError}>{form.errors.phone}</Text>
                  </Flex>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              w="100%"
              bg="#2154FF"
              _hover={{ bg: "#2154FF" }}
              _active={{ bg: "#2154FF" }}
              borderRadius="4px"
              color="#ffffff"
              fontSize={16}
              fontWeight={700}
              onClick={() => {
                props.submitForm();
              }}
            >
              {t("nextStep")}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
Checkout.defaultProps = {
  step1: { name: "", email: "", phone: "" },
};
