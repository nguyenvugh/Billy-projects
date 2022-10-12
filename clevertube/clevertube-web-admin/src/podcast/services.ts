import { execute } from "src/common/lib/request/index";
import {
  PODCASTS,
  PODCASTS_CONVERT_TO_TEXT,
  PODCASTS_TRANSCRIBING_STATUS,
  PRESIGN_URL,
} from "src/common/constants/urlAPI";

export const getPodcast = async (id) => {
  return await execute.get(`${PODCASTS}/${id}`, id);
};

export const getAllPodcasts = async (page: number, limit: number) => {
  return await execute.get(`${PODCASTS}?page=${page}&limit=${limit}`);
};

export const addPodcast = async (todo) => {
  return await execute.post(PODCASTS, todo);
};

export const editPodcast = async (todo) => {
  return await execute.patch(`${PODCASTS}/${todo[0]}`, todo[1]);
};

export const deletePodcast = async (id) => {
  return await execute.delete(`${PODCASTS}`, { data: id });
};

export const deleteAllPodcasts = (ids) => {
  return execute.delete(`${PODCASTS}`, { data: ids });
};

export const addFiles = async (file) => {
  return await execute.post(PRESIGN_URL, file);
};

export const addConvertToText = async (file) => {
  return await execute.post(PODCASTS_CONVERT_TO_TEXT, file);
};

export const getTranscribingStatus = async (id) => {
  return await execute.get(`${PODCASTS_TRANSCRIBING_STATUS}?name=${id}`, id);
};
