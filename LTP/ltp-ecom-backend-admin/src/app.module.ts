import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { MediaUploadModule } from './media-upload/media-upload.module';
import mainConfig from './common/configs/main';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
// import configTypeOrm from '../ormconfig';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { NewsModule } from './news/news.module';
import { NewsCategoryModule } from './news-category/news-category.module';
import { InventoryModule } from './inventory/inventory.module';
import { FlashSaleModule } from './flash-sale/flash-sale.module';
import { SliderModule } from './slider/slider.module';
import { AdminModule } from './admin/admin.module';
import { GroupModule } from './group/group.module';
import { JwtCoreModule } from './jwt-core/jwt-core.module';
import { ShopModule } from './shop/shop.module';
import { BranchModule } from './branch/branch.module';
import { UsersModule } from './users/users.module';
import { CouponModule } from './coupon/coupon.module';
import { PagesModule } from './pages/pages.module';
import { CharityModule } from './charity/charity.module';
import { CountryModule } from './country/country.module';
import { CityModule } from './city/city.module';
import { DistrictModule } from './district/district.module';
import { WardModule } from './ward/ward.module';
import { InventoryInputHistoryModule } from './inventory-input-history/inventory-input-history.module';
import { ProductComboModule } from './product-combo/product-combo.module';
import { EmailSubscriptionModule } from './email-subscription/email-subscription.module';
import { ProductReviewModule } from './product-review/product-review.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { QueueSendEmailModule } from './queue-send-email/queue-send-email.module';
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
        // migrationsTableName: 'migrations',
        // migrations: [__dirname + '/migrations/*.ts'],
        // cli: {
        //   migrationsDir: __dirname + '/migrations',
        // },
      }),
      inject: [ConfigService],
    }),
    // TypeOrmModule.forRoot(configTypeOrm),
    AuthModule,
    ProductCategoryModule,
    MediaUploadModule,
    ProductModule,
    OrdersModule,
    CustomersModule,
    NewsModule,
    NewsCategoryModule,
    InventoryModule,
    FlashSaleModule,
    SliderModule,
    AdminModule,
    GroupModule,
    JwtCoreModule,
    ShopModule,
    BranchModule,
    UsersModule,
    CouponModule,
    PagesModule,
    CharityModule,
    CountryModule,
    CityModule,
    DistrictModule,
    WardModule,
    InventoryInputHistoryModule,
    ProductComboModule,
    EmailSubscriptionModule,
    ProductReviewModule,
    SchedulerModule,
    QueueSendEmailModule,
    CustomerContactFormModule,
  ],
  controllers: [],
  providers: [],
  exports: [JwtCoreModule],
})
export class AppModule { }
