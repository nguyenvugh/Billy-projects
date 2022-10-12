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
import PaginateDto from '../../../common/dtos/paginate.dto';

export class FindAllProductCombosDto extends PaginateDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: false,
    maxLength: 255,
  })
  search: string;
}
