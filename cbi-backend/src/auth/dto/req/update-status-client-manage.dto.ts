import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { EUserStatus } from 'src/common/constants/global.constant';

export class UpdateStatusClientManage {
  @ApiProperty({ required: true })
  @IsEnum(EUserStatus)
  @IsNotEmpty()
  status: EUserStatus;

  @ApiProperty({ type: String })
  @IsOptional()
  @MaxLength(250)
  lockReason: string;
}
