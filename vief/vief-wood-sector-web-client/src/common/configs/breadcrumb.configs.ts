import { RouteInfo, ROUTE_ENTERPRISE_STORY, ROUTE_POLICY } from "../constants/routes.constant";
import { Lang } from "../interfaces/common.interface";
import { BreadcrumbsType } from "./interfaces";

// ---------------------- Enterprise story detail
export const getBreadCrumbEnterpriseDetail: (Lang: Lang) => BreadcrumbsType[] = (lang) => [
  {
    label: "Chuyện doanh nghiệp",
    link: ROUTE_ENTERPRISE_STORY[lang],
  },
  {
    label: "Ngành gỗ",
    link: ROUTE_ENTERPRISE_STORY[lang],
  },
];

export const getBreadCrumbArticleDetail: (typeInfo: { name: string; link: string }) => BreadcrumbsType[] = (
  typeInfo
) => [
  {
    label: typeInfo.name,
    link: typeInfo.link,
  },
  {
    label: ":articleName",
    link: "#",
  },
];
