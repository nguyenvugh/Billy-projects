import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class DeleteFlashSaleDto {
  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: [Number],
  })
  ids: number;
}
