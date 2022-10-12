import { Expose } from 'class-transformer';
import { UserType } from 'src/common/constants/global.constant';

export class UserJwtDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  userTypeKey: UserType;
}
