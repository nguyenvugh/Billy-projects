import { REGEX_PASSWORD } from "src/common/constants/common.constant";
import * as yup from "yup";

export const adminDetailSchema = yup
  .object({
    username: yup
      .string()
      .required("Tên đăng nhập được yêu cầu.")
      .max(250, "Tên đăng nhập không vượt quá 250 kí tự.")
      .min(5, "Tên đăng nhập không dưới 5 kí tự."),
    status: yup.string().required("Trạng thái được yêu cầu"),
    fullName: yup.string().nullable().max(250, "Tên đầy đủ không vượt quá 250 kí tự."),
    phoneNumber: yup.string().nullable().max(11, "Số điện thoại không được quá 11 số"),
    groupPolicyKey: yup.string().required("Tên nhóm được yêu cầu."),
    password: yup
      .string()
      .nullable()
      .matches(
        REGEX_PASSWORD,
        "Mật khẩu ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự thường và 1 ký tự in hoa",
      ),
    confirmPassword: yup
      .string()
      // .nullable()
      .oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp"),
  })
  .required();
