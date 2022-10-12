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

export interface IconBtnType extends IconButtonProps {
  styleProps?: ChakraProps;
}

export interface DataType {
  audioCode: string;
  audioTypeKey: string;
  title: string;
  desc: string;
  fileId: string | number;
  audioThumbnailId: string | number;
  topicKeys: string[];
  levelKey: string;
}

export interface AttributeType {
  audioCode: string;
  audioTypeKey: string;
  title: string;
  desc: string;
  fileId: string | number;
  audioThumbnailId: string | number;
  topicKeys: string | string[];
  levelKey: string;
}

export interface ErrorType {
  fileId: string;
  audioThumbnailId: string;
}

export interface SearchType {
  instanceTable: any;
  instanceMultiple: any;
  instanceGetAllPodcasts: UseQueryResult<AxiosResponse<any, any>, unknown>;
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

export interface TableListType {
  instanceTable: any;
  instanceGetPodcast: any;
  instanceGetAllPodcasts: any;
  instanceMultiple: any;
  onOpenDeletePodcast: any;
  onOpenEditPodcast: any;
}

export interface ModalAddPodcastType {
  isOpenAddPodcast: boolean;
  onCloseAddPodcast: () => void;
  instanceGetAllPodcasts: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalEditPodcastType {
  isOpenEditPodcast: boolean;
  onCloseEditPodcast: () => void;
  instanceGetPodcast: any;
  instanceGetAllPodcasts: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalDeletePodcastType {
  isOpenDeletePodcast: boolean;
  onCloseDeletePodcast: () => void;
  instanceGetAllPodcasts: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface ModalDeleteAllPodcastType {
  isOpenDeleteAllPodcasts: boolean;
  onCloseDeleteAllPodcasts: () => void;
  instanceGetAllPodcasts: UseQueryResult<AxiosResponse<any, any>, unknown>;
  instanceMultiple: any;
}

export interface InitialStatePodcastType {
  search: string;
  selectedItemIds: Array<string>;
  isChecked: boolean;
  isLoading: boolean;
  isFetching: boolean;
  checkedItem: boolean;
  checkedItemAll: boolean;
}
