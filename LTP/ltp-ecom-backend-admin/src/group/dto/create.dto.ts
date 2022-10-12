import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class Permissions {
  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  product: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  product_category: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  store: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  branch: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  order: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  flash_sale: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  slider: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  customer: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  contact: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  subscriber: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  news_category: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  news: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  page: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  admin: boolean;

  @IsNotEmpty()
  @ApiProperty({ required: true, default: false })
  group: boolean;
}

export class CreateGroupDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  description: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  permissions: Permissions;
}
