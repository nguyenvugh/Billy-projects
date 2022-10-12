import * as yup from "yup";
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const schemaLogin = yup
  .object()
  .shape({
    email: yup.string().required("Vui lòng nhập thông tin vào ô trống.").email("Email không đúng định dạng."),
    password: yup.string().required("Vui lòng nhập thông tin vào ô trống."),
  })
  .required();

export const schemaForgotPassword = yup
  .object()
  .shape({
    email: yup.string().required("Vui lòng nhập thông tin vào ô trống.").email("Email không đúng định dạng."),
  })
  .required();

export const schemaResetPassword = yup
  .object()
  .shape({
    password: yup
      .string()
      .required("Vui lòng nhập thông tin vào ô trống.")
      .matches(passwordRegex, "Dữ liệu không hợp lệ. Mật khẩu có 8 kí tự, bao gồm chữ hoa, chữ thường và số."),
    confirmPassword: yup
      .string()
      .required("Vui lòng nhập thông tin vào ô trống.")
      .oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp"),
  })
  .required();
