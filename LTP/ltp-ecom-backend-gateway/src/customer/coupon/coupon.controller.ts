import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { CurrentLang } from 'src/common/decorators/current-lang.decorator';
import { MicroserviceConsts } from '../../common/constants/microservices';
// import { ListPromotionsEntity } from './entities/list-promotions.entity';
import { CustomerCouponService } from './coupon.service';
import { FindCouponCustomerDto } from './dto/find-all-coupon.dto';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/coupon`)
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Customer Coupon')
export class CustomerCouponController {
  constructor(private readonly customerCouponService: CustomerCouponService) {}

  @Get()
  @ApiOperation({ summary: 'Get customer coupon' })
  async getCustomerCoupon(
    @CurrentLang() curLang,
    @Query() data: FindCouponCustomerDto,
  ) {
    // return new ListPromotionsEntity(
    return await this.customerCouponService.getCustomerCoupon(curLang, data);
    // );
  }
}
