import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { FindByCriteriaDto } from './dto/find-by-criteria.dto';
import { Permissions } from 'src/common/decorators/permissions.decorator';

import { OrdersService } from './orders.service';

@Controller('orders')
@UseGuards(AuthGuard, PermissionsGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('admin-orders-find-by-criteria')
  @Permissions('order')
  async findByCriteria({ body }: { body: FindByCriteriaDto }) {
    return {
      code: 200,
      data: await this.ordersService.findByCriteria(body, null, true),
    };
  }

  @MessagePattern('admin-orders-find-one')
  @Permissions('order')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.ordersService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Order not found',
    };
  }

  @MessagePattern('admin-orders-update-one')
  @Permissions('order')
  async updateOne({ body }) {
    const { id, payment_status, shipping_status, shipping_price } = body;
    const result = await this.ordersService.updateOne({
      id,
      payment_status,
      shipping_status,
      shipping_price,
    });
    return result;
  }

  @MessagePattern('admin-orders-delete')
  @Permissions('order')
  async delete({ body }) {
    const { id } = body;
    const result = await this.ordersService.delete(id);
    return result;
  }
}
