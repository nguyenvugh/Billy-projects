import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class AdminGetGroupPolicyResultDto {
  @Expose()
  key: string;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
