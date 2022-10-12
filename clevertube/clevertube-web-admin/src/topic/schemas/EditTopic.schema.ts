import * as yup from "yup";

export const EditTopic = yup.object({
  name: yup
    .string()
    .required("Please enter name")
    .min(5, "Must be longer than or equal to 5 characters"),
  description: yup
    .string()
    .required("Please enter description")
    .min(5, "Must be longer than or equal to 5 characters"),
  imageId: yup.mixed().required("Please upload image topic"),
  lang: yup.string().required("Please select language"),
});
