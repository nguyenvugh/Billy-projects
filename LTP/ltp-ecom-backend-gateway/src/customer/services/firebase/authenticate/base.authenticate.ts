export enum SocialAccountType {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
}

export enum AuthenticateStatus {
  OK = 'ok',
  FAIL = 'fail',
}

export enum AuthenticateError {
  BAD_REQUEST = 'bad request',
  WRONG_UID = 'wrong uid',
}

export interface AuthenticateResultInterface {
  status: AuthenticateStatus;
  uid: string;
  name: string;
  email: string;
  phone_number: string;
  error: AuthenticateError;
}

export interface AuthenticateDriverInterface {
  verify(data: any): Promise<AuthenticateResultInterface>;
}
