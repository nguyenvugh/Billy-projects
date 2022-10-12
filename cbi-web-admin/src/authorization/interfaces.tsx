import { Action, ActionAbility, Resource } from "src/common/casl/interfaces";

export interface Policy {
  id: string;
  action: Action;
  resource: Resource;
  name: string;
  actionAbility: ActionAbility;
}

export interface ReqGroupPoliciesPostPatch {
  key?: string;
  name: string;
  description: string;
  policiesIds: string[];
}

export interface ResGroupPoliciesGet {
  key: string;
  name: string;
  description: string;
  created_at: string;
  totalMem: number;
  policies: Policy[];
}

export interface ReqGroupPoliciesDeleteMulti {
  groupPoliciesKeys: string[];
}
