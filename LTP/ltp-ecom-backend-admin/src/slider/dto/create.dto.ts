import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { SliderStatusConst, SliderTypeConst } from 'src/common/constants/slider.constant';

export class ListDto {
  @ApiProperty()
  language_code: string;

  @ApiProperty()
  language_field: string;

  @ApiProperty()
  language_value: string;
}

export class CreateSliderDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  thumbnail_id: number;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [SliderTypeConst.CAMPAIGN, SliderTypeConst.PRODUCT],
  })
  type: number;

  @IsOptional()
  @ApiProperty({ required: false })
  product_id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  link: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  percentage: number;

  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  @IsNotEmpty()
  @ApiProperty({ required: true })
  start_date: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  @ApiProperty({ required: true })
  start_time: string;

  @Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
    message: '$property must be formatted as yyyy-mm-dd',
  })
  @IsNotEmpty()
  @ApiProperty({ required: true })
  end_date: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(5)
  @ApiProperty({ required: true })
  end_time: string;

  @IsOptional()
  @ApiProperty({ required: false })
  buy_button: string;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
    enum: [SliderStatusConst.ON, SliderStatusConst.OFF],
  })
  is_active: number;

  @IsOptional()
  @IsArray()
  @ApiProperty({ required: false, type: [ListDto] })
  @Type(() => ListDto)
  contents: ListDto[];
}
