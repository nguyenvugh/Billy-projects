import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateBranchDto } from './create.dto';

export class UpdateBranchDto extends PartialType(CreateBranchDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
