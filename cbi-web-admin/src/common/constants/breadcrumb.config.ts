import { BreadcrumbsType } from "../interfaces/breadcrumb.interface";
import {
  ROUTE_ADMIN_ACCOUNT,
  ROUTE_AUTHORIZATION,
  ROUTE_CONFIG,
  ROUTE_CONTACT,
  ROUTE_DOCUMENT,
  ROUTE_NEWS,
  ROUTE_USER_ACCOUNT,
} from "./routes.constants";

// ---------------------- NEWS
export const BREAD_CRUMB_NEWS_DETAIL: BreadcrumbsType[] = [
  {
    label: "Danh sách tin tức",
    link: ROUTE_NEWS,
  },
  {
    label: "Chi tiết tin tức",
    link: "",
  },
];

export const BREAD_CRUMB_NEWS_EDIT: BreadcrumbsType[] = [
  {
    label: "Danh sách tin tức",
    link: ROUTE_NEWS,
  },
  {
    label: "Chỉnh sửa tin tức",
    link: "",
  },
];

// ---------------------- FOOTER
export const BREAD_CRUMB_FOOTER_DETAIL: BreadcrumbsType[] = [
  {
    label: "Cấu hình thông tin",
    link: ROUTE_CONFIG,
  },
  {
    label: "Chi tiết cấu hình",
    link: "",
  },
];

// ---------------------- ADMIN ACCOUNT
export const BREAD_CRUMB_ACCOUNT_DETAIL: BreadcrumbsType[] = [
  {
    label: "Danh sách tài khoản",
    link: ROUTE_ADMIN_ACCOUNT,
  },
  {
    label: "Chi tiết tài khoản",
    link: "",
  },
];

export const BREAD_CRUMB_ACCOUNT_EDIT: BreadcrumbsType[] = [
  {
    label: "Danh sách tài khoản",
    link: ROUTE_ADMIN_ACCOUNT,
  },
  {
    label: "Chỉnh sửa",
    link: "",
  },
];

export const BREAD_CRUMB_ACCOUNT_ADD: BreadcrumbsType[] = [
  {
    label: "Danh sách tài khoản",
    link: ROUTE_ADMIN_ACCOUNT,
  },
  {
    label: "Thêm mới",
    link: "",
  },
];

// ---------------------- CONTACT
export const BREAD_CRUMB_CONTACT_DETAIL: BreadcrumbsType[] = [
  {
    label: "Danh sách liên hệ",
    link: ROUTE_CONTACT,
  },
  {
    label: "Chi tiết liên hệ",
  },
];

// ---------------------- USER ACCOUNT
export const BREAD_CRUMB_USER_ACC_DETAIL: BreadcrumbsType[] = [
  {
    label: "Tài khoản người dùng",
    link: ROUTE_USER_ACCOUNT,
  },
  {
    label: "Chi tiết người dùng",
  },
];

// ---------------------- AUTHORIZATION
export const BREAD_CRUMB_AUTHORIZATION_DETAIL: BreadcrumbsType[] = [
  {
    label: "Phân quyền",
    link: ROUTE_AUTHORIZATION,
  },
  {
    label: "Chi tiết",
  },
];

export const BREAD_CRUMB_AUTHORIZATION_EDIT: BreadcrumbsType[] = [
  {
    label: "Phân quyền",
    link: ROUTE_AUTHORIZATION,
  },
  {
    label: "Chỉnh sửa",
  },
];

export const BREAD_CRUMB_AUTHORIZATION_ADD: BreadcrumbsType[] = [
  {
    label: "Phân quyền",
    link: ROUTE_AUTHORIZATION,
  },
  {
    label: "Thêm mới",
  },
];

// ---------------------- DOCUMENT
export const BREAD_CRUMB_DOCUMENT_ADD: BreadcrumbsType[] = [
  {
    label: "Quản lý tài liệu",
    link: ROUTE_DOCUMENT,
  },
  {
    label: "Thêm mới",
  },
];

// ---------------------- QUIZ
export const BREAD_CRUMB_QUIZ_DETAIL_UNCHECKED: BreadcrumbsType[] = [
  { label: "Quản lý bài cần chấm điểm" },
];
export const BREAD_CRUMB_QUIZ_DETAIL: BreadcrumbsType[] = [{ label: "Quản lý bài đã có điểm" }];
