import {
  BaseResponse,
  FileResponse,
  List,
  UserResponse,
} from "src/common/interfaces/common.interface";

export interface DocumentI {
  id: number;
  title: string;
  file: string;
}

export interface TableContainerI {
  handleSelectRow: (_id: string, _isChecked: boolean) => void;
  listSelected: string[];
  documentData?: List<Documents>;
  onPageChange: (_page: number) => void;
  currentPage: number;
}

export interface HeaderDocumentI {
  handleSelectAllClick: (isChecked: boolean) => void;
  onSearch: (searchText?: string) => void;
  onDelete: () => void;
  listSelected: string[];
  isCheckedAll: boolean;
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
