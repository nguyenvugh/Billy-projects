const { WEB_DOMAIN } = require("./utils/constant");

module.exports = {
  siteUrl: WEB_DOMAIN,
  generateRobotsTxt: true, // (optional)
  sitemapSize: 50000,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
