import { ApiProperty } from '@nestjs/swagger';
import { IsValidArrayNumber } from '../../../common/decorators/custom-validator.decorator';

export class DeleteCategoriesDto {
  @ApiProperty({ required: true })
  @IsValidArrayNumber({ required: true })
  id: number[];
}
