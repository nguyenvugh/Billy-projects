import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderDetailsRepository } from './repositories/order-details.repository';
import { OrdersRepository } from './repositories/orders.repository';

import { Customers } from '../customers/schemas/customers.schema';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Country } from 'src/country/schemas/country.schema';
import { City } from 'src/city/schemas/city.schema';
import { District } from 'src/district/schemas/district.schema';
import { Ward } from 'src/ward/schemas/ward.schema';
import { OrderShippingsRepository } from './repositories/order-shippings.repository';
import { OrderPaymentRepository } from './repositories/order-payment.repository';
import { JwtCoreModule } from 'src/jwt-core/jwt-core.module';
import { OrderShippingSubscriber } from './subscriber/order-shipping.subscriber';
import { OrderShippingDetailRepository } from './repositories/order-shipping-detail.repository';
import { ProductRepository } from '../product/repositories/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersRepository,
      OrderDetailsRepository,
      OrderShippingsRepository,
      OrderPaymentRepository,
      OrderShippingDetailRepository,
      ProductRepository,
    ]),
    TypeOrmModule.forFeature([Customers, Country, City, District, Ward]),
    JwtCoreModule,
  ],
  exports: [OrdersService],
  controllers: [OrdersController],
  providers: [OrdersService, OrderShippingSubscriber],
})
export class OrdersModule {}
