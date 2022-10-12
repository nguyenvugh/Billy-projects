import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";

export default function Auth({ isOpen, onClose, data }) {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={6} pb={10} fontSize="16px" textAlign="center">
          <Text
            textAlign="center"
            textTransform="uppercase"
            color="#007BFF"
            fontSize="16px"
            fontWeight="700"
          >
            {t("confirmEmail")}
          </Text>
          <Image src="/imgs/mock/auth/confirmEmail.svg" margin="21px auto 21px" />
          <Text>{t("codeSent")}</Text>
          <Text color="#007BFF">{data.email}</Text>
          <Text mb="24px">{t("pleaseConfirm")}</Text>
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
            onClick={onClose}
          >
            {t("agree")}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

Auth.defaultProps = {
  isOpen: false,
  onClose: { toggle: () => {} },
  data: { email: "" },
};
