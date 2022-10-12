import { Box, Text, Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { keyCache } from "@cbi/constants/data";
import { verifyEmail } from "@cbi/services/auth";
// import { saveCache } from "@ltp/services/datacache";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Container from "@cbi/components/container";
import { useUserContext } from "@cbi/context/AuthContext";
import { saveCache } from "@cbi/utils/dataCache";
import { decodeJwt } from "@cbi/utils/index";
// import useTranslation from "@ltp/hooks/useTranslation";

export default function VerifyEmail({}) {
  // const { t } = useTranslation();
  const { userContext, setUserContext } = useUserContext();
  const router = useRouter();
  const token = router?.query?.token || "";
  const [messageVerify, setMessageVerify] = useState("");
  useEffect(() => {
    if (token) {
      let tokenSend = "";
      if (token instanceof Array) {
        tokenSend = token[0];
      } else {
        tokenSend = token;
      }
      verifyEmail(tokenSend)
        .then((s: any) => {
          saveCache(keyCache.UserInfo, s);
          setUserContext({
            ...s,
            email: decodeJwt(s?.accessToken).usernameOrEmail,
          });
          router.push("/");
        })
        .catch((err: Error) => {
          // console.log(err);
          setMessageVerify("Không thể xác thực email");
        });
    }
  }, [token]);
  return (
    <Container>
      <Box mt={10} mb={10}>
        {messageVerify ? (
          <Alert status="error">
            <AlertIcon />
            {messageVerify}
          </Alert>
        ) : (
          <Box textAlign="center" pt={7} pb={7}>
            <Spinner
              thickness="6px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}
