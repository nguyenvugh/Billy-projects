import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsJSON,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { IsValidText } from 'src/common/decorators/custom-validator.decorator';
import { ConfigCebiKey } from 'src/config-cebi/enums/configCebi.enum';
import { FooterConfigDto } from '../response/footer-config.dto';
import { PageConfigDto } from '../response/page-config.dto';

export class UpdateConfigDto {
  @ApiProperty({ type: ConfigCebiKey, enum: ConfigCebiKey })
  @IsEnum(ConfigCebiKey)
  key: string;

  @ApiProperty({
    oneOf: [
      {
        $ref: getSchemaPath(FooterConfigDto),
      },
      {
        $ref: getSchemaPath(PageConfigDto),
      },
    ],
    description: 'JSON data',
  })
  @IsObject()
  value: object;
}
