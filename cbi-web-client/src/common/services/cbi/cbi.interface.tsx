export interface ParamGetListCBI {
  page: Number;
  limit: Number;
}

export interface ItemEvaluateI {
  id: string;
  name: string;
  description: string;
  slug: string;
  thumbnail: ThumnailEvaluateI;
  onAction?: () => void;
  isDisabled?: boolean;
  isQuantitative?: boolean;
}

export interface ThumnailEvaluateI {
  id: string;
  url: string;
}

export interface responseEvaluateI {
  results: ItemEvaluateI[];
  total: Number;
}
export interface LevelEvaluateI {
  id: string;
  name: string;
  slug: string;
  can_test: Number;
}
export interface responseLevelEvaluateI {
  results: LevelEvaluateI[];
}

export interface ItemQuizLevelI {
  id: string;
  name: string;
  description: string;
  order_display: Number;
  questions: QuestionsQuizLevelI[];
}
export interface QuestionsQuizLevelI {
  itemQuizLevel?: {
    id: string;
    name: string;
    description: string;
    order_display: Number;
  };
  id: string;
  title: string;
  order_display: Number;
  total_scores: string;
  status_answer_mandatory: Number;
  index?: Number;
  options: optionQuestionI[];
}

export interface optionQuestionI {
  id: string;
  type: 1;
  values: valuesOptionQuestionI[];
  answer?: answerOptionQuestionI[];
}

export interface answerOptionQuestionI {
  cbi_question_option_value_id: string;
  content_answer: string;
  score: string;
}
export interface valuesOptionQuestionI {
  id: string;
  title: string;
  score: string;
  status_right_option_value: any;
}
export interface responseQuizLevelI {
  results: ItemQuizLevelI[];
}

export interface bodyRequestPostQuestion {
  status_finish: Number;
  questions: requestQuestionSubmit[];
}

export interface requestQuestionSubmit {
  cbi_question_id: string;
  cbi_question_option_id: string;
  cbi_question_option_value_id: string;
  score: Number;
  content_answer?: string;
}
