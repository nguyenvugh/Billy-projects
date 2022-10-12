import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CouponSearchStatusConst } from 'src/common/constants/coupon.constant';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindCouponByCriteriaDto extends PaginateDto {
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
      CouponSearchStatusConst.HAPPENING,
      CouponSearchStatusConst.UPCOMING,
      CouponSearchStatusConst.EXPIRED,
    ],
  })
  status: number;
}
