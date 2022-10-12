import { VIDEOS, VIEOS_TRANSCRIPT } from "src/common/constants/urlAPI";
import { execute } from "src/common/lib/request/index";
import {
  GetTranscriptParams,
  GetVideosParams,
  UpdateAttributes,
  UpdateTranscript,
} from "./interface";

export const getVideos = async (params: GetVideosParams) => {
  return (await execute.get(`${VIDEOS}`, { params })).data;
};

export const getVideoById = async (id: number) => {
  return (await execute.get(`${VIDEOS}/${id}`)).data;
};

export const deleteVideos = async (ids: number[]) => {
  return (await execute.delete(`${VIDEOS}`, { data: { ids } })).data;
};

export const getTranscript = async (params: GetTranscriptParams) => {
  return (await execute.get(`${VIEOS_TRANSCRIPT}`, { params })).data;
};

export const createVideo = async (video) => {
  return await execute.post(VIDEOS, video);
};

export const updateTranscript = async (params: UpdateTranscript) => {
  return await execute.patch(VIEOS_TRANSCRIPT, params);
};

export const updateAttributes = async (params: UpdateAttributes) => {
  return await execute.patch(VIDEOS, params);
};

export const deleteTranscript = async (transcriptId: number) => {
  return await execute.delete(VIEOS_TRANSCRIPT, { data: { transcriptId } });
};
