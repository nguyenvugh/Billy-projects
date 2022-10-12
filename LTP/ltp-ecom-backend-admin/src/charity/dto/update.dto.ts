import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCharityDto } from './create.dto';

export class UpdateCharityDto extends PartialType(CreateCharityDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
