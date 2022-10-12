export enum EUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
}
export enum EAction {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export const EXPIRE_JWT_TOKEN = '1d';

export const KEY_LANG_HEADER = 'lang';
export enum LangEnum {
  Vi = 'vi',
  En = 'en',
}

export enum ArticleStatus {
  DRAFT = 'DRAFT',
  PUBLISH = 'PUBLISH',
}

// Paginate data
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;

// Prefix file translate
export const MAIN_LANG = 'main';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum UserType {
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
  CLIENT = 'CLIENT',
}

export enum FileType {
  IMAGE = 'images',
  PDF = 'pdf',
}

export enum SupportFileType {
  png = 'png',
  jpg = 'jpg',
  jpeg = 'jpeg',
  pdf = 'pdf',
}

export enum BooleanEnum {
  TRUE = 1,
  FALSE = 0, // -1
}

export enum BooleanStatusEnum {
  TRUE = 1,
  FALSE = -1,
}

export enum PrefixServiceEnum {
  ADMIN = 'admin',
  USER = 'user',
}

// Constraint name for entity
export enum NameConstraintEntity {
  UQ_ARTICLE_TRANSLATE_1 = 'UQ_ARTICLE_TRANSLATE_1',
  CHK_ARTICLE_TRANSLATE_1 = 'CHK_ARTICLE_TRANSLATE_1',
  UQ_ARTICLE_CATE_TRANSLATE_1 = 'UQ_ARTICLE_CATE_TRANSLATE_1',
  CHK_ARTICLE_CATE_TRANSLATE_1 = 'CHK_ARTICLE_CATE_TRANSLATE_1',
  IDX_ARTICLE_TO_CATEGORY_1 = 'IDX_ARTICLE_TO_CATEGORY_1',
  UQ_WEB_MENU_1 = 'UQ_WEB_MENU_1',
  UQ_WEB_MENU_2 = 'UQ_WEB_MENU_2',
  UQ_POLICIES = 'UQ_POLICIES',
}

export const MapFilePathSupport = [
  {
    key: FileType.IMAGE,
    types: ['png', 'jpg', 'jpeg'],
  },
  {
    key: FileType.PDF,
    types: ['pdf'],
  },
];

export enum JwtServiceType {
  JwtAdminService = 'JwtAdminService',
  JwtUserService = 'JwtUserService',
}

export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const ABILITY_METADATA_KEY = 'ability';

export const CONFIG_CEBI_PAGE_JSON_KEY = 'content';
