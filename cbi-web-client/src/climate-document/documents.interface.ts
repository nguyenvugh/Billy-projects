import {
  UserResponse,
  FileResponse,
  BaseResponse,
} from "./../common/interfaces/common.interface";

export interface DocumentItem {
  fileKey: string;
  title: string;
}

export interface Documents extends BaseResponse {
  title: string;
  createdBy: UserResponse;
  file: FileResponse;
}

export interface DocumentsCreate {
  title: string;
  fileId: string;
}
