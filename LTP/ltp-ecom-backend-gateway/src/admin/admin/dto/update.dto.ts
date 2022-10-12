import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateAdminDto } from './create.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsOptional()
  @ApiProperty({ required: false })
  password: string;
}
