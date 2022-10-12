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

export class OrderPaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  type: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
  })
  online_payment_method: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
  })
  returnUrl: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
  })
  customerIpAddress: string;
}
