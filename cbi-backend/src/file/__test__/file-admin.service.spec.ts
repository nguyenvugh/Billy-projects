import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nJsonParser,
  I18nModule,
  I18nService,
  QueryResolver,
} from 'nestjs-i18n';
import { UtilsModule } from '../../utils-module/utils.module';
import { Repository } from 'typeorm';
import {
  KEY_LANG_HEADER,
  LangEnum,
} from '../../common/constants/global.constant';
import { FileAdmin } from '../entities/file-admin.entity';
import { FileAdminService } from '../service/file-admin.service';
import { UploadService } from '../service/upload.service';
import i18nConfigOptions from '../../common/config/i18n.config';

describe('FileAdminService', () => {
  let service: FileAdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule,
        UtilsModule,

        // Create a custom config class to easy usage here.
        I18nModule.forRoot({
          ...i18nConfigOptions,
          parserOptions: {
            path: './i18n/',
            watch: true,
          },
        }),
      ],
      providers: [
        FileAdminService,
        UploadService,
        {
          provide: getRepositoryToken(FileAdmin),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<FileAdminService>(FileAdminService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
