import { AnswerOptions } from "./interfaces";
export enum CbiQuestionOptionTypeEnum {
  SINGLE_CHOICE = 1,
  MULTI_CHOICE = 2,
  ENTER_ANSWER = 3,
  UPLOAD_FILE = 4,
}

export const ANSWER_OPTIONS: AnswerOptions[] = [
  {
    label: "Trắc nghiệm (Chọn 1 đáp án)",
    type: "multiple-choice-one",
  },
  {
    label: "Trắc nghiệm (Chọn nhiều đáp án)",
    type: "multiple-choice-many",
  },
  {
    label: "Tự luận",
    type: "essay",
  },
  {
    label: "Tải tài liệu lên hệ thống",
    type: "document",
  },
];
