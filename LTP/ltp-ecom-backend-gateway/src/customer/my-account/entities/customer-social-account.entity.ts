import { Exclude, Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class CustomerSocialAccountEntity {
  @Exclude()
  @ApiHideProperty()
  id: number;

  @Exclude()
  @ApiHideProperty()
  customerId: number;

  @Exclude()
  @ApiHideProperty()
  social_id: string;

  social_type: string;

  constructor(partial: Partial<CustomerSocialAccountEntity>) {
    Object.assign(this, partial);
  }
}
