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
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SortValueConst } from '../../common/constants/sorting.constant';
import { ProductComboFieldSortingConst } from '../../common/constants/product-combo.constant';
import PaginateDto from '../../common/dtos/paginate.dto';

export class CustomerFindAllProductCombosDto extends PaginateDto {
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty({
    required: true,
    maxLength: 2,
  })
  lang: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  product: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
  })
  customer: number;

  @IsNotEmpty()
  @IsEnum(ProductComboFieldSortingConst)
  @ApiProperty({
    required: true,
  })
  sort_field: ProductComboFieldSortingConst;

  @IsNotEmpty()
  @IsEnum(SortValueConst)
  @ApiProperty({
    required: true,
  })
  sort_value: SortValueConst;
}
