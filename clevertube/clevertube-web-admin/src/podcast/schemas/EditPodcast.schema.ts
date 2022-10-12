import * as yup from "yup";

export const EditPodcast = yup.object({
  title: yup
    .string()
    .required("Please enter name.")
    .min(5, "Must be longer than or equal to 5 characters"),
  desc: yup
    .string()
    .required("Please enter description")
    .min(5, "Must be longer than or equal to 5 characters"),
  fileId: yup
    .string()
    .required("Please enter fileId")
    .min(1, "Must be longer than or equal to 1 characters"),
  audioThumbnailId: yup
    .string()
    .required("Please enter audioThumbnailId")
    .min(1, "Must be longer than or equal to 1 characters"),
  levelKey: yup.mixed().required("Please selected level"),
});
