import { QuestionsQuizLevelI } from "../cbi/cbi.interface";

export interface paramVerifyForgotPassword {
  token: String;
  password: String;
}

export interface paramCbiUser {
  page: number;
  limit: number;
}

export interface ResponseCbiUser {
  results: ItemCbiUser[];
}

export interface ItemCbiUser {
  id: string;
  created_at: string;
  total_scores: string;
  status_pass: number;
  title_earned: string;
  time_to_test_again: string;
  cbi: {
    id: string;
    name: string;
    description: string;
  };
}

export interface ResponseCbiUserLevelI {
  results: ItemCbiUserLevel[];
}

export interface ItemCbiUserLevel {
  id: string;
  total_scores: string;
  cbi_level: {
    id: string;
    name: string;
  };
}

export interface ResponseQuestionCbiUser {
  results: QuestionsQuizLevelI[];
}
