import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ShopWorkingDateConst } from 'src/common/constants/shop.constant';

export class CreateShopDto {
  @IsOptional()
  @ApiProperty({ required: false })
  thumbnail_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

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

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  @ApiProperty({ required: true })
  start_working_time: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  @ApiProperty({ required: true })
  end_working_time: string;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [
      ShopWorkingDateConst.MONDAY,
      ShopWorkingDateConst.TUESDAY,
      ShopWorkingDateConst.WEDNESDAY,
      ShopWorkingDateConst.THURSDAY,
      ShopWorkingDateConst.FRIDAY,
      ShopWorkingDateConst.SATURDAY,
      ShopWorkingDateConst.SUNDAY,
    ],
  })
  start_working_date: number;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [
      ShopWorkingDateConst.MONDAY,
      ShopWorkingDateConst.TUESDAY,
      ShopWorkingDateConst.WEDNESDAY,
      ShopWorkingDateConst.THURSDAY,
      ShopWorkingDateConst.FRIDAY,
      ShopWorkingDateConst.SATURDAY,
      ShopWorkingDateConst.SUNDAY,
    ],
  })
  end_working_date: number;
}
