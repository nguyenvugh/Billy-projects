import { Fields } from 'src/common/constants/common.interfaces';

export interface IAdminAccount {
  id: number;
  email:string;
  userType :userType[];
}

interface userType {
  key:string;
  name:string;
  description : string
}

export type IAdminAccounts = Array<IAdminAccount>;

export type IResAdminAccounts = {
  data: IAdminAccounts;
  total: number;
};

export type IQueryGetAdminAccounts = {
  page: number;
  size: number;
};

export type IAdminAccountCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export type IPropsAdminAccountTableRow = {
  row: IAdminAccount;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: (checked: boolean) => void;
  onDeleteRow: VoidFunction;
};

export interface AdminAccountSearchParams {
  page?: number;
  size?: number;
  title?: string;
  field?: Fields;
}
