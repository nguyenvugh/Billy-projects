import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, MinLength, IsEmail } from 'class-validator';
import { AdminFieldValidateMessages } from '../../../../common/constants/validate.constant';
import { PaginateDto } from '../../../../common/dto/req/paginate.dto';

export class AdminGetAdminsDto extends PaginateDto {
  @IsOptional()
  @MinLength(8, {
    message: AdminFieldValidateMessages.email.min_length,
  })
  @IsEmail(
    {},
    {
      message: AdminFieldValidateMessages.email.invalid,
    },
  )
  @ApiProperty({
    required: false,
    minLength: 8,
  })
  email: string;
}
