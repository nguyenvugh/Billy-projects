import { ApiProperty } from '@nestjs/swagger';

export class FooterConfigDto {
  @ApiProperty({ example: 'Oxfam' })
  companyName: string;

  @ApiProperty({ example: 'oxfam@gmail.com' })
  email: string;

  @ApiProperty({ example: 'khsdhs/skhasudsh sdijsajsd' })
  address: string;

  @ApiProperty({ example: '1800646485' })
  hotline: string;
}
