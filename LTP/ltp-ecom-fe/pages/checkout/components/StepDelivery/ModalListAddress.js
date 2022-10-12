import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  Text,
} from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";
import { updateAddressDefault } from "@ltp/services/address";
import Lodash from "lodash";
import { useEffect, useState } from "react";

function ModalAddress({ isOpen, onClose, listAddress = [], addressDefault, setaddressDefault }) {
  const { t } = useTranslation();
  const onChangeAddressDefault = async () => {
    await updateAddressDefault(isCheck.id);
    setaddressDefault(isCheck);
    onClose();
  };
  const [isCheck, setIsCheck] = useState({});

  useEffect(() => {
    setIsCheck(addressDefault);
  }, [addressDefault]);
  return (
    <Modal
      isOpen={isOpen}
      closeOnOverlayClick={false}
      onClose={onClose}
      // scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            color="#007BFF"
            fontSize={{ base: "20px", md: "22px", xl: "24px" }}
            fontWeight="bold"
            marginTop="10px 10px"
          >
            {t("changeAddress")}
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody padding="7px 25px">
          <Box
            maxH={{ base: "369px", md: "418px", xl: "458px" }}
            overflowY="auto"
            paddingLeft="4px"
          >
            {listAddress.map((item, index) => {
              const address = Lodash.get(item, "address", "");
              const ward = Lodash.get(item, "ward.name", "");
              const district = Lodash.get(item, "district.name", "");
              const city = Lodash.get(item, "city.name", "");
              const country = Lodash.get(item, "country.name", "");
              const alias = Lodash.get(item, "alias", "");
              return (
                <Box key={index}>
                  <Radio
                    value={`${index}`}
                    isChecked={isCheck?.id === item.id}
                    onChange={() => {
                      setIsCheck(item);
                    }}
                  >
                    <Box
                      border="1px solid #2154FF"
                      borderRadius={5}
                      fontSize={{ base: "14px", md: "15px", xl: "16px" }}
                      padding={{ base: "4px", md: "6px", xl: "8px" }}
                    >
                      <Text fontWeight="500">{`${item.name}${" "}  ${item.phone_number}`}</Text>
                      <Text mt="6px">
                        {[address, ward, district, city, country, alias]
                          .filter((item) => !!item)
                          .join(", ")}
                      </Text>
                    </Box>
                  </Radio>
                  <Box h="24px" />
                </Box>
              );
            })}
          </Box>
        </ModalBody>
        <ModalFooter paddingBottom="47px">
          <Button
            mr={3}
            onClick={onClose}
            border="1px solid #718096"
            color="#718096"
            borderRadius="5px"
            width={{ base: "145px", md: "176px" }}
            maxW={{ base: "145px", md: "49%" }}
            bg="#ffff"
            _hover={{ bg: "#ffff" }}
            _active={{ bg: "#ffff" }}
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
          >
            {t("back")}
          </Button>
          <Button
            bg="#2154FF"
            borderRadius="5px"
            color="#ffff"
            width={{ base: "145px", md: "176px" }}
            maxW={{ base: "145px", md: "49%" }}
            _hover={{ bg: "#2154FF" }}
            _active={{ bg: "#2154FF" }}
            fontSize={{ base: "14px", md: "15px", xl: "16px" }}
            onClick={() => {
              onChangeAddressDefault();
            }}
          >
            {t("update")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
ModalAddress.defaultProps = {
  addressDefault: {},
};
export default ModalAddress;
