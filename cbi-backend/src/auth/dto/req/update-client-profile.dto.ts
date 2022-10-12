import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';
import { BooleanStatusEnum } from 'src/common/constants/global.constant';
import {
  IsValidDate,
  IsValidEnum,
  IsValidNumber,
  IsValidText,
} from 'src/common/decorators/custom-validator.decorator';

export class UpdateClientProfileDTO {
  @ApiProperty()
  @IsValidText({ maxLength: 100 })
  fullName: string;

  @ApiProperty()
  @IsOptional()
  birthday: Date;

  @ApiProperty()
  @IsValidText({ maxLength: 11 })
  phoneNumber: string;

  @ApiProperty()
  @IsValidText({ maxLength: 100 })
  companyName: string;

  @ApiProperty()
  @IsValidText({ maxLength: 100 })
  position: string;

  @ApiProperty()
  @IsValidText({ maxLength: 100 })
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsNumberString()
  numberEmployees: string;

  @ApiProperty()
  @IsNumberString()
  revenue: string;

  @ApiProperty()
  @IsOptional()
  @IsValidText({ maxLength: 100 })
  phoneNumberCompany: string;

  @ApiProperty()
  @IsOptional()
  @IsValidText({ maxLength: 100 })
  website: string;

  @ApiProperty()
  @IsValidText({ maxLength: 100 })
  workField: string;

  @ApiProperty()
  avatarId: string;

  @ApiProperty()
  @IsOptional()
  documentId: string;

  @IsValidText({ maxLength: 250 })
  @IsOptional()
  documentDescription: string;

  @IsValidDate()
  @IsOptional()
  dateCreateCompany: Date;

  @IsValidNumber({ max: 1000000000, required: false }) // 1 billion
  @IsOptional()
  numUnofficialEmployees: number;

  @IsValidText({ maxLength: 100 })
  @IsOptional()
  modelManufactoring: string;

  @IsValidText({ maxLength: 100 })
  @IsOptional()
  sizeManufactoring: string;

  @IsValidText({ maxLength: 100, required: false })
  @IsOptional()
  materialArea: string;

  @IsValidText({ maxLength: 100, required: false })
  @IsOptional()
  companyCode: string;

  @IsValidEnum({ enum: BooleanStatusEnum })
  @IsOptional()
  isApplyWorkingDiary: BooleanStatusEnum;

  @IsValidEnum({ enum: BooleanStatusEnum })
  @IsOptional()
  isapplyDigital: BooleanStatusEnum;
}
