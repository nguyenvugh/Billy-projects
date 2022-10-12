import { REGEX_PASSWORD } from "src/common/constants/common.constant";
import * as yup from "yup";

export const USER_CLIENT_CHANGE_PASS = yup
  .object({
    password: yup
      .string()
      .required("Xin hãy mật khẩu!")
      .max(250, "Mô tả không được quá 250 ký tự!")
      .matches(REGEX_PASSWORD, "Mật khẩu phải chứa ít nhất 1 kí tự thường, in hoa và số!"),
    confirmPassword: yup
      .string()
      .required("Xin hãy nhập xác nhận mật khẩu!")
      .max(250, "Mô tả không được quá 250 ký tự!")
      .oneOf([yup.ref("password"), null], "Xác nhận mật khẩu không trùng khớp!"),
  })
  .required();
