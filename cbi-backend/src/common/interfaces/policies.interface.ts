import { Action } from 'src/common/enums/action.enum';
import { ActionAbility } from 'src/common/enums/actionAbility.enum';
import { Resource } from 'src/common/enums/resource.enum';

export interface IPolicies {
  action: Action;
  resource: Resource;
  actionAbility: ActionAbility;
}
