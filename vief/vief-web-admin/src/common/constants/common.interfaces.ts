export type Fields = 'ALL' | 'WOOD';
export type Lang = 'en' | 'vi';
export type FileType = 'png' | 'jpg' | 'jpeg' | 'pdf';

export enum LANG {
  VI = 'vi',
  EN = 'en',
}
export interface PresignedResponse {
  id: number;
  url: string;
}
export interface BaseResponse {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  version: number;
  id: number;
}
export interface ImageResponse {
  id: number;
  key: string;
  type: FileType;
  url: string | null;
  fileName?: string;
}

export interface ThumbnailCategory {
  id: number;
  url: string | null;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface LangObj {
  label: string;
  value: Lang;
  icon: string;
}
export interface SearchParams {
  page?: number;
  size?: number;
  keyWord?: string;
  field?: Fields;
}

export type ISelectedLang = {
  payload: LangObj;
  type: string;
};
export interface ICallback {
  onSuccess: VoidFunction;
  onError: (error: any) => void;
}
