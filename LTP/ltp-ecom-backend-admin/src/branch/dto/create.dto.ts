import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBranchDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  fax: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  city: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  district: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  ward: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  address: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({ required: true })
  lat: string;

  @IsNotEmpty()
  @MaxLength(30)
  @ApiProperty({ required: true })
  long: string;
}
