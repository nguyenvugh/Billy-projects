import {
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Icon,
  Input,
  Button,
  Checkbox,
  Flex,
  HStack,
  Image,
  useBoolean,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiLockPasswordLine, RiMailLine, RiEyeLine } from "react-icons/ri";
import { emailValidation } from "@ltp/utils/validate";
import { STEP_1, STEP_2 } from "@ltp/constants/checkout/step";
import { loginAuth } from "@ltp/services/auth";
import { saveCache } from "@ltp/services/datacache";
import { keyCache } from "@ltp/constants/data";
import { useAppUserContext } from "@ltp/components/context/auth";
import firebaseSocialAuth, {
  facebookProvider,
  googleProvider,
} from "@ltp/services/auth/socialAuth";
import Auth, { SCREEN_AUTH } from "@ltp/components/Auth";
import useTranslation from "@ltp/hooks/useTranslation";

export default function Checkout({ onChangeStep, handleValueStep, step1 }) {
  const { t } = useTranslation();
  const [screen, setScreen] = useState();
  const { setUserContext } = useAppUserContext();
  const [togglePassView, setTogglePassView] = useBoolean(true);
  const [isLoading, setIsLoading] = useState(false);
  const [state, _setState] = useState({
    email: step1.email,
    password: step1.password,
    validate: false,
  });
  const setState = (data = {}) => {
    _setState((state) => ({ ...state, ...data }));
  };
  const [error, setError] = useState("");
  const handleSubmit = () => {
    setError("");
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
    loginAuth({ email: state.email, password: state.password })
      .then((data) => {
        setUserContext(data);
        saveCache(keyCache.UserInfo, data);
        const values = {
          ...data,
          phone: data.phone_number,
          password: state.password,
        };
        handleValueStep(STEP_1, { ...values, typeLogin: "1" });
        onChangeStep(STEP_2);
        saveCache(keyCache.isLoginRegisterSocial, "false");
      })
      .catch((err) => {
        if ((err.message || "").includes("Sai thông tin đăng nhập")) {
          setError(t("wrongCredential"));
        } else {
          setError(err.message);
        }
        setIsLoading(false);
      });
  };

  const onSocialSignIn = (provider) => {
    firebaseSocialAuth(provider)
      .then((data) => {
        if (data?.id) {
          saveCache(keyCache.UserInfo, data);
          setUserContext(data);
          onChangeStep(STEP_2);
          saveCache(keyCache.isLoginRegisterSocial, "true");
        } else {
          setError(t("useOtherLoginMethod"));
        }
      })
      .catch((err) => {
        setError(err?.message);
      });
  };

  const onChangeInput = (e) => {
    setError("");
    setState({
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Box>
      <Text fontSize={14} color="#718096">
        {t("dontHaveAccount")}{" "}
        <Text
          color="#2154FF"
          fontSize="14px"
          fontWeight="500"
          onClick={() => setScreen(SCREEN_AUTH.signUp)}
          display="inline-block"
          cursor="pointer"
        >
          {t("signUp")}
        </Text>
      </Text>
      {error && (
        <Text color="#EA403F" fontSize="13px" pt={4}>
          {error}
        </Text>
      )}
      <Box mt={4} marginBottom="16px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={RiMailLine} color="#BCCCFF" />
          </InputLeftElement>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            borderWidth="1px"
            borderColor="#BCCCFF"
            borderRadius={4}
            color="#718096"
            fontSize={16}
            onChange={onChangeInput}
            value={state.email}
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

      <Box mt={4} marginBottom="16px">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={RiLockPasswordLine} color="#BCCCFF" />
          </InputLeftElement>
          <Input
            type={togglePassView ? "password" : "text"}
            name="password"
            placeholder="Password"
            borderWidth="1px"
            borderColor="#BCCCFF"
            borderRadius={4}
            color="#718096"
            fontSize={16}
            onChange={onChangeInput}
            value={state.password}
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
      <Flex justifyContent="space-between">
        <Checkbox defaultIsChecked={false} fontSize="14px">
          {t("saveAccount")}
        </Checkbox>
        <Text color="#2154FF" fontSize="14px" onClick={() => setScreen(SCREEN_AUTH.forgetPassword)}>
          {t("forgotPassword")}
        </Text>
      </Flex>
      <Button
        w="100%"
        bg="#2154FF"
        boxShadow="0px 2px 7px rgba(120, 137, 149, 0.254784)"
        borderRadius="5px"
        padding="16px 0"
        textAlign="center"
        color="#ffff"
        marginTop="32px"
        _hover={{ bg: "#2154FF" }}
        _active={{ bg: "#2154FF" }}
        onClick={() => {
          handleSubmit();
        }}
        isLoading={isLoading}
      >
        {t("logIn")}
      </Button>
      <HStack justifyContent="center" alignItems="center" spacing="16px" margin="24px 0">
        <Box h="1px" bg="#718096" w="70px" />
        <Text color="#718096" fontSize="12px">
          {t("orLoginWith")}
        </Text>
        <Box h="1px" bg="#718096" w="70px" />
      </HStack>
      <HStack spacing="26px" fontWeight="600">
        <HStack
          width="50%"
          bg="#1E599B"
          borderRadius="5px"
          padding="11px"
          justifyContent="center"
          color="#ffff"
          as="button"
          onClick={() => onSocialSignIn(facebookProvider)}
        >
          <Image src="/imgs/mock/checkout/ic_facebook.svg" />
          <Text>Facebook</Text>
        </HStack>
        <HStack
          width="50%"
          border="0.5px solid #718096"
          borderRadius="5px"
          padding="11px"
          justifyContent="center"
          as="button"
          onClick={() => onSocialSignIn(googleProvider)}
        >
          <Image src="/imgs/mock/checkout/ic_google.svg" />
          <Text>Google</Text>
        </HStack>
      </HStack>
      <Auth screen={screen} setScreen={setScreen} />
    </Box>
  );
}
Checkout.defaultProps = {
  step1: { name: "", email: "", phone: "" },
};
