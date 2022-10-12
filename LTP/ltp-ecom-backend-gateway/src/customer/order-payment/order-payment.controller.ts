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
import { createHmac } from 'crypto';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { FindAllPaymentTypesDto } from './dto/find-all-types.dto';
import { CalculateOnlinePaymentTaxDto } from './dto/calculate-online-payment-tax.dto';
import { ListOrderPaymentTypesEntity } from './entities/list-order-payment-types.entity';
import { OrderPaymentService } from './order-payment.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/order-payment`)
@ApiTags('Customer Order Payment')
@UseInterceptors(ClassSerializerInterceptor)
export class OrderPaymentController {
  constructor(private readonly orderPaymentService: OrderPaymentService) {}

  @Post('/types')
  @ApiOperation({ summary: 'Get list payment types' })
  async getListPaymentTypes(@Body() reqData: FindAllPaymentTypesDto) {
    return new ListOrderPaymentTypesEntity(
      await this.orderPaymentService.getListPaymentTypes(reqData),
    );
  }

  @Post('/calculate-online-payment-tax')
  @ApiOperation({ summary: 'Calculate online payment tax' })
  async calculateOnlinePaymentTax(
    @Body() reqData: CalculateOnlinePaymentTaxDto,
  ) {
    return await this.orderPaymentService.calculateOnlinePaymentTax(reqData);
  }

  @Get('/onepay/request')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Create onepay request' })
  async onepayRequest() {
    const config = {
      merchant: 'TESTONEPAY23',
      access_code: '6BEB2566',
      hash_key: '6D0870CDE5F24F34F3915FB0045120D6',
    };
    const orderCode = new Date().getTime();
    const reqUrl = 'https://mtf.onepay.vn/paygate/vpcpay.op';
    const returnUrl =
      'https://c3fb888205dc.ngrok.io/v1/customer/order-payment/onepay/ok';
    const reqParam: any = {
      vpc_Version: '2',
      vpc_AccessCode: config.access_code,
      vpc_Amount: 2500000,
      vpc_Command: 'pay',
      vpc_Currency: 'VND',
      vpc_Locale: 'vn',
      vpc_Merchant: config.merchant,
      vpc_MerchTxnRef: orderCode,
      vpc_OrderInfo: orderCode,
      vpc_ReturnURL: returnUrl,
      vpc_TicketNo: '58.186.70.89',
      AgainLink: returnUrl,
      Title: 'Onepay',
    };
    const oderredReqParam = sortObject(reqParam);
    console.log(oderredReqParam);
    const strHashed = hash(oderredReqParam, config.hash_key);

    const url =
      buildRequestUrl(reqUrl, reqParam) + `&vpc_SecureHash=${strHashed}`;
    return url;
  }

  @Get('/onepay/check')
  @ApiExcludeEndpoint()
  @ApiOperation({ summary: 'Check onepay transaction' })
  async onepayCheck() {
    const config = {
      merchant: 'TESTONEPAY23',
      access_code: '6BEB2566',
      hash_key: '6D0870CDE5F24F34F3915FB0045120D6',
      user: 'op01',
      password: 'op123456',
    };
    const ref = '1624439395532';
    const reqUrl = 'https://mtf.onepay.vn/msp/api/v1/vpc/invoices/queries';
    const reqParam: any = {
      vpc_Command: 'queryDR',
      vpc_Version: 1,
      vpc_MerchTxnRef: ref,
      vpc_Merchant: config.merchant,
      vpc_AccessCode: config.access_code,
      vpc_User: config.user,
      vpc_Password: config.password,
    };
    const oderredReqParam = sortObject(reqParam);
    console.log(oderredReqParam);
    const strHashed = hash(oderredReqParam, config.hash_key);

    const url =
      buildRequestUrl(reqUrl, reqParam) + `&vpc_SecureHash=${strHashed}`;
    return url;
  }

  @Get('/ipn/onepay')
  @ApiExcludeEndpoint()
  async ipnOnepay(@Query() response: any) {
    const logger = new Logger();
    logger.error(response);
    return await this.orderPaymentService.ipnUpdatePayment(response);
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

  @Get('/onepay/ok')
  @ApiExcludeEndpoint()
  async onepayOk() {
    return 'ok';
  }
}

const hash = (data: any, key: any) => {
  let dataHash = '';
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (-1 != key.indexOf('vpc_') && 'vpc_SecureHash' != key) {
        if ('' == dataHash) {
          dataHash = `${key}=${value}`;
        } else {
          dataHash += `&${key}=${value}`;
        }
      }
    }
  }
  console.log(dataHash);
  const hash = createHmac('sha256', Buffer.from(key, 'hex'))
    .update(dataHash)
    .digest('hex')
    .toUpperCase();
  return hash;
};

const buildRequestUrl = (url: string, data: any) => {
  const ret = [];
  for (const d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return `${url}?${ret.join('&')}`;
};

const sortObject = (object: any) => {
  return Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};
