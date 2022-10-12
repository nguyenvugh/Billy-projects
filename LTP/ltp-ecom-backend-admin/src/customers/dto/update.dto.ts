import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateCustomersDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  avatar: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  fullname: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  country: number;

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
  @ApiProperty({ required: true })
  birthday: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  sex: number;

  @IsOptional()
  @ApiProperty({ required: true })
  password: string;
}
