import { Lang } from 'src/common/constants/common.interfaces';
import { CustomFile } from 'src/components/upload';
import { LANG } from './constants';
import { BooleanEnum } from 'src/common/constants/common.constants';

export interface IArticle {
  field: string;
  author: string;
  id: number;
  title: string;
  category: ICategory;
  thumbnail: IFileThumb;
  images: IFileThumb[];
  isFeature: number;
  translates: ITranslation[];
};

export interface IPrepareTrans {
  field: string;
  author: string;
  categoryId: number;
  thumbnail: number;
  images: number[];
  isFeature: number;
  translations: ITranslation[];
}
export interface IPrepareData {
  status?: boolean;
  post?: IPrepareTrans;
}

export type IArticleCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};
export interface ICategoryEnterprise {
  id: number;
  name: string;
  thumbnail: IFileThumb;
  field: string;
  isFeature: -1 | 1;
  slug: string;
  shortDesc: string;
  content: string;
}

export type Type = 'ENTERPRISE';

export interface IResArticle {
  data: IArticle[];
  total: number;
}
export interface IResponArticle {
  data: IResArticle;
}
export interface ICategory {
  id: number;
  name: string;
  slug: string;
  type: string;
}

// form || yup interface
export interface IFormType {
  author: string;
  thumbnailImg: IFileThumb[] | File[];
  images: IFileThumb[] | File[];
  categoryId:
    | {
        value: number;
        label: string;
      }
    | string;
  isFeature: boolean;
  translations: ITranslations;
}

// form interface

export type IFormTranslations = {
  [lang in LANG]: {
    title: string;
    slug: string;
    shortDesc: string;
    content: string;
  };
};

export type IFormArticleValuesProps = {
  images: (CustomFile | string| null)[];
  thumbnail: CustomFile | string | null;
  isFeature: boolean;
  type: string;
  author: string;
  translations: IFormTranslations;
  category: {
    value: number;
    label: string;
  };
};

export type IFormArticleNew = {
  author: string;
  images: number[];
  categoryId: number;
  thumbnailId: number;
  field: string;
  type:string;
  isFeature: -1 | 1;
  translations: ITranslation[];
};

export interface ITranslations {
  [LANG.VI]: ITranslation;
  [LANG.EN]: ITranslation;
}

export interface ITranslation {
  id?: number;
  lang?: string;
  title?: string;
  content?: string;
  shortDesc?: string;
  slug?: string;
}

export interface LangObj {
  label: string;
  value: Lang;
  icon: string;
}

export type ISelectedLang = {
  payload: LangObj;
  type: string;
};

export type Fields = 'WOOD';

export interface ArticleSearchParams {
  page?: number;
  size?: number;
  title?: string;
  field?: Fields;
  isFeature?: BooleanEnum;
  type?: string;
}

export interface IFileThumb {
  name: number | string;
  path?: string;
  preview: string;
  size?: number;
  id?: number;
  url?: string;
}

export interface ICateOption {
  value: number;
  label: string;
}
