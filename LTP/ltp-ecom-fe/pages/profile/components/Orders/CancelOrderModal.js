import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { cancelOrder } from "@ltp/services/profile";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CancelOrderModal({ isOpen, onClose, id, setCancelOrderSuccess }) {
  const { t } = useTranslation();
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);
  const submitCancelOrder = async () => {
    if (!reason) {
      setError(true);
      return;
    }
    setError(false);
    try {
      const params = {
        note: reason,
      };
      await cancelOrder(id, params);
      onClose();
      setCancelOrderSuccess(true);
      toast.done(t("canceledOrder"), { toastId: "order" });
    } catch (error) {
      onClose();
      toast.error(error.message, { toastId: "order" });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody pt={5} fontSize={16}>
          <Box pos="relative">
            <Text color="#2154FF" fontSize={24} fontWeight="bold" mb={2}>
              {t("cancelOrder")}
            </Text>
            <Text fontSize={18} mb={4}>
              {t("cancelOrderConfirm")}
            </Text>
            <ModalCloseButton position="absolute" right={0} top={0} onClick={onClose} />
          </Box>
          <Textarea
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            type="text"
            placeholder={t("reasonCancelOrder")}
            borderWidth="1px"
            borderColor="#BCCCFF"
            borderRadius={3}
            _placeholder={{ color: error && !reason ? "#EA403F" : "#a9aecc" }}
            mb={4}
          />
          <Box align="right" mb={4}>
            <Button
              bg="#ffffff"
              color="#A0AEC0"
              borderWidth="1px"
              borderColor="#A0AEC0"
              borderRadius={5}
              px={8}
              mr={2}
              fontWeight="normal"
              onClick={() => onClose()}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={submitCancelOrder}
              bg="#2154FF"
              color="#ffffff"
              borderWidth="1px"
              borderColor="#A0AEC0"
              borderRadius={5}
              px={8}
              fontWeight="normal"
            >
              {t("cancelOrder")}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

CancelOrderModal.defaultProps = {
  isOpen: false,
};
