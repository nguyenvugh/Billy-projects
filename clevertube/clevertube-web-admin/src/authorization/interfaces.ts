import { Action, ActionAbility, Resource } from "src/common/casl/interfaces";

export interface Policy {
  id: string;
  action: Action;
  resource: Resource;
  name: string;
  actionAbility: ActionAbility;
}
