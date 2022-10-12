import { ApiProperty } from '@nestjs/swagger';
import { IsValidArrayNumber } from '../../../../common/decorators/custom-validator.decorator';

export class DeleteArticlesDto {
  @ApiProperty({ required: true })
  @IsValidArrayNumber({ required: true })
  id: number[];
}
