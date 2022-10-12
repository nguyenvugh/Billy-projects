import {
  BaseResponse,
  Fields,
  ImageResponse,
  Lang,
  SearchParams,
} from 'src/common/constants/common.interfaces';

export interface DocumentTranslate {
  lang: Lang;
  shortDesc: string;
}

export type IFormDocumentTranslate = {
  [lang in Lang]: {
    shortDesc: string;
  };
};

export interface Document extends BaseResponse {
  field: Fields;
  file: ImageResponse;
  translates: (DocumentTranslate & BaseResponse)[];
}

export interface DocumentPayload {
  field: Fields;
  fileId: number;
  translations: DocumentTranslate[];
}

export interface DocumentForm {
  field: Fields;
  translations: IFormDocumentTranslate;
  fileId: any;
}

export interface IDocumentCallback {
  onSuccess: VoidFunction;
  onError: (error: any) => void;
}

export interface IPropsDocumentTableRow {
  row: Document;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
}

export interface DocumentSearchParams extends SearchParams {
  shortDesc?: string;
}
