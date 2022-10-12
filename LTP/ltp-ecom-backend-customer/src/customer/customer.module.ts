import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerSubscriber } from './subscriber/customer.subscriber';
import { CustomerRepository } from './repository/customer.repository';
import { CustomerConnectSocialRepository } from './repository/customer-connect-social.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRepository,
      CustomerConnectSocialRepository,
    ]),
    ConfigModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerSubscriber],
})
export class CustomerModule {}
