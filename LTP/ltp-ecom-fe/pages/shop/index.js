import { Box, BreadcrumbItem, BreadcrumbLink, Flex, Text } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import { LANG_VI } from "@ltp/constants/languages";
import useTranslation from "@ltp/hooks/useTranslation";
import { getCountry } from "@ltp/services/address";
import { getShopList } from "@ltp/services/shops";
import { urlCountry, urlShops } from "@ltp/services/urlAPI";
import { combineUrlParams } from "@ltp/utils/index";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { MetadataTags } from "SEOs/meta-tag/index";
import Map from "./components/Map";
import SelectCity from "./components/SelectCity";
import SelectDistrict from "./components/SelectDistrict";
import ShopCard from "./components/ShopCard";

export default function Shops() {
  const { t, locale } = useTranslation();
  const [cityId, setCityId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [center, setCenter] = useState();

  const { data: country } = useSWR(urlCountry, getCountry);
  let countryId;
  if (Array.isArray(country?.data?.results)) {
    const vi = country.data.results.find((item) => item?.code === LANG_VI);
    if (vi?.id) {
      countryId = vi.id;
    }
  }

  let shopList = [];
  const params = {
    city_id: cityId || undefined,
    district_id: districtId || undefined,
  };
  const getShops = () => getShopList(params);
  const { data } = useSWR(combineUrlParams(urlShops, params), getShops);
  if (Array.isArray(data?.data?.results)) {
    shopList = data.data.results;
  }

  const onChangeCity = (e) => {
    setCityId(e.target.value);
    setDistrictId(0);
  };

  const showMap = (shop) => {
    setCenter({ lat: parseFloat(shop?.lat), lng: parseFloat(shop?.long) });
  };

  return (
    <>
      <MetadataTags title={t("storeSystem")} notIndex={locale === "en"} />
      <main>
        <Container>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link passHref shallow href="/">
                <BreadcrumbLink>{t("homePage")}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text>{t("storeSystem")}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            color="#2154FF"
            justifyContent="space-between"
            alignItems={{ base: "initial", md: "center" }}
          >
            <Box>
              <Text fontSize={28} fontWeight={700}>
                {t("storeSystem")}
              </Text>
              <Text fontSize={16}>{t("youCanFindStoreLocation")}</Text>
            </Box>
            <SelectCity countryId={countryId} value={cityId} onChange={onChangeCity} />
            <SelectDistrict
              cityId={cityId}
              value={districtId}
              onChange={(e) => setDistrictId(e.target.value)}
            />
          </Flex>
        </Container>
        <Box bgColor="#EBF8FF" mt={8} mb={8}>
          <Container>
            <Flex
              py={{ base: "12px", md: "32px" }}
              direction={{ base: "column", md: "row" }}
              height={{ base: "auto", md: "670px" }}
            >
              <Box
                width={{ base: "auto", md: "368px" }}
                mr={{ base: "0", md: "32px" }}
                mb={{ base: "12px", md: "0px" }}
                overflow="auto"
                display={{ base: "flex", md: "block" }}
                __css={{
                  "> :not(:last-child)": {
                    marginBottom: { base: "0px", md: "16px" },
                    marginRight: { base: "16px", md: "0px" },
                  },
                }}
              >
                {shopList.map((shop) => (
                  <Box key={shop?.id} flexShrink={0} width={{ base: "300px", md: "100%" }}>
                    <ShopCard shop={shop} showMap={showMap} />
                  </Box>
                ))}
              </Box>
              <Box flexGrow="1" height="100%" minHeight="320px">
                <Map shopList={shopList} center={center} />
              </Box>
            </Flex>
          </Container>
        </Box>
      </main>
    </>
  );
}
