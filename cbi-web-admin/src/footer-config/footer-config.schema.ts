import * as yup from "yup";

const validatePhone = /^\d{10,11}$/;
export const footerConfigSchema = yup.object({
  companyName: yup.string().max(250, "Tên công ty không vượt quá 250 kí tự"),
  email: yup
    .string()
    .max(250, "Email không vượt quá 250 kí tự")
    .email("Email không đúng định dạng"),
  hotline: yup.string().matches(validatePhone, "Vui lòng kiểm tra lại số điện thoại"),
  address: yup.string().max(250, "Địa chỉ không vượt quá 250 kí tự"),
});
