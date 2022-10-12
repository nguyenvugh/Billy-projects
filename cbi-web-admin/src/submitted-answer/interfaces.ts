import { CbiResponse } from "src/cbi/interfaces";
import { Status } from "src/common/constants/common.constant";

export interface Cbi
  extends Pick<
    CbiResponse,
    "id" | "name" | "description" | "total_levels" | "created_at" | "updated_at"
  > {}

export interface User {
  id: string;
  birthday: string;
  status: Status;
  fullName: string;
  phoneNumber: string;
  email: string | null;
}

export interface CbiLevel {
  id: string;
  name: string;
  level: number;
  total_questions: number;
  auto_calculate_score: number;
  status_publish: number;
}

export interface CbiUser {
  id: string;
  created_at: string;
  total_scores: string;
  status_pass: number;
  title_earned: string | null;
  time_to_test_again: string | null;
  cbi: Cbi;
  user: User;
}

export interface SubmittedAnswerResponse {
  id: string;
  created_at: string;
  cbi_user: CbiUser;
  cbi_level: CbiLevel;
  status_finish: number;
  status_admin_calculate_score: number;
}

export interface SubmittedAnswerParams {
  page: number;
  limit: number;
  search?: string;
  from_date?: string;
  to_date?: string;
  status_finish?: number;
  status_admin_calculate_score?: number;
}

export interface DetailSubmitedValue {
  id: string;
  title: string;
  score: string;
  status_right_option_value: number;
}

export interface SubmittedAnswer {
  id: string;
  cbi_question_option_value_id: string;
  score: number;
  content_answer: string;
}

export interface DetailSubmittedOption {
  id: string;
  type: number;
  order_display: number;
  values: DetailSubmitedValue[];
  answers: SubmittedAnswer[];
}

export interface DetailSubmittedQuestion {
  id: string;
  title: string;
  order_display: number;
  total_scores: string;
  status_answer_mandatory: number;
  options: DetailSubmittedOption[];
}

export interface DetailSubmittedAnswer {
  id: string;
  name: string;
  description: string | null;
  order_display: number;
  questions: DetailSubmittedQuestion[];
}

export interface DetailSubmittedAnswerResponse {
  results: DetailSubmittedAnswer[];
}

export enum SubmittedAnswerType {
  CHECKED = 1,
  UNCHECKED = -1,
}

export interface AnswerCheck {
  id: string;
  score: number | string;
}

export interface CheckParams {
  answers: AnswerCheck[];
}

export enum SubmittedScreen {
  LIST = "LIST",
  DETAIL = "DETAIL",
}
