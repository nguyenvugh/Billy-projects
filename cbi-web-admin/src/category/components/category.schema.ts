import * as yup from "yup";

export const schema = yup
  .object({
    categoryName: yup.string().required("Xin hãy nhập danh mục!").min(3, "Tên danh mục quá ngắn!"),
  })
  .required();
