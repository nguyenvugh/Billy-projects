import moment from "moment";
import { getValidSlug } from ".";
import { concatUrls } from "./validate-url";

export function genSitemapIndex(sitemapIndexContent) {
  return `
          <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${sitemapIndexContent}
          </sitemapindex>
          `;
}

export function genSitemapContent(location, extraFields = "") {
  return `<sitemap>
            <loc>${location}</loc>
            <lastmod>${moment().format("YYYY-MM-DD")}</lastmod>
            ${extraFields}
          </sitemap>
          `;
}

export function genSitemapUrlSet(sitemapIndexContent) {
  return `
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
              ${sitemapIndexContent}
          </urlset>
          `;
}

export function genSitemapContentUrl(location, extraFields = "") {
  return `<url>
            <loc>${location}</loc>
            <lastmod>${moment().format("YYYY-MM-DD")}</lastmod>
            ${extraFields}
          </url>
          `;
}

export function genImageSitemapIndex(imageIndexContent) {
  return `<?xml version="1.0" encoding="UTF-8"?>
          <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
              ${imageIndexContent}
          </urlset>
          `;
}

export function genSitemapImageContent(product, locale, domain) {
  const slug = getValidSlug(product);
  const asPath = locale === "vi" ? "san-pham" : `${locale}/product`;
  const location = concatUrls(domain, `/${asPath}/${slug}`);
  return `<url>
            <loc>${location}</loc>
            <lastmod>${moment().format("YYYY-MM-DD")}</lastmod>
            ${(product.images || [])
              .map(
                (image) =>
                  `
                  <image:image>
                    <image:loc>${image.url}</image:loc>
                    <image:geo_location>Viet Nam</image:geo_location>
                    ${image.captionSEO ? `<image:caption>${image.captionSEO}</image:caption>` : ""}

                    ${image.titleSEO ? `<image:title>${image.titleSEO}</image:title>` : ""}
                  </image:image>
                  `,
              )
              .join("")}
          </url>
          `;
}
