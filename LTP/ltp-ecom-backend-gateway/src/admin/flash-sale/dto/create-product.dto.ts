import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { FlashSaleProductStatusConst } from 'src/common/constants/flash-sale.constant';

export class CreateFlashSaleProductDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  product_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  quantity: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  percentage: number;

  @IsNotEmpty()
  @Type(() => Number)
  @ApiProperty({
    required: true,
    type: Number,
    enum: [
      FlashSaleProductStatusConst.JUST_OPEN_FOR_SALE,
      FlashSaleProductStatusConst.STOCKING,
      FlashSaleProductStatusConst.SOLD_OUT_SOON,
      FlashSaleProductStatusConst.SOLD_OUT,
    ],
  })
  status: number;
}
