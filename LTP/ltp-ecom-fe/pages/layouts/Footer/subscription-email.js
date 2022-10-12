import { Box, Button, Flex, Icon, Input, InputGroup, Text } from "@chakra-ui/react";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { subscriptionEmail } from "@ltp/services/home";
import { emailValidation, isEmpty } from "@ltp/utils/validate";
import { useState } from "react";
import { RiMailLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SubcriptEmail() {
  const toastId = "email-subscript";
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let errorMessage;
    if (isEmpty(email)) {
      errorMessage = t("emailIsRequired");
    } else if (emailValidation(email)) {
      errorMessage = t("emailIsInvalid");
    }
    if (errorMessage) {
      toast.update(toastId, { render: errorMessage, type: toast.TYPE.ERROR });
      toast.error(errorMessage, { toastId });
      return;
    }
    setLoading(true);
    subscriptionEmail({ email })
      .then(() => {
        const message = t("successSubscription");
        toast.update(toastId, { render: message, type: toast.TYPE.SUCCESS });
        toast.success(message, { toastId });
        setEmail("");
        setLoading(false);
      })
      .catch((error) => {
        let errorMessage = t("failSubscription");
        if (error?.data?.statusCode === 409) {
          errorMessage = t("existedEmail");
        }
        toast.update(toastId, { render: errorMessage, type: toast.TYPE.ERROR });
        toast.error(errorMessage, { toastId });
        setLoading(false);
      });
  };

  return (
    <Box bgColor="#2154FF" align="center" p="16px 0">
      <Container>
        <Flex
          as="form"
          onSubmit={onSubmit}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems="center"
        >
          <Text
            textAlign="center"
            textTransform="uppercase"
            color="#ffffff"
            fontSize={{ base: 14 }}
            fontWeight="bold"
            pr={{ base: "0", md: "60px" }}
            mb={{ base: "16px", md: "0" }}
          >
            {t("subcriptionRegister")}
          </Text>
          <InputGroup maxW={{ base: "auto", md: "430px" }}>
            <Input
              size="md"
              placeholder={t("subcriptionRegisterText")}
              borderRadius="4px 0 0 4px"
              bg="#ffffff"
              border={0}
              fontSize={12}
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              bgColor="#E53E3E"
              border={0}
              borderRadius="0 4px 4px 0"
              color="#ffffff"
              textTransform="uppercase"
              fontSize={{ base: 12, md: 14 }}
              ps="28px"
              pe="28px"
              _hover={{
                bgColor: "#E53E3E",
              }}
              disabled={loading}
            >
              <Icon as={RiMailLine} mr={2} w="16px" h="16px" />
              {t("subcriptionRegisterBtn")}
            </Button>
          </InputGroup>
        </Flex>
      </Container>
    </Box>
  );
}
