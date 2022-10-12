import axios from "@ltp/services/axios";
import { urlMediaUpload } from "@ltp/services/urlAPI";

/**
 * @param {file} file - file is FormData with arg1: "file". Can use uploadImage(...)
 * has been defined
 */
export const postImage = (params) => {
  const headers = {
    "Content-Type": "multipart/form-data",
    accept: "*/*",
  };
  return axios.post(urlMediaUpload, params, headers);
};

/**
 *
 * @param {file} image - get value from FileReader().readAsDataURL()
 */
export const uploadImage = async (image, defaultImageId) => {
  try {
    if (image instanceof Blob) {
      const formData = new FormData();
      formData.append("file", image);
      const request = await postImage(formData);
      const { status, data } = await request;
      if (status >= 200 && status < 300) {
        const { id, name, url } = data;
        return { id, name, url };
      }
    }
    return { id: defaultImageId };
  } catch (error) {
    throw new Error(error);
  }
};
