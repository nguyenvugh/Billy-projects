import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateFlashSaleProductDto } from './create-product.dto';

export class UpdateFlashSaleProductDto extends PartialType(
  CreateFlashSaleProductDto,
) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  flash_sale_product_id: number;
}
