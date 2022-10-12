import axios, { AxiosStatic } from "axios";
import { Thumbnail } from "../interfaces/common.interfaces";
import { PRESIGN_URL } from "../constants/urlAPI";
import { execute } from "./request";

export async function presignUrl(
  file,
  axiosInstant?: AxiosStatic
): Promise<Partial<Thumbnail>> {
  if (file) {
    const imgType = file?.name?.split(".").pop() || "png";
    try {
      const presignHeaderInfo = await execute.post(PRESIGN_URL, {
        type: imgType,
      });
      const urlPostImng = presignHeaderInfo?.data?.presign?.url;
      const headerFileds = presignHeaderInfo?.data?.presign?.fields || {};
      const id = presignHeaderInfo?.data?.audio?.id;
      const formData = new FormData();
      Object.keys(headerFileds).forEach((header) =>
        formData.append(header, headerFileds[header])
      );
      formData.append("file", file);

      await (axiosInstant || axios).post(urlPostImng, formData);
      const fileUrl =
        presignHeaderInfo?.data?.presign?.url + "/" + presignHeaderInfo?.data?.audio?.key;
      return { ...presignHeaderInfo?.data?.audio, url: fileUrl, id };
    } catch (error) {
      console.log(error);
      return Promise.reject({});
    }
  }
  return Promise.resolve({});
}
