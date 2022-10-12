export enum CbiQuantitativeQuestionType {
  "radio" = "radio",
  "row" = "row",
  "label_input_select" = "label_input_select",
  "label_select" = "label_select",
  "label_select_input" = "label_select_input",
  "label_input" = "label_input",
  "label_input_input" = "label_input_input",
  "select_input" = "select_input",
}

export interface CbiRadio {
  code?: string;
  value: number;
  label: string;
}
export interface CbiInput {
  code?: string;
  placeholder: string;
}

export interface CbiSelect {
  code?: string;
  placeholder: string;
  options: CbiSelectOptions[];
}
export interface CbiSelectOptions {
  code?: string;
  label: string;
  value: number;
}
export interface CbiQuanAnswers {
  code: string;
  type: CbiQuantitativeQuestionType;
  label?: string;
  value?: number;

  select1?: CbiSelect;
  select2?: CbiSelect;
  select3?: CbiSelect;

  input1?: CbiInput;
  input2?: CbiInput;
  input4?: CbiInput;

  groups?: CbiRadio[];
  rows?: string[];
}
export interface CbiQuantitativeQuestion {
  code: string;
  title: string;
  values?: CbiQuanAnswers[];
}

export interface CbiQuantitative {
  code: number;
  title: string;
  questions: CbiQuantitativeQuestion[];
}

export interface CbiQuantitativeResult {
  name: string;
  vdx?: number;
  vht?: number;
  vtd?: number;
  total: number;
}

export interface CbiQuantitativeCalcProps {
  getTrueVal: (path: any[]) => number;
  updateCbiResult: (result: CbiQuantitativeResult) => void;
  name: string;
}
