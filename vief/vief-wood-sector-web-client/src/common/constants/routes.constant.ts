import { Lang, Types } from "../interfaces/common.interface";

// DECLARE PATH NAME FOR ROUTE
export const ROUTE_HOME: Record<Lang, string> = {
  vi: "/",
  en: "/",
};
export const ROUTE_ABOUT: Record<Lang, string> = {
  vi: "/ve-chung-toi",
  en: "/about",
};
export const ROUTE_ENTERPRISE_STORY: Record<Lang, string> = {
  vi: "/chuyen-doanh-nghiep",
  en: "/enterprise-story",
};
export const ROUTE_ENTERPRISE_ARTICLE_DETAIL: Record<Lang, string> = {
  vi: "/chuyen-doanh-nghiep/bai-viet/:slug",
  en: "/enterprise-story/article/:slug",
};
export const ROUTE_POLICY: Record<Lang, string> = {
  vi: "/chinh-sach",
  en: "/policy",
};

export const ROUTE_POLICY_ARTICLE_DETAIL: Record<Lang, string> = {
  vi: "/chinh-sach/bai-viet/:slug",
  en: "/policy/article/:slug",
};

export const ROUTE_EVENT: Record<Lang, string> = {
  vi: "/su-kien",
  en: "/events",
};

export const ROUTE_EVENT_DETAIL: Record<Lang, string> = {
  vi: "/su-kien/:slug",
  en: "/events/:slug",
};

export const ROUTE_LIBRARY: Record<Lang, string> = {
  vi: "/thu-vien",
  en: "/library",
};
export const ROUTE_ARTICLE_DETAIL: Record<Lang, string> = {
  vi: "/bai-viet/:slug",
  en: "/article/:slug",
};

export type RouteInfo = Record<Types, Record<Lang, { name: string; link: string }>>;
export const ROUTES: RouteInfo = {
  POLICY: {
    en: { name: "Policy", link: ROUTE_POLICY["en"] },
    vi: { name: "Chính Sách", link: ROUTE_POLICY["vi"] },
  },
  DOCUMENT: {
    en: { name: "Document", link: ROUTE_LIBRARY["en"] },
    vi: { name: "Tài liệu", link: ROUTE_LIBRARY["vi"] },
  },
  ENTERPRISE: {
    en: { name: "Enterprise", link: ROUTE_ENTERPRISE_STORY["en"] },
    vi: { name: "Doanh nghiệp", link: ROUTE_ENTERPRISE_STORY["vi"] },
  },
  EVENT: {
    en: { name: "Event", link: ROUTE_EVENT["en"] },
    vi: { name: "Sự kiện", link: ROUTE_EVENT["vi"] },
  },
};
export const ROUTE_REGISTER = {
  vi: "/dang-ki",
  en: "/register",
};
