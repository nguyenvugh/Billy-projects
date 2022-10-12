import { Alert, AlertIcon, Box, Spinner } from "@chakra-ui/react";
import Container from "@ltp/components/Container";
import { useAppUserContext } from "@ltp/components/context/auth";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { verifyEmail } from "@ltp/services/auth";
import { saveCache } from "@ltp/services/datacache";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const { t } = useTranslation();
  const { setUserContext } = useAppUserContext();
  const router = useRouter();
  const token = router?.query?.token || null;
  const [messageVerify, setMessageVerify] = useState("");
  useEffect(() => {
    if (token) {
      verifyEmail({ code: token })
        .then((s) => {
          // setLoading(false)
          saveCache(keyCache.UserInfo, s);
          setUserContext(s);
          router.push("/");
        })
        .catch(() => {
          setMessageVerify(t("validateEmailFail"));
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
