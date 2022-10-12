export interface InputValueLoginType {
  emailLogin: string;
  passwordLogin: string;
}
export interface InitialStateType {
  userInfo: InputValueLoginType;
  rememberUser: boolean;
  clickSubmit: boolean;
}
