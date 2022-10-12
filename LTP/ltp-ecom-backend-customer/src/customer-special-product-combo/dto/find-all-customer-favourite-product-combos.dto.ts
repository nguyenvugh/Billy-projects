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
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import PaginateDto from '../../common/dtos/paginate.dto';

export class FindAllCustomerFavouriteProductCombosDto extends PaginateDto {
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty({
    required: true,
    maxLength: 2,
  })
  lang: string;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  customer: number;
}
