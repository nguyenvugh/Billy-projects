import {
  ApiProperty,
  IntersectionType,
  PartialType,
  PickType,
} from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductFeatureConst } from '../../../common/constants/product-category.constant';
import PaginateDto from '../../../common/dtos/paginate.dto';

export class CustomerFindAllProductCategoryDto extends PaginateDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
  })
  parent: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    enum: [ProductFeatureConst.NOT_FEATURE, ProductFeatureConst.FEATURE],
  })
  is_feature: number;
}
