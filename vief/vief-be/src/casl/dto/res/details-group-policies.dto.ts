import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { GroupPolicies } from '../../group-policy/entity/group-policies.entity';
import { GroupToPolicies } from '../../entities/group-to-policies.entity';
import { Policies } from '../../entities/policies.entity';

export class DetailsGroupPoliciesDto {
  @ApiProperty()
  @Expose()
  key: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  created_at: Date;

  @ApiProperty()
  @Expose()
  updated_at: Date;

  @ApiProperty({ type: [Policies] })
  @Expose()
  @Transform(({ obj }: { obj: GroupPolicies }) => {
    return obj.groupToPolicies.map((item) => item.policies);
  })
  policies: Policies[];

  @Exclude()
  groupToPolicies: GroupToPolicies[];
}
