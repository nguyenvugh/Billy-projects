import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import { EUserStatus } from 'src/common/constants/global.constant';
import { FileAdminDto } from 'src/file/dto/file-admin.dto';

@Exclude()
export class AdminDTO {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  group_permission_id: string;

  @Expose()
  status: EUserStatus;

  @Expose()
  fullName: string;

  @Expose()
  phoneNumber: string;

  @Expose()
  createdAt: Date;

  @Expose()
  @Type(() => FileAdminDto)
  avatar: FileAdminDto;

  @Expose({
    name: 'userToGroupPolicies',
  })
  @Transform(({ obj }: { obj: User }) => {
    return obj?.userToGroupPolicies
      ? obj?.userToGroupPolicies[0]?.groupPoliciesKey
      : '';
  })
  groupPoliciesKey: string;

  constructor(partial: Partial<AdminDTO>) {
    Object.assign(this, partial);
  }
}
