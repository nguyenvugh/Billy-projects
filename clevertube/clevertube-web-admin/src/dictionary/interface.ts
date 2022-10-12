export interface DictionaryForm {
  newWord: string;
  example: string;
  description: string;
}
export interface IExample {
  id: string;
  content: string;
}
export interface IDictInitialState {
  examples: IExample[];
  newWord: string;
  description: string;
  validateExample: boolean;
  exampleValue: string;
}
