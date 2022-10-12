import * as yup from "yup";
import { REGEX_PASSWORD } from "src/common/constants/common.constants";

export const LoginPageSchema = yup.object({
  emailLogin: yup.string().required("Bạn chưa nhập tên tài khoản."),
  passwordLogin: yup
    .string()
    .required("Bạn chưa nhập mật khẩu.")
    .matches(
      REGEX_PASSWORD,
      "Mật khẩu bắt buộc ít nhất 8 kí tự, trong đó có ít nhất 1 kí tự thường, 1 kí tự viết hoa, và 1 chữ số"
    ),
});
