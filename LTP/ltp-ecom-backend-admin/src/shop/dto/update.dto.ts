import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateShopDto } from './create.dto';

export class UpdateShopDto extends PartialType(CreateShopDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
