export const SEARCH_DEBOUNCE_TIME = 300; // milisecond
export const PAGE_SIZE = 10;
export const DATE_TIME_FORMAT = "DD/MM/YYYY HH:mm";
export const DATE_FORMAT = "DD/MM/YYYY";
export const REGEX_PHONE_NUMBER = /^[0-9+-]{9,15}$/;
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export enum LangEnum {
  "vi",
  "en",
}
export enum Status {
  "ACTIVE" = "ACTIVE",
  "INACTIVE" = "INACTIVE",
  "PENDING" = "PENDING",
}
export const S3_IMG_URL =
  process.env.REACT_APP_S3_IMG_URL || "https://s3.ap-southeast-1.amazonaws.com/cbi-s3-dev-bucket";

export const MAX_FILE_SIZE = 3145728; // 3mb
export const FILE_TYPE = {
  img: ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg"],
};
