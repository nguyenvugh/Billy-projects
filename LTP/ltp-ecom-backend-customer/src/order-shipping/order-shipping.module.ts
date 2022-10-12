import { Module, HttpModule, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrderShippingService } from './order-shipping.service';
import { OrderShippingController } from './order-shipping.controller';
import { OrderShippingRepository } from './repository/order-shipping.repository';
import { OrderShippingDetailRepository } from './repository/order-shipping-detail.repository';
import { OrderShippingHistoryRepository } from './repository/order-shipping-history.repository';
import { InventoryRepository } from '../inventory/repository/inventory.repository';
import { CityRepository } from '../city/repository/city.repository';
import { DistrictRepository } from '../district/repository/district.repository';
import { WardRepository } from '../ward/repository/ward.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { GhtkDriver } from './driver/ghtk.driver';
import { OrderModule } from '../order/order.module';
import { OrderShippingHistorySubscriber } from './subscriber/order-shipping-history.subscriber';
import { OrderShippingSubscriber } from './subscriber/order-shipping.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderShippingRepository,
      InventoryRepository,
      OrderShippingDetailRepository,
      OrderShippingHistoryRepository,
      CityRepository,
      DistrictRepository,
      WardRepository,
      ProductRepository,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('shipping.ghtk.ipn_secret_key'),
          signOptions: {
            expiresIn: configService.get<string>(
              'shipping.ghtk.ipn_expire_time',
            ),
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    forwardRef(() => OrderModule),
  ],
  controllers: [OrderShippingController],
  providers: [
    OrderShippingService,
    GhtkDriver,
    OrderShippingHistorySubscriber,
    OrderShippingSubscriber,
  ],
  exports: [OrderShippingService],
})
export class OrderShippingModule {}
