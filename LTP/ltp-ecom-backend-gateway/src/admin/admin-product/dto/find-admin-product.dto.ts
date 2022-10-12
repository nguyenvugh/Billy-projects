import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional } from 'class-validator';
import { BooleanValue } from 'src/common/constants/product.constant';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindAdminProductDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  category: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BooleanValue)
  status_display: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  @IsEnum(BooleanValue)
  is_feature: number;
}
