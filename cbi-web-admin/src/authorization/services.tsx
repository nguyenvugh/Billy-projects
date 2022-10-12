import { execute } from "src/common/lib/request";
import { CASL, CASL_GROUP_POLICY } from "src/common/services/urlAPI";
import {
  Policy,
  ReqGroupPoliciesDeleteMulti,
  ReqGroupPoliciesPostPatch,
  ResGroupPoliciesGet,
} from "./interfaces";

export async function getAllPolices() {
  return execute.get<Policy[]>(CASL + "/policies");
}

export async function getAllGroupPolices() {
  return execute.get<ResGroupPoliciesGet[]>(CASL_GROUP_POLICY);
}

export async function addGroupPolicy(groupPolicy: ReqGroupPoliciesPostPatch) {
  return execute.post(CASL_GROUP_POLICY, groupPolicy);
}

export async function updateGroupPolices(groupPolicy: ReqGroupPoliciesPostPatch) {
  return execute.patch(CASL_GROUP_POLICY, groupPolicy);
}

export async function getDetailGroupPolices(key: string) {
  return execute.get<ResGroupPoliciesGet>(CASL_GROUP_POLICY + "/" + key);
}

export async function deleteOneGroupPolices(key: string) {
  return execute.delete(CASL_GROUP_POLICY + "/" + key);
}

export async function deleteMultipleGroupPolices(data: ReqGroupPoliciesDeleteMulti) {
  return execute.delete(CASL_GROUP_POLICY, { data: { ...data } });
}
