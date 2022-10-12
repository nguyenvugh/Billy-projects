import { execute } from "src/common/lib/request/index";
import { LEVELS } from "src/common/constants/urlAPI";

export const getLevel = async (id) => {
  return await execute.get(`${LEVELS}/${id}`);
};

export const getAllLevels = async () => {
  return await execute.get(`${LEVELS}?page=1&limit=20`);
};

export const getLevels = async (page, limit) => {
  return await execute.get(`${LEVELS}?page=${page}&limit=${limit}`);
};

export const addLevel = async (todo) => {
  return await execute.post(LEVELS, todo);
};

export const editLevel = async (todo) => {
  return await execute.put(`${LEVELS}/${todo[0]}`, todo[1]);
};

export const deleteLevels = async (keys: string[]) => {
  return await execute.delete(`${LEVELS}`, { params: { keys } });
};

export const deleteAllLevels = (id) => {
  return execute.delete(`${LEVELS}?keys=${id}`, id);
};
