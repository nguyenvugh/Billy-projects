import { Box, Image, ModalCloseButton, Text } from "@chakra-ui/react";
import PrimaryButton from "@ltp/components/Button/PrimaryButton";
import TextField from "@ltp/components/TextField";
import { forgetPassword } from "@ltp/services/auth";
import { emailValidation } from "@ltp/utils/validate";
import { Fragment, useState, useRef } from "react";
import useTranslation from "@ltp/hooks/useTranslation";
import ModalError from "@ltp/components/ModalError";

const SCREEN = { forget: 1, success: 2 };

const ForgotPassword = ({ setScreen, emailLogin }) => {
  const { t } = useTranslation();
  const refModalError = useRef(null);
  const [screenForgot, setScreenForgot] = useState(SCREEN.forget);
  const [email, setEmail] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e?.preventDefault();
    if (loading || emailValidation(email)) {
      setSubmit(true);
      return;
    }
    if (emailLogin && email !== emailLogin) {
      refModalError.current.openModal();
      return;
    }
    setLoading(true);
    forgetPassword({ email })
      .then(() => {
        setLoading(false);
        setScreenForgot(SCREEN.success);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err?.data?.message);
      });
  };
  if (screenForgot === SCREEN.success) {
    return (
      <>
        <Box align="center" position="relative">
          <Text
            color="#007BFF"
            fontSize={20}
            fontWeight="bold"
            textAlign="center"
            textTransform="uppercase"
          >
            {t("confirmEmailLowercase")}
          </Text>
          <ModalCloseButton position="absolute" right={0} top={0} />
        </Box>
        <Image src="/imgs/mock/auth/confirmEmail.svg" mx="auto" my={4} />
        <Text mb={4} textAlign="center">
          {t("codeSent")}
          <Text as="span" color="#007BFF">
            &nbsp;
            {email}
          </Text>
          <br />
          {t("pleaseConfirm")}
        </Text>
        <PrimaryButton fontSize={16} w="100%" textTransform="uppercase" onClick={() => setScreen()}>
          {t("agree")}
        </PrimaryButton>
      </>
    );
  }

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Box align="center" position="relative">
        <Text
          color="#071133"
          fontSize={20}
          fontWeight="bold"
          textAlign="center"
          textTransform="uppercase"
          mx={10}
        >
          {t("forgotPassword")}
        </Text>
        <ModalCloseButton position="absolute" right={0} top={0} onClick={() => setScreen()} />
      </Box>
      <Text color="#718096" fontSize={14} textAlign="center" my={4}>
        {t("recoverPassword")}
      </Text>
      <TextField
        placeholder="Email *"
        disabled={loading}
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        error={submit && emailValidation(email)}
        helperText={email === "" ? t("pleaseEnterEmail") : t("emailIsInvalid")}
      />
      <PrimaryButton
        fontSize={16}
        w="100%"
        textTransform="uppercase"
        type="submit"
        isLoading={loading}
      >
        {t("validateEmail")}
      </PrimaryButton>
      <Text my={2} color="#EA403F" fontSize={16}>
        {message}
      </Text>
      <ModalError
        ref={refModalError}
        title={t("titleEmailForgotIncorrect")}
        description={t("desEmailForgotIncorrect")}
      />
    </Box>
  );
};
ForgotPassword.defaultProps = {
  emailLogin: "",
};
export default ForgotPassword;
