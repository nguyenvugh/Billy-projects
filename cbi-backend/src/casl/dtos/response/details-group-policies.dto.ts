import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { GroupPolicies } from 'src/casl/entities/group-policies.entity';
import { GroupToPolicies } from 'src/casl/entities/group-to-policies.entity';
import { Policies } from 'src/casl/entities/policies.entity';
import { PoliciesDto } from './policies.dto';

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
