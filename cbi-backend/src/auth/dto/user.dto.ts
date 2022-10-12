import { Exclude, Expose } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

@Exclude()
export class UserDTO {
  @Expose()
  @IsString()
  id: string;

  @Expose()
  @IsString()
  email: string;

  @Expose()
  @IsString()
  fullName: string;

  constructor(partial: Partial<UserDTO>) {
    Object.assign(this, partial);
  }
}
