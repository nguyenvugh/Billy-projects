export const BASE_URL =
  process.env.REACT_APP_API_URL ||
  "http://clevertube-dev-alb-1086634962.ap-northeast-1.elb.amazonaws.com/";

export const USERS = "https://jsonplaceholder.typicode.com/users";
export const EDIT_USER_INFO = "https://jsonplaceholder.typicode.com/users";
export const TOPICS = BASE_URL + "admin/topics";
export const LEVELS = BASE_URL + "admin/levels";
export const LOGIN = BASE_URL + "admin/login";
export const PRESIGN_URL = "file/presigned-url";
export const PODCASTS = BASE_URL + "audio";
export const PODCASTS_CONVERT_TO_TEXT = BASE_URL + "audio/convert-to-text";
export const PODCASTS_TRANSCRIBING_STATUS = BASE_URL + "audio/transcribing-status";
export const VIDEOS = BASE_URL + "admin/videos";
export const VIEOS_TRANSCRIPT = BASE_URL + "admin/videos/transcript";
