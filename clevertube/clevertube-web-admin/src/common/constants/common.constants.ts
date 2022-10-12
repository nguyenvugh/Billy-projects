// DECLARE COMMON CONSTANTS HERE
export const COMMON = "COMMON";
export const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const REGEX_TIME = /^(\d+):([0-5]\d|\d):?([0-5]\d|\d)?$/;
export const REGEX_YOUTUBE =
  /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
export const SENTENCE = /[,.]\s+/;
export const SPACE = /\s+/;
export const REGEX_MP3 = /^.*\.[mM][pP]3$/;
export const REGEX_ID = /^[a-zA-Z0-9]*$/;
