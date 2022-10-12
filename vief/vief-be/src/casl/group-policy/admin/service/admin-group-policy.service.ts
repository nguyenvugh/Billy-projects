import { Injectable } from '@nestjs/common';
import { Not, In } from 'typeorm';
import { ADMIN_GROUP_POLICY_KEY } from '../../../../common/constants/group-policy.constant';
import { GroupPoliciesRepository } from '../../repository/group-policies.repository';

@Injectable()
export class AdminGroupPolicySerrvice {
  constructor(private groupPoliciesRepo: GroupPoliciesRepository) {}

  async getGroupPolicies() {
    const data = await this.groupPoliciesRepo.find({
      where: {
        key: Not(In([ADMIN_GROUP_POLICY_KEY])),
      },
      order: {
        key: 'ASC',
      },
    });

    return {
      data,
    };
  }
}
