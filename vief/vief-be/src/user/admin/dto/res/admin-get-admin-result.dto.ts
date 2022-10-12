import { Exclude, Expose, Type } from 'class-transformer';
import { AdminGetGroupPolicyResultDto } from '../../../../casl/group-policy/admin/dto/res/admin-get-group-policy-result.dto';

@Exclude()
export class AdminGetAdminResultDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  @Type(() => AdminGetGroupPolicyResultDto)
  userType: AdminGetGroupPolicyResultDto[];
}
