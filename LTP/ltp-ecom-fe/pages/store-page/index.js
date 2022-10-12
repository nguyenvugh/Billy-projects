import { AspectRatio, Box, BreadcrumbItem, BreadcrumbLink, Image, Text } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import Container from "@ltp/components/Container";
import useTranslation from "@ltp/hooks/useTranslation";
import { getOfficeList } from "@ltp/services/office";
import { urlOffice } from "@ltp/services/urlAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MetadataTags } from "SEOs/meta-tag";
import useSWR from "swr";
import ContactInfo from "./components/ContactInfo";
import Map from "./components/Map";
import RepresentativeOffice from "./components/RepresentativeOffice";

function StorePage() {
  const { t, locale } = useTranslation();
  const [center, setCenter] = useState();

  let officeList = [];
  const { data, mutate } = useSWR(urlOffice, getOfficeList);
  if (Array.isArray(data?.data?.results)) {
    officeList = data.data.results;
  }

  useEffect(() => {
    mutate(urlOffice);
  }, [locale]);

  return (
    <>
      <MetadataTags title={t("representativeOffice")} notIndex={locale === "en"} />
      <Container>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link passHref shallow href="/">
              <BreadcrumbLink>{t("homePage")}</BreadcrumbLink>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <Text>{t("representativeOffice")}</Text>
          </BreadcrumbItem>
        </Breadcrumb>
      </Container>
      <Image
        src="/imgs/mock/store-page/image-slide.svg"
        alt="Image Slide"
        minWidth="100%"
        maxHeight={{ base: "325px", md: "500px", xl: "580px" }}
        minHeight={{ base: "325px", md: "500px", xl: "580px" }}
        objectFit="cover"
      />
      <Container>
        <Box
          display="flex"
          flexWrap="wrap"
          py={{ base: 4, md: 10 }}
          __css={{
            margin: { base: -4, md: -10 },
            "&>div": {
              padding: { base: 4, md: 10 },
            },
          }}
        >
          <Box
            flexGrow={0}
            flexBasis={{ base: "100%", md: "50%" }}
            maxWidth={{ base: "100%", md: "50%" }}
          >
            <RepresentativeOffice officeList={officeList} setCenter={setCenter} />
          </Box>
          <Box
            flexGrow={0}
            flexBasis={{ base: "100%", md: "50%" }}
            maxWidth={{ base: "100%", md: "50%" }}
          >
            <Box>
              <Text
                color="#2154FF"
                fontWeight="bold"
                fontSize={{ base: "24px", md: "26px", xl: "28px" }}
              >
                {t("contactInfo")}
              </Text>
              <Text
                color="#2154FF"
                padding="16px 0 24px"
                fontSize={{ base: "15px", md: "16px", xl: "17px" }}
              >
                {t("writeBelow")}
              </Text>
              <AspectRatio marginBottom="32px" height="325px">
                <Map officeList={officeList} center={center} />
              </AspectRatio>
              <ContactInfo />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export async function getServerSideProps({ res, locale, ...rest }) {
  if (res && rest.req.url === "/store-page/" && locale === "vi") {
    res.writeHead(301, { location: `/van-phong-dai-dien/` });
    res.end();
  }
  return {
    props: {},
  };
}
export default StorePage;
