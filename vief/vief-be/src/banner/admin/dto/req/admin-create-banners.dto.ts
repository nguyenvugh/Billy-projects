import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdminCreateBannerDto } from './admin-create-banner.dto';

export class AdminCreateBannersDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AdminCreateBannerDto)
  @ApiProperty({
    required: true,
    type: [AdminCreateBannerDto],
  })
  items: AdminCreateBannerDto[];
}
