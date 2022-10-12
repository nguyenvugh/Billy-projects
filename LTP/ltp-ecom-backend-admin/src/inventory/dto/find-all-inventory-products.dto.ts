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

export class FindAllInventoryProductsDto extends PaginateDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  inventory: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: false,
    maxLength: 255,
  })
  search: string;
}
