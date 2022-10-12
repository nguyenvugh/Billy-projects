import { Box, HStack, Image, Text } from "@chakra-ui/react";
import useTranslation from "@ltp/hooks/useTranslation";

function RepresentativeOffice({ officeList, setCenter }) {
  const { t } = useTranslation();
  const onClick = (office) => {
    setCenter({ lat: parseFloat(office?.lat), lng: parseFloat(office?.long) });
  };

  return (
    <Box border="1px solid #BCCCFF" borderRadius="4px 4px 0 0">
      <Box
        background="#2154FF"
        borderRadius="4px 4px 0 0"
        padding={{ base: "10px 15px", md: "12px 15px", xl: "24px 32px" }}
        color="#FFFFFF"
      >
        <Text fontSize={{ base: "18px", md: "20px", xl: "26px" }} fontWeight="bold">
          {t("representativeOffice")}
        </Text>
        <Text fontSize={{ base: "15px", md: "16px", xl: "18px" }} fontWeight="600">
          {t("inCityOverCountry")}
        </Text>
      </Box>
      <Box padding={{ base: "15px", md: "25px", xl: "32px" }} maxHeight="696px" overflow="auto">
        {officeList.map((office, index) => (
          <ItemOffice key={index} office={office} onClick={onClick} />
        ))}
      </Box>
    </Box>
  );
}

export default RepresentativeOffice;

function ItemOffice({ office, onClick }) {
  const clickName = () => {
    onClick instanceof Function && onClick(office);
  };

  return (
    <HStack spacing={{ base: "15px", md: "16px", xl: "17px" }} alignItems="flex-start">
      <Image src="/imgs/mock/store-page/ic_location.svg" paddingTop="5px" alt="Icon Location" />
      <Box color="#071133" fontSize={{ base: "14px", md: "15px", xl: "16px" }} fontWeight="500">
        <Text color="#2154FF" fontSize={{ base: "16px", md: "17px", xl: "18px" }} fontWeight="bold">
          <Box as="span" cursor="pointer" onClick={clickName}>
            {office?.name}
          </Box>
        </Text>
        <Text padding={{ base: "12px 0", md: "15px 0", xl: "16px 0" }}>
          {office?.address},{office?.ward?.name},{office?.district?.name},{office?.city?.name}
        </Text>
        <Text>
          Hotline:
          {office?.phone_number}
        </Text>
        <Text padding={{ base: "12px 0 20px", md: "15px 0 25px", xl: "16px 0 32px" }}>
          Fax: {office?.fax}
        </Text>
      </Box>
    </HStack>
  );
}
