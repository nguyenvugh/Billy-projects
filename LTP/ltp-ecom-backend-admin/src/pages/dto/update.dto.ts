import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreatePageDto } from './create.dto';

export class UpdatePageDto extends PartialType(CreatePageDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
