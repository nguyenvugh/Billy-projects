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
  Max,
  IsString,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class FindSLugOtherLangDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  slug: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(2)
  @ApiProperty({
    required: true,
    example: 'en',
  })
  other_lang: string;
}
