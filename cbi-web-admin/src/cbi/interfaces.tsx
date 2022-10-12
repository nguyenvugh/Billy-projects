export interface QuestionList {
  id: string;
  name: string;
  description: string;
  total: number;
  latestDate: string;
  creatorName: string;
}

export interface QuizGroup {
  id: string;
  name: string;
  level: number;
  total_questions: number;
  auto_calculate_score: number;
  status_publish: number;
}

export interface QuizGroupListResponse {
  results: QuizGroup[];
  total: number;
}

export interface QuizGroupParam {
  name: string;
  auto_calculate_score: number | boolean;
  status_publish?: number;
}

export interface QuizValue {
  id: string;
  title: string;
  score: string;
  status_right_option_value: number;
}

export interface QuizOption {
  id: string;
  type: number;
  values: QuizValue[];
}

export interface QuizLevelInfo {
  id: string;
  title: string;
  order_display: number;
  total_scores: string;
  options: QuizOption[];
  status_answer_mandatory: number;
}

export interface QuizLevel {
  id: string;
  name: string;
  description: string;
  order_display: number;
  questions: QuizLevelInfo[];
}

export interface QuizCategoryParam {
  name: string;
  description: string;
}

export interface QuizLevelResponse {
  results: QuizLevel[];
}

export interface QuizDetailNavigationParams {
  quizCategory: QuizLevel;
  selectedQuiz?: QuizLevelInfo;
}

export interface QuizValueCreate
  extends Omit<QuizValue, "id" | "status_right_option_value" | "score"> {
  status_right_option_value?: number;
  score: number;
  id?: string;
}

export interface QuizOptionCreate {
  type: number;
  values: QuizValueCreate[];
  id?: string;
}

export interface QuizDetailParams {
  title: string;
  options: QuizOptionCreate[];
  id?: string;
  status_answer_mandatory: number;
}

export type AnswerType = "multiple-choice-one" | "multiple-choice-many" | "essay" | "document";
export interface AnswerOptions {
  label: string;
  type: AnswerType;
}
export interface Solution {
  id: string;
  type: AnswerType;
  data: string;
  score: string;
}

export interface CBIS {
  id?: string;
  name: string;
  description: string;
  thumbnail_id: string;
}

export interface CbiResponse {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    id: string;
    url: string;
  };
  total_levels: 0;
  created_at: string;
  updated_at: string;
  created_by: {
    id: string;
    name: string;
  };
}

export interface DeleteParams {
  ids: string[];
}
