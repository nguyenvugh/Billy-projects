import { BooleanEnum } from 'src/common/constants/common.constants';
import { Fields } from 'src/common/constants/common.interfaces';
import { CustomFile } from 'src/components/upload';
import { LangObj } from '../setup/banner/interfaces';
import { LANG } from './constants';

export interface ICategoryPolicy {
  id: number;
  name: string;
  thumbnail: IThumbnail;
  field: string;
  isFeature: -1 | 1;
  type?: string;
}

type IThumbnail = {
  id: number;
  url: string;
};

export type ISelectedLang = {
  payload: LangObj;
  type: string;
};

export type IResCategories = {
  data: ICategories;
  total: number;
};

export type IQueryGetCategories = {
  page: number;
  size: number;
  type: string;
};

export type ICategoryCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IEditCatgoryPolicy = {
  thumbnailId: number;
  field: string;
  isFeature: -1 | 1;
  translations: ITranslations[];
};

export type IDetailCategoryPolicy = {
  id: number;
  field: string;
  isFeature: -1 | 1;
  translates: ITranslateDetail[];
  thumbnail: IThumbnail;
};

export type IFormTranslations = {
  [lang in LANG]: {
    name: string;
    slug: string;
    shortDesc: string;
    content: string;
  };
};

export type ITranslations = {
  lang: LANG;
  name: string;
  slug: string;
  shortDesc: string;
  content: string;
};

export type IFormCategoryPolicyNew = {
  type: string;
  thumbnailId: number;
  field: string;
  isFeature: -1 | 1;
  translations: ITranslations[];
};

export type IFormCategoryPolicyValuesProps = {
  thumbnail: CustomFile | string | null;
  isFeature: boolean;
  location: string;
  translations: IFormTranslations;
};

export type ICategories = Array<ICategoryPolicy>;

export interface ITranslateDetail extends ITranslations {
  id: number;
}

export interface IFileThumb {
  name?: string;
  path?: string;
  preview: string;
  size?: number;
}

export interface CategoryPolicySearchParams {
  page?: number;
  type?: string;
  size?: number;
  name?: string;
  field?: Fields;
  isFeature?: BooleanEnum;
}

export type IPropsCategoryPolicyTableRow = {
  row: ICategoryPolicy;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};


export type IFieldsCategoryPolicy = 'ALL' | 'WOOD' | 'FEATURE' | 'NOT_FEATURE';
