import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Query,
  Logger,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiExcludeEndpoint,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { BadRequestExc } from '../../common/exceptions/custom.exception';
import { FindAllTypesDto } from './dto/find-all-types.dto';
import { IpnUpdateShippingDto } from './dto/ipn-update-shipping.dto';
import { ListOrderShippingTypesEntity } from './entities/list-order-shipping-types.entity';
import { OrderShippingService } from './order-shipping.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/order-shipping`)
@ApiTags('Customer Order Shipping')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderShippingController {
  constructor(private readonly orderShippingService: OrderShippingService) {}

  @Post('/types')
  @ApiOperation({ summary: 'Get list shipping types' })
  async getListShippingTypes(@Body() reqData: FindAllTypesDto) {
    return new ListOrderShippingTypesEntity(
      await this.orderShippingService.getListShippingTypes(reqData),
    );
  }

  @Get('/calculate-price')
  @ApiOperation({ summary: 'Calculate shipping price' })
  async calculateShippingPrice() {
    const data = {
      pick_province: 'TP Hồ Chí Minh',
      pick_district: 'Quận 3',
      province: 'TP Hồ Chí Minh',
      district: 'Quận 8',
      deliver_option: 'xteam',
      weight: 1000,
      tags: [1],
    };
    return await this.orderShippingService.calculateShippingPrice(data);
  }

  @Post('/ipn/ghtk')
  @HttpCode(200)
  @ApiExcludeEndpoint()
  async ipnGHTK(@Body() request: IpnUpdateShippingDto) {
    const logger = new Logger();
    logger.error(request);
    const rs = await this.orderShippingService.ipnUpdateShipping(request);
    if ('ok' != rs) {
      logger.error(rs);
      throw new BadRequestExc();
    }
    return rs;
    /*
    const config = {
      merchant: 'TESTONEPAY23',
      access_code: '6BEB2566',
      hash_key: '6D0870CDE5F24F34F3915FB0045120D6',
    };

    console.log(reqData);
    const orderedReqParam = sortObject(reqData);
    console.log(orderedReqParam);
    const strHashed = hash(orderedReqParam, config.hash_key);
    console.log(strHashed);
    return 'responsecode=1&desc=confirm-success';
    */
  }
}
