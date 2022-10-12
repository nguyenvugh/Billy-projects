import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
import { AdminFieldValidateMessages } from '../../../../../common/constants/validate.constant';

export class BannerSortingRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.sorting.not_empty,
  })
  @Min(1, {
    message: AdminFieldValidateMessages.sorting.invalid,
  })
  @ApiProperty({
    required: true,
    minimum: 1,
  })
  sorting: string;
}
