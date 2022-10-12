import * as yup from "yup";

export const schema = yup
  .object({
    status: yup.string().required("Xin hãy nhập trạng thái!"),
    title: yup
      .string()
      .required("Xin hãy nhập tiêu đề!")
      .min(3, "Mô tả tối thiểu 3 ký tự!")
      .max(100, "Mô tả không được quá 250 ký tự!"),
    description: yup
      .string()
      .required("Xin hãy nhập mô tả!")
      .max(250, "Mô tả không được quá 250 ký tự!"),
    authorName: yup
      .string()
      .required("Xin hãy nhập tác giả!")
      .max(250, "Mô tả không được quá 250 ký tự!"),
    idCategory: yup.string().required("Xin hãy nhập chuyên mục!"),
  })
  .required();
