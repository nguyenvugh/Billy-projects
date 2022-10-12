import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindAllFlashSaleProductDto extends PaginateDto {
  @IsNotEmpty()
  @ApiProperty({
    required: true,
  })
  id: number;
}