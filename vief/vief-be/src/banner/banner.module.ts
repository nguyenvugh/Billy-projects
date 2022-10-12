import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../file/file.repository';
import { FileService } from '../file/file.service';
import { UtilsModule } from '../utils-module/utils.module';
import { BannerService } from './banner.service';
import { BannerAdminController } from './controllers/banner-admin.controller';
import { CategoryByClientController } from './controllers/banner-client.controller';
import { BannerTranslation } from './entities/banner-translation.entity';
import { Banner } from './entities/banner.entity';
import { BannerTranslationRepository } from './repository/banner-translate.repository';
import { BannerRepository } from './repository/banner.repository';
import { AdminBannerModule } from './admin/admin-banner.module';

@Module({
  imports: [AdminBannerModule],
  controllers: [CategoryByClientController],
  //providers: [BannerService, FileService],
})
export class BannerModule {}
