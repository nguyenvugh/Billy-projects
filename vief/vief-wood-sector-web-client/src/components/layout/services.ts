import { ENTERPRISE_CATEGORY, EVENT_CATEGORY, LIBRARY_CATEGORY, POLICY_CATEGORY } from "@/src/common/constants/urlAPI";
import { execute } from "@/src/common/lib/request";

export const getCategoryPolicyServices = () => {
  return execute.get(POLICY_CATEGORY);
};

export const getCategoryEventServices = () => {
  return execute.get(EVENT_CATEGORY);
};

export const getCategoryCompanyServices = () => {
  return execute.get(ENTERPRISE_CATEGORY);
};

export const getCategoryLibaryServices = () => {
  return execute.get(LIBRARY_CATEGORY);
};
