import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateAdminDto } from './create.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  password: string;
}
