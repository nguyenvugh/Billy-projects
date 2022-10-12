export interface IFormAddNewAccount {
  email: string;
  password: string;
  userType: string;
  afterSubmit?: string;
}

export interface userType {
  key: number,
  name: string,
  description: string,
}

export type IAddNewAccountCallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};