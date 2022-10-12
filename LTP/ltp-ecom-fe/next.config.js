const path = require("path");

module.exports = {
  trailingSlash: true,
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/styles")],
  },
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localeDetection: false,
  },
  async exportPathMap() {
    return {
      "/": { page: "/" },
    };
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/",
      },
      {
        source: "/en",
        destination: "/",
      },
      {
        source: "/van-phong-dai-dien/",
        destination: "/store-page",
      },
      {
        source: "/en/store-page/",
        destination: "/store-page",
      },
      {
        source: "/cua-hang/",
        destination: "/shop",
      },
      {
        source: "/en/shop/",
        destination: "/shop",
      },
      {
        source: "/tin-moi/",
        destination: "/blog",
      },
      {
        source: "/tin-moi/:slug/",
        destination: "/blog/:slug/",
      },
      {
        source: "/en/blog/",
        destination: "/blog",
      },
      {
        source: "/en/blog/:slug/",
        destination: "/blog/:slug/",
      },
      {
        source: "/danh-muc/san-pham/",
        destination: "/category/products",
      },
      {
        source: "/en/category/products/",
        destination: "/category/products",
      },
      {
        source: "/en/product/:slug/",
        destination: "/product/:slug",
      },
      {
        source: "/san-pham/:slug/",
        destination: "/product/:slug",
      },
      {
        source: "/tin-tuc/:slug/",
        destination: "/news/:slug",
      },
      {
        source: "/en/news/:slug/",
        destination: "/news/:slug",
      },
      {
        source: "/bai-viet/:slug/",
        destination: "/article/:slug",
      },
      {
        source: "/en/article/:slug/",
        destination: "/article/:slug",
      },
      {
        source: "/danh-muc/",
        destination: "/category",
      },
      {
        source: "/en/category/",
        destination: "/category",
      },
      {
        source: "/danh-muc/:cateSlug/",
        destination: "/category/:cateSlug",
      },
      {
        source: "/en/category/:cateSlug/",
        destination: "/category/:cateSlug",
      },

      // This always must be on bottom
      {
        source: "/:slug/",
        destination: "/:slug",
      },
      {
        source: "/en/:slug/",
        destination: "/:slug",
      },
      // -------------------------------------
    ];
  },
};
