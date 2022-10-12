import {
  MAX_LENGTH_100_MESS,
  MAX_LENGTH_250_MESS,
  REGEX_DATE_DDMMYYYY,
  REGEX_NOT_CONTAIN_SPECIAL_CHAR,
  REQUIRED_MESS,
  WRONG_FORMAT_MESS,
  WRONG_PHONE_MESS,
} from "@cbi/constants/index";
import * as yup from "yup";

export const UPDATE_PROFILE = yup
  .object({
    fullName: yup
      .string()
      .required(REQUIRED_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    birthday: yup
      .string()
      .required(REQUIRED_MESS)
      .matches(REGEX_DATE_DDMMYYYY, WRONG_FORMAT_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    phoneNumber: yup
      .string()
      .required(REQUIRED_MESS)
      .matches(/^[0-9]{0,11}$/, WRONG_PHONE_MESS),
    companyCode: yup
      .string()
      .required(REQUIRED_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    companyName: yup
      .string()
      .required(REQUIRED_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    position: yup
      .string()
      .required(REQUIRED_MESS)
      .matches(REGEX_NOT_CONTAIN_SPECIAL_CHAR, WRONG_FORMAT_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    address: yup
      .string()
      .required(REQUIRED_MESS)
      .matches(REGEX_NOT_CONTAIN_SPECIAL_CHAR, WRONG_FORMAT_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    numberEmployees: yup
      .string()
      .required(REQUIRED_MESS)
      .matches(/^[0-9]{0,10}$/, WRONG_FORMAT_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    revenue: yup
      .string()
      .matches(/^[0-9]{0,10}$/, WRONG_FORMAT_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    phoneNumberCompany: yup
      .string()
      .required(REQUIRED_MESS)
      .matches(/^[0-9]{0,11}$/, WRONG_PHONE_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    website: yup.string().max(100, MAX_LENGTH_100_MESS),
    workField: yup
      .string()
      .nullable()
      .required(REQUIRED_MESS)
      .matches(REGEX_NOT_CONTAIN_SPECIAL_CHAR, WRONG_FORMAT_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    documentDescription: yup.string().max(250, MAX_LENGTH_250_MESS),
    dateCreateCompany: yup
      .string()
      .nullable()
      .required(REQUIRED_MESS)
      .matches(REGEX_DATE_DDMMYYYY, WRONG_FORMAT_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    numUnofficialEmployees: yup
      .string()
      .optional()
      .matches(/^[0-9]{0,10}$/, WRONG_FORMAT_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    modelManufactoring: yup
      .string()
      .nullable()
      .required(REQUIRED_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    sizeManufactoring: yup
      .string()
      .nullable()
      .required(REQUIRED_MESS)
      .max(100, MAX_LENGTH_100_MESS),
    materialArea: yup
      .string()
      .nullable()
      .optional()
      .max(100, MAX_LENGTH_100_MESS),
  })
  .required();
