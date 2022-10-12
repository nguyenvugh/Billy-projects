import { Type } from 'class-transformer';
import { AdminGetGroupPolicyResultDto } from './admin-get-group-policy-result.dto';

export class AdminGetGroupPoliciesResultDto {
  @Type(() => AdminGetGroupPolicyResultDto)
  data: AdminGetGroupPolicyResultDto[];
}
