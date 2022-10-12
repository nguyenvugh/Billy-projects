import CbiIcon from "src/common/assets/icons/iconCbi.svg";
import DocumentIcon from "src/common/assets/icons/iconDocument.svg";
import FileIcon from "src/common/assets/icons/iconFile.svg";
import SettingIcon from "src/common/assets/icons/iconSetting.svg";
import UserIcon from "src/common/assets/icons/iconUser.svg";
import {
  ROUTE_ADD_NEWS,
  ROUTE_ADD_NEW_ACCOUNT,
  ROUTE_CONFIG,
  ROUTE_DETAIL_ACCOUNT,
  ROUTE_DETAIL_CONFIG,
  ROUTE_QUESTIONS,
  ROUTE_SUBMITTED_ANSWER,
  ROUTE_SUBMITTED_ANSWER_UNCHECKED,
} from "src/common/constants/routes.constants";
import {
  ROUTE_ADMIN_ACCOUNT,
  ROUTE_AUTHORIZATION,
  ROUTE_CATEGORY,
  ROUTE_DETAIL_NEWS,
  ROUTE_EMAIL_REGISTRATION,
  ROUTE_NEWS,
  ROUTE_RELATIVE_CONTACT,
  ROUTE_USER_ACCOUNT,
} from "../constants/routes.constants";
import { LeftMenuConfig } from "../interfaces/common.interface";

export const LEFT_MENU_CONFIG: LeftMenuConfig[] = [
  // Login page
  {
    label: "manage-cbi-assessments",
    authority: [],
    icon: CbiIcon,
    isParent: true,
    resources: "cbi",
    children: [
      {
        label: "Câu hỏi",
        pathName: ROUTE_QUESTIONS,
        authority: [],
        children: [],
      },
      {
        label: "Quản lý bài cần chấm điểm",
        pathName: ROUTE_SUBMITTED_ANSWER,
        authority: [],
        children: [],
      },
      {
        label: "Quản lý bài đã có điểm",
        pathName: ROUTE_SUBMITTED_ANSWER_UNCHECKED,
        authority: [],
        children: [],
      },
    ],
  },
  {
    label: "user-manage",
    resources: "user",
    authority: [],
    icon: UserIcon,
    isParent: true,
    children: [
      {
        label: "user-account",
        pathName: ROUTE_USER_ACCOUNT,
        authority: [],
        children: [],
      },
      {
        label: "contact",
        pathName: ROUTE_RELATIVE_CONTACT,
        authority: [],
        children: [],
      },
      {
        label: "email-registration",
        pathName: ROUTE_EMAIL_REGISTRATION,
        authority: [],
        children: [],
      },
    ],
  },
  {
    label: "news-manage",
    resources: "news",
    authority: [],
    icon: FileIcon,
    isParent: true,
    children: [
      {
        label: "news-categories",
        pathName: ROUTE_CATEGORY,
        authority: [],
        children: [],
      },
      {
        label: "news",
        pathName: ROUTE_NEWS,
        authority: [],
        children: [
          {
            label: "add-new",
            pathName: ROUTE_ADD_NEWS,
            authority: [],
            children: [],
          },
          {
            label: "detail",
            pathName: ROUTE_DETAIL_NEWS,
            authority: [],
            children: [],
          },
        ],
      },
      {
        label: "owner-page",
        pathName: "/",
        authority: [],
        children: [],
      },
      {
        label: "config",
        pathName: ROUTE_CONFIG,
        resources: "config",
        authority: [],
        children: [
          {
            label: "detail",
            pathName: ROUTE_DETAIL_CONFIG,
            authority: [],
            children: [],
          },
        ],
      },
    ],
  },
  {
    label: "account-manage",
    resources: "admin",
    authority: [],
    icon: SettingIcon,
    isParent: true,
    children: [
      {
        label: "account",
        pathName: ROUTE_ADMIN_ACCOUNT,
        authority: [],
        children: [
          {
            label: "account add new",
            pathName: ROUTE_ADD_NEW_ACCOUNT,
            authority: [],
            children: [],
          },
          {
            label: "account detail",
            pathName: ROUTE_DETAIL_ACCOUNT,
            authority: [],
            children: [],
          },
        ],
      },
      {
        label: "authorization",
        pathName: ROUTE_AUTHORIZATION,
        authority: [],
        children: [],
      },
    ],
  },
  {
    label: "Quản lý tài liệu",
    resources: "documents",
    authority: [],
    icon: DocumentIcon,
    isParent: false,
    children: [
      {
        label: "Trang tài liệu",
        pathName: "/document",
        authority: [],
        children: [],
      },
    ],
  },
];
