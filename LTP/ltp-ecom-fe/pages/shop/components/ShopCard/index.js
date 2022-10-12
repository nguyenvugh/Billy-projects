import {
  AspectRatio,
  Box,
  Flex,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { useState } from "react";

const ShopCard = ({ shop, showMap }) => {
  const { t } = useTranslation();
  const [showThumbnail, setShowThumbnail] = useState(false);
  const onMap = () => {
    showMap instanceof Function && showMap(shop);
  };

  return (
    <>
      <Modal
        isOpen={showThumbnail}
        onClose={() => setShowThumbnail(false)}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent maxWidth="1024px" my="auto">
          <AspectRatio ratio={1.83}>
            <Box>
              <ModalCloseButton bgColor="#ffffff" />
              <Image objectFit="cover" src={shop?.thumbnail?.url} />
            </Box>
          </AspectRatio>
        </ModalContent>
      </Modal>
      <Box p="12px 24px" bgColor="#ffffff" borderRadius="5px">
        <Text fontSize={16} fontWeight={600}>
          {shop?.name}
        </Text>
        <Text fontSize={14} fontWeight={500} mt={2}>
          {shop?.address},{shop?.ward?.name},{shop?.district?.name},{shop?.city?.name}
        </Text>
        <Flex fontSize={14} fontWeight={500} mt={2}>
          <Text width="90px" flexShrink={0}>
            {t("phoneNum")}:
          </Text>
          <Text>{shop?.phone_number}</Text>
        </Flex>
        <Flex fontSize={14} fontWeight={500} mt={2}>
          <Text width="90px" flexShrink={0}>
            {t("openTime")}:
          </Text>
          <Text>
            {workingDate[shop?.start_working_date]} {t("toLowerCase")}{" "}
            {workingDate[shop?.end_working_date]} ({shop?.start_working_time} -{" "}
            {shop?.end_working_time})
          </Text>
        </Flex>
        <Flex fontSize={14} fontWeight={500} mt={2}>
          <Text width="90px" flexShrink={0}>
            Fax:
          </Text>
          <Text>{shop?.fax}</Text>
        </Flex>
        <Flex fontSize={14} fontWeight={500} mt={2}>
          <Text width="90px" flexShrink={0}>
            Email:
          </Text>
          <Text>{shop?.email}</Text>
        </Flex>

        <Flex fontSize={14} fontWeight={300} mt={2} justifyContent="space-between">
          <Text as="button" color="#FF0000" onClick={onMap}>
            {t("viewMap")}
          </Text>
          {shop?.thumbnail?.id ? (
            <Text as="button" color="#2154FF" onClick={() => setShowThumbnail(true)}>
              {t("image")}
            </Text>
          ) : (
            <Text as="button" color="#808080">
              {t("image")}
            </Text>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default ShopCard;

export const workingDate = ["", "T2", "T3", "T4", "T5", "T6", "T7", "CN"];
