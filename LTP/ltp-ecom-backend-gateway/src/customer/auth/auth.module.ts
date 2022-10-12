import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { LocalCustomerStrategy } from '../../common/strategies/passport-local-customer.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MicroserviceModule } from '../microservice/microservice.module';
import { MailModule } from '../../mail/mail.module';
import { FirebaseModule } from '../services/firebase/firebase.module';

@Module({
  imports: [
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
    MicroserviceModule,
    MailModule,
    ConfigModule,
    FirebaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalCustomerStrategy],
})
export class AuthModule {}
