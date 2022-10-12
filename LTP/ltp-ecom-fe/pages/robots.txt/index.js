import { WEB_DOMAIN } from "@ltp/utils/constant";
import { concatUrls } from "@ltp/utils/validate-url";
import Custom404 from "pages/404";

export async function getServerSideProps({ locale, res }) {
  if (res) {
    const langPrefix = locale === "vi" ? "" : locale;
    res.write(`User-agent: *
Allow: /

Sitemap: ${concatUrls(WEB_DOMAIN, `${langPrefix}/sitemap.xml`)}
Sitemap: ${concatUrls(WEB_DOMAIN, `${langPrefix}/sitemap/image/sitemap-image.xml`)}
                `);
    res.end();
  }

  return {
    props: {},
  };
}

export default function RobotText() {
  return <Custom404 />;
}
