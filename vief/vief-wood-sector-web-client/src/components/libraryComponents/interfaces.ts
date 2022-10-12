import { BaseEntities, Category, Fields, Lang, ListResponse } from "@/src/common/interfaces/common.interface";

export interface Translate extends BaseEntities {
  lang: Lang;
  shortDesc: string;
}
export interface Files {
  id: number;
  key: string;
  type: string;
  url: string;
}
export interface DocumentItem extends BaseEntities {
  field: Fields;
  translates: Translate;
  file: Files;
  shortDesc: string;
}

export interface LibraryPageProps {
  listItem: ListResponse<DocumentItem>;
  categories: Category[];
}

export type docProps = {
  docItem: DocumentItem;
};
export type docArrayProps = {
  listItem: DocumentItem[];
};
export interface FileDownload {
  key?: string;
  fileName?: string;
  type?: string;
  url?: string;
}

export interface FileDownloadProps {
  file: FileDownload;
}
