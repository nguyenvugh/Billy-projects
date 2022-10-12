import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { CityRepository } from '../city/repository/city.repository';
import { DistrictRepository } from '../district/repository/district.repository';
import { WardRepository } from '../ward/repository/ward.repository';
import { InventoryRepository } from '../inventory/repository/inventory.repository';
import { OrderRepository } from './repository/order.repository';
import { OrderPaymentModule } from '../order-payment/order-payment.module';
import { OrderShippingModule } from '../order-shipping/order-shipping.module';
import { OrderShippingRepository } from '../order-shipping/repository/order-shipping.repository';
import { OrderShippingHistoryRepository } from '../order-shipping/repository/order-shipping-history.repository';
import { ProductComboRepository } from '../product-combo/repository/product-combo.repository';
import { ProductRepository } from '../product/repository/product.repository';
import { MapInventoryCityToCustomerCityRepository } from '../city/repository/map_inventory_city_to_customer_city.repository';
import { FlashSaleRepository } from '../flash-sale/repository/flash-sale.repository';
import { FlashSaleModule } from '../flash-sale/flash-sale.module';
import { PromotionModule } from '../promotion/promotion.module';
import { CharityModule } from '../charity/charity.module';
import { CouponModule } from '../coupon/coupon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderRepository,
      OrderShippingRepository,
      OrderShippingHistoryRepository,
      ProductComboRepository,
      ProductRepository,
      CityRepository,
      DistrictRepository,
      WardRepository,
      InventoryRepository,
      MapInventoryCityToCustomerCityRepository,
      FlashSaleRepository,
    ]),
    OrderPaymentModule,
    forwardRef(() => OrderShippingModule),
    FlashSaleModule,
    PromotionModule,
    CharityModule,
    CouponModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
