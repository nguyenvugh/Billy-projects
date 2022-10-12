export const ROUTE_LOGIN = "/login";
export const ROUTE_HOME = "/";
export const ROUTE_NEWS = "/news";
export const ROUTE_ADD_NEWS = relativePath([ROUTE_NEWS, "add-new"]);
export const ROUTE_DETAIL_NEWS = relativePath([ROUTE_NEWS, "details/:newId"]);

export const ROUTE_USER_ACCOUNT = "/user-account";
export const ROUTE_RELATIVE_USER_ACCOUNT = relativePath([ROUTE_USER_ACCOUNT]);
export const ROUTE_USER_ACCOUNT_DETAIL = relativePath([ROUTE_USER_ACCOUNT, "detail/:userId"]);
export const ROUTE_USER_HISTORY_ANSWER = relativePath([
  ROUTE_USER_ACCOUNT_DETAIL,
  "user-history-answer",
]);

export const ROUTE_CONTACT = "/contact";
export const ROUTE_RELATIVE_CONTACT = relativePath([ROUTE_CONTACT]);
export const ROUTE_DETAIL_CONTACT = relativePath([ROUTE_CONTACT, "detail-contact"]);

export const ROUTE_EMAIL_REGISTRATION = "/email-registration";

export const ROUTE_PROFILE = "/profile";
export const ROUTE_CATEGORY = "/category";
export const ROUTE_AUTHORIZATION = "/authorization";
export const ROUTE_ADMIN_ACCOUNT = "/account";
const ROUTE_CONFIG = "/footer-config";
export const ROUTE_DETAIL_CONFIG = relativePath([ROUTE_CONFIG, "details/:configKey"]);

// admin account child router
export const ROUTE_ADD_NEW_ACCOUNT = relativePath([ROUTE_ADMIN_ACCOUNT, "new-account"]);
export const ROUTE_DETAIL_ACCOUNT = relativePath([ROUTE_ADMIN_ACCOUNT, "detail/:adminId"]);
export const ROUTE_EDIT_ACCOUNT = relativePath([ROUTE_ADMIN_ACCOUNT, "edit-account"]);

// authorization child router
export const ROUTE_ADD_NEW_AUTHOR = relativePath([ROUTE_AUTHORIZATION, "add-new-authorization"]);
export const ROUTE_DETAIL_AUTHOR = relativePath([
  ROUTE_AUTHORIZATION,
  "authorization-detail/:groupKey",
]);

export const ROUTE_QUESTIONS = "/questions";
export const ROUTE_QUESTIONS_DETAILS = relativePath([ROUTE_QUESTIONS, "details/:questionId"]);
export const ROUTE_QUESTIONS_DETAILS_LEVEL = relativePath([
  ROUTE_QUESTIONS_DETAILS,
  "level/:level",
]);
export const ROUTE_QUESTIONS_DETAILS_LEVEL_ADD = relativePath([
  ROUTE_QUESTIONS_DETAILS_LEVEL,
  "add",
]);
export const ROUTE_SUBMITTED_ANSWER = "/submitted-answer/need-comfirm-score";
export const ROUTE_SUBMITTED_ANSWER_DETAIL =
  "/submitted-answers/need-comfirm-score/:submittedAnswerId";
export const ROUTE_SUBMITTED_ANSWER_UNCHECKED = "/submitted-answers";
export const ROUTE_SUBMITTED_ANSWER_UNCHECKED_DETAIL = "/submitted-answers/:submittedAnswerId";

export const ROUTE_DOCUMENT = "/document";
export const ROUTE_DOCUMENT_ADD = relativePath([ROUTE_DOCUMENT, "add"]);

function relativePath(paths: string[]) {
  return paths.join("/");
}
