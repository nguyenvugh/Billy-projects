import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CharityStatusConst } from 'src/common/constants/charity.constant';

export class CharityTranslateItemDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_code: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_field: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_value: string;
}

export class CreateCharityDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  price: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  start_date: Date;

  @IsOptional()
  @ApiProperty({ required: false })
  end_date: Date;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [CharityStatusConst.ACTIVATED, CharityStatusConst.INACTIVATED],
  })
  status: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ required: true, type: [CharityTranslateItemDto] })
  @Type(() => CharityTranslateItemDto)
  contents: CharityTranslateItemDto[];
}
