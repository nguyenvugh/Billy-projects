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
import { OrderProductDto } from './order-product.dto';

export class ValidateProductsOrderDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  @ApiProperty({
    required: true,
    type: [OrderProductDto],
  })
  products: OrderProductDto[];
}
