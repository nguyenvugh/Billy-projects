/* eslint-disable no-return-assign */
/* eslint-disable no-sequences */
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Radio,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { STEP_1, STEP_2, STEP_3 } from "@ltp/constants/checkout/step";
import { keyCache } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { getAddressUser } from "@ltp/services/address";
import { getOrderShipping } from "@ltp/services/checkout";
import { readCache } from "@ltp/services/datacache";
import { formatPrice } from "@ltp/utils/price";
import { productsOrderParams } from "@ltp/utils/validate";
import Lodash from "lodash";
import { useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { useCart } from "react-use-cart";
import ModalAddress from "./ModalAddress";
import ModalListAddress from "./ModalListAddress";

const DEFAULT_OPTION = {
  id: 2,
  name: "Nhựa Long Thành",
  types: [
    {
      id: 1,
      name: "Giao tiêu chuẩn",
      description: "Liên hệ sau",
      price: -1,
      disabled: false,
      detail: [],
    },
  ],
};

function StepDelivery({ onChangeStep, handleValueStep, step1, step2, sortedOrderCallback }) {
  const { t } = useTranslation();
  const { items: datacart } = useCart();
  const [listShipping, setListShipping] = useState([]);
  const [isLoadingShipping, setIsLoadingShipping] = useState(null);
  const {
    isOpen: isOpenModalCreate,
    onOpen: openModalAddress,
    onClose: onCloseModalAddress,
  } = useDisclosure();
  const {
    isOpen: isOpenModalList,
    onOpen: openModalList,
    onClose: onCloseModalList,
  } = useDisclosure();
  const [listAddress, setlistAddress] = useState([]);
  const [addressDefault, setaddressDefault] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [shippingMethod, setShippingMethod] = useState({});
  const [isUpdateCreate, setIsUpdateCreate] = useState(false);
  const [isNextStep, setIsNextStep] = useState(false);

  useEffect(() => {
    sortShopName(shippingMethod);
  }, [shippingMethod]);

  useEffect(() => {
    if (!Lodash.isEmpty(addressDefault) && !!shippingMethod?.id) {
      const address = {
        products: datacart.reduce((arr, cur) => [...arr, `${cur.idProduct}-${cur.quantity}`], []),
        address: addressDefault.address,
        countryId: addressDefault.country?.id,
        cityId: addressDefault.city?.id,
        districtId: addressDefault.district?.id,
        wardId: addressDefault.ward?.id,
      };

      setIsNextStep(true);
      const shippingDriverId = String(shippingMethod.id).split("_")[0];
      handleValueStep(STEP_2, { shippingMethod, address, driverId: +shippingDriverId });
    }
  }, [shippingMethod, isOpenModalCreate, addressDefault]);
  useEffect(() => {
    if (!Lodash.isEmpty(addressDefault)) {
      setIsLoadingShipping(true);
      getShipping();
    }
  }, [addressDefault]);
  const getShipping = async () => {
    try {
      const params = {
        products: productsOrderParams(datacart),
        address: addressDefault.address,
        countryId: addressDefault.country?.id,
        cityId: addressDefault.city?.id,
        districtId: addressDefault.district?.id,
        wardId: addressDefault.ward?.id,
      };
      const data = await getOrderShipping(params);
      const res = data?.data?.results || [];
      setShippingMethod({});
      handleValueStep(STEP_2, { ...step2, shippingMethod: {} });
      sortShopName();
      setIsLoadingShipping(false);
      setListShipping(res || []);
    } catch (error) {
      setIsLoadingShipping(false);
      setListShipping([DEFAULT_OPTION]);
    }
  };
  useEffect(() => {
    const user = readCache(keyCache.UserInfo);
    if (Lodash.isEmpty(user)) {
      const dataCache = readCache(keyCache.addressDefault);
      setaddressDefault(dataCache || {});
    } else {
      const getAddress = async () => {
        const data = await getAddressUser();
        const results = Lodash.get(data, "data.results", []);
        setlistAddress(results || []);
        const dataDefault =
          (results || []).filter((item) => item.is_default === 1)[0] || results[0] || {};
        setaddressDefault(dataDefault);
      };
      getAddress();
    }
    const isCheck = Lodash.get(step2, "shippingMethod.id", "");
    setUserInfo(user || {});
    setIsNextStep(!!isCheck);
  }, [isOpenModalCreate]);

  const sortShopName = (shippingMethod) => {
    if (!shippingMethod || Object.keys(shippingMethod).length === 0) {
      setIsNextStep(false);
      return;
    }
    const pricesAccordingShippingMethod = [];
    const warehouseProvidersId = String(shippingMethod.id).split("_")[0];
    const warehouseProviders = listShipping.reduce(
      (acc, curr) => ((acc[curr.id] = curr.types), acc),
      {},
    );
    // STRUCTURE - warehouses: {[shippingMethod.name]: listShipping[item].detail}
    const warehouses = warehouseProviders[warehouseProvidersId].reduce(
      (acc, curr) => ((acc[curr.name] = curr.detail), acc),
      {},
    );
    if (warehouses[shippingMethod?.name].length > 0) {
      warehouses[shippingMethod.name].forEach((warehouse) => {
        const {
          name,
          shipping_price,
          groups: { products = [], product_combos = [] },
        } = warehouse;
        const warehouseName = name;
        const warehouseShippingPrice = shipping_price;
        const productsInWarehouse = datacart.filter((product) =>
          products.includes(product.idProduct),
        );
        const productsComboInWarehouse = datacart.filter((product) =>
          product_combos.includes(product.idProduct),
        );
        pricesAccordingShippingMethod.push({
          warehouseName,
          warehouseShippingPrice,
          productsInWarehouse: [...productsInWarehouse, ...productsComboInWarehouse],
        });
      });
    } else {
      const warehouseName = "";
      const warehouseShippingPrice = "";
      const dataProduct = datacart;
      pricesAccordingShippingMethod.push({
        warehouseName,
        warehouseShippingPrice,
        productsInWarehouse: dataProduct,
      });
    }

    const totalShippingPrice = warehouses[shippingMethod.name].reduce(
      (acc, curr) => curr.shipping_price >= 0 && acc + curr.shipping_price,
      0,
    );
    const isPricing = warehouses[shippingMethod.name].every((price) => price.shipping_price > -1);

    const NO_PRICE = "Liên hệ sau";
    const pricingText = isPricing ? totalShippingPrice : NO_PRICE;
    pricesAccordingShippingMethod.push({ totalShippingPrice, pricingText });

    const productInWare = pricesAccordingShippingMethod.reduce(
      (arr, cur) =>
        cur.productsInWarehouse?.length ? [...arr, ...cur.productsInWarehouse] : [...arr],
      [],
    );
    const dataProductId = (productInWare || []).reduce((arr, cur) => [cur.idProduct, ...arr], []);
    const productNotInWare = datacart.find((el) => !dataProductId.includes(el.idProduct));
    if (productNotInWare) {
      pricesAccordingShippingMethod[0].productsInWarehouse = [
        ...pricesAccordingShippingMethod[0].productsInWarehouse,
        { ...productNotInWare, isHiddenWarehouse: true },
      ];
    }
    sortedOrderCallback && sortedOrderCallback(pricesAccordingShippingMethod);
  };
  const renderAddress = () => {
    if (!Lodash.isEmpty(addressDefault)) {
      const item = addressDefault;
      const address = Lodash.get(item, "address", "");
      const ward = Lodash.get(item, "ward.name", "");
      const district = Lodash.get(item, "district.name", "");
      const city = Lodash.get(item, "city.name", "");
      const country = Lodash.get(item, "country.name", "");
      const name = Lodash.isEmpty(userInfo) ? step1?.name : item.name;
      const phone_number = Lodash.isEmpty(userInfo) ? step1?.phone : item.phone_number;
      const alias = Lodash.get(item, "alias", "");

      return (
        <Box>
          <Flex
            alignItems="flex-start"
            borderRight={{ base: "none", md: "1px solid #BCCCFF" }}
            borderBottom={{ base: "1px solid #BCCCFF", md: "none" }}
            padding={{ base: "20px", md: "27px", xl: "35px" }}
          >
            <Image src="/imgs/mock/checkout/MapPinLine.svg" />
            <Box paddingLeft="13px">
              <Flex justifyContent="space-between">
                <Text color="#444444" fontWeight="600" fontSize="16px">
                  {name}
                </Text>
                {Lodash.isEmpty(userInfo) && Lodash.isEmpty(addressDefault) ? null : (
                  <Box
                    right="0"
                    onClick={() => {
                      setIsUpdateCreate(true);
                      openModalAddress();
                    }}
                  >
                    <MdModeEdit cursor="pointer" />
                  </Box>
                )}
              </Flex>
              <Text color="#444444" fontSize="16px">
                {[address, ward, district, city, country, alias]
                  .filter((item) => !!item)
                  .join(", ")}
              </Text>
              <Text color="#444444" fontWeight="500" fontSize="16px">
                {phone_number}
              </Text>
              <Flex
                justifyContent="space-between"
                marginTop="8px"
                flexWrap="wrap"
                color="#2154FF"
                fontSize="14px"
                fontWeight="500"
              >
                {Lodash.isEmpty(userInfo) ? (
                  <Text onClick={openModalAddress} cursor="pointer">
                    {t("edit")}
                  </Text>
                ) : (
                  <>
                    {!Lodash.isEmpty(addressDefault) ? (
                      <Text onClick={openModalList} cursor="pointer">
                        {t("change")}
                      </Text>
                    ) : (
                      <Text />
                    )}
                    <Text
                      onClick={() => {
                        setIsUpdateCreate(false);
                        openModalAddress();
                      }}
                      cursor="pointer"
                    >
                      {t("newAddress")}
                    </Text>
                  </>
                )}
              </Flex>
            </Box>
          </Flex>
        </Box>
      );
    }
    return (
      <Flex
        padding={{ base: "20px", md: "27px", xl: "35px" }}
        onClick={openModalAddress}
        cursor="pointer"
        borderRight={{ base: "none", md: "1px solid #BCCCFF" }}
        borderBottom={{ base: "1px solid #BCCCFF", md: "none" }}
      >
        <Image src="/imgs/mock/checkout/MapPinLine.svg" height="21px" />
        <Text paddingLeft="13px" color="#2154FF" fontWeight="500" fontSize="16px">
          {t("newShippingAddress")}
        </Text>
      </Flex>
    );
  };
  const handleCloseModalAddress = () => {
    if (Lodash.isEmpty(userInfo)) {
      const dataCache = readCache(keyCache.addressDefault);
      setaddressDefault(dataCache);
    } else {
      // setaddressDefault(dataCache)
    }
    onCloseModalAddress();
  };
  const renderShipping = () => {
    switch (isLoadingShipping) {
      case true:
        return renderLoadingShipping();
      case null:
        return null;
      default:
        return renderListShipping();
    }
  };
  const renderListShipping = () => {
    if (listShipping.length == 0) return null;

    return listShipping.map((item) => (
      <div key={item.id}>
        <Text fontWeight="700" fontSize="16px">
          {item.name}
        </Text>
        {item.types.map((type) => {
          const id = `${item.id}_${type.id}`;
          const isCheck = Lodash.get(step2, "shippingMethod.id", "") || shippingMethod?.id;
          return (
            <Radio
              value={id}
              key={id}
              isDisabled={type.disabled}
              isChecked={isCheck === id}
              onChange={() => {
                const _type = { ...type, id };
                setShippingMethod(_type);
              }}
              borderColor="#2154ff70"
            >
              <HStack spacing="16px" flexWrap="wrap">
                <Text color="#071133" fontSize="16px" fontWeight="500">
                  {type.name}
                </Text>
                {type.price != -1 ? (
                  <Text>{formatPrice(type.price)}</Text>
                ) : (
                  <Text color="#14CC24" fontSize="16px">
                    {type.description}
                  </Text>
                )}
              </HStack>
            </Radio>
          );
        })}
      </div>
    ));
  };

  const renderLoadingShipping = () => (
    <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="lg" />
    </Flex>
  );
  return (
    <Box>
      <Text color="#2154FF" fontSize="24px" fontWeight="bold">
        {t("shippingInfo")}
      </Text>
      <Box h="1px" bg="#BCCCFF" margin="16px 0 32px" />
      <SimpleGrid columns={{ base: 1, md: 2 }} border="1px solid #BCCCFF" borderRadius="5px">
        {renderAddress()}
        <Box padding={{ base: "20px", md: "37px", xl: "35px" }}>
          <Stack w="100%" h="100%">
            {renderShipping()}
          </Stack>
        </Box>
      </SimpleGrid>
      <Flex justifyContent="space-between" borderRadius="5px" marginTop="32px">
        {Lodash.isEmpty(userInfo) ? (
          <Button
            border="1px solid #BCCCFF"
            padding="16px 0"
            minW={{ base: "150px", md: "176px" }}
            color="#2154FF"
            _hover={{ bg: "#ffff" }}
            _active={{ bg: "#ffff" }}
            textAlign="center"
            bg="#ffff"
            onClick={() => {
              onChangeStep(STEP_1, true);
            }}
          >
            {t("prevPage")}
          </Button>
        ) : (
          <Box />
        )}

        <Button
          padding="16px 0"
          minW={{ base: "150px", md: "176px" }}
          bg="#2154FF"
          _hover={{ bg: "#2154FF" }}
          _active={{ bg: "#2154FF" }}
          color="#ffff"
          textAlign="center"
          onClick={() => {
            onChangeStep(STEP_3);
          }}
          disabled={!isNextStep}
        >
          {t("next")}
        </Button>
      </Flex>
      <ModalAddress
        isOpen={isOpenModalCreate}
        onClose={handleCloseModalAddress}
        addressDefault={addressDefault}
        isUpdateCreate={isUpdateCreate}
      />
      <ModalListAddress
        isOpen={isOpenModalList}
        onClose={onCloseModalList}
        listAddress={listAddress}
        addressDefault={addressDefault}
        setaddressDefault={setaddressDefault}
      />
    </Box>
  );
}

StepDelivery.defaultProps = {
  step1: {},
  step2: {},
};
export default StepDelivery;
