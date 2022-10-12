import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { IGlobalConfig } from '../../common/config/global.config';
import { AdminController } from './controller/admin.controller';
import { AdminRepository } from './repository/admin.repository';
import { AdminService } from './service/admin.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AdminGroupPolicyModule } from '../../casl/group-policy/admin/admin-group-policy.module';
import { AdminSubscriber } from './subscriber/admin.subscriber';
import { UserRepository } from '../repository/user.repository';
import { UserToGroupPoliciesRepository } from '../../casl/repository/user-to-group-policies.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminRepository,
      UserRepository,
      UserToGroupPoliciesRepository,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<IGlobalConfig>) => {
        return {
          secret: configService.get('auth.admin.jwtSecretKey', { infer: true }),
          signOptions: {
            expiresIn: configService.get('auth.admin.jwtExpire', {
              infer: true,
            }),
            algorithm: 'HS256',
          },
        };
      },
      inject: [ConfigService],
    }),
    AdminGroupPolicyModule,
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtStrategy, AdminSubscriber],
  exports: [AdminService],
})
export class AdminModule {}
