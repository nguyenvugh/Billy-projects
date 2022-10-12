import * as yup from "yup";

export const CRETE_GROUP_POLICES = yup
  .object({
    name: yup
      .string()
      .required("Xin hãy nhập tên nhóm!")
      .max(250, "Tên nhóm không được quá 250 ký tự!"),
    description: yup
      .string()
      .required("Xin hãy nhập mô tả!")
      .max(250, "Mô tả không được quá 250 ký tự!"),
  })
  .required();
