import { IntersectionType, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AdminFieldValidateMessages } from '../../../../common/constants/validate.constant';
import { LangRequiredDto } from '../../../../common/dto/req/field/lang-required.dto';
import { ImageIdRequiredDto } from './field/image-id-required.dto';
import { ImageAltRequiredDto } from './field/image-alt-required.dto';
import { ImageTitleRequiredDto } from './field/image-title-required.dto';

export class AdminUpdateImageTranslateFieldsDto extends IntersectionType(
  LangRequiredDto,
  IntersectionType(ImageAltRequiredDto, ImageTitleRequiredDto),
) {}

export class AdminUpdateImageTranslateDataDto {
  @IsNotEmpty({
    message: AdminFieldValidateMessages.translate.not_empty,
  })
  @ValidateNested({ each: true })
  @Type(() => AdminUpdateImageTranslateFieldsDto)
  @ApiProperty({
    required: true,
    type: [AdminUpdateImageTranslateFieldsDto],
  })
  translates: AdminUpdateImageTranslateFieldsDto[];
}

export class AdminUpdateImageTranslateDto extends IntersectionType(
  ImageIdRequiredDto,
  AdminUpdateImageTranslateDataDto,
) {}
