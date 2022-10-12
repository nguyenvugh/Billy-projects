import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { MicroserviceService } from './microservice.service';
import { MicroserviceController } from './microservice.controller';

@Module({
  controllers: [MicroserviceController],
  providers: [
    MicroserviceService,
    {
      provide: MicroserviceConsts.IDENTITY.ADMIN,
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('microservices.admin.host'),
            port: configService.get('microservices.admin.port'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [MicroserviceService],
})
export class MicroserviceModule {}
