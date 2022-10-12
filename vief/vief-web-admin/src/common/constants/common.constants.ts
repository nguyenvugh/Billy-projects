import { Lang, LangObj } from './common.interfaces';

// (in binary)
export const SIZE = {
  '1mb': 1048576,
  '3mb': 3145728,
  '5mb': 5242880,
  '8mb': 8388608,
  '10mb': 10485760,
};

export const LANG: Record<Lang, Lang> = {
  en: 'en',
  vi: 'vi',
};

export const langs: Record<Lang, LangObj> = {
  en: {
    label: 'English',
    value: 'en',
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  vi: {
    label: 'Vietnamese',
    value: 'vi',
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
};
export const DATE_FORMAT = 'dd.MM.yyyy';

export enum BooleanEnum {
  TRUE = 1,
  FALSE = -1,
}

export enum ENVIRONMENT {
  STAGING = 'staging',
  DEVELOP = 'develop',
  PRODUCTION = 'production'
}

export const FIELD = {
  WOOD: 'wood',
};

export enum FieldEnum {
  WOOD = 'WOOD',
}

export const BREADCUMBS = {
  DASHBOARD: 'Dashboard',
  LIST_EVENT: 'List event',
  LIST_REGISTER_EVENT: 'List register event',
  LIST_POLICY_CATEGORY: 'List category policy',
  ADD_POLICY_CATEGORY: 'Add category',
  LIST_ENTERPRISE_CATEGORY: 'List category enterprise',
  CATEGORY_ENTERPRISE_LIST: 'List category enterprise ',
  CATEGORY_ENTERPRISE_EDIT: 'Category enterprise edit',
  CATEGORY_ENTERPRISE_NEW: 'category enterprise add new',
  ADD_NEW_ACCOUNT: 'add new account',
  // ARTICLE
  ARTICLE: 'Article',
  ARTICLE_LIST: 'Article list',
  ARTICLE_EDIT: 'Article edit',
  ARTICLE_CREATE: 'Article create',
  // AUTHORIZATION
  AUTHORIZATION_LIST: 'Authorization list',
  AUTHORIZATION_CREATE: 'Authorization new',
};
