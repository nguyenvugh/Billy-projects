import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { AdminSexConst } from 'src/common/constants/admin.constant';

export class UpdateUserProfileDto {
  @IsOptional()
  @ApiProperty({ required: false })
  avatar: number;

  @IsOptional()
  @ApiProperty({ required: false })
  password: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  fullname: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  national_id: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  address: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  phone_number: string;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [AdminSexConst.MALE, AdminSexConst.FEMALE, AdminSexConst.UNKNOWN],
  })
  sex: number;
}
