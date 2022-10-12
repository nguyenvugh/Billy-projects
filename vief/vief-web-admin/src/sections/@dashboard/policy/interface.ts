import { BooleanEnum } from 'src/common/constants/common.constants';
import { Fields } from 'src/common/constants/common.interfaces';
import { CustomFile } from 'src/components/upload';
import { LangObj } from '../setup/banner/interfaces';
import { LANG } from './constants';

export interface IPolicy {
  id: number;
  thumbnail: Thumbnail;
  field: string;
  isFeature: -1 | 1;
  title: string;
  category:Category;
}

interface Thumbnail {
  id: number;
  url: string;
}
export interface Category {
  id: number;
  name: string,
  slug: String,
  type: string,
}
export type IPolicys = Array<IPolicy>;

export type IResPolicys = {
  data: IPolicys;
  total: number;
};

export type IQueryGetPolicys = {
  page: number;
  size: number;
};

export type IPolicyCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IPropsPolicyTableRow = {
  row: IPolicy;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

export type ISelectedLang = {
  payload: LangObj;
  type: string;
};

export type IFormTranslations = {
  [lang in LANG]: {
    title: string;
    slug: string;
    shortDesc: string;
    content: string;
  };
};
export type IFormPolicyValuesProps = {
  thumbnail: CustomFile | string | null;
  isFeature: boolean;
  author: string;
  category:{
    value:number;
    label:string;
  }
  images: (CustomFile | string | null)[];
  translations: IFormTranslations;
};

export type ITranslations = {
  lang: LANG;
  title: string;
  slug: string;
  shortDesc: string;
  content: string;
};

export interface ITranslateDetail extends ITranslations {
  id: number;
}

export type IFormPolicyNew = {
  thumbnailId: number;
  field: string;
  isFeature: -1 | 1;
  author: string;
  categoryId:number;
  images:number[];
  translations: ITranslations[];
};

export type IDetailPolicy = {
  id: number;
  field: string;
  author: string;
  isFeature: -1 | 1;
  translates: ITranslateDetail[];
  thumbnail: Thumbnail;
  category:{
    value:number;
    label:string;
  }
  images:Thumbnail[];
};

export type IEditPolicy = {
  thumbnailId: number;
  field: string;
  author: string;
  categoryId:number;
  images:number[];
  isFeature: -1 | 1;
  translations: ITranslations[];
};
export interface PolicySearchParams {
  page?: number;
  size?: number;
  title?: string;
  field?: Fields;
  isFeature?: BooleanEnum;
}

export type IFieldsPolicy = 'ALL' | 'WOOD' | 'FEATURE' | 'NOT_FEATURE';