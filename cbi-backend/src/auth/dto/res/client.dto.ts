import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EUserStatus } from 'src/common/constants/global.constant';

@Exclude()
export class ClientDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  birthday: Date;

  @ApiProperty()
  @Expose()
  status: EUserStatus;

  @ApiProperty()
  @Expose()
  fullName: string;

  @ApiProperty()
  @Expose()
  phoneNumber: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  companyCode: string;

  constructor(partial: Partial<ClientDTO>) {
    Object.assign(this, partial);
  }
}
