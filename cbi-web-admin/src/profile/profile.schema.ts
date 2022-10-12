import { REGEX_PASSWORD } from "src/common/constants/common.constant";
import * as yup from "yup";

export const REGEX_PHONENUMBER = /^1?(\d{10,11})/;

export const profileSchema = yup
  .object({
    phoneNumber: yup
      .string()
      .max(11, "Vui lòng kiểm tra lại số điện thoại!")
      .matches(REGEX_PHONENUMBER, "Vui lòng kiểm tra lại số điện thoại!"),
    checkbox: yup.boolean(),
    oldPass: yup.string().when("checkbox", {
      is: (checkbox) => checkbox === true,
      then: yup.string().required("Xin vui lòng nhập mật khẩu"),
    }),
    newPass: yup
      .string()
      .when("checkbox", {
        is: (checkbox) => checkbox === true,
        then: yup.string().required("Xin vui lòng nhập mật khẩu mới"),
      })
      .matches(
        REGEX_PASSWORD,
        "Mật khẩu ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự thường và 1 ký tự in hoa",
      )
      .min(8, "Mật khẩu ít nhất 8 ký tự, trong đó có ít nhất 1 ký tự thường và 1 ký tự in hoa"),
    confirmNewpass: yup
      .string()
      .when("checkbox", {
        is: (checkbox) => checkbox === true,
        then: yup.string().required("Xin vui lòng xác nhận mật khẩu mới"),
      })
      .oneOf([yup.ref("newPass"), null], "Mật khẩu không trùng khớp"),
  })
  .required();
