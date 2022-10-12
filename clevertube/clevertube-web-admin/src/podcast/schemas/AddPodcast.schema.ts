import * as yup from "yup";
import { REGEX_ID } from "src/common/constants/common.constants";

export const AddPodcast = yup.object({
  audioCode: yup
    .string()
    .required("Please enter id")
    .min(5, "Must be longer than or equal to 5 characters")
    .matches(REGEX_ID, "Does not contain spaces and diacritics"),
  title: yup
    .string()
    .required("Please enter name")
    .min(5, "Must be longer than or equal to 5 characters"),
  desc: yup
    .string()
    .required("Please enter description")
    .min(5, "Must be longer than or equal to 5 characters"),
  levelKey: yup.mixed().required("Please selected level"),
  topicKeys: yup.mixed().required("Please selected topics"),
  audioThumbnailId: yup.mixed().required("Please upload audioThumbnai"),
  fileId: yup.mixed().required("Please upload audio"),
});
