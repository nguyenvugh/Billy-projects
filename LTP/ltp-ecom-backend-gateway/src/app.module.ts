import { Module, Logger } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  I18nModule,
  I18nJsonParser,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from 'nestjs-i18n';
import * as path from 'path';
import mainConfig from './common/configs/main';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiAdminModule } from './api-admin/api-admin.module';
import { ApiCustomerModule } from './api-customer/api-customer.module';
import { AuthModule } from './customer/auth/auth.module';
import { MicroserviceModule } from './customer/microservice/microservice.module';
import { MailModule } from './mail/mail.module';
import { ProductCategoryModule } from './customer/product-category/product-category.module';
import { InventoryModule } from './customer/inventory/inventory.module';
import { ProductModule } from './customer/product/product.module';
import { AdminProductCategoryModule } from './admin/admin-product-category/admin-product-category.module';
import { AdminProductModule } from './admin/admin-product/admin-product.module';
import { AdminMicroserviceModule } from './admin/admin-microservice/admin-microservice.module';
import { AdminMediaUploadModule } from './admin/admin-media-upload/admin-media-upload.module';
import { MyAccountModule } from './customer/my-account/my-account.module';
import { CountryModule } from './customer/country/country.module';
import { CityModule } from './customer/city/city.module';
import { DistrictModule } from './customer/district/district.module';
import { WardModule } from './customer/ward/ward.module';
import { AuthModule as AdminAuthModule } from './admin/auth/auth.module';
import { MicroserviceModule as AdminMicroserviceModule2 } from './admin/microservice/microservice.module';
import { OrderModule } from './customer/order/order.module';
import { OrderPaymentModule } from './customer/order-payment/order-payment.module';
import { OrderShippingModule } from './customer/order-shipping/order-shipping.module';
import { OrdersModule } from './admin/orders/orders.module';
import { NewsCategoryModule } from './admin/news-category/news-category.module';
import { NewsModule } from './admin/news/news.module';
import { FlashSaleModule } from './admin/flash-sale/flash-sale.module';
import { SliderModule } from './admin/slider/slider.module';
import { AdminModule } from './admin/admin/admin.module';
import { CustomersModule } from './admin/customers/customers.module';
import { FirebaseModule } from './customer/services/firebase/firebase.module';
import { NewsModule as CustomerNewsModule } from './customer/news/news.module';
import { NewsCategoryModule as CustomerNewsCategoryModule } from './customer/news-category/news-category.module';
import { GroupModule } from './admin/group/group.module';
import { ShopModule } from './admin/shop/shop.module';
import { BranchModule } from './admin/branch/branch.module';
import { UsersModule } from './admin/users/users.module';
import { CouponModule } from './admin/coupon/coupon.module';
import { PagesModule } from './admin/pages/pages.module';
import { MainMenuModule } from './customer/main-menu/main-menu.module';
import { PromotionModule } from './customer/promotion/promotion.module';
import { MediaUploadModule } from './customer/media-upload/media-upload.module';
import { CharityModule } from './admin/charity/charity.module';
import { InventoryModule as AdminInventoryModule } from './admin/inventory/inventory.module';
import { CountryModule as AdminCountryModule } from './admin/country/country.module';
import { CityModule as AdminCityModule } from './admin/city/city.module';
import { DistrictModule as AdminDistrictModule } from './admin/district/district.module';
import { WardModule as AdminWardModule } from './admin/ward/ward.module';
import { PagesModule as CustomerPagesModule } from './customer/pages/pages.module';
import { FlashSaleModule as CustomerFlashSaleModule } from './customer/flash-sale/flash-sale.module';
import { ProductComboModule } from './admin/product-combo/product-combo.module';
import { ProductComboModule as CustomerProductComboModule } from './customer/product-combo/product-combo.module';
import { CharityModule as CustomerCharityModule } from './customer/charity/charity.module';
import { CustomerCouponModule } from './customer/coupon/coupon.module';
import { EmailSubscriptionModule } from './customer/email-subscription/email-subscription.module';
import { EmailSubscriptionModule as AdminEmailSubscriptionModule } from './admin/email-subscription/email-subscription.module';
import { ProductReviewModule } from './customer/product-review/product-review.module';
import { ProductReviewModule as AdminProductReviewModule } from './admin/product-review/product-review.module';
import { ShopModule as CustomerShopModule } from './customer/shop/shop.module';
import { OfficeModule } from './customer/office/office.module';
import { SchedulerModule } from './admin/scheduler/scheduler.module';
import { QueueSendEmailModule } from './admin/queue-send-email/queue-send-email.module';
import { CustomerContactFormModule } from './customer/customer-contact-form/customer-contact-form.module';
import { CustomerContactFormModule as AdminCustomerContactFormModule } from './admin/customer-contact-form/customer-contact-form.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [mainConfig],
    }),
    /*
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
        synchronize: configService.get('db.mysql.sync_db'),
      }),
      inject: [ConfigService],
    }),
    */
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
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60, //This mean that 25 requests from the same IP can be made to a single endpoint in 1 minute.
      ignoreUserAgents: [
        // Don't throttle request that have 'googlebot' defined in them.
        // Example user agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
        /googlebot/gi,
      ],
    }),
    ScheduleModule.forRoot(),
    ApiAdminModule,
    ApiCustomerModule,
    AuthModule,
    MicroserviceModule,
    MailModule,
    ProductCategoryModule,
    InventoryModule,
    ProductModule,
    AdminProductCategoryModule,
    AdminProductModule,
    AdminMicroserviceModule,
    AdminMediaUploadModule,
    MyAccountModule,
    CountryModule,
    CityModule,
    DistrictModule,
    WardModule,
    AdminAuthModule,
    AdminMicroserviceModule2,
    OrderModule,
    OrderPaymentModule,
    OrderShippingModule,
    OrdersModule,
    NewsCategoryModule,
    NewsModule,
    FlashSaleModule,
    SliderModule,
    AdminModule,
    CustomersModule,
    FirebaseModule,
    CustomerNewsModule,
    CustomerNewsCategoryModule,
    GroupModule,
    ShopModule,
    BranchModule,
    UsersModule,
    CouponModule,
    PagesModule,
    MainMenuModule,
    PromotionModule,
    MediaUploadModule,
    CharityModule,
    AdminInventoryModule,
    AdminCountryModule,
    AdminCityModule,
    AdminDistrictModule,
    AdminWardModule,
    CustomerPagesModule,
    CustomerFlashSaleModule,
    ProductComboModule,
    CustomerProductComboModule,
    CustomerCharityModule,
    CustomerCouponModule,
    EmailSubscriptionModule,
    AdminEmailSubscriptionModule,
    ProductReviewModule,
    AdminProductReviewModule,
    CustomerShopModule,
    OfficeModule,
    SchedulerModule,
    QueueSendEmailModule,
    CustomerContactFormModule,
    AdminCustomerContactFormModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
