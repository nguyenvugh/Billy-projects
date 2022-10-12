import { Expose, Transform } from 'class-transformer';
import { IPolicies } from 'src/common/interfaces/policies.interface';
import { User } from 'src/auth/entities/user.entity';
import { ProfileDTO } from 'src/auth/dto/profile.dto';

export class UserWithPoliciesDto extends ProfileDTO {
  // Transform from array group policies, each group has array policies
  //    to just array policies
  @Expose()
  @Transform(({ obj }: { obj: User }) => {
    const value = obj.userToGroupPolicies.reduce(
      (result: IPolicies[], userToGroupPoliciesItem) => {
        userToGroupPoliciesItem?.groupPolicies?.groupToPolicies?.forEach(
          (groupToPoliciesItem) => {
            const policy: IPolicies = {
              action: groupToPoliciesItem.policies.action,
              resource: groupToPoliciesItem.policies.resource,
              actionAbility: groupToPoliciesItem.policies.actionAbility,
            };
            const isConflict = result.some(
              (item) =>
                item.action === policy.action &&
                item.resource === policy.resource &&
                item.actionAbility === policy.actionAbility,
            );
            if (!isConflict) {
              result.push(policy);
            }
          },
        );
        return result;
      },
      [],
    );
    return value;
  })
  policies: IPolicies[];
}
