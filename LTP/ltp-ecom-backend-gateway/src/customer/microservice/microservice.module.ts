import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { MicroserviceService } from './microservice.service';
import { MicroserviceController } from './microservice.controller';

@Module({
  controllers: [MicroserviceController],
  providers: [
    MicroserviceService,
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
  exports: [MicroserviceService],
})
export class MicroserviceModule {}
