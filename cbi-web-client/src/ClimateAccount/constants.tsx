import { TAB_ACCOUNT } from "@cbi/constants/index";
import { number, string } from "prop-types";
import { ResponseUserInforI } from "./interface";

export const menuItems = [
  {
    id: 1,
    name: TAB_ACCOUNT.PROFILE_ACCOUNT,
    text: "Hồ sơ của tôi",
  },
  {
    id: 2,
    name: TAB_ACCOUNT.CHANGE_PASSWORD,
    text: "Thay đổi mật khẩu",
  },
  {
    id: 3,
    name: TAB_ACCOUNT.RESULT_EVALUATE,
    text: "Kết quả của tôi",
  },
];

export const AvatarDefault = {
  bucket: "",
  id: "",
  key: "",
  size: 0,
  type: "",
  url: "",
  verified: 0,
};

const userCompany = {
  address: "",
  id: "",
  name: "",
  numberEmployees: 0,
  phoneNumber: "",
  position: "",
  revenue: 0,
  website: "",
  workField: "",
  dateCreateCompany: "",
  numUnofficialEmployees: 0,
  modelManufactoring: "",
  sizeManufactoring: "",
  materialArea: "",
  isApplyWorkingDiary: -1,
  isapplyDigital: -1,
};
const userDocument = {
  description: "",
  id: "",
};
export const UserInfoDefault: ResponseUserInforI = {
  avatar: AvatarDefault,
  birthday: "",
  email: "",
  fullName: "",
  id: "",
  phoneNumber: "",
  status: "",
  userCompany,
  userDocument,
  companyCode: "",
};

export const FormGeneralDefault = {
  fullName: "",
  birthday: "",
  phoneNumber: "",
  companyName: "",
  companyCode: "",
  position: "",
  address: "",
  numberEmployees: 0,
  revenue: 0,
  phoneNumberCompany: "",
  website: "",
  workField: "",
  documentDescription: "",
  dateCreateCompany: "",
  numUnofficialEmployees: 0,
  modelManufactoring: "",
  sizeManufactoring: "",
  materialArea: "",
  isApplyWorkingDiary: -1,
  isapplyDigital: -1,
};

export const ErrorFormGeneralDefault = {
  fullName: "",
  birthday: "",
  phoneNumber: "",
  companyName: "",
  position: "",
  address: "",
  numberEmployees: "",
  revenue: "",
  phoneNumberCompany: "",
  website: "",
  workField: "",
  documentDescription: "",
};

export const DefaultChangePassword = {
  password: "",
  confirmPassword: "",
  oldPassword: "",
};
