import { ButtonProps, ChakraProps, IconButtonProps } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { UseQueryResult } from "react-query";

export interface ButtonType extends ButtonProps {
  label: String;
  styleProps?: ChakraProps;
}

export interface IconButtonType extends IconButtonProps {
  styleProps?: ChakraProps;
}

export interface TextFieldType {
  label: number | string;
}

export interface ErrorType {
  imageId: string;
}

export interface IconBtnType extends IconButtonProps {
  styleProps?: ChakraProps;
}

export interface DataType {
  key?: string | undefined;
  name: string;
  description: string;
  imageId: string | number;
  lang: string;
}

export interface LengthType {
  name: number;
  description: number;
}

export interface SearchType {
  instanceTable: any;
  instanceMultiple: any;
  instanceGetAllTopics: UseQueryResult<AxiosResponse<any, any>, unknown>;
}

export interface PaginateTopType {
  meta: any;
  setPageSize: any;
  setPage: Dispatch<SetStateAction<number>>;
  setLimit: Dispatch<SetStateAction<number>>;
}

export interface PaginationBottomType {
  meta: any;
  setPage: Dispatch<SetStateAction<number>>;
}

export interface FindPageType {
  instanceTable: any;
}

export interface TableListType {
  instanceTable: any;
  instanceGetTopic: any;
  instanceGetAllTopics: any;
  instanceMultiple: any;
  onOpenDeleteTopic: any;
  onOpenEditTopic: any;
}

export interface ModalAddTopicType {
  isOpenAddTopic: boolean;
  onCloseAddTopic: () => void;
  instanceGetAllTopics: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalEditTopicType {
  isOpenEditTopic: boolean;
  onCloseEditTopic: () => void;
  instanceGetTopic: any;
  instanceGetAllTopics: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalDeleteTopicType {
  isOpenDeleteTopic: boolean;
  onCloseDeleteTopic: () => void;
  instanceGetAllTopics: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalDeleteAllTopicType {
  isOpenDeleteAllTopics: boolean;
  onCloseDeleteAllTopics: () => void;
  instanceGetAllTopics: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface InitialStateTopicType {
  search: string;
  page: number;
  limit: number;
  selectedItemIds: Array<string>;
  isChecked: boolean;
  isLoading: boolean;
  isFetching: boolean;
  checkedItem: boolean;
  checkedItemAll: boolean;
}

export interface DropZoneImageTopicType {
  state: any;
  setState: any;
  messError: any;
  setMessError: any;
  handleUploadFileThumb: any;
  successAddTopic?: any;
  onChange: any;
  url?: any;
}
