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
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOneQueueSendEmailDto } from './create-one-queue-send-email.dto';

export class CreateManyQueueSendEmailsDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOneQueueSendEmailDto)
  @ApiProperty({
    required: true,
    type: [CreateOneQueueSendEmailDto],
  })
  items: CreateOneQueueSendEmailDto[];
}
