import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { Repository } from 'typeorm';
import {
  KEY_LANG_HEADER,
  LangEnum,
} from '../../common/constants/global.constant';
import { UtilsModule } from '../../utils-module/utils.module';
import { FileAdminController } from '../controller/file-admin.controller';
import { FileAdmin } from '../entities/file-admin.entity';
import { FileAdminService } from '../service/file-admin.service';
import { UploadService } from '../service/upload.service';

describe('FileAdminController', () => {
  let controller: FileAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        UtilsModule,
        I18nModule.forRoot({
          fallbackLanguage: LangEnum.Vi, // Not work if change to vi
          fallbacks: {
            // 'en-CA': 'fr',
            // vi: 'vi',
            'en-*': 'en',
            // 'fr-*': 'fr',
            // pt: 'pt-BR',
          },
          parser: I18nJsonParser,
          parserOptions: {
            path: './i18n/',
            watch: true,
          },
          resolvers: [
            { use: QueryResolver, options: [KEY_LANG_HEADER] },
            new HeaderResolver([KEY_LANG_HEADER]),
            AcceptLanguageResolver,
            // new CookieResolver(['lang', 'locale', 'l']),
          ],
        }),
      ],
      controllers: [FileAdminController],
      providers: [
        FileAdminService,
        UploadService,
        {
          provide: getRepositoryToken(FileAdmin),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<FileAdminController>(FileAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
