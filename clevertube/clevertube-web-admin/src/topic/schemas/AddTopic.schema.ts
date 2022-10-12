import * as yup from "yup";
import { REGEX_ID } from "src/common/constants/common.constants";

export const AddTopic = yup.object({
  key: yup
    .string()
    .required("Please enter key")
    .min(5, "Must be longer than or equal to 5 characters")
    .matches(REGEX_ID, "Does not contain spaces and diacritics"),
  name: yup
    .string()
    .required("Please enter name")
    .min(5, "Must be longer than or equal to 5 characters"),
  description: yup
    .string()
    .required("Please enter description")
    .min(5, "Must be longer than or equal to 5 characters"),
  imageId: yup.mixed().required("Please upload image topic"),
  lang: yup.mixed().required("Please select language"),
});
