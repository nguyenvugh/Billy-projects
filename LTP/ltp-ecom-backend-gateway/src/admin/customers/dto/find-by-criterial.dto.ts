import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CustomerStatusConst } from 'src/common/constants/customer.constant';
import PaginateDto from 'src/common/dtos/paginate.dto';

export class FindCustomersByCriteriaDto extends PaginateDto {
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  email: string;

  @IsOptional()
  @ApiProperty({
    required: false,
  })
  phone_number: string;

  @IsOptional()
  @ApiProperty({
    required: false,
    enum: [CustomerStatusConst.NOT_ACTIVE, CustomerStatusConst.ACTIVE],
  })
  status: CustomerStatusConst;
}
