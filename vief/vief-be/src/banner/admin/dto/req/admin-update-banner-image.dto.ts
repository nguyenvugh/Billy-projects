import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdminFieldValidateMessages } from '../../../../common/constants/validate.constant';
import { AdminUpdateImageTranslateDto } from '../../../../file/admin/dto/req/admin-update-image-translate.dto';

export class AdminUpdateBannerImageDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.translate.not_empty,
  })
  @ValidateNested({ each: true })
  @Type(() => AdminUpdateImageTranslateDto)
  @ApiProperty({
    required: true,
    type: AdminUpdateImageTranslateDto,
  })
  image: AdminUpdateImageTranslateDto;
}
