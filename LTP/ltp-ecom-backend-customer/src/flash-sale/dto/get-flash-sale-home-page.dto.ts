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

export class GetFlashSaleHomePageDto {
  @IsNotEmpty()
  @MaxLength(2)
  @ApiProperty({
    required: true,
    maxLength: 2,
  })
  lang: string;
}
