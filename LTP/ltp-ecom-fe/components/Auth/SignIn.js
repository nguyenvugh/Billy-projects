import {
  Box,
  Text,
  ModalCloseButton,
  Button,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Checkbox,
  Divider,
  Stack,
  useBoolean,
} from "@chakra-ui/react";

import { RiUser6Line, RiLockLine, RiEyeLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { loginAuth } from "@ltp/services/auth";
import { saveCache } from "@ltp/services/datacache";
import { keyCache } from "@ltp/constants/data";
import { useState } from "react";
import { emailValidation } from "@ltp/utils/validate";
import firebaseSocialAuth, {
  facebookProvider,
  googleProvider,
} from "@ltp/services/auth/socialAuth";
import useTranslation from "@ltp/hooks/useTranslation";
import { useAppUserContext } from "../context/auth";
import { useCookies } from "react-cookie";
import { SCREEN_AUTH } from ".";

export default function SignIn({ setScreen }) {
  const { setUserContext } = useAppUserContext();
  const { t } = useTranslation();
  const [togglePassView, setTogglePassView] = useBoolean(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [state, _setState] = useState({
    email: "",
    password: "",
    validate: false,
  });
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  const [error, setError] = useState("");
  const handleSubmit = () => {
    setIsLoading(true);
    if (!state.email || !state.password) {
      setState({
        validate: true,
      });
      setIsLoading(false);
      return;
    }
    if (emailValidation(state.email)) {
      setState({
        validate: true,
      });
      setIsLoading(false);
      return;
    }
    loginAuth({ email: state.email?.trim(), password: state.password })
      .then((data) => {
        setCookie("access_token", data?.access_token, { path: "/" });
        saveCache(keyCache.UserInfo, data);
        setUserContext(data);
        setScreen();
        saveCache(keyCache.isLoginRegisterSocial, "false");
      })
      .catch((err) => {
        setError(err?.message);
        setIsLoading(false);
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

  const onSocialSignIn = async (provider, t) => {
    firebaseSocialAuth(provider, t)
      .then((data) => {
        if (data?.id) {
          setCookie("access_token", data?.access_token, { path: "/" });
          saveCache(keyCache.UserInfo, data);
          setUserContext(data);
          setScreen();
          saveCache(keyCache.isLoginRegisterSocial, "true");
        } else {
          setError("Đã có lỗi xảy ra, xin vui lòng thử lại hoặc dùng phương thức đăng ký khác.");
        }
      })
      .catch((err) => {
        setError(err?.message);
      });
  };
  return (
    <Box>
      <Box align="center" position="relative">
        <Text fontSize={20} textTransform="uppercase" color="#071133" fontWeight="bold" mx={10}>
          {t("logInUppercase")}
        </Text>
        <Text as="span" color="#718096" fontSize={14} mr={4}>
          {t("dontHaveAccount")}
        </Text>
        <Text
          as="a"
          color="#2154FF"
          cursor="pointer"
          fontSize={14}
          onClick={() => setScreen(SCREEN_AUTH.signUp)}
        >
          {t("createAccount")}
        </Text>
        <ModalCloseButton position="absolute" right={0} top={0} />
      </Box>
      <Box mt={4}>
        {error && (
          <Text color="#EA403F" fontSize="13px" paddingBottom={4}>
            {error}
          </Text>
        )}
        <Box mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={RiUser6Line} color="#BCCCFF" />
            </InputLeftElement>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              {...styleInput}
              borderColor={
                (!!state.validate && !state.email) ||
                !!error ||
                (state.email && !!state.validate && emailValidation(state.email))
                  ? "#EA403F"
                  : "#BCCCFF"
              }
              value={state.email}
              onChange={onChangeInput}
              onKeyPress={onKeyPress}
            />
          </InputGroup>
          {!!state.validate && !state.email && (
            <Text color="#EA403F" fontSize="12px">
              {t("emailIsRequired")}
            </Text>
          )}
          {state.email && !!state.validate && emailValidation(state.email) && (
            <Text color="#EA403F" fontSize="12px">
              {t("emailIsInvalid")}
            </Text>
          )}
        </Box>
        <Box mb={4}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={RiLockLine} color="#BCCCFF" />
            </InputLeftElement>
            <Input
              type={togglePassView ? "password" : "text"}
              name="password"
              placeholder={t("password")}
              defaultValue={state.password}
              {...styleInput}
              borderColor={(!!state.validate && !state.password) || !!error ? "#EA403F" : "#BCCCFF"}
              onChange={onChangeInput}
              onKeyPress={onKeyPress}
            />
            <InputLeftElement
              right={0}
              left="auto !important"
              onClick={() => {
                setTogglePassView.toggle();
              }}
            >
              <Icon
                as={RiEyeLine}
                mr={2}
                color={togglePassView ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.7)"}
              />
            </InputLeftElement>
          </InputGroup>
          {!!state.validate && !state.password && (
            <Text color="#EA403F" fontSize="12px">
              {t("passwordIsRequired")}
            </Text>
          )}
        </Box>
        <Box mb={4}>
          <Checkbox>
            <Text fontSize={14}>{t("saveAccount")}</Text>
          </Checkbox>
          <Text
            as="a"
            color="#2154FF"
            cursor="pointer"
            fontSize={14}
            float="right"
            onClick={() => setScreen(SCREEN_AUTH.forgetPassword)}
          >
            {t("forgotPassword")}
          </Text>
        </Box>
        <Button
          w="100%"
          bg="#2154FF"
          _hover={{ bg: "#2154FF" }}
          _active={{ bg: "#2154FF" }}
          borderRadius={4}
          color="#ffffff"
          fontSize={16}
          onClick={handleSubmit}
          isLoading={isLoading}
        >
          {t("logIn")}
        </Button>
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
            onClick={() => onSocialSignIn(facebookProvider, t)}
          >
            Facebook
          </Button>
          <Button
            w="49%"
            borderWidth={1}
            borderColor="#718096"
            bg="#ffffff"
            leftIcon={<FcGoogle />}
            onClick={() => onSocialSignIn(googleProvider)}
          >
            Google
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
const styleInput = {
  borderWidth: "1px",
  borderRadius: 4,
  color: "#718096",
  fontSize: 16,
};
