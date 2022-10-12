import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { ActionAbility } from 'src/common/enums/actionAbility.enum';
import { IPolicies } from 'src/common/interfaces/policies.interface';
import { Action } from '../common/enums/action.enum';
import { Resource } from '../common/enums/resource.enum';
import { UserWithPoliciesDto } from './dtos/transform/userWithPolicies.dto';

export type Subjects = Resource | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(user: UserWithPoliciesDto) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );

    //  Cannot will overwrite can so we just need loop through can
    //  And we loop through cannot to overwrite can
    user.policies.forEach((policy: IPolicies) => {
      if (policy.actionAbility === ActionAbility.CAN) {
        can(policy.action, policy.resource);
      }
    });

    user.policies.forEach((policy: IPolicies) => {
      if (policy.actionAbility === ActionAbility.CANNOT) {
        cannot(policy.action, policy.resource);
      }
    });

    return build();
  }
}
