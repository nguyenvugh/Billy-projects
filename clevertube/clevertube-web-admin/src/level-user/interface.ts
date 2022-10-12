import { ButtonProps, ChakraProps, IconButtonProps } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
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

export interface IconBtnType extends IconButtonProps {
  styleProps?: ChakraProps;
}

export interface DataType {
  key: string;
  name: string;
  description: string;
  enabled: string | number;
  lang: string;
}

export interface SearchType {
  instanceTable: any;
  instanceMultiple: any;
  instanceGetAllLevels: UseQueryResult<AxiosResponse<any, any>, unknown>;
}

export interface PaginationType {
  instanceTable: any;
}

export interface FindPageType {
  instanceTable: any;
}

export interface TableListType {
  instanceTable: any;
  instanceMultiple: any;
}

export interface ModalAddLevelType {
  isOpenAddLevel: boolean;
  onCloseAddLevel: () => void;
  instanceGetAllLevels: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalEditLevelType {
  isOpenEditLevel: boolean;
  onCloseEditLevel: () => void;
  instanceGetLevel: any;
  instanceGetAllLevels: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalDeleteLevelType {
  isOpenDeleteLevel: boolean;
  onCloseDeleteLevel: () => void;
  instanceGetAllLevels: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalDeleteAllLevelType {
  isOpenDeleteAllLevels: boolean;
  onCloseDeleteAllLevels: () => void;
  instanceGetAllLevels: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface InitialStateLevelType {
  search: string;
  selectedItemIds: Array<string>;
  isChecked: boolean;
  isLoading: boolean;
  isFetching: boolean;
  checkedItem: boolean;
  checkedItemAll: boolean;
}
