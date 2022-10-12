const path = require("path");
const i18n = require("./i18n.json");

/** @type {import('next').NextConfig} */
module.exports = {
  trailingSlash: true,
  poweredByHeader: false,
  sassOptions: {
    includePaths: [path.join(__dirname, "assets/styles")],
  },
  i18n,
  images: {
    domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN],
  },
};
