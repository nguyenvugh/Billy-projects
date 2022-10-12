import { Image } from "@chakra-ui/image";
import { Box } from "@chakra-ui/layout";
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/modal";
import useTranslation from "@ltp/hooks/useTranslation";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

const ModalError = (_, ref) => {
  const [isOpen, setOpenModal] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setOpenModal(false);
      }, 3000);
    }
  }, [isOpen]);
  useImperativeHandle(
    ref,
    () => ({
      openModal: () => {
        setOpenModal(true);
      },
      closeModal: () => {
        setOpenModal(false);
      },
    }),
    [],
  );
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent backgroundColor="#393a3ac9">
        <Box padding="45px" textAlign="center" color="#fff">
          <Image h="100px" margin="auto" src="/imgs/mock/checkout/ic_add_cart_success.png" />
          <Box fontSize="18px">{t("addToCartSuccess")}</Box>
        </Box>
      </ModalContent>
    </Modal>
  );
};
export default forwardRef(ModalError);
