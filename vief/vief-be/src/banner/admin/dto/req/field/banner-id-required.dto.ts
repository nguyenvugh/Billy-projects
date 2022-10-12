import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';
import { AdminFieldValidateMessages } from '../../../../../common/constants/validate.constant';

export class BannerIdRequiredDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.id.banner.not_empty,
  })
  @Min(1, {
    message: AdminFieldValidateMessages.id.banner.not_found,
  })
  @ApiProperty({
    required: true,
    minimum: 1,
  })
  id: string;
}
