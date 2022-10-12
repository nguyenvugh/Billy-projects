import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { ROUTE_SHOP, ROUTE_STORE_PAGE } from "@ltp/utils/constant";
import { useState } from "react";

export default function ModalContact({ isOpen, onClose }) {
  const { t, locale } = useTranslation();
  const [selected, setSelected] = useState(null);

  function handleSelectContact(index) {
    setSelected(index === selected ? null : index);
  }

  function handleConfirm() {
    const currentAction = dataContact[selected].action;
    currentAction && currentAction();
  }
  const dataContact = [
    {
      iconUrl: "/icons/contact-methods/fill-location.svg",
      name: "Hệ thống cửa hàng",
      action: () => {
        window.location.href = ROUTE_SHOP(locale);
      },
    },
    {
      iconUrl: "/icons/contact-methods/fill-store.svg",
      name: "Văn phòng đại diện",
      action: () => {
        window.location.href = ROUTE_STORE_PAGE(locale);
      },
    },
    {
      iconUrl: "/icons/contact-methods/fill-phone.svg",
      name: "+84 (0)93 333 2405",
      action: () => {
        window.location.href = `tel:+84 (0)93 333 2405`;
      },
    },
  ];
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent p="32px">
        <Text fontSize="24px" fontWeight="700" color="#2154FF">
          {t("chooseContactMethod")}
        </Text>

        <VStack spacing="16px" my="32px">
          {dataContact.map(({ name, iconUrl }, index) => {
            const isSelected = selected === index;
            return (
              <Item
                key={index}
                name={name}
                urlIcon={iconUrl}
                isSelected={isSelected}
                onSelect={() => handleSelectContact(index)}
              />
            );
          })}
        </VStack>

        <HStack spacing={{ base: "8px", md: "14px", xl: "16px" }}>
          <Button
            color="#718096"
            background="#FFFFFF"
            _hover={{ bg: "#FFFFFF" }}
            _focus={{ bg: "#FFFFFF" }}
            border="1px solid #718096"
            style={addCart}
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
            onClick={onClose}
          >
            {t("cancel")}
          </Button>
          <Button
            color="#FFFFFF"
            background="#2154FF"
            _hover={{ bg: "#2154FF" }}
            _focus={{ bg: "#2154FF" }}
            style={addCart}
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
            disabled={selected === null}
            onClick={handleConfirm}
          >
            {t("confirm")}
          </Button>
        </HStack>
      </ModalContent>
    </Modal>
  );
}

function Item({ name, urlIcon, isSelected, onSelect }) {
  return (
    <Box
      w="full"
      h="48px"
      py="14px"
      px="19px"
      border={isSelected ? "1px solid #2154FF" : "1px solid #C0C0C0"}
      borderRadius="4px"
      bg="white"
      display="flex"
      alignItems="center"
      cursor="pointer"
      onClick={onSelect}
    >
      <Image src={urlIcon} w="18px" h="21px" mr="19px" />
      <Text
        color={isSelected ? "#2154FF" : "#718096"}
        fontSize="16px"
        fontWeight="500"
        fontStyle="normal"
      >
        {name}
      </Text>
    </Box>
  );
}

const addCart = {
  padding: "20px 0",
  textAlign: "center",
  borderRadius: "5px",
  width: "50%",
  fontWeight: "500",
};
