import { BooleanEnum } from 'src/common/constants/common.constants';
import { Fields } from 'src/common/constants/common.interfaces';
import { CustomFile } from 'src/components/upload';
import { LangObj } from '../setup/banner/interfaces';
import { LANG } from './constants';

export interface IEvent {
  id: number;
  thumbnail: IThumbnailEvent;
  location: string;
  field: string;
  timeStart: string;
  isFeature: -1 | 1;
  title: string;
  slug: string;
  shortDesc: string;
  content: string;
}

interface IThumbnailEvent {
  id: number;
  url: string;
}
export type IEvents = Array<IEvent>;

export type IResEvents = {
  data: IEvents;
  total: number;
};
export type IResRegisterEvents = {
  data: IRegisterEvent[];
  total: number;
};
export type IQueryGetEvents = {
  page: number;
  size: number;
};

export type IPropsEventTableRow = {
  row: IEvent;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

export type IRegisterEvent = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
};

export type IPropsRegisterEventTableRow = {
  row: IRegisterEvent;
};

export type IEventCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IFormTranslations = {
  [lang in LANG]: {
    title: string;
    slug: string;
    shortDesc: string;
    content: string;
  };
};
export type IFormEventValuesProps = {
  thumbnail: CustomFile | string | null;
  isFeature: boolean;
  location: string;
  timeStart: Date | null;
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

export type IFormEventNew = {
  thumbnailId: number;
  field: string;
  isFeature: -1 | 1;
  location: string;
  timeStart: string;
  translations: ITranslations[];
};

export type IDetailEvent = {
  id: number;
  field: string;
  location: string;
  timeStart: string;
  isFeature: -1 | 1;
  translates: ITranslateDetail[];
  thumbnail: IThumbnailEvent;
};

export type IEditEvent = {
  thumbnailId: number;
  field: string;
  location: string;
  timeStart: string;
  isFeature: -1 | 1;
  translations: ITranslations[];
};

export interface EventSearchParams {
  page?: number;
  size?: number;
  title?: string;
  field?: Fields;
  isFeature?: BooleanEnum;
}

export type IFieldsEvent = 'ALL' | 'WOOD' | 'FEATURE' | 'NOT_FEATURE';
