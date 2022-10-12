import { DEPARTMENT_NAME } from '../constants/global.constant';

export const validateGroupOfData = (group: string) => {
  if (!group || DEPARTMENT_NAME.WOOD != group) {
    return false;
  }

  return true;
};
