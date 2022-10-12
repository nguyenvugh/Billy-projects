import { Limit } from '../constants/paginate.constant';

export const parseOffsetAndLimit = (page: number, limit: number = Limit) => {
  const finalPage = page ? page - 1 : 0;
  const offset = finalPage * limit;

  return { offset, limit };
};
