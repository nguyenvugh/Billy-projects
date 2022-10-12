export const BASE_URL = process.env.REACT_APP_API_URL;

// Auth
export const LOGIN = "/auth/login";
export const SEND_EMAIL = "/auth/send-email";
export const SET_PASSWORD = "/auth/set-password";
export const REGISTER_ADMIN = "/auth/register-admin";
export const GET_PROFILE = "/auth/profile";
export const UPDATE_PROFILE = "/auth/update-profile";
export const CHANGE_PASSWORD = "/auth/change-password";

// Category
export const GET_ALL_CATEGORY = "/article-category/find-all";

// Article
export const ARTICLES = "/article";
export const GET_BY_SLUG = "/article/slug";
export const CHANGE_STATUS_ARTICLE = "/article/change-status";
export const DELETE_ARTICLE_BY_ID = "/article/delete/";
export const DELETE_MULTIPLE_ARTICLE = "/article/delete/multi";

// Article category
export const CREATE_ARTICLE_CATEGORY = "/article-category";
export const GET_ALL_ARTICLE_CATEGORY = "/article-category/get-all-paging";
export const UPDATE_ARTICLE_CATEGORY = "/article-category";
export const DELETE_ARTICLE_CATEGORY = "/article-category/delete";

// profile
export const FETCH_DATA_USER = "/auth/profile";
export const UPDATE_PASSWORD = "/admin-manage/profile";

// admin manage
export const ADMIN_LIST = "/admin-manage";
export const ADMIN_DETAIL = "/admin-manage/";

// Email registration
export const EMAILS = "/emails";
// contact
export const GET_CONTACT = "/contact";
export const DELETE_CONTACT_DETAIL = "/contact/";

// footer config
export const CONFIGS = "/config-cebi";

// File manager
export const FILES_PRESIGN = "/file-admin/presign-url";

// Quiz
export const GET_QUIZ_GROUPS = "/admin/cbis";
export const DELETE_QUIZ_GROUP = "/admin/cbis";
// Cbi manager
export const ADMIN_CBI = "/admin/cbis";
// Documents manager
export const ADMIN_DOCUMENTS = "/admin/documents";
// User account manager
export const USER_ACCOUNT = "/client-manage";
// Authorization manager
export const CASL = "/casl";
export const CASL_GROUP_POLICY = "/casl/group-policy";

// Submited answer
export const GET_SUBMITTED_ANSWER = "/admin/cbi-user-levels";
export const GET_SUBMITTED_ANSWER_UNCHECKED = "/admin/cbi-user-levels/need-confirm-score";
