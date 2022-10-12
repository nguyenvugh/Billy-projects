import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import WarningButton from "@ltp/components/Button/WarningButton";
import Star from "@ltp/components/Star";
import useTranslation from "@ltp/hooks/useTranslation";
import { postReview } from "@ltp/services/profile";
import Lodash from "lodash";
import { useState } from "react";

export default function ReviewModal({ isOpen, onClose, product }) {
  const { t } = useTranslation();
  const [productRating, setProductRating] = useState(0);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [validate, setValidate] = useState(false);

  const handleRating = (value) => {
    setProductRating(value);
  };

  const handleSubmit = () => {
    if (!productRating) {
      setValidate(true);
      setMessage(t("reviewInvalid"));
      return;
    }
    if (validate) {
      return;
    }
    setValidate(true);
    const body = {
      product_id: product.id,
      rating: productRating,
      content,
    };
    postReview(body)
      .then(() => {
        setValidate(false);
        onClose();
      })
      .catch((err) => {
        if ((err.message || "").toLowerCase().includes("đã đánh giá")) {
          setMessage(t("reviewedProduct"));
          setValidate(false);
          return;
        }
        setMessage(err.message);
        setValidate(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalBody py={5} fontSize={16}>
          <Box pos="relative" align="center">
            <Text color="#2154FF" fontSize={24} fontWeight="bold" mb={2}>
              {t("productReview")}
            </Text>
            <Box w="100%" h="2px" bg="#BCCCFF" mt={2} />
            <ModalCloseButton position="absolute" right={0} top={0} onClick={onClose} />
          </Box>
          <Box mt={4}>
            <Box>
              <Box key={product.id} align="center" p={4}>
                <Image
                  boxSize={{ base: "90px", md: "150px" }}
                  src={Lodash.get(product, "images[0].url", "")}
                />
                <Text fontSize={{ base: 16, md: 24 }} fontWeight={500} my={4}>
                  {product.name}
                </Text>
                <Star
                  mode="edit"
                  baseSize="24px"
                  mdSize="36px"
                  onRate={(value) => {
                    handleRating(value);
                    setMessage("");
                  }}
                />
                <Box mt={6}>
                  <Textarea
                    type="text"
                    value={content}
                    placeholder={t("yourThoughts")}
                    onChange={(e) => {
                      if (e.target.value.length > 250) {
                        setValidate(true);
                        setMessage(t("exceedContentReview"));
                      } else {
                        setValidate(false);
                        setMessage("");
                      }
                      setContent(e.target.value);
                    }}
                  />
                  {message ? (
                    <Text margin="3px 0" color="#f14444" fontSize="13px">
                      {message}
                    </Text>
                  ) : null}
                  <WarningButton
                    w="100%"
                    mt={6}
                    onClick={() => {
                      handleSubmit();
                    }}
                  >
                    {t("sendReview")}
                  </WarningButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

ReviewModal.defaultProps = {
  isOpen: false,
  product: {},
};
