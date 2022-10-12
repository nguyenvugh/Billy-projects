import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConsts } from '../common/constants/microservices';
import { ApiCustomerService } from './api-customer.service';
import { ApiCustomerController } from './api-customer.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ApiCustomerController],
  providers: [
    ApiCustomerService,
    {
      provide: MicroserviceConsts.IDENTITY.CUSTOMER,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('microservices.customer.host'),
            port: configService.get('microservices.customer.port'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class ApiCustomerModule {}
