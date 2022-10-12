import { FileResponse, Params } from "src/common/interfaces/common.interface";
import { Status } from "../common/constants/common.constant";
export interface UserAccountList {
  id: string;
  status: Status;
  fullName: string;
  phoneNumber: string;
  email: string;
}
export interface GetUserAccountParams extends Params {
  status?: Status;
}

export interface UpdateStatusUserAccount {
  userId: string;
  status: Status;
  lockReason?: string;
}

export interface UserCompany {
  id: string;
  name: string;
  position: string;
  numberEmployees: number;
  revenue: number;
  address: string;
  phoneNumber: string;
  website: string;
  workField: string;
  numUnofficialEmployees: number;
  dateCreateCompany: string;
  modelManufactoring: string;
  sizeManufactoring: string;
  materialArea: string;
  isApplyWorkingDiary: number;
  isapplyDigital: number;
}

export interface UserDocuments {
  id: string;
  description: string;
  file: FileResponse;
}

export interface UserAccountDetail {
  id: string;
  birthday: string;
  status: Status;
  fullName: string;
  phoneNumber: string;
  email: string;
  userCompany: UserCompany;
  userDocument: UserDocuments;
  avatar: FileResponse;
  lockReason: string;
  createdAt: string;
}

export interface ChangeUserPassword {
  userId: string;
  password: string;
  confirmPassword: string;
}
