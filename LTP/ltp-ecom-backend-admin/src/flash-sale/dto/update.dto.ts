import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateFlashSaleDto } from './create.dto';

export class UpdateFlashSaleDto extends PartialType(CreateFlashSaleDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
