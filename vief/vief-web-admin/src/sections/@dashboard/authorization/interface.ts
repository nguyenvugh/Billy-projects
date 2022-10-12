import { LANG } from '../category-enterprise/constants';

export interface IAuthorization {
  name: string;
  key: string;
  authorizedItems?: string[];
  description: string;
}

export type LangType = LANG.VI | LANG.EN;

export type IActionLang = {
  type: string;
  payload: LangType;
};
