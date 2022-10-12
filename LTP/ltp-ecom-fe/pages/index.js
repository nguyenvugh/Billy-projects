/* eslint-disable no-param-reassign */
import { keyCache, SORT_ASC } from "@ltp/constants/data";
import useTranslation from "@ltp/hooks/useTranslation";
import { readCache } from "@ltp/services/datacache";
import { getPromotionHome } from "@ltp/services/home";
import { getNewsHome } from "@ltp/services/news";
import { getProductsAxios } from "@ltp/services/product";
import { getProductsCategoryAxios } from "@ltp/services/product-category";
import { WEB_DOMAIN } from "@ltp/utils/constant";
import { concatUrls } from "@ltp/utils/validate-url";
import Head from "next/head";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import styles from "../styles/Home.module.scss";
import Charity from "./components/Charity";
import FlashSale from "./components/FlashSale";
import HomePageCarousel from "./components/HomePageCarousel";
import News from "./components/News";
import PopularProducts from "./components/PopularProducts";
import TopProductCategories from "./components/TopProductCategories";
import WhyChooseUs from "./components/WhyChooseUs";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 215000,
    thumbnail: "/imgs/mock/flash-sale-product.svg",
    sale: 20,
    quantity: 20,
    sold: 9,
    type: 1,
  },
  {
    id: 2,
    name: "Product 1",
    price: 310000,
    thumbnail: "/imgs/mock/flash-sale-product.svg",
    sale: 15,
    quantity: 20,
    sold: 2,
    type: 2,
  },
  {
    id: 3,
    name: "Product 3",
    price: 50000,
    thumbnail: "/imgs/mock/flash-sale-product.svg",
    sale: 20,
    quantity: 20,
    sold: 18,
    type: 3,
  },
  {
    id: 4,
    name: "Product 4",
    price: 50000,
    thumbnail: "/imgs/mock/flash-sale-product.svg",
    sale: 20,
    quantity: 20,
    sold: 20,
    type: 4,
  },
];

export async function getServerSideProps({ locale }) {
  try {
    const category = getProductsCategoryAxios({
      page: 1,
      limit: 4,
      is_feature: 1,
      lang: locale,
    });
    const product = getProductsAxios({
      page: 1,
      limit: 4,
      is_feature: 1,
      sort_value: SORT_ASC,
      is_homepage_feature_products: 1,
    });
    const sliders = getPromotionHome();
    const news = getNewsHome({ limit: 3, lang: locale });
    const res = await Promise.all([category, product, sliders, news]);
    return {
      props: {
        categoriesList: res[0].data?.results,
        productsList: res[1].data?.results,
        sliders: res[2].data?.results,
        news: res[3].data?.results,
      },
    };
  } catch (e) {
    return { props: {} };
  }
}

export default function Home({ categoriesList, productsList, sliders, news }) {
  const { locale } = useTranslation();
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    sliders = getPromotionHome().data?.results;
    news = getNewsHome({ limit: 3 }).data?.results;
  }, [locale]);

  useEffect(() => {
    const userInfo = readCache(keyCache.UserInfo);
    const token = userInfo?.access_token;
    if (!token) {
      removeCookie("access_token");
    }
  }, []);
  const canonicalForVi =
    locale === "vi" ? concatUrls(WEB_DOMAIN, "/") : concatUrls(WEB_DOMAIN, `/${locale}/`);
  return (
    <div className={styles.container}>
      <Head>
        <title>Nhựa Long Thành | Longthanhplastic.com.vn</title>
        <meta
          name="google-site-verification"
          content="Lm1bX6Ohggtf_MaUmmWKb143haaWeuJ6DO-m_mt7iqw"
        />
        <meta
          name="description"
          content="Nhựa Long Thành: Chuyên Cung Cấp Sản Phẩm: Nhựa Kỹ Thuật Cao, Pallet Nhựa, Sóng Nhựa, Thùng Đá Giữ Nhiệt, Nhựa Gia Dụng,... Chất Lượng, Giá Tốt!"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalForVi} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <HomePageCarousel items={sliders} />
        <FlashSale products={products} />
        <Charity products={products} />
        <PopularProducts products={productsList} />
        <TopProductCategories categories={categoriesList} />
        <WhyChooseUs />
        <News items={news} />
      </main>
    </div>
  );
}
