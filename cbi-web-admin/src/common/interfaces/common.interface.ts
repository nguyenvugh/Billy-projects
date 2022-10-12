import React from "react";
import { Resource } from "../casl/interfaces";

export type ROLES = "admin" | "user" | "leader";
export interface RoutesConfig {
  pathName: string;
  resource?: Resource;
  routes: RoutesConfig[];
  component: React.ReactNode;
}

export interface LeftMenuConfig {
  label: string;
  icon?: React.ReactNode;
  pathName?: string;
  authority: ROLES[];
  isHiddenOnLeftMenu?: boolean;
  isActive?: boolean;
  isParent?: boolean;
  children: LeftMenuConfig[];
  resources?: Resource;
}

export interface List<T> {
  results: T[];
  total: number;
  totalPage: number;
}

export interface Params {
  searchText?: string;
  page?: number;
  limit?: number;
}

export interface ErrorResponse {
  message: string;
  status: number;
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
