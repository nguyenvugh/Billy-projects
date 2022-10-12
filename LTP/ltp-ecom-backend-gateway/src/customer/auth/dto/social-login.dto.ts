import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SocialAccountType } from '../../services/firebase/authenticate/base.authenticate';

export class CustomerSocialLoginDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    enum: [SocialAccountType.FACEBOOK, SocialAccountType.GOOGLE],
  })
  type: SocialAccountType;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  uid: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
  })
  oauthIdToken: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  oauthAccessToken: string;
}
