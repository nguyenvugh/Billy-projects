import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  IsNumberString,
  IsNumber,
  IsPositive,
  ValidateNested,
  IsOptional,
  IsEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginateDto } from '../../../../../common/dto/request/paginate.dto';

export class GetCbiUserLevelsNeedConfirmScoreDto extends PaginateDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  search: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  from_date: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  to_date: string;
}
