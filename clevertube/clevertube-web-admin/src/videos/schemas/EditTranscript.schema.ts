import * as yup from "yup";

export const EditTranscript = yup.object({
  videoUrl: yup.string().required("Please enter url video"),
});
