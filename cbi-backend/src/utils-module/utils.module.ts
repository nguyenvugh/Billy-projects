import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IGlobalConfig } from 'src/common/config/global.config';
import {
  EXPIRE_JWT_TOKEN,
  JwtServiceType,
} from 'src/common/constants/global.constant';
import { MailService } from './service/mail.service';
import { SlugService } from './service/slug.service';
import { TranslateService } from './service/translate.service';
import { UuidService } from './service/uuid.service';

@Module({
  providers: [TranslateService, SlugService, UuidService, MailService],
  exports: [TranslateService, SlugService, UuidService, MailService],
})
export class UtilsModule {}
