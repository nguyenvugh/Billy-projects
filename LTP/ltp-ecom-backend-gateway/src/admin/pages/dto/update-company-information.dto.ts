import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CompanyInformationTranslateItemDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_code: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_field: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  language_value: string;
}

export class UpdateCompanyInformationDto {
  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ required: true, type: [CompanyInformationTranslateItemDto] })
  @Type(() => CompanyInformationTranslateItemDto)
  contents: CompanyInformationTranslateItemDto[];
}
