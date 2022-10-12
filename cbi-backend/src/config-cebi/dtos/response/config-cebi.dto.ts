import { ApiProperty } from '@nestjs/swagger';
import {
  ConfigCebiKey,
  ConfigCebiType,
} from 'src/config-cebi/enums/configCebi.enum';

export class ConfigCebiDto {
  @ApiProperty({
    enum: ConfigCebiKey,
    example: ConfigCebiKey.FOOTER_CONFIG,
  })
  key: string;

  @ApiProperty({ example: 'Cấu hình thông tin cơ bản Oxfam' })
  name: string;

  @ApiProperty({ enum: ConfigCebiType, example: ConfigCebiType.FORM })
  type: ConfigCebiType;

  @ApiProperty()
  value: object;

  @ApiProperty()
  version: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  deletedAt: Date;
}
