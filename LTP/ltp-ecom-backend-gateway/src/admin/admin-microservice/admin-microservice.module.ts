import { Module } from '@nestjs/common';
import { AdminMicroserviceService } from './admin-microservice.service';
import { AdminMicroserviceController } from './admin-microservice.controller';
import { ConfigService } from '@nestjs/config';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AdminMicroserviceController],
  providers: [
    AdminMicroserviceService,
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
  exports: [AdminMicroserviceService],
})
export class AdminMicroserviceModule {}
