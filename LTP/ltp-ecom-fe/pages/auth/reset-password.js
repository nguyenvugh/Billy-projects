import { Box, Image, InputLeftElement, ModalCloseButton, Text } from "@chakra-ui/react";
import { SCREEN_AUTH } from "@ltp/components/Auth";
import PrimaryButton from "@ltp/components/Button/PrimaryButton";
import { useAppUserContext } from "@ltp/components/context/auth";
import TextField from "@ltp/components/TextField";
import { setNewPasswordForget } from "@ltp/services/auth";
import { clearCache } from "@ltp/services/datacache";
import { errorPassword, isPassword } from "@ltp/utils/validate";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { RiLockLine } from "react-icons/ri";
import useTranslation from "@ltp/hooks/useTranslation";

const SCREEN = { reset: 1, success: 2 };

const ResetPassword = ({ setScreen }) => {
  const { t } = useTranslation();
  const { userContext, setUserContext } = useAppUserContext();
  const router = useRouter();
  const [screenReset, setScreenReset] = useState(SCREEN.reset);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (userContext?.id) {
      clearCache();
      setUserContext({});
    }
  }, [userContext]);

  const onSubmit = (e) => {
    e?.preventDefault();
    if (loading || !isPassword(password) || password !== confirmPassword) {
      setSubmit(true);
      return;
    }
    setLoading(true);
    setNewPasswordForget({ code: router.query.code, password })
      .then(() => {
        setLoading(false);
        setScreenReset(SCREEN.success);
      })
      .catch((err) => {
        setLoading(false);
        setMessage(err?.data?.message);
      });
  };

  const renderInputLeft = () => (
    <InputLeftElement pointerEvents="none">
      <RiLockLine fontSize={16} color="#2154FF" />
    </InputLeftElement>
  );

  if (screenReset === SCREEN.success) {
    return (
      <>
        <Box align="center" position="relative">
          <ModalCloseButton position="absolute" right={0} top={0} onClick={() => setScreen()} />
        </Box>
        <Image src="/icons/success.svg" mx="auto" my={4} />
        <Text textAlign="center" color="#2154FF" fontSize={20} fontWeight="bold">
          {t("updatedSuccessfully")}
        </Text>
        <Text textAlign="center" color="#718096" fontSize={14} my={4}>
          {t("logInAgain")}
        </Text>
        <PrimaryButton
          fontSize={16}
          w="100%"
          textTransform="uppercase"
          onClick={() => setScreen(SCREEN_AUTH.signIn)}
        >
          {t("logInNow")}
        </PrimaryButton>
      </>
    );
  }
  return (
    <Box>
      <Box as="form" onSubmit={onSubmit}>
        <Box align="center" position="relative" mb={4}>
          <Text
            color="#007BFF"
            fontSize={20}
            fontWeight="bold"
            textAlign="center"
            textTransform="uppercase"
            mx={10}
          >
            {t("createNewPassword")}
          </Text>
          <ModalCloseButton position="absolute" right={0} top={0} />
        </Box>
        <TextField
          type="password"
          placeholder={t("enterNewPassword")}
          autoComplete="on"
          name="password"
          renderInputLeft={renderInputLeft}
          disabled={loading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={submit && !isPassword(password)}
          helperText={password === "" ? t("pleaseEnterPassword") : errorPassword}
        />
        <TextField
          type="password"
          placeholder={t("confirmNewPassword")}
          autoComplete="new-password"
          name="new-password"
          renderInputLeft={renderInputLeft}
          disabled={loading}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value.trim())}
          error={submit && password !== confirmPassword}
          helperText={t("confirmNewPasswordNotMatch")}
        />
        <PrimaryButton fontSize={16} w="100%" textTransform="uppercase" type="submit">
          {t("changePassword")}
        </PrimaryButton>
        <Text my={2} color="#EA403F" fontSize={16}>
          {message}
        </Text>
      </Box>
    </Box>
  );
};

export default ResetPassword;
