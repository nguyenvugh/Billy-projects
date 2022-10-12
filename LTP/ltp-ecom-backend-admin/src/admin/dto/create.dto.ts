import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
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

  @IsOptional()
  @ApiProperty({ required: true })
  password: string;

  @IsOptional()
  @ApiProperty({ required: false })
  fullname: string;

  @IsOptional()
  @ApiProperty({ required: false })
  national_id: string;

  @IsOptional()
  @ApiProperty({ required: false })
  address: string;

  @IsOptional()
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

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [AdminSexConst.MALE, AdminSexConst.FEMALE, AdminSexConst.UNKNOWN],
  })
  sex: number;
}
