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
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateProductCategoryDisplayOrderDto } from './update-product-category-display-order.dto';

export class UpdateProductCategoriesDisplayOrderDto {
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductCategoryDisplayOrderDto)
  @ApiProperty({
    required: true,
    type: [UpdateProductCategoryDisplayOrderDto],
  })
  items: UpdateProductCategoryDisplayOrderDto[];
}
