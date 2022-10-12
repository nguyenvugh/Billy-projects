import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import PaginateDto from '../../../common/dtos/paginate.dto';

export class FindEmailSub extends PaginateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  q: string;
}
