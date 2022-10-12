import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty, MinLength } from 'class-validator';

export class CreateOneMediaDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: Express.Multer.File;
}
