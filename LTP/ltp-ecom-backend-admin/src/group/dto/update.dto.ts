import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateGroupDto } from './create.dto';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
