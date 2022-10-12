import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  AdminSexConst,
  AdminStatusConst,
} from 'src/common/constants/admin.constant';

export class CreateAdminDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  group_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: false })
  fullname: string;

  @ApiProperty({ required: false })
  national_id: string;

  @ApiProperty({ required: false })
  address: string;

  @ApiProperty({ required: false })
  phone_number: string;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [AdminStatusConst.ACTIVATED, AdminStatusConst.INACTIVATED],
  })
  status: number;

  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [AdminSexConst.MALE, AdminSexConst.FEMALE, AdminSexConst.UNKNOWN],
  })
  sex: number;
}
