import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n';
import path from 'path';
import dbConfig from '../ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import globalConfig from './common/config/global.config';
import i18nConfigOptions from './common/config/i18n.config';
import { FileModule } from './file/file.module';
import { UtilsModule } from './utils-module/utils.module';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { BannerModule } from './banner/banner.module';
import { EventModule } from './event/event.module';
import { DocumentModule } from './documents/document.module';
import { UserModule } from './user/user.module';
import { CaslModule } from './casl/casl.module';

// console.log('dbConfig', dbConfig);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig],
    }),
    I18nModule.forRoot({
      ...i18nConfigOptions,
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
    }),
    TypeOrmModule.forRoot(dbConfig),
    UtilsModule,
    UserModule,
    CaslModule,
    FileModule,
    CategoryModule,
    ArticleModule,
    BannerModule,
    EventModule,
    DocumentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
    // FirebaseAuthStrategy,
  ],
})
export class AppModule {}
