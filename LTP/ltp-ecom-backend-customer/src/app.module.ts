import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  I18nModule,
  I18nJsonParser,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import mainConfig from './common/configs/main';
import { ExceptionFilter } from './common/filters/rpc-exception.filter';
import { RpcValidationPipe } from './common/pipes/validation.pipe';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductTranslateModule } from './product-translate/product-translate.module';
import { ProductCategoryTranslateModule } from './product-category-translate/product-category-translate.module';
import { CityModule } from './city/city.module';
import { CountryModule } from './country/country.module';
import { InventoryModule } from './inventory/inventory.module';
import { MediaUploadModule } from './media-upload/media-upload.module';
import { CustomerReviewModule } from './customer-review/customer-review.module';
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { DistrictModule } from './district/district.module';
import { WardModule } from './ward/ward.module';
import { OrderModule } from './order/order.module';
import { OrderDetailModule } from './order-detail/order-detail.module';
import { OrderHistoryModule } from './order-history/order-history.module';
import { OrderShippingModule } from './order-shipping/order-shipping.module';
import { OrderPaymentModule } from './order-payment/order-payment.module';
import { OrderPaymentHistoryModule } from './order-payment-history/order-payment-history.module';
import { NewsModule } from './news/news.module';
import { NewsCategoryModule } from './news-category/news-category.module';
import { InventoryProductModule } from './inventory-product/inventory-product.module';
import { MainMenuModule } from './main-menu/main-menu.module';
import { PromotionModule } from './promotion/promotion.module';
import { CustomerSpecialProductModule } from './customer-special-product/customer-special-product.module';
import { PagesModule } from './pages/pages.module';
import { FlashSaleModule } from './flash-sale/flash-sale.module';
import { ProductComboModule } from './product-combo/product-combo.module';
import { CustomerSpecialProductComboModule } from './customer-special-product-combo/customer-special-product-combo.module';
import { CharityModule } from './charity/charity.module';
import { CouponModule } from './coupon/coupon.module';
import { EmailSubscriptionModule } from './email-subscription/email-subscription.module';
import { ProductReviewModule } from './product-review/product-review.module';
import { ShopModule } from './shop/shop.module';
import { OfficeModule } from './office/office.module';
import { CustomerContactFormModule } from './customer-contact-form/customer-contact-form.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [mainConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('db.mysql.host'),
        port: +configService.get<number>('db.mysql.port'),
        username: configService.get('db.mysql.username'),
        password: configService.get('db.mysql.password'),
        database: configService.get('db.mysql.database'),
        entities: [],
        //synchronize: configService.get('db.mysql.sync_db'),
        // stop synchronize to avoid lost data on table created
        synchronize: false,
        autoLoadEntities: true,
        logging: configService.get('db.mysql.logging'),
        timezone: '+07:00',
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang', 'locale'] },
        new HeaderResolver(['lang']),
        AcceptLanguageResolver,
        // new CookieResolver(['lang', 'locale', 'l']),
      ],
    }),
    AuthModule,
    CustomerModule,
    ProductModule,
    ProductCategoryModule,
    ProductTranslateModule,
    ProductCategoryTranslateModule,
    CityModule,
    CountryModule,
    InventoryModule,
    MediaUploadModule,
    CustomerReviewModule,
    CustomerAddressModule,
    DistrictModule,
    WardModule,
    OrderModule,
    OrderDetailModule,
    OrderHistoryModule,
    OrderShippingModule,
    OrderPaymentModule,
    OrderPaymentHistoryModule,
    NewsModule,
    NewsCategoryModule,
    InventoryProductModule,
    MainMenuModule,
    PromotionModule,
    CustomerSpecialProductModule,
    PagesModule,
    FlashSaleModule,
    ProductComboModule,
    CustomerSpecialProductComboModule,
    CharityModule,
    CouponModule,
    EmailSubscriptionModule,
    ProductReviewModule,
    ShopModule,
    OfficeModule,
    CustomerContactFormModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: RpcValidationPipe,
    },
  ],
})
export class AppModule {}
