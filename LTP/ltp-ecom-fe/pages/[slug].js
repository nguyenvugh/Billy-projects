import { Box, BreadcrumbItem, BreadcrumbLink, Text } from "@chakra-ui/react";
import Breadcrumb from "@ltp/components/Breadcrumb";
import ClearContent from "@ltp/components/ClearContent";
import Container from "@ltp/components/Container";
import { LANG_VI } from "@ltp/constants/languages";
import useTranslation from "@ltp/hooks/useTranslation";
import { getStaticPage, getStaticPageWithParam } from "@ltp/services/page";
import { urlStaticPage } from "@ltp/services/urlAPI";
import { useRouter } from "next/router";
import { MetadataTags } from "SEOs/meta-tag";
import useSWR from "swr";
import Custom404 from "./404";

export async function getServerSideProps({ res, params, locale }) {
  const slug = params?.slug || "";
  const oldLinks = Object.keys(REDIRECT_301_LINK).map((key) => key);
  if (res && oldLinks.includes(slug) && locale === LANG_VI) {
    res.writeHead(301, { location: REDIRECT_301_LINK[slug] });
    res.end();
  }
  try {
    const reponse = await getStaticPage(slug, { lang: locale });
    const staticPage = reponse.data;
    if (staticPage.code === 404) {
      res.statusCode = 404;
    }
    return {
      props: {
        staticPage,
        lang: locale,
        slug,
      },
    };
  } catch (e) {
    // console.log('e', e)
    return { props: { lang: locale } };
  }
}

const Info = ({ staticPage }) => {
  const router = useRouter();
  const { t, locale } = useTranslation();
  const slug = `${router.query?.slug}?lang=${locale}`;
  let page = staticPage;

  if (staticPage?.slug !== slug) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data } = useSWR(`${urlStaticPage}/${slug}`, () => getStaticPageWithParam(slug));
    page = data?.data;
  }

  const renderPage = (page) => {
    if (Array.isArray(page?.data?.translates)) {
      const content = page.data.translates.find(
        (item) => item?.language_code === locale && item?.language_field === "content",
      )?.language_value;
      return (
        <Box mb={{ base: 8, md: 16 }}>
          <Breadcrumb>
            <BreadcrumbItem>
              <a passHref shallow href="/">
                <BreadcrumbLink>{t("homePage")}</BreadcrumbLink>
              </a>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <Text>{currentPage?.[page?.data?.slug]}</Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <ClearContent content={content} />
        </Box>
      );
    }
  };

  const staticInfo = () => {
    switch (router.asPath) {
      case "/about-us/":
        return {
          title: "About Long Thanh | Longthanhplastic.com.vn",
          content: "About Long Thanh company",
        };
      case "/q-a/":
        return {
          title: "FAQs | Longthanhplastic.com.vn",
          content: "Frequently asked questions about plastic dragon bars",
        };
      case "/privacy/":
        return {
          title: "Policies | Longthanhplastic.com.vn",
          content: "Information about policies and terms of service of Long Thanh Plastic",
        };
      case "/shop/":
        return {
          title: "Shop System | Longthanhplastic.com.vn",
          content: "List of stores of Long Thanh Plastic",
        };
      case "/store-page/":
        return {
          title: "Representative Office | Longthanhplastic.com.vn",
          content: "List of representative offices of Long Thanh Plastic nationwide",
        };
      case "/ve-long-thanh/":
        return {
          title: "Gi???i thi???u v??? Long Th??nh | Longthanhplastic.com.vn",
          content: "Gi???i thi???u v??? c??ng ty Long Th??nh",
        };
      case "/cau-hoi-thuong-gap/":
        return {
          title: "C??u h???i th?????ng g???p | Longthanhplastic.com.vn",
          content: "Nh???ng c??u h???i b???n th?????ng g???p v??? Long Th??nh plastic",
        };
      case "/thong-tin-chinh-sach/":
        return {
          title: "Th??ng tin ch??nh s??ch | Longthanhplastic.com.vn",
          content: "Nh???ng th??ng tin ch??nh s??ch, ??i???u kho???n d???ch v??? c???a Long Th??nh plastic",
        };
      case "/cua-hang/":
        return {
          title: "H??? th???ng c???a h??ng | Longthanhplastic.com.vn",
          content: "Danh s??ch h??? th???ng c???a h??ng c???a Long Th??nh Plastic",
        };
      case "/van-phong-dai-dien/":
        return {
          title: "V??n ph??ng ?????i di???n | Longthanhplastic.com.vn",
          content: "Danh s??ch v??n ph??ng ?????i di???n Long Th??nh Plastic tr??n to??n qu???c",
        };
      default:
        return {
          title: "Longthanhplastic.com.vn",
          content: "Long Th??nh Plastic",
        };
    }
  };

  return (
    <>
      <MetadataTags
        fromStaticPage={page?.code === 404}
        notIndex={locale === "en"}
        title={staticInfo()?.title}
        desContent={staticInfo()?.content}
      />

      <main>
        <Container>
          {page?.code === 200 ? (
            renderPage(page)
          ) : page?.code === 404 ? (
            <Custom404 />
          ) : (
            // <ErrorPage statusCode={page?.code} />
            <Box h="100vh" />
          )}
        </Container>
      </main>
    </>
  );
};

export default Info;

export const tuyenDung = "tuyen-dung";

const currentPage = {
  "cau-hoi-thuong-gap": "C??u h???i th?????ng g???p",
  "thong-tin-chinh-sach": "Th??ng tin ch??nh s??ch",
  "ve-long-thanh": "V??? long th??nh",
  [tuyenDung]: "Tuy???n d???ng",
  "dieu-khoan-dich-vu": "??i???u kho???n d???ch v???",
  "chinh-sach-bao-mat": "Ch??nh s??ch b???o m???t",
};

const REDIRECT_301_LINK = {
  products: "/danh-muc/san-pham/",
  shops: "/cua-hang/",
};
