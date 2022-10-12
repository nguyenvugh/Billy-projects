import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import {
  createAddressUser,
  getCity,
  getCountry,
  getDistrict,
  getWard,
  updateAddressUser,
} from "@ltp/services/address";
import { readCache, saveCache } from "@ltp/services/datacache";
import Lodash from "lodash";
import { useEffect, useState } from "react";
import Select from "./Select";

function ModalAddress({ isOpen, onClose, addressDefault: addressUpdate, isUpdateCreate }) {
  const { t } = useTranslation();
  const [addressDefault, setaddressDefault] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [data, _setData] = useState({
    dataCity: [],
    dataDistrict: [],
    dataWard: [],
    validate: false,
  });
  const [form, _setForm] = useState({
    country: {},
    city: {},
    district: {},
    ward: {},
    address: "",
    name: "",
    phone_number: "",
    alias: "",
  });
  const setData = (data = {}) => {
    _setData((state) => ({ ...state, ...data }));
  };
  const setForm = (data = {}) => {
    _setForm((state) => ({ ...state, ...data }));
  };
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const user = readCache(keyCache.UserInfo);
      setUserInfo(user || {});
      if (Lodash.isEmpty(user)) {
        const dataAddressGuest = readCache(keyCache.addressDefault);
        setaddressDefault(dataAddressGuest || {});
        setForm({
          country: (dataAddressGuest || {}).country || {},
          city: (dataAddressGuest || {}).city || {},
          district: (dataAddressGuest || {}).district || {},
          ward: (dataAddressGuest || {}).ward || {},
          address: (dataAddressGuest || {}).address || "",
        });
      } else if (isUpdateCreate) {
        setaddressDefault(addressUpdate || {});
        setForm({
          ...addressUpdate,
        });
      } else {
        setaddressDefault({});
        setForm({
          id: "",
          country: {},
          city: {},
          district: {},
          ward: {},
          alias: "",
          address: "",
          name: "",
          phone_number: "",
        });
      }
    }
  }, [isOpen]);
  useEffect(() => {
    if (isOpen) {
      const getDataCountry = async () => {
        const resp = await getCountry();
        const res = (resp?.data?.results || []).filter((item) => item.code === "vi");
        setForm({
          country: res[0] || {},
        });
      };
      getDataCountry();
    }
  }, [isOpen]);
  useEffect(() => {
    if (form.country?.id) {
      const resCity = async () => {
        const res = await getCity({ country: form.country?.id });
        setData({
          dataCity: res?.data?.results || [],
        });
      };
      resCity();
    }
  }, [form.country]);
  useEffect(() => {
    if (form.city?.id) {
      const resDistrict = async () => {
        const res = await getDistrict({ city: form.city?.id });
        setData({
          dataDistrict: res?.data?.results || [],
        });
      };
      resDistrict();
    }
  }, [form.city]);
  useEffect(() => {
    if (form.district?.id) {
      const resWard = async () => {
        const res = await getWard({ district: form.district?.id });
        setData({
          dataWard: res?.data?.results || [],
        });
      };
      resWard();
    }
  }, [form.district]);
  const onChangeSelect = (key) => (e) => {
    switch (key) {
      case "country":
        setForm({
          city: {},
          district: {},
          ward: {},
        });
        return setForm({
          [key]: e.target.value ? JSON.parse(e.target.value) : {},
        });
      case "city":
        setForm({
          district: {},
          ward: {},
        });
        return setForm({
          [key]: e.target.value ? JSON.parse(e.target.value) : {},
        });
      case "district":
        setForm({
          ward: {},
        });
        return setForm({
          [key]: e.target.value ? JSON.parse(e.target.value) : {},
        });
      case "ward":
        return setForm({
          [key]: e.target.value ? JSON.parse(e.target.value) : {},
        });
      default:
        return setForm({
          [key]: e.target.value,
        });
    }
  };
  const handleAddress = async () => {
    if (Lodash.isEmpty(userInfo)) {
      if (
        form.country?.id &&
        form.city?.id &&
        form.district?.id &&
        form.ward?.id &&
        (form.address || "").trim()
      ) {
        setValidate(false);
        saveCache(keyCache.addressDefault, { ...form });
        onClose();
      } else {
        setValidate(true);
      }
    } else if (
      form.country?.id &&
      form.city?.id &&
      form.district?.id &&
      form.ward?.id &&
      (form.address || "").trim() &&
      (form.name || "").trim() &&
      form.phone_number
    ) {
      if (!form.phone_number.match(/^\d+$/g)) {
        setValidate(true);
      } else if (form.phone_number.match(/^\d+$/g) && form.phone_number.length !== 10) {
        setValidate(true);
      } else {
        setValidate(false);
        if (form?.id) {
          const params = {
            name: form.name,
            phone_number: form.phone_number,
            address: form.address,
            countryId: form.country?.id,
            cityId: form.city?.id,
            districtId: form.district?.id,
            wardId: form.ward?.id,
            alias: form.alias || "",
          };
          await updateAddressUser({ id: addressDefault?.id, ...params });
        } else {
          const params = {
            name: form.name,
            phone_number: form.phone_number,
            address: form.address,
            countryId: form.country?.id,
            cityId: form.city?.id,
            districtId: form.district?.id,
            wardId: form.ward?.id,
            alias: form.alias || "",
          };
          await createAddressUser(params);
        }
        onClose();
      }
    } else {
      setValidate(true);
    }
  };
  return (
    <Modal isOpen={isOpen} closeOnOverlayClick={false} onClose={onClose} marginTop="10px 10px">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text
            color="#007BFF"
            fontSize={{ base: "20px", md: "22px", xl: "24px" }}
            fontWeight="bold"
          >
            {Lodash.isEmpty(addressDefault) ? t("addNewAddress") : t("editAddress")}
          </Text>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody padding="7px 25px">
          {!Lodash.isEmpty(userInfo) ? (
            <HStack spacing="25px">
              <Box>
                <Input
                  placeholder="Họ và Tên *"
                  border={
                    validate && !(form.name || "").trim()
                      ? "1px solid #EA403F !important"
                      : "1px solid #BCCCFF"
                  }
                  onChange={onChangeSelect("name")}
                  value={form.name}
                />
                {validate && !(form.name || "").trim() && (
                  <Text fontSize="12px" color="#FF424F">
                    {t("fullNameRequired")}
                  </Text>
                )}
              </Box>
              <Box>
                <Input
                  placeholder={`${t("phoneNum")} *`}
                  border={
                    validate && !form.phone_number
                      ? "1px solid #EA403F !important"
                      : "1px solid #BCCCFF"
                  }
                  onChange={onChangeSelect("phone_number")}
                  value={form.phone_number}
                />
                {validate && !form.phone_number ? (
                  <Text fontSize="12px" color="#FF424F">
                    {t("phoneIsRequired")}
                  </Text>
                ) : validate && !form.phone_number.match(/^\d+$/g) ? (
                  <Text fontSize="12px" color="#FF424F">
                    {t("onlyNumber")}
                  </Text>
                ) : validate &&
                  form.phone_number.match(/^\d+$/g) &&
                  form.phone_number.length !== 10 ? (
                  <Text fontSize="12px" color="#FF424F">
                    {t("phoneIsInvalid")}
                  </Text>
                ) : null}
              </Box>
            </HStack>
          ) : null}
          {!Lodash.isEmpty(userInfo) && <Box height="24px" />}
          <Select
            data={data.dataCity}
            border={
              validate && !form.city?.id ? "1px solid #EA403F !important" : "1px solid #BCCCFF"
            }
            placeholder={`${t("city")}*`}
            onChange={onChangeSelect("city")}
            value={form.city?.id ? JSON.stringify(form.city) : ""}
          />
          {validate && !form.city?.id && (
            <Text fontSize="12px" color="#FF424F">
              {t("cityIsRequired")}
            </Text>
          )}
          <Box height="24px" />
          <Select
            data={data.dataDistrict}
            border={
              validate && !form.district?.id ? "1px solid #EA403F !important" : "1px solid #BCCCFF"
            }
            placeholder={`${t("district")}*`}
            onChange={onChangeSelect("district")}
            value={form.district?.id ? JSON.stringify(form.district) : ""}
          />
          {validate && !form.district?.id && (
            <Text fontSize="12px" color="#FF424F">
              {t("districtIsRequired")}
            </Text>
          )}
          <Box height="24px" />
          <Select
            data={data.dataWard}
            border={
              validate && !form.ward?.id ? "1px solid #EA403F !important" : "1px solid #BCCCFF"
            }
            placeholder={`${t("ward")}*`}
            onChange={onChangeSelect("ward")}
            value={form.ward?.id ? JSON.stringify(form.ward) : ""}
          />
          {validate && !form.ward?.id && (
            <Text fontSize="12px" color="#FF424F">
              {t("wardIsRequired")}
            </Text>
          )}
          <Box height="24px" />
          <Input
            placeholder={`${t("address")}*`}
            border={
              validate && !(form.address || "").trim()
                ? "1px solid #EA403F !important"
                : "1px solid #BCCCFF"
            }
            onChange={onChangeSelect("address")}
            value={form.address}
          />
          {validate && !(form.address || "").trim() && (
            <Text fontSize="12px" color="#FF424F">
              {t("addressIsRequired")}
            </Text>
          )}
          <Box height="24px" />
          {!Lodash.isEmpty(userInfo) ? (
            <Input
              placeholder={t("addressName")}
              onChange={onChangeSelect("alias")}
              value={form.alias}
            />
          ) : null}
          <Box height="24px" />
        </ModalBody>
        <ModalFooter padding="0 25px 100px">
          <Button
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
          <Box mr={3} />
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
              handleAddress();
            }}
          >
            {t("complete")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
ModalAddress.defaultProps = {
  dataCountry: [],
  addressUpdate: {},
};
export default ModalAddress;
