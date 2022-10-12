import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateOneDocumentsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  fileId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  @MaxLength(255)
  title: string;
}
