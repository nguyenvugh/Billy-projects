import axios, { AxiosStatic } from "axios";
import { PresignRes, Thumbnail } from "../interfaces/files.interface";
import { FILES_PRESIGN } from "../services/urlAPI";
import { execute } from "./request";

export async function presignUrl(
  file: File,
  axiosInstant?: AxiosStatic,
): Promise<Partial<Thumbnail>> {
  if (file) {
    const imgType = file.type.split("/")[1] || "png";
    try {
      const presignHeaderInfo = await execute.post<PresignRes>(FILES_PRESIGN, { type: imgType });
      const urlPostImng = presignHeaderInfo.data.presign.url;
      const headerFileds = presignHeaderInfo.data.presign.fields || {};
      const formData = new FormData();
      Object.keys(headerFileds).forEach((header) => formData.append(header, headerFileds[header]));
      formData.append("file", file);

      await (axiosInstant || axios).post(urlPostImng, formData);
      const fileUrl = presignHeaderInfo.data.presign.url + "/" + presignHeaderInfo.data.image.key;
      return { ...presignHeaderInfo.data.image, url: fileUrl };
    } catch (error) {
      console.log(error);
      return Promise.reject({});
    }
  }
  return Promise.resolve({});
}
