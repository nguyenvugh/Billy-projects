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
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthReq } from '../../common/decorators/auth-req.decorator';
import { JwtAuthenticateIsOptional } from '../../common/decorators/jwt-authenticate-is-optional.decorator';
import { CurrentLang } from '../../common/decorators/current-lang.decorator';
import { OrderService } from './order.service';
import { CustomerCreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ValidateProductsOrderDto } from './dto/validate-products-order.dto';
import { CreateNewOrderEntity } from './entities/create-new-order.entity';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/order`)
@UseInterceptors(ClassSerializerInterceptor)
//@UseGuards(JwtAuthGuard)
//@ApiBearerAuth()
@ApiTags('Customer Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBearerAuth()
  @JwtAuthenticateIsOptional()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Customer create an order' })
  async createOne(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Body() createOrderDto: CustomerCreateOrderDto,
  ) {
    return new CreateNewOrderEntity(
      await this.orderService.createOne(
        createOrderDto,
        authReq ? authReq['id'] : 0,
        curLang,
      ),
    );
  }

  @Post('/validate/products')
  @ApiOperation({ summary: 'Validate products in order' })
  async validateProductsOrder(@Body() reqData: ValidateProductsOrderDto) {
    return await this.orderService.validateProductsOrder(reqData);
  }

  /*
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
  */
}
