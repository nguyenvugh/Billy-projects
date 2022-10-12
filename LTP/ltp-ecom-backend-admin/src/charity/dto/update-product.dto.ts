import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateCharityProductRequirementDto } from './create-product.dto';

export class UpdateCharityProductRequirementDto extends PartialType(
  CreateCharityProductRequirementDto,
) {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  charity_product_id: number;
}
