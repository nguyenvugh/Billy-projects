import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MicroserviceConsts } from '../common/constants/microservices';
import { ApiAdminService } from './api-admin.service';
import { ApiAdminController } from './api-admin.controller';

@Module({
  imports: [ConfigModule],
  controllers: [ApiAdminController],
  providers: [
    ApiAdminService,
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
})
export class ApiAdminModule {}
