import {
  Box,
  Button,
  Divider,
  Image,
  Link as LinkUI,
  ModalCloseButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { keyCache } from "@ltp/constants/data";
import { registerAuth } from "@ltp/services/auth";
import firebaseSocialAuth, {
  facebookProvider,
  googleProvider,
} from "@ltp/services/auth/socialAuth";
import { saveCache } from "@ltp/services/datacache";
import { emailValidation, errorPassword, isPassword, isPhone } from "@ltp/utils/validate";
import _ from "lodash";
import { Fragment, useState } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import useTranslation from "@ltp/hooks/useTranslation";
import { SCREEN_AUTH } from ".";
import { useAppUserContext } from "../context/auth";
import InputField from "./InputField";

const SCREEN = { signUp: 1, success: 2 };

export default function SignUp({ setScreen }) {
  const { t } = useTranslation();
  const [screenSignUp, setScreenSignUp] = useState(SCREEN.signUp);
  const [email, setEmail] = useState("");
  const [state, _setState] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "",
    validate: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUserContext } = useAppUserContext();
  const validateEmail = emailValidation(state.email);
  const validatePass = !isPassword(state.password);
  const validateConfirmPass = !_.isEqual(state.password, state.confirmPassword);
  const validatePhone = !isPhone(state.phone_number);
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  const [error, setError] = useState("");
  const handleSubmit = () => {
    setIsLoading(true);
    const {
      confirmPassword,
      // eslint-disable-next-line
      validate,
      ...rest
    } = state;
    if (
      !state.email ||
      !state.password ||
      !state.name?.trim() ||
      !state.phone_number ||
      !confirmPassword
    ) {
      setState({
        validate: true,
      });
      setIsLoading(false);
      return;
    }
    if (validateEmail || validatePhone || validatePass || state.name.length < 2) {
      setState({
        validate: true,
      });
      setIsLoading(false);
      return;
    }
    if (validateConfirmPass) {
      setState({
        validate: true,
      });
      setIsLoading(false);
      return;
    }

    registerAuth({ ...rest })
      .then((data) => {
        setIsLoading(false);
        setEmail(data?.email);
        setScreenSignUp(SCREEN.success);
        saveCache(keyCache.isLoginRegisterSocial, "false");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
        setTimeout(() => {
          setError("");
        }, 4000);
      });
  };
  const onChangeInput = (e) => {
    setState({
      [e.target.name]: e.target.value,
    });
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const onSocialSignup = async (provider) => {
    setError("");
    firebaseSocialAuth(provider)
      .then((data) => {
        if (data?.id) {
          saveCache(keyCache.UserInfo, data);
          saveCache(keyCache.isLoginRegisterSocial, "true");
          setUserContext(data);
          setScreen();
        }
      })
      .catch((err) => {
        setError(err?.message);
      });
  };

  if (screenSignUp === SCREEN.success) {
    return (
      <>
        <Box align="center" position="relative">
          <Text
            textAlign="center"
            textTransform="uppercase"
            color="#007BFF"
            fontSize="16px"
            fontWeight="700"
            mx={10}
          >
            {t("confirmEmail")}
          </Text>
          <ModalCloseButton position="absolute" right={0} top={0} />
        </Box>
        <Image src="/imgs/mock/auth/confirmEmail.svg" margin="21px auto 21px" />
        <Text textAlign="center">{t("codeSent")}</Text>
        <Text textAlign="center" color="#007BFF">
          {email}
        </Text>
        <Text textAlign="center" mb="24px">
          {t("pleaseConfirm")}
        </Text>
        <Button
          w="100%"
          bg="#2154FF"
          borderRadius={4}
          color="#ffffff"
          textTransform="uppercase"
          fontSize={16}
          fontWeight="bold"
          _hover={{ bg: "#2154FF" }}
          _active={{ bg: "#2154FF" }}
          onClick={() => setScreen()}
        >
          {t("agree")}
        </Button>
      </>
    );
  }

  return (
    <Box>
      <Box align="center" position="relative">
        <Text fontSize={20} textTransform="uppercase" color="#071133" fontWeight="bold" mx={10}>
          {t("createAccount")}
        </Text>
        <Text as="span" color="#718096" fontSize={14} mr={4}>
          {t("alreadyHaveAccount")}
        </Text>
        <Text
          as="a"
          color="#2154FF"
          cursor="pointer"
          fontSize={14}
          onClick={() => setScreen(SCREEN_AUTH.signIn)}
        >
          {t("logIn")}
        </Text>
        <ModalCloseButton position="absolute" right={0} top={0} />
      </Box>
      <Box mt={4}>
        {error && (
          <Text color="#EA403F" fontSize="13px" paddingBottom={4}>
            {error}
          </Text>
        )}
        <InputField
          type="text"
          placeholder={t("fullName")}
          required
          name="name"
          onChange={onChangeInput}
          onKeyPress={onKeyPress}
          message={[t("fullNameRequired"), t("fullNameExceed")]}
          validate={[
            !!state.validate && !(state.name || "").trim(),
            !!(state.name || "").trim() && !!state.validate && state.name.length < 2,
          ]}
        />
        <InputField
          type="email"
          placeholder="Email"
          required
          name="email"
          defaultValue={state.email}
          onChange={onChangeInput}
          onKeyPress={onKeyPress}
          message={[t("emailIsRequired"), t("emailIsInvalid")]}
          validate={[
            !!state.validate && !(state.email || "").trim(),
            !!(state.email || "").trim() && !!state.validate && validateEmail,
          ]}
        />
        <InputField
          value={state.phone_number}
          type="text"
          placeholder={t("phoneNum")}
          required
          name="phone_number"
          onChange={onChangeInput}
          onKeyPress={onKeyPress}
          message={[t("phoneIsRequired"), t("phoneIsInvalid")]}
          validate={[
            !!state.validate && !state.phone_number,
            !!state.phone_number && !!state.validate && validatePhone,
          ]}
        />
        <InputField
          value={state.password}
          type="password"
          placeholder={t("password")}
          required
          name="password"
          onChange={onChangeInput}
          onKeyPress={onKeyPress}
          message={[t("passwordIsRequired"), errorPassword]}
          validate={[
            !!state.validate && !state.password,
            !!state.password && !!state.validate && validatePass,
          ]}
          defaultValue={state.password}
        />
        <InputField
          type="password"
          placeholder={t("confirmPassword")}
          required
          name="confirmPassword"
          onChange={onChangeInput}
          onKeyPress={onKeyPress}
          message={[t("passwordIsRequired"), t("passwordNotMatch")]}
          validate={[
            !!state.validate && !state.confirmPassword,
            !!state.confirmPassword && !!state.validate && validateConfirmPass,
          ]}
        />
        <Button
          w="100%"
          bg="#2154FF"
          borderRadius={4}
          color="#ffffff"
          fontSize={16}
          _hover={{ bg: "#2154FF" }}
          _active={{ bg: "#2154FF" }}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          {t("signUp")}
        </Button>
      </Box>
      <Text mt={3} fontSize="14px" color="#535F71" textAlign="center">
        {t("byRegister")}
        &nbsp;
        <LinkUI color="#2154FF" href={`/${t("dieu-khoan-dich-vu")}`} target="_blank">
          {t("termCondition")}
        </LinkUI>
        &nbsp;&amp;&nbsp;
        <LinkUI color="#2154FF" href={`/${t("chinh-sach-bao-mat")}`} target="_blank">
          {t("privacyPolicy")}
        </LinkUI>
      </Text>
      <Stack direction="row" mt={4}>
        <Divider orientation="horizontal" mt={2} w="25%" ml="5%" />
        <Text fontSize={12} color="#718096" w="50%" textAlign="center">
          {t("orLoginWith")}
        </Text>
        <Divider orientation="horizontal" mt="0.5rem !important" w="25%" mr="5% !important" />
      </Stack>
      <Box mt={4}>
        <Button
          w="49%"
          mr="2%"
          borderWidth={1}
          borderColor="#718096"
          bg="#1E599B"
          color="#ffffff"
          leftIcon={<FaFacebookF />}
          onClick={() => onSocialSignup(facebookProvider)}
        >
          Facebook
        </Button>
        <Button
          w="49%"
          borderWidth={1}
          borderColor="#718096"
          bg="#ffffff"
          leftIcon={<FcGoogle />}
          onClick={() => onSocialSignup(googleProvider)}
        >
          Google
        </Button>
      </Box>
    </Box>
  );
}
