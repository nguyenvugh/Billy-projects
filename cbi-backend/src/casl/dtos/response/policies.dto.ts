import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { Action } from 'src/common/enums/action.enum';
import { ActionAbility } from 'src/common/enums/actionAbility.enum';
import { Resource } from 'src/common/enums/resource.enum';

export class PoliciesDto {
  @ApiProperty({ example: 'bb92e6a3-7ed6-4526-815b-9a75ee92ffad' })
  @IsString()
  id: string;

  @ApiProperty({ enum: Action, example: Action.MANAGE })
  @IsEnum(Action)
  action: Action;

  @ApiProperty({ enum: Resource, example: Resource.ARTICLE })
  @IsEnum(Resource)
  resource: Resource;

  @ApiProperty({example: 'Quản lý bài viết'})
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ enum: ActionAbility, example: 'can' })
  @IsEnum(ActionAbility)
  actionAbility: ActionAbility;
}
