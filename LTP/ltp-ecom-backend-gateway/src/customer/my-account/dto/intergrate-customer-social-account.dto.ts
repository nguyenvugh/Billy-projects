import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CustomerSocialAccountActionConst } from '../../../common/constants/customer-social-account.constant';
import { SocialAccountType } from '../../services/firebase/authenticate/base.authenticate';

export class IntergrateCustomerSocialAccountDto {
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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    enum: [
      CustomerSocialAccountActionConst.CONNECT,
      CustomerSocialAccountActionConst.DISCONNECT,
    ],
  })
  action: CustomerSocialAccountActionConst;
}
