import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerRepository } from '../repository/banner.repository';
import { BannerTranslationRepository } from '../repository/banner-translate.repository';
import { FileRepository } from '../../file/file.repository';
import { ImageTranslationRepository } from '../../file/repository/image-translation.repository';
import { AdminBannerController } from './controller/admin-banner.controller';
import { AdminBannerService } from './service/admin-banner.service';
import { FileModule } from '../../file/file.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileRepository,
      ImageTranslationRepository,
      BannerTranslationRepository,
      BannerRepository,
    ]),
    FileModule,
  ],
  controllers: [AdminBannerController],
  providers: [AdminBannerService],
  exports: [AdminBannerService],
})
export class AdminBannerModule {}
