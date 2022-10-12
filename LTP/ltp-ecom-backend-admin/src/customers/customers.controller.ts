import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FindByCriteriaDto } from 'src/orders/dto/find-by-criteria.dto';
import { OrdersService } from 'src/orders/orders.service';
import { CustomersService } from './customers.service';
import { UpdateCustomersDto } from './dto/update.dto';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('customers')
@UseGuards(AuthGuard, PermissionsGuard)
export class CustomersController {
  constructor(
    private readonly customersService: CustomersService,
    private readonly ordersService: OrdersService,
  ) { }

  @MessagePattern('admin-customers-find-by-criteria')
  @Permissions('customer')
  async findByCriteria({ body }) {
    return {
      code: 200,
      data: await this.customersService.findByCriteria(body),
    };
  }

  @MessagePattern('admin-customers-activate')
  @Permissions('customer')
  async activate({ body }) {
    const { id } = body;
    return await this.customersService.activate(id);
  }

  @MessagePattern('admin-customers-deactivate')
  @Permissions('customer')
  async deactivate({ body }) {
    const { id, reason } = body;
    return await this.customersService.deactivate(id, reason);
  }

  @MessagePattern('admin-customers-find-one')
  @Permissions('customer')
  async findOne({ body }) {
    const { id } = body;
    return await this.customersService.findOne(id);
  }

  @MessagePattern('admin-customers-get-orders')
  @Permissions('customer')
  async getOrders({ body }: { body: FindByCriteriaDto }) {
    return {
      code: 200,
      data: await this.ordersService.findByCriteria(body, body.id, false),
    };
  }

  @MessagePattern('admin-customers-update-one')
  @Permissions('customer')
  async updateOne({ body }: { body: UpdateCustomersDto }) {
    return await this.customersService.update(body);
  }

  @MessagePattern('admin-customers-delete-one')
  @Permissions('customer')
  async delete({ body }) {
    const { id } = body;
    return await this.customersService.delete(id);
  }
}
