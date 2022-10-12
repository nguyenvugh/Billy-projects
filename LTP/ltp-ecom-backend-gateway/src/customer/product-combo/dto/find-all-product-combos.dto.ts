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
import { SortValueConst } from '../../../common/constants/sorting.constant';
import { CustomerProductComboFieldSortingConst } from '../../../common/constants/product-combo.constant';
import PaginateDto from '../../../common/dtos/paginate.dto';

export class CustomerFindAllProductCombosDto extends PaginateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  product: number;

  @IsNotEmpty()
  @IsEnum(CustomerProductComboFieldSortingConst)
  @ApiProperty({
    required: true,
    enum: [
      CustomerProductComboFieldSortingConst.CREATED_AT,
      CustomerProductComboFieldSortingConst.TOTAL_PRICE,
    ],
    default: CustomerProductComboFieldSortingConst.CREATED_AT,
  })
  sort_field: CustomerProductComboFieldSortingConst;

  @IsNotEmpty()
  @IsEnum(SortValueConst)
  @ApiProperty({
    required: true,
    enum: [SortValueConst.ASC, SortValueConst.DESC],
    default: SortValueConst.DESC,
  })
  sort_value: SortValueConst;
}
