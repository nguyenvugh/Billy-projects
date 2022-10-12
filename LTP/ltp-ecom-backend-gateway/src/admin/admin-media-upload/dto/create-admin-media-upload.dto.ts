import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsNotEmpty, MinLength } from 'class-validator';

export class CreateAdminMediaUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty()
  file: Express.Multer.File;
}

export class CreateMultiAdminMediaUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  @ArrayMinSize(2)
  files: Express.Multer.File[];
}
