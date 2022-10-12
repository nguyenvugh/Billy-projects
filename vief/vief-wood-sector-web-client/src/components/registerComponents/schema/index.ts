import * as yup from "yup";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const schemaRegister = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Vui lòng nhập thông tin vào ô trống.")
      .min(2, "Dữ liệu không hợp lệ. Họ và tên có độ dài từ 2-100 kí tự."),
    phone: yup
      .string()
      .required("Vui lòng nhập thông tin vào ô trống.")
      .min(10, "Dữ liệu không hợp lệ. Số điện thoại bao gồm 10 chữ số."),
    email: yup.string().required("Vui lòng nhập thông tin vào ô trống.").email("Email không đúng định dạng."),
    password: yup
      .string()
      .required("Vui lòng nhập thông tin vào ô trống.")
      .matches(passwordRegex, "Dữ liệu không hợp lệ. Mật khẩu có 8 kí tự, bao gồm chữ hoa, chữ thường và số."),
    rePassword: yup
      .string()
      .required("Vui lòng nhập thông tin vào ô trống.")
      .oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp"),
  })
  .required();
