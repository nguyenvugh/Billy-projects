import { REGEX_PASSWORD } from "src/common/constants/common.constant";
import * as yup from "yup";

export const newAdminSchema = yup
  .object({
    username: yup
      .string()
      .required("Tên đăng nhập được yêu cầu.")
      .max(250, "Tên đăng nhập không vượt quá 250 kí tự."),
    status: yup.string().required("Trạng thái được yêu cầu"),
    fullName: yup.string().max(250, "Tên đầy đủ không vượt quá 250 kí tự."),
    groupPolicyKey: yup.string().required("Tên nhóm được yêu cầu"),
    phoneNumber: yup.string().max(11, "Số điện thoại không được quá 11 số"),
    newPassword: yup
      .string()
      .required("Mật khẩu được yêu cầu")
      .matches(
        REGEX_PASSWORD,
        "Mật khẩu ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự thường và 1 ký tự in hoa",
      ),
    confirmNewPassword: yup
      .string()
      .required("Xác nhận mật khẩu được yêu cầu")
      .oneOf([yup.ref("newPassword"), null], "Mật khẩu không trùng khớp"),
  })
  .required();
