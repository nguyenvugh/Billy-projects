import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import { useRouter } from "next/router";
import useTranslation from "@ltp/hooks/useTranslation";

const ModalError = ({ orderError }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const goBack = () => {
    const data = { combos: {}, products: {} };
    Object.keys(orderError?.combos || {}).forEach((item) => {
      data.combos[item] = orderError.combos[item].replace(/[^0-9]/g, "");
    });
    Object.keys(orderError?.products || {}).forEach((item) => {
      data.products[item] = orderError.products[item].replace(/[^0-9]/g, "");
    });
    router.push({ pathname: "/shopping-cart", query: { data: JSON.stringify(data) } });
  };

  return (
    <Modal isOpen={Boolean(orderError)} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <Box padding="32px" textAlign="center" color="#EA403F">
          <Image boxSize="64px" margin="auto" src="/icons/error-info.svg" alt="error-info" />
          <Box mt="20px" fontSize="20px" fontWeight="bold">
            {t("orderFail")}
          </Box>
          <Box mt="16px" fontSize="14px" color="#718096">
            {t("orderInfoChanged")}
          </Box>
          <Button
            onClick={goBack}
            mt="24px"
            bgColor="#007BFF"
            color="#ffffff"
            height="46px"
            width="100%"
            fontSize="16px"
            fontWeight="bold"
            _hover={{
              backgroundColor: "#007BFF",
            }}
          >
            {t("backCart")}
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ModalError;
