import { Box, Button, Image, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { postCustomerContact } from "@ltp/services/office";
import { emailValidation, isPhone } from "@ltp/utils/validate";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputText from "./Input";

function RenderError({ error }) {
  if (error) {
    return (
      <Text color="#EA403F" fontSize="13px" marginTop="-20px" marginBottom={4}>
        {error}
      </Text>
    );
  }
  return null;
}
const errorDefaut = {
  name: "",
  phone: "",
  email: "",
  content: "",
};
function ContactInfo() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    content: "",
  });
  const [error, setError] = useState(errorDefaut);
  const handleSubmitContact = async () => {
    const isError = Object.values(form).some((item) => !item);
    if (isError) {
      let objectError = errorDefaut;
      for (const [key, value] of Object.entries(form)) {
        if (!value) {
          objectError = { ...objectError, [key]: `${t(`${key}Contact`)} ${t("textRequire")}` };
        }
      }
      setError(objectError);
    } else {
      setError(errorDefaut);
      const params = {
        name: form.name,
        email: form.email,
        content: form.content,
        phone_number: form.phone,
      };
      try {
        await postCustomerContact(params);
        toast.success(t("sendContactSuccess"));
        setForm(errorDefaut);
      } catch (error) {
        toast.error(t("sendContactFail"));
        setForm(errorDefaut);
      }
    }
  };
  const onChangeValue = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Box>
      <InputText
        name="name"
        placeholder={t("fullName")}
        marginBottom="24px"
        value={form.name}
        onChange={onChangeValue}
      />
      <RenderError
        error={
          !form.name && error.name
            ? error.name
            : form.name && form.name.length > 50
            ? t("nameExceedContact")
            : ""
        }
      />
      <InputText
        placeholder={t("phoneContact")}
        marginBottom="24px"
        value={form.phone}
        onChange={onChangeValue}
        name="phone"
      />
      <RenderError
        error={
          !form.phone && error.phone
            ? error.phone
            : form.phone && !isPhone(form.phone)
            ? t("phoneIsInvalid")
            : ""
        }
      />
      <InputText
        placeholder="Email"
        marginBottom="24px"
        value={form.email}
        onChange={onChangeValue}
        name="email"
      />
      <RenderError
        error={
          !form.email && error.email
            ? error.email
            : form.email && emailValidation(form.email)
            ? t("emailIsInvalid")
            : ""
        }
      />
      <InputText
        placeholder={t("contentContact")}
        marginBottom="24px"
        textarea
        value={form.content}
        onChange={onChangeValue}
        name="content"
      />
      <RenderError error={!form.content && error.content ? error.content : ""} />
      <Button
        textTransform="uppercase"
        background="#FF3E45"
        borderRadius={6}
        padding="15px 0"
        textAlign="center"
        minWidth="180px"
        display="flex"
        _hover={{ bg: "#FF3E45" }}
        _focus={{ bg: "#FF3E45" }}
        _active={{ bg: "#FF3E45" }}
        onClick={handleSubmitContact}
      >
        <Image src="/imgs/mock/store-page/ic_letter.svg" alt="Icon Letter" />
        <Text
          fontWeight="bold"
          color="#FFFFFF"
          paddingLeft="8px"
          fontSize={{ base: "15px", md: "16px", xl: "18px" }}
        >
          {t("sendLetter")}
        </Text>
      </Button>
    </Box>
  );
}
export default ContactInfo;
