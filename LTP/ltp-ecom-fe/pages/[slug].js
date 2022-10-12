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
          title: "Giới thiệu về Long Thành | Longthanhplastic.com.vn",
          content: "Giới thiệu về công ty Long Thành",
        };
      case "/cau-hoi-thuong-gap/":
        return {
          title: "Câu hỏi thường gặp | Longthanhplastic.com.vn",
          content: "Những câu hỏi bạn thường gặp về Long Thành plastic",
        };
      case "/thong-tin-chinh-sach/":
        return {
          title: "Thông tin chính sách | Longthanhplastic.com.vn",
          content: "Những thông tin chính sách, điều khoản dịch vụ của Long Thành plastic",
        };
      case "/cua-hang/":
        return {
          title: "Hệ thống cửa hàng | Longthanhplastic.com.vn",
          content: "Danh sách hệ thống cửa hàng của Long Thành Plastic",
        };
      case "/van-phong-dai-dien/":
        return {
          title: "Văn phòng đại diện | Longthanhplastic.com.vn",
          content: "Danh sách văn phòng đại diện Long Thành Plastic trên toàn quốc",
        };
      default:
        return {
          title: "Longthanhplastic.com.vn",
          content: "Long Thành Plastic",
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
  "cau-hoi-thuong-gap": "Câu hỏi thường gặp",
  "thong-tin-chinh-sach": "Thông tin chính sách",
  "ve-long-thanh": "Về long thành",
  [tuyenDung]: "Tuyển dụng",
  "dieu-khoan-dich-vu": "Điều khoản dịch vụ",
  "chinh-sach-bao-mat": "Chính sách bảo mật",
};

const REDIRECT_301_LINK = {
  products: "/danh-muc/san-pham/",
  shops: "/cua-hang/",
};
