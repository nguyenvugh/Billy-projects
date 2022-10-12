import * as yup from "yup";

export const newUserSchema = yup.object({
  name: yup.string().required("Your Name is required"),
  age: yup.string().required("Your age is required"),
  address: yup.string().required("Your address is required"),
});
