import { EntityRepository, Repository } from 'typeorm';
import { GroupPolicies } from '../entity/group-policies.entity';

@EntityRepository(GroupPolicies)
export class GroupPoliciesRepository extends Repository<GroupPolicies> {
  transfromNameToKey(name: string): string {
    return name.toLowerCase().replace(/ /g, '_');
  }
}
