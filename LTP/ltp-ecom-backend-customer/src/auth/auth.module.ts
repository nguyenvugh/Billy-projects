import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomerRepository } from '../customer/repository/customer.repository';
import { CustomerConnectSocialRepository } from '../customer/repository/customer-connect-social.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRepository,
      CustomerConnectSocialRepository,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: { expiresIn: configService.get<string>('jwt.expire') },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
