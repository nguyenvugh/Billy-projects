import { ApiProperty } from '@nestjs/swagger';
import { CONFIG_CEBI_PAGE_JSON_KEY } from 'src/common/constants/global.constant';

export class PageConfigDto {
  @ApiProperty({
    example: `<p>Hello This is OxFam</p>

  <p>This is another line</p>
  `,
  })
  [CONFIG_CEBI_PAGE_JSON_KEY]: string;
}
