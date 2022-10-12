import { ApiProperty } from '@nestjs/swagger';
import { IsValidArrayNumber } from '../../../../common/decorators/custom-validator.decorator';

export class DeleteEventsDto {
  @ApiProperty({ required: true })
  @IsValidArrayNumber({ required: true })
  ids: number[];
}
