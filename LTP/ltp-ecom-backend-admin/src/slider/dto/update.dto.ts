import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateSliderDto } from './create.dto';

export class UpdateSliderDto extends PartialType(CreateSliderDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
