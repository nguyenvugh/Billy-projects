import { BaseResponse, Fields, ImageResponse, Lang } from 'src/common/constants/common.interfaces';
import { CustomFile } from 'src/components/upload';

export interface LangObj {
  label: string;
  value: Lang;
  icon: string;
}

export interface CreateBannerForm {
  title: string;
  subTitle: string;
  shortDesc: string;
  link: string;
  image: CustomFile | string | null;
  lang: Lang;
}

export interface CreateBannerPayload {
  link: string;
  imageId: number;
  field: Fields;
  translations: BannerTranslates[];
}

export interface BannerTranslates extends Partial<BaseResponse> {
  lang: Lang;
  title: string;
  subTitle: string;
  shortDesc: string;
}

export interface Banner extends Partial<BaseResponse> {
  temporaryId?: string | number;
  field: Fields;
  link: string;
  translates: BannerTranslates[];
  image: ImageResponse;
}

export type TranslateDefault = Record<Lang, BannerTranslates>;
