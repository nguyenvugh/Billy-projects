import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const service = configService.get<string>('email.service');
        return {
          transport: {
            host: configService.get<string>(`email.${service}.host`),
            secure: false,
            auth: {
              user: configService.get<string>(`email.${service}.username`),
              pass: configService.get<string>(`email.${service}.password`),
            },
          },
          defaults: {
            from: configService.get<string>(`email.${service}.from_email`),
          },
          template: {
            dir: join(__dirname, 'templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          options: {
            partials: {
              dir: join(__dirname, 'templates'),
              options: {
                strict: true,
              },
            },
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [MailController],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
