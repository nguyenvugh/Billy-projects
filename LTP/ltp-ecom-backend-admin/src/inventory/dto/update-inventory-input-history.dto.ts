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
import { InventoryInputHistoryDetailDto } from './inventory-input-history-detail.dto';

export class UpdateInventoryInputHistoryDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  inventory: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
  })
  input_history: number;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => InventoryInputHistoryDetailDto)
  @ApiProperty({
    required: true,
    type: [InventoryInputHistoryDetailDto],
  })
  details: InventoryInputHistoryDetailDto[];
}
