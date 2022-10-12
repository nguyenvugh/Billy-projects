import { execute } from "src/common/lib/request/index";
import { TOPICS } from "src/common/constants/urlAPI";

export const getTopic = async (id) => {
  return await execute.get(`${TOPICS}/${id}`, id);
};

export const getAllTopics = async (page: number, limit: number) => {
  return await execute.get(`${TOPICS}?page=${page}&limit=${limit}`);
};

export const addTopic = async (todo) => {
  return await execute.post(TOPICS, todo);
};

export const editTopic = async (todo) => {
  return await execute.put(`${TOPICS}/${todo[0]}`, todo[1]);
};

export const deleteTopic = async (id) => {
  return await execute.delete(`${TOPICS}/${id}`, id);
};

export const deleteAllTopics = (id) => {
  return execute.delete(`${TOPICS}?keys=${id}`, id);
};
