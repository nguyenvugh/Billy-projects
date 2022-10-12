import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCouponDto } from './create.dto';

export class UpdateCouponDto extends PartialType(CreateCouponDto) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  id: number;
}
