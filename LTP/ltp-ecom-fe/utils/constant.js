export const PAGE_SIZE_UNLIMIT = 5000;
export const SOCIAL_TYPES = {
  GOOGLE: "google",
  FACEBOOK: "facebook",
};
export const SOCIAL_ACTION_TYPES = {
  DISCONNECT: "disconnect",
  CONNECT: "connect",
};

export const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
export const CENTER_MAP_LAT = process.env.NEXT_PUBLIC_CENTER_MAP_LAT || "21.027763";
export const CENTER_MAP_LNG = process.env.NEXT_PUBLIC_CENTER_MAP_LNG || "105.83416";
export const WEB_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN_WEB || "https://longthanhplastic.com.vn";
export const LOCALIZE_ROUTES_PAGE = {
  vi: {
    "/": "/",
    "/store-page": "/van-phong-dai-dien",
    "/shop": "/cua-hang",
    "/blog": "/tin-moi",
    "/blog/[slug]": "/tin-moi/[slug]",
    "/category/products": "/danh-muc/san-pham",
    "/category": "/danh-muc",
    "/news/[slug]": "/tin-tuc/[slug]",
    "/article/[slug]": "/bai-viet/[slug]",
    "/[slug]": "/[slug]",
    "/product/[slug]": "/san-pham/[slug]",
    "/product": "/san-pham",
    "/category/[cateSlug]": "/danh-muc/[cateSlug]/",
    "/about-us": "/ve-long-thanh",
    "/questions": "/cau-hoi-thuong-gap",
    "/privacy": "/thong-tin-chinh-sach",
  },
  en: {
    "/": "/en",
    "/store-page": "/en/store-page",
    "/shop": "/en/shop",
    "/blog": "/en/blog",
    "/blog/[slug]": "/en/blog/[slug]",
    "/category/products": "/category/products",
    "/category": "/en/category",
    "/news/[slug]": "/en/news/[slug]",
    "/article/[slug]": "/en/article/[slug]",
    "/[slug]": "/en/[slug]",
    "/product/[slug]": "/en/product/[slug]",
    "/product": "/en/product",
    "/category/[cateSlug]": "/en/category/[cateSlug]/",
    "/about-us": "/en/about-us",
    "/questions": "/en/q-a",
    "/privacy": "/en/privacy",
  },
};
export const ROUTE_PRIVACY = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]["/privacy"];
export const ROUTE_QUESTION = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]["/questions"];
export const ROUTE_ABOUT_US = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]["/about-us"];

export const ROUTE_PRODUCT = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]["/category"];
export const ROUTE_CATEGORY = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]["/category"];
export const ROUTE_TOP_CATEGORY = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]["/category"];

export const ROUTE_CATEGORY_NEW = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]?.["/blog"];

export const ROUTE_SHOP = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]?.["/shop"];

export const ROUTE_STORE_PAGE = (locale = "vi") => LOCALIZE_ROUTES_PAGE[locale]?.["/store-page"];

export const ROUTE_PRODUCT_SLUG = (locale = "vi", slug) =>
  LOCALIZE_ROUTES_PAGE[locale]["/product/[slug]"].replace("[slug]", slug);

export const ROUTE_NEWS = (locale = "vi", slug) => {
  const find_route = LOCALIZE_ROUTES_PAGE[locale]?.["/news/[slug]"] || "";
  const final_route = find_route.replace("[slug]", slug);
  return final_route;
};

export const ROUTE_BlOG = (locale = "vi", slug) =>
  (LOCALIZE_ROUTES_PAGE[locale]?.["/blog/[slug]"] || "").replace("[slug]", slug);

export const ROUTE_ARITLCE = (locale = "vi", slug) =>
  (LOCALIZE_ROUTES_PAGE[locale]?.["/article/[slug]"] || "").replace("[slug]", slug);

export const ROUTE_PRODUCT_DETAIL_SLUG = (locale = "vi", slug) =>
  LOCALIZE_ROUTES_PAGE[locale]["/product/[slug]"].replace("[slug]", slug);

export const ROUTE_CATEGORY_SLUG = (locale = "vi", slug) =>
  LOCALIZE_ROUTES_PAGE[locale]["/category/[cateSlug]"].replace("[cateSlug]", slug);

export const ROUTES_TREE = {
  blog: {
    vi: "tin-tuc",
    pt: "blog",
  },
};

export const ROUTES_BLACK_LIST = [
  "/news/[slug]",
  "/article/[slug]",
  "/product/[slug]",
  "/blog/[slug]",

  "/category/[cateSlug]",
];

export const HTTP_STATUS_CODE = [
  100, 101, 103, 200, 201, 202, 203, 204, 205, 206, 300, 301, 302, 303, 304, 307, 308, 400, 401,
  402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 422, 425,
  426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511,
];

export const ROUTES_404_INDEX = [
  "/article/6/9/",
  "/article/7/197/",
  "/article/4/124/",
  "/article/3/90/",
  "/article/1/133/",
  "/article/1/154/",
  "/article/1/149/",
  "/article/4/131/",
  "/article/3/139/",
  "/article/1/143/",
  "/article/4/128/",
  "/article/4/152/",
  "/article/4/126/",
  "/article/4/151/",
  "/article/6/1/",
  "/article/1/97/",
  "/article/4/127/",
  "/article/1/141/",
  "/article/4/153/",
  "/7/19/",
  "/category-news/",
  "/news/?categoryId=4",
  "/news/?categoryId=6",
  "/news/?categoryId=3",
  "/article/1/72/",
  "/news/?categoryId=7",
  "/22/33/?combo=3",
  "/22/33/?combo=all",
];

export const REGEX_URL_CONTAIN_QUERY = /\?(\w+(=[\w-]*)?(&\w+(=[\w-]*)?)*)?$/;
