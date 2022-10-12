import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import globalConfig from './common/config/global.config';
import { I18nModule } from 'nestjs-i18n';
import i18nConfigOptions from './common/config/i18n.config';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article-module/article/article.module';
import { ArticleCategoryModule } from './article-module/article-category/articleCategory.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule as CbiAdminModule } from './cbi/cbi/admin/admin.module';
import { UserModule as CbiUserModule } from './cbi/cbi/user/user.module';
import { EmailsModule } from './emails/emails.module';
import { ContactModule } from './contact/contact.module';
import { AdminModule as CbiLevelAdminModule } from './cbi/cbi-level/admin/admin.module';
import { AdminModule as CbiLevelGroupAdminModule } from './cbi/cbi-level-group/admin/admin.module';
import { AdminModule as CbiQuestionAdminModule } from './cbi/cbi-question/admin/admin.module';
import { DocumentsModule } from './documents/admin/documents.module';
import { UserModule as CbiLevelUserModule } from './cbi/cbi-level/user/user.module';
import { UserModule as CbiUserLevelUserModule } from './cbi-user/cbi-user-level/user/user.module';
import { UserModule as CbiLevelGroupUserModule } from './cbi/cbi-level-group/user/user.module';
import { AdminModule as CbiUserLevelAdminModule } from './cbi-user/cbi-user-level/admin/admin.module';
import { AdminModule as CbiUserAdminModule } from './cbi-user/cbi-user/admin/admin.module';
import { ConfigCebiModule } from './config-cebi/config-cebi.module';
import { CaslModule } from './casl/casl.module';
import { AbilityGuard } from './casl/guard/ability.guard';
import { APP_GUARD } from '@nestjs/core';
import { CaslAbilityFactory } from './casl/casl-ability.factory';
import { UserModule as CbiUserUserModule } from './cbi-user/cbi-user/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig],
    }),
    I18nModule.forRoot({
      ...i18nConfigOptions,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    TypeOrmModule.forRoot(),
    CaslModule,
    AuthModule,
    ArticleModule,
    ArticleCategoryModule,
    CbiAdminModule,
    CbiUserModule,
    EmailsModule,
    ContactModule,
    CbiLevelAdminModule,
    CbiLevelGroupAdminModule,
    CbiQuestionAdminModule,
    DocumentsModule,
    CbiLevelUserModule,
    CbiUserLevelUserModule,
    CbiLevelGroupUserModule,
    CbiUserLevelAdminModule,
    CbiUserAdminModule,
    ConfigCebiModule,
    CbiUserUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
