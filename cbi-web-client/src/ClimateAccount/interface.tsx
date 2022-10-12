export interface ClimateAccountI {
  userInfor: Object;
}

export interface MenuItemI {
  id: number;
  name: string;
  text: string;
}

interface userCompanyI {
  address: string;
  id: string;
  name: string;
  numberEmployees: number;
  phoneNumber: string;
  position: string;
  revenue: number;
  website: string;
  workField: string;
  dateCreateCompany: string;
  numUnofficialEmployees: number;
  modelManufactoring: string;
  sizeManufactoring: string;
  materialArea: string;
  isApplyWorkingDiary: number;
  isapplyDigital: number;
}
interface userDocumentI {
  description: string;
  id: string;
  file?: AvatarUserI;
}

export interface ResponseUserInforI {
  avatar?: AvatarUserI;
  birthday: string;
  email: string;
  fullName: string;
  id: string;
  phoneNumber: string;
  status: string;
  userCompany: userCompanyI;
  userDocument: userDocumentI;
  companyCode: string;
}

export interface AvatarUserI {
  bucket: string;
  id: string;
  key: string;
  size: number;
  type: string;
  url: string;
  verified: number;
}

export interface GeneralInfoI {
  UserInfor: ResponseUserInforI;
}

export interface TypePresignI {
  type: string;
}

export interface FormGeneralParamI {
  fullName: string;
  birthday?: string;
  phoneNumber: string;
  companyName: string;
  position: string;
  address?: string;
  numberEmployees: number;
  revenue: number;
  phoneNumberCompany?: string;
  website?: string;
  workField: string;
  avatarId?: string;
  documentId?: string;
  documentDescription?: string;
}

export interface fileProfileI {
  url: string;
  id: string;
}
