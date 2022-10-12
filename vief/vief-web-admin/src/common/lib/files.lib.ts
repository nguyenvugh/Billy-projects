import axios, { AxiosStatic } from 'axios';
// import { Thumbnail } from "../interfaces/common.interfaces";
import { API_PRESIGN_URL } from '../constants/apis';
import axiosInstance from 'src/utils/axios';

export async function presignUrl(file: any, axiosInstant?: AxiosStatic) {
  if (file) {
    const imgType = file?.name?.split('.').pop() || 'png';
    const imgName = file?.name;
    try {
      const presignHeaderInfo = await axiosInstance.post(API_PRESIGN_URL, {
        type: imgType,
        fileName: imgName,
      });
      const urlPostImng = presignHeaderInfo?.data?.presign?.url;
      const headerFileds = presignHeaderInfo?.data?.presign?.fields || {};
      const id = presignHeaderInfo?.data?.fileInfo?.id;
      const formData = new FormData();
      Object.keys(headerFileds).forEach((header) => formData.append(header, headerFileds[header]));
      formData.append('file', file);

      await (axiosInstant || axios).post(urlPostImng, formData);
      const fileUrl =
        presignHeaderInfo?.data?.presign?.url + '/' + presignHeaderInfo?.data?.fileInfo.id;
      return { ...presignHeaderInfo?.data?.fileInfo, url: fileUrl, id };
    } catch (error) {
      console.log(error);
      return Promise.reject({});
    }
  }
  return Promise.resolve({});
}
