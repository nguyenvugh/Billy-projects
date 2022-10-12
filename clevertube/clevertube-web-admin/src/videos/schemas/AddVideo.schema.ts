import * as yup from "yup";

export const AddVideo = yup.object({
  name: yup
    .string()
    .required("Please enter title")
    .min(5, "Must be longer than or equal to 5 characters"),
  desc: yup
    .string()
    .required("Please enter description")
    .min(5, "Must be longer than or equal to 5 characters"),
  levelKey: yup.mixed().required("Please selected level"),
  topicKeys: yup.mixed().required("Please selected topics"),
  videoUrl: yup.string().required("Please enter url video"),
});
