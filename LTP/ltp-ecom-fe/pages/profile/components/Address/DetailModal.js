import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import TextField from "@ltp/components/TextField";
import useTranslation from "@ltp/hooks/useTranslation";
import useAddress from "pages/profile/hooks/useAddress";
import useMyAddress from "pages/profile/hooks/useMyAddress";

export default function AddModal({ address, isOpen, onClose, onRefreshList, successCallback }) {
  const { t, locale } = useTranslation();
  const { cities, districts, wards, addressResult, handleChangeSelector } = useAddress(address);
  const { errors, handleClickConfirm, handleChangeField } = useMyAddress({
    address,
    onClose,
    onRefreshList,
    successCallback,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent m="auto">
        <ModalBody pt={5} fontSize={16}>
          <Box pos="relative">
            <Text color="#007BFF" fontSize={24} fontWeight="bold" mb={4}>
              {address?.id ? `${t("edit")} ` : `${t("add")} `}
              {t("addressLowercase")}
            </Text>
            <ModalCloseButton position="absolute" right={0} top={0} onClick={onClose} />
          </Box>
          <Flex justifyContent="space-between">
            <Box width={{ base: "100%", md: "50%" }}>
              <TextField
                color="#000000"
                name="name"
                background="#ffffff"
                placeholder={`${t("fullName")} *`}
                required
                defaultValue={address?.name}
                error={errors?.name}
                helperText={errors?.name}
                onChange={(event) => handleChangeField("name", event)}
              />
            </Box>
            <Box width={{ base: "100%", md: "45%" }}>
              <TextField
                name="phone"
                color="#000000"
                background="#ffffff"
                type="number"
                placeholder={`${t("phoneNum")} *`}
                error={locale === "vi" ? errors?.phone : errors?.phone_en}
                helperText={locale === "vi" ? errors?.phone : errors?.phone_en}
                required
                defaultValue={address?.phone}
                onChange={(event) => handleChangeField("phone", event)}
              />
            </Box>
          </Flex>
          <FormControl isInvalid={errors?.city}>
            <Select
              value={addressResult?.city}
              required
              disabled={!cities.length > 0}
              name="city"
              placeholder={`${t("pleaseChooseYour")} ${t("city")} *`}
              borderWidth="1px"
              borderColor="#BCCCFF"
              borderRadius={3}
              mb={9}
              onChange={handleChangeSelector}
            >
              {cities?.length > 0 &&
                cities.map((item) => (
                  <option key={`city_${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
            {errors?.city && (
              <FormErrorMessage fontSize="14px" mt="-8" mb="2">
                {errors?.city}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors?.district}>
            <Select
              value={addressResult?.district}
              required
              disabled={!districts.length > 0}
              name="district"
              placeholder={`${t("pleaseChooseYour")} ${t("district")} *`}
              borderWidth="1px"
              borderColor="#BCCCFF"
              borderRadius={3}
              mb={9}
              onChange={handleChangeSelector}
            >
              {districts?.length > 0 &&
                districts.map((item) => (
                  <option key={`district_${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
            {errors?.district && (
              <FormErrorMessage fontSize="14px" mt="-8" mb="2">
                {errors?.district}
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors?.ward}>
            <Select
              value={addressResult?.ward}
              disabled={!wards.length > 0}
              name="ward"
              required
              placeholder={`${t("pleaseChooseYour")} ${t("ward")} *`}
              onChange={handleChangeSelector}
              borderWidth="1px"
              borderColor="#BCCCFF"
              borderRadius={3}
              mb={9}
            >
              {wards?.length > 0 &&
                wards.map((item) => (
                  <option key={`ward_${item.id}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
            {errors?.ward && (
              <FormErrorMessage fontSize="14px" mt="-8" mb="2">
                {errors?.ward}
              </FormErrorMessage>
            )}
          </FormControl>
          <TextField
            color="#000000"
            defaultValue={address?.address}
            error={errors?.address}
            helperText={errors?.address}
            name="address"
            background="#ffffff"
            placeholder={`${t("address")} *`}
            required
            onChange={(event) => handleChangeField("address", event)}
          />
          <TextField
            color="#000000"
            name="alias"
            defaultValue={address.alias}
            onChange={(event) => handleChangeField("alias", event)}
            background="#ffffff"
            placeholder={`${t("addressName")} *`}
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
              onClick={() => handleClickConfirm(addressResult)}
              bg="#2154FF"
              color="#ffffff"
              background="#2154FF"
              borderWidth="1px"
              borderColor="#A0AEC0"
              borderRadius={5}
              px={8}
              fontWeight="normal"
            >
              {t("confirm")}
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

AddModal.defaultProps = {
  isOpen: false,
};
