import { Box, Button, Flex, List, ListIcon, ListItem, Spacer, Text } from "@chakra-ui/react";
import Popup from "@ltp/components/Popup";
import Radio from "@ltp/components/Radio";
import useTranslation from "@ltp/hooks/useTranslation";
import useMyAddress from "pages/profile/hooks/useMyAddress";
import { useState } from "react";
import { RiAddFill, RiMapPinLine, RiPhoneLine, RiUser6Line } from "react-icons/ri";
import DetailModal from "./DetailModal";

export default function Address() {
  const { t } = useTranslation();
  const {
    addressList,
    popup,
    showPopup,
    hidePopup,
    deleteAddress,
    getMyAddresses,
    updateMyAddressDefault,
  } = useMyAddress();
  const [isDefault, setIsDefault] = useState(1);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false);
  const [detailForm, setDetailForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    alias: "",
  });
  const hasDataAddressList = addressList && addressList.length > 0;
  const handleOpenEditModal = (item) => {
    setDetailForm({ ...item, phone: item.phone_number });
    setIsOpenDetailModal(true);
  };

  const handleSuccessCallback = (cbValue) => {
    const { isCreate, isSuccess } = cbValue;
    showPopup(isCreate, isSuccess);
    setIsOpenDetailModal(false);
    getMyAddresses();
  };
  return (
    <Box
      borderRadius={4}
      borderColor="#BCCCFF"
      bgColor="#ffffff"
      ml={{ base: 0, md: 8 }}
      borderWidth={1}
      p={4}
    >
      <Flex mb={2} flexWrap="wrap">
        <Text
          display="inline-block"
          color="#2154FF"
          textTransform="uppercase"
          fontSize={18}
          fontWeight="bold"
        >
          {t("myAddress")}
        </Text>
        <Spacer />
        <Button
          border="none"
          bg="#ffffff"
          leftIcon={<RiAddFill />}
          justifyContent="right"
          color="#2154FF"
          fontSize={{ base: 15, md: 16 }}
          fontWeight={600}
          onClick={() => {
            setDetailForm({});
            setIsOpenDetailModal(true);
          }}
          py={0}
          h="25px"
        >
          {t("addNew")}
        </Button>
      </Flex>
      <Box bg="#BCCCFF" h="1px" w="100%" />
      <Box mt={4}>
        {hasDataAddressList &&
          addressList.map((item) => (
            <Flex
              key={item.id}
              borderRadius={4}
              borderColor="#BCCCFF"
              borderWidth={1}
              mb={4}
              flexDirection={{ base: "column", md: "row" }}
            >
              <List fontSize={16} color="#071133" flexGrow={1} spacing={4} pr={4} p={4} pt={0}>
                <ListItem display={{ base: "block", md: "none" }} mt={4}>
                  <Radio
                    type="radio"
                    value={item.id}
                    isChecked={item.id === isDefault?.id}
                    onChange={() => setIsDefault(item)}
                  >
                    <Text fontSize={16}>{t("setAsDefault")}</Text>
                  </Radio>
                </ListItem>
                <ListItem>
                  <ListIcon as={RiUser6Line} color="#2154FF" />
                  <Text as="span" mr={2}>
                    {t("fullName")}:
                  </Text>
                  <Text as="span" fontWeight="bold">
                    {item.name}
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={RiPhoneLine} color="#2154FF" />
                  <Text as="span" mr={2}>
                    {t("phoneNum")}:
                  </Text>
                  <Text as="span" fontWeight="bold">
                    {item.phone_number}
                  </Text>
                </ListItem>
                <ListItem>
                  <ListIcon as={RiMapPinLine} color="#2154FF" />
                  <Text as="span" mr={2}>
                    {t("address")}:
                  </Text>
                  <Text as="span" fontWeight="bold">
                    {item.address},{item.ward.name},{item.district.name},{item.city.name}
                  </Text>
                </ListItem>
              </List>
              <Flex flexShrink={0} fontSize={16} p={{ base: 0, md: 4 }} flexDirection="column">
                <Box display={{ base: "none", md: "block" }}>
                  <Radio
                    type="radio"
                    value={item.id}
                    isChecked={isDefault?.id ? item.id === isDefault?.id : item.is_default == 1}
                    onChange={() => {
                      setIsDefault(item);
                      updateMyAddressDefault(item.id);
                    }}
                  >
                    <Text fontSize={16}>{t("setAsDefault")}</Text>
                  </Radio>
                </Box>
                <Spacer />
                <Box
                  textDecoration="underline"
                  textAlign="right"
                  borderTop={{ base: "1px solid #BCCCFF", md: "none" }}
                >
                  <Text
                    as="button"
                    cursor="pointer"
                    textDecoration="underline"
                    w={{ base: "50%", md: "auto" }}
                    color="#2154FF"
                    p={{ base: 2, md: 0 }}
                    borderRight={{ base: "1px solid #BCCCFF", md: "none" }}
                    onClick={() => handleOpenEditModal(item)}
                  >
                    {t("edit")}
                  </Text>
                  <Text
                    as="button"
                    cursor="pointer"
                    textDecoration="underline"
                    w={{ base: "50%", md: "auto" }}
                    color="#FF0000"
                    p={{ base: 2, md: 0 }}
                    ml={{ base: 0, md: 8 }}
                    onClick={() => deleteAddress(item.id)}
                  >
                    {t("delete")}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          ))}
      </Box>
      <Popup
        isOpen={popup.visible}
        title={popup.title}
        subTitle={popup.subTitle}
        onPress={hidePopup}
      />

      {isOpenDetailModal && (
        <DetailModal
          successCallback={handleSuccessCallback}
          onRefreshList={getMyAddresses}
          isOpen={isOpenDetailModal}
          onClose={setIsOpenDetailModal}
          address={detailForm}
          onChangeForm={setDetailForm}
        />
      )}
    </Box>
  );
}
