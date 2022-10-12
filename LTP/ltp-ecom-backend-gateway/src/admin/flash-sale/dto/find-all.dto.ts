import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { FlashSaleSearchStatusConst } from 'src/common/constants/flash-sale.constant';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindAllFlashSaleDto extends PaginateDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  search_value: string;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    required: false,
    type: Number,
    enum: [
      FlashSaleSearchStatusConst.HAPPENING,
      FlashSaleSearchStatusConst.UPCOMING,
      FlashSaleSearchStatusConst.EXPIRED,
    ],
  })
  status: number;
}
