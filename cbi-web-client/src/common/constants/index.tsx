import { List } from "../interfaces/common.interface";

export const LANG_VI = "vi";
export const LANG_EN = "en";

export const SCREEN_AUTH = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  NOTI_FORGOT_PASSWORD: "NOTI_FORGOT_PASSWORD",
  RESET_PASSWORD: "RESET_PASSWORD",
  NOTI_RESET_PASSWORD: "NOTI_RESET_PASSWORD",
  NOTI_EMAIL: "NOTI_EMAIL",
};

export const SCREEN_CBI = {
  ClimateLevel1: "ClimateLevel1",
  ClimateLevel2: "ClimateLevel2",
  ClimateLevel3: "ClimateLevel3",
  SubmitSuccessCBI: "SubmitSuccessCBI",
  ClimateSuccessWithoutScore: "ClimateSuccessWithoutScore",
};

export const TAB_ACCOUNT = {
  PROFILE_ACCOUNT: "PROFILE_ACCOUNT",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  RESULT_EVALUATE: "RESULT_EVALUATE",
};

export const TYPE_QUESTION = {
  SINGLE_CHOICE: 1,
  MULTI_CHOICE: 2,
  ENTER_ANSWER: 3,
  UPLOAD_FILE: 4,
};
export const TITLE_LEVEL_CBI = {
  level1: "Ít nhận thức về khí hậu",
  level2: "Nhận thức về khí hậu",
  level3: "Hành động về khí hậu",
};

export const youtubeVideoLinkRegex =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
export const SEARCH_DEBOUNCE_TIME = 300; // milisecond
export const PAGE_SIZE = 10;
export const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
export const DATE_FORMAT = "DD/MM/YYYY";
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const REGEX_NOT_CONTAIN_SPECIAL_CHAR = /^((?![#@_'-()\|]).)*$/;
export const REGEX_DATE_DDMMYYYY = /^\d{4}\-\d{2}\-\d{2}$/;

export const LIST_RESPONSE_DEFAULT: List<any> = {
  results: [],
  total: 0,
  totalPage: 0,
};

export const passInValid =
  "Mật khẩu gồm ít nhất 8 ký tự, trong đó có ít nhất 1 chữ viết thường, 1 chữ viết hoa và 1 số.";

export const MAX_FILE_SIZE = 3145728; // 3mb

export const REQUIRED_MESS = "Đây là trường bắt buộc!";
export const MAX_LENGTH_100_MESS = "Vượt quá 100 ký tự. Vui lòng nhập lại!";
export const MAX_LENGTH_250_MESS = "Vượt quá 250 ký tự. Vui lòng nhập lại!";
export const WRONG_FORMAT_MESS = "Sai định dạng";
export const WRONG_PHONE_MESS = "Sai định dạng";
