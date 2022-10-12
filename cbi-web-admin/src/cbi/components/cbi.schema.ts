import * as yup from "yup";

export const QUESTION_TABLE_SCHEMA = yup
  .object({
    name: yup
      .string()
      .required("Xin hãy nhập tên bảng câu hỏi!")
      .max(100, "Xin hãy nhập dưới 100 ký tự!"),
    description: yup
      .string()
      .required("Xin hãy nhập mô tả")
      .max(100, "Xin hãy nhập dưới 100 ký tự!"),
  })
  .required();

export const CATEGORY_QUESTIN_SCHEMA = yup
  .object({
    category: yup
      .string()
      .required("Xin hãy nhập danh mục")
      .max(100, "Xin hãy nhập dưới 250 ký tự!"),
  })
  .required();

export const PHASE_SCHEMA = yup
  .object({
    name: yup
      .string()
      .required("Xin hãy nhập tên giai đoạn")
      .max(100, "Xin hãy nhập dưới 100 ký tự!"),
  })
  .required();

export const QUIZ_GROUP_SCHEMA = yup
  .object({
    name: yup.string().required("Name is required!"),
  })
  .required();

export const QUIZ_CATEGORY_SCHEMA = yup
  .object({
    name: yup.string().required("Name is required!"),
  })
  .required();
