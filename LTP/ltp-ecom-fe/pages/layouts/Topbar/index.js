import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Link as LinkUI,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Auth, { SCREEN_AUTH } from "@ltp/components/Auth";
import Container from "@ltp/components/Container";
import { useAppUserContext } from "@ltp/components/context/auth";
import { CompanyInfoContext } from "@ltp/components/context/company-info";
import { keyCache } from "@ltp/constants/data";
import { LANG_EN, LANG_VI } from "@ltp/constants/languages";
import useTranslation from "@ltp/hooks/useTranslation";
import { saveCache } from "@ltp/services/datacache";
import { getProfileClient } from "@ltp/services/profile";
import { ROUTE_SHOP } from "@ltp/utils/constant";
import { addTrailingSlash } from "@ltp/utils/validate-url";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { RiArrowDownSFill, RiMapPinFill, RiPhoneFill } from "react-icons/ri";
import Account from "./components/Account";
import CustomerSupport from "./components/CustomerSupport";
import LanguageSelection from "./components/LanguageSelection";

export default function Topbar() {
  const { companyInfo } = useContext(CompanyInfoContext);
  const { userContext, setUserContext } = useAppUserContext();
  const [screenAuth, setScreenAuth] = useState();
  const router = useRouter();
  const { t, locale } = useTranslation();

  useEffect(() => {
    if (router.query.code) {
      setScreenAuth(SCREEN_AUTH.resetPassword);
    }
    if (+router?.query?.screenActive === SCREEN_AUTH.signUp) {
      setScreenAuth(SCREEN_AUTH.signUp);
    }
  }, []);

  useEffect(() => {
    if (userContext?.id && !userContext?.avatar?.id) {
      getProfileClient()
        .then((response) => {
          const userInfo = { ...userContext, ...response.data };
          saveCache(keyCache.UserInfo, userInfo);
          setUserContext(userInfo);
        })
        .catch((error) => {
          // throw new Error(error);
          console.log(error);
        });
    }
  }, [userContext?.id]);

  return (
    <Box
      bg="linear-gradient(0deg, #1A43CC, #1A43CC);"
      color={useColorModeValue("white")}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue("gray.200", "gray.900")}
    >
      <Container>
        <Flex flexWrap="wrap" justifyContent="space-between">
          <HStack spacing={8} py="8px" mr={8}>
            <a href={addTrailingSlash(ROUTE_SHOP(locale))} passHref shallow>
              <Box
                display="inline-flex"
                alignItems="center"
                fontWeight="normal"
                fontSize={14}
                _hover={{
                  color: "#ffffffb3",
                }}
              >
                <Icon as={RiMapPinFill} mr={2} />
                <Text fontSize={14}>{t("storeSystem")}</Text>
              </Box>
            </a>
            <Box display="inline-flex" alignItems="center" fontWeight="normal" fontSize={14}>
              <Icon as={RiPhoneFill} mr={2} />
              <LinkUI
                href={`tel:${companyInfo?.[`${locale === "vi" ? LANG_VI : LANG_EN}.hotline`]}`}
              >
                <Text fontSize={14}>
                  {companyInfo?.[`${locale === "vi" ? LANG_VI : LANG_EN}.hotline`]}
                </Text>
              </LinkUI>
            </Box>
          </HStack>
          <HStack display={{ base: "none", md: "flex" }} spacing={8} py="8px">
            <LanguageSelection />
            <CustomerSupport />
            {userContext?.email ? (
              <Account>
                <Box display="flex" alignItems="center">
                  <Avatar name={userContext?.name} size="xs" src={userContext?.avatar?.url} />
                  <Text fontSize={14} mx={2}>
                    {userContext?.name}
                  </Text>
                  <RiArrowDownSFill />
                </Box>
              </Account>
            ) : (
              <HStack>
                <Button
                  bg="transparent"
                  fontWeight="normal"
                  fontSize={14}
                  variant="link"
                  color="#ffffff"
                  cursor="pointer"
                  _hover={{
                    bg: "transparent",
                  }}
                  _active={{
                    bg: "transparent",
                  }}
                  onClick={() => {
                    setScreenAuth(SCREEN_AUTH.signUp);
                  }}
                >
                  {t("signUp")}
                </Button>
                <Box as="span" height="17px" bg="#ffff" w="1px" />
                <Button
                  bg="transparent"
                  fontWeight="600"
                  fontSize={14}
                  variant="link"
                  color="#ffffff"
                  cursor="pointer"
                  _hover={{
                    bg: "transparent",
                  }}
                  _active={{
                    bg: "transparent",
                  }}
                  onClick={() => {
                    setScreenAuth(SCREEN_AUTH.signIn);
                  }}
                >
                  {t("logIn")}
                </Button>
              </HStack>
            )}
          </HStack>
        </Flex>
        <Auth screen={screenAuth} setScreen={setScreenAuth} />
      </Container>
    </Box>
  );
}
