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

export class FindAdminProductCategoryDto extends PaginateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(BooleanValue)
  @Type(() => Number)
  is_sub?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Number)
  parent?: number;
}
