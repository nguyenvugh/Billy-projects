import * as yup from "yup";

export const DictionarySchema = yup.object({
  newWord: yup
    .string()
    .required("Vui lòng nhập từ mới!")
    .max(20, "Từ mới phải dưới 20 kí tự!"),
  // example: yup.string().required("Vui lòng nhập ví dụ cho từ mới!"),
  description: yup
    .string()
    .required(" Vui lòng nhập mô tả cho từ mới!")
    .max(150, "Mô tả từ phải dưới 150 kí tự!"),
});
