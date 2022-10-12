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

export class GetPromotionsSliderHomePageDto {
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty({
    required: true,
    maxLength: 2,
  })
  lang: string;
}
