import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreateGroupPolicyDto {
  @IsString()
  @ApiProperty({ example: 'Admin article' })
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsString()
  @ApiProperty({ example: 'Nhóm quyền để quản lý các bài đăng' })
  @Transform(({ value }) => value?.trim())
  description: string;

  @IsArray()
  @ApiProperty({
    type: [String],
    example: [
      'e2ffe6bc-dc60-434e-ad9e-c3709899353d',
      'a37c31ff-19ff-4580-9f24-e3c44e5e7f7b',
    ],
  })
  policiesIds: string[];
}
