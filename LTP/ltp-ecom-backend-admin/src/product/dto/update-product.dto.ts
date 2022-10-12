import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsNotEmpty()
  id: number;
}
