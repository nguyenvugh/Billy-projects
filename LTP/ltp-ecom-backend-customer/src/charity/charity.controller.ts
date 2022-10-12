import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CharityService } from './charity.service';

@Controller('charity')
export class CharityController {
  constructor(private readonly charityService: CharityService) {}

  @MessagePattern('customer-charity-get-charity-home-page')
  async getCharityOnHomePage(reqData) {
    return await this.charityService.getCharityOnHomePage(reqData);
  }
}
