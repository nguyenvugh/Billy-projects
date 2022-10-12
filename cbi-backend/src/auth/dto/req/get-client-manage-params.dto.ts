import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EUserStatus } from 'src/common/constants/global.constant';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';

export class GetClientManageParams extends PaginateDto {
  @ApiProperty({ type: EUserStatus })
  @IsEnum(EUserStatus)
  @IsOptional()
  status: EUserStatus;
}
