import { type } from 'os';
import { BooleanEnum } from 'src/common/constants/common.constants';
import { CustomFile } from 'src/components/upload';
import { LangObj } from '../setup/banner/interfaces';
import { LANG, LANG_CONST } from './constants';

export type Type = 'POLICY';
export type Fields = 'WOOD';
export interface ICategory {
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
export type IResponseCate = {
  data: IResCategories;
};

export type IQueryGetCategories = {
  page: number;
  size: number;
};

export type ICategoryCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface ICreateCategory {
  type?: string;
  thumbnailId: any;
  field?: string;
  isFeature: boolean;
  translations: ITranslation;
}

export interface IPostCreateData {
  type?: string;
  thumbnailId: any[];
  field?: string;
  isFeature: number;
  translations: ITranslationEle[];
}

export interface ITranslationEle {
  lang?: string;
  name: string;
  content: string;
  shortDesc: string;
  slug: string;
}

export type ITranslation = {
  [LANG_CONST.VI]: ITranslationEle;
  [LANG_CONST.EN]: ITranslationEle;
};

export interface IResCategoryById {
  type?: string;
  thumbnail: any;
  field?: string;
  isFeature: number;
  translates: ITranslationEle[];
}

export type IEventCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
export type IEditCatgory = {
  thumbnailId: number;
  field: string;
  location: string;
  isFeature: -1 | 1;
  translations: ITranslations[];
};

export type IDetailCategory = {
  id: number;
  field: string;
  location: string;
  timeStart: string;
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

export type IFormCategoryNew = {
  type: string;
  thumbnailId: number;
  field: string;
  isFeature: -1 | 1;
  location: string;
  translations: ITranslations[];
};

// export type IFormCategoryValuesProps = {
//   thumbnail: CustomFile | string | null;
//   isFeature: boolean;
//   location: string;
//   translations: IFormTranslations;
// };

export type ICategories = Array<ICategory>;

export interface ITranslateDetail extends ITranslations {
  id: number;
}

export interface IFileThumb {
  name?: string;
  path?: string;
  preview: string;
  size?: number;
}

export interface CategorySearchParams {
  page?: number;
  size?: number;
  name?: string;
  field?: Fields;
  isFeature?: BooleanEnum;
  type?: string;
}

// export type FieldError = {
//   type: string;
//   ref?: Ref;
//   types?: MultipleFieldErrors;
//   message?: Message;
// };

// export type FieldErrors<
//   TFieldValues extends FieldValues = FieldValues
// > = DeepMap<TFieldValues, FieldError>;
