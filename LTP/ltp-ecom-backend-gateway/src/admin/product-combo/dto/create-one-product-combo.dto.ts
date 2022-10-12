import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsNumberString,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProductComboTranslateDto } from './product-combo-translate.dto';

export class CreateOneProductComboDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    required: true,
    minLength: 1,
    maxLength: 255,
  })
  code: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductComboTranslateDto)
  @ApiProperty({
    required: true,
    type: [ProductComboTranslateDto],
  })
  translates: ProductComboTranslateDto[];
}
