import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FindAllOrdersDto } from './dto/find-all-orders.dto';
import { FindOneOrderDto } from './dto/find-one-order.dto';
import { CancelOneOrderDto } from './dto/cancel-one-order.dto';
import { ValidateProductsOrderDto } from './dto/validate-products-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('customer-order-create-one')
  async createOne(createOrderDto: CreateOrderDto) {
    return await this.orderService.createOne(createOrderDto);
  }

  @MessagePattern('customer-order-find-all-orders')
  async findAllOrders(reqData: FindAllOrdersDto) {
    return await this.orderService.findAllOrders(reqData);
  }

  @MessagePattern('customer-order-find-one-order')
  async findOneOrder(reqData: FindOneOrderDto) {
    return await this.orderService.findOneOrder(reqData);
  }

  @MessagePattern('customer-order-cancel-one-order')
  async cancelOneOrder(reqData: CancelOneOrderDto) {
    return await this.orderService.cancelOneOrder(reqData);
  }

  @MessagePattern('customer-order-validate-products-order')
  async validateProductsOrder(reqData: ValidateProductsOrderDto) {
    return await this.orderService.validateProductsOrder(reqData);
  }

  /*
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

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
