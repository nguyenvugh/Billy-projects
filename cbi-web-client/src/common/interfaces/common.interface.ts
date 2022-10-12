export interface PageParams {
  page?: number;
  limit?: number;
}

export enum LangEnum {
  "vi",
  "en",
}

export interface List<T> {
  results: T[];
  total: number;
  totalPage: number;
}

export interface FileResponse {
  id: string;
  type: string;
  key: string;
  bucket: string;
  size: number;
  verified: number;
  url: string;
}

export interface UserResponse {
  id: string;
  email: string;
  fullName: string;
}

export interface BaseResponse {
  deletedAt: string;
  createdAt: string;
  updatedAt: string;
  version: number;
  id: string;
}
